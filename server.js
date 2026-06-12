/* ============================================================
   CÓDIGO INVISÍVEL — QUIZ ENGINE + ADMIN + MÉTRICAS + WEBHOOKS
   Node >= 22.5 (usa node:sqlite nativo) · npm i && npm start
============================================================ */
const express = require("express");
const crypto = require("crypto");
const path = require("path");
const { DatabaseSync } = require("node:sqlite");

const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";       // TROCAR EM PRODUÇÃO
const WEBHOOK_TOKEN  = process.env.WEBHOOK_TOKEN  || "troque-este-token";
const LANGS = ["pt", "es", "en"];

/* ── DB ── */
const db = new DatabaseSync(path.join(__dirname, "data.db"));
db.exec(`
CREATE TABLE IF NOT EXISTS quiz_config(lang TEXT PRIMARY KEY, json TEXT);
CREATE TABLE IF NOT EXISTS events(
  id INTEGER PRIMARY KEY AUTOINCREMENT, sid TEXT, lang TEXT,
  step_index INTEGER, step_label TEXT, type TEXT, country TEXT, ts INTEGER);
CREATE TABLE IF NOT EXISTS sales(
  id INTEGER PRIMARY KEY AUTOINCREMENT, lang TEXT, platform TEXT, status TEXT,
  amount REAL, currency TEXT, country TEXT, state TEXT, ts INTEGER, raw TEXT);
CREATE INDEX IF NOT EXISTS ev_lang ON events(lang, type, step_index, ts);
CREATE INDEX IF NOT EXISTS sa_lang ON sales(lang, status, ts);
`);
const SEED = require("./seed");
for (const l of LANGS) {
  const row = db.prepare("SELECT 1 FROM quiz_config WHERE lang=?").get(l);
  if (!row) db.prepare("INSERT INTO quiz_config VALUES(?,?)").run(l, JSON.stringify(SEED[l]));
}

/* ── App ── */
const app = express();
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const getCfg  = (l) => JSON.parse(db.prepare("SELECT json FROM quiz_config WHERE lang=?").get(l).json);
const saveCfg = (l, j) => db.prepare("UPDATE quiz_config SET json=? WHERE lang=?").run(JSON.stringify(j), l);
const now = () => Date.now();
const tokenOf = (p) => crypto.createHash("sha256").update("cir|" + p).digest("hex");
const visitorCountry = (req) =>
  (req.headers["cf-ipcountry"] || req.headers["x-vercel-ip-country"] || req.headers["x-country"] || "").toString().toUpperCase().slice(0, 2);

/* ════════ PÚBLICO ════════ */
app.get("/", (_q, res) => res.redirect("/q/pt"));
app.get("/q/:lang", (req, res) => {
  if (!LANGS.includes(req.params.lang)) return res.status(404).send("not found");
  res.sendFile(path.join(__dirname, "public", "q.html"));
});
app.get("/api/quiz/:lang", (req, res) => {
  if (!LANGS.includes(req.params.lang)) return res.status(404).json({ error: "lang" });
  res.json(getCfg(req.params.lang));
});

/* tracking: {sid, lang, i, label, type:'view'|'answer'|'cta'} */
app.post("/api/track", (req, res) => {
  const { sid, lang, i, label, type } = req.body || {};
  if (!sid || !LANGS.includes(lang) || typeof i !== "number" || !["view", "answer", "cta"].includes(type))
    return res.status(400).json({ ok: false });
  db.prepare("INSERT INTO events(sid,lang,step_index,step_label,type,country,ts) VALUES(?,?,?,?,?,?,?)")
    .run(String(sid).slice(0, 64), lang, i, String(label || "").slice(0, 80), type, visitorCountry(req), now());
  res.json({ ok: true });
});

/* ════════ WEBHOOKS DE VENDA ════════
   URL: POST /webhook/:platform/:lang?token=WEBHOOK_TOKEN
   Plataformas mapeadas: kiwify, hotmart, generic (campos: status, amount, currency, country, state) */
function extractSale(platform, b) {
  try {
    if (platform === "kiwify") {
      return {
        status: /paid|approved/i.test(b.order_status || "") ? "approved"
              : /refunded|chargedback/i.test(b.order_status || "") ? "refunded" : (b.order_status || "other"),
        amount: (b.Commissions?.charge_amount ?? b.Product?.product_base_price ?? 0) / 100,
        currency: b.Commissions?.currency || "BRL",
        country: (b.Customer?.country || "BR").toUpperCase().slice(0, 2),
        state: (b.Customer?.state || "").toUpperCase().slice(0, 2),
      };
    }
    if (platform === "hotmart") {
      const d = b.data || {};
      return {
        status: /APPROVED|COMPLETE/i.test(b.event || d.purchase?.status || "") ? "approved"
              : /REFUND|CHARGEBACK/i.test(b.event || "") ? "refunded" : "other",
        amount: d.purchase?.price?.value ?? 0,
        currency: d.purchase?.price?.currency_value || "BRL",
        country: (d.buyer?.address?.country_iso || d.buyer?.address?.country || "").toUpperCase().slice(0, 2),
        state: (d.buyer?.address?.state || "").toUpperCase().slice(0, 2),
      };
    }
    return { /* generic */
      status: (b.status || "approved").toLowerCase(),
      amount: Number(b.amount || 0),
      currency: (b.currency || "BRL").toUpperCase(),
      country: (b.country || "").toUpperCase().slice(0, 2),
      state: (b.state || "").toUpperCase().slice(0, 2),
    };
  } catch { return { status: "other", amount: 0, currency: "?", country: "", state: "" }; }
}
app.post("/webhook/:platform/:lang", (req, res) => {
  if ((req.query.token || "") !== WEBHOOK_TOKEN) return res.status(401).json({ ok: false });
  const lang = LANGS.includes(req.params.lang) ? req.params.lang : "pt";
  const s = extractSale(req.params.platform, req.body || {});
  db.prepare("INSERT INTO sales(lang,platform,status,amount,currency,country,state,ts,raw) VALUES(?,?,?,?,?,?,?,?,?)")
    .run(lang, req.params.platform, s.status, s.amount, s.currency, s.country, s.state, now(),
         JSON.stringify(req.body || {}).slice(0, 8000));
  res.json({ ok: true });
});

/* ════════ ADMIN ════════ */
function authed(req) {
  const c = req.headers.cookie || "";
  const m = c.match(/adm=([a-f0-9]{64})/);
  return m && m[1] === tokenOf(ADMIN_PASSWORD);
}
const guard = (req, res, next) => authed(req) ? next() : res.status(401).json({ error: "auth" });

app.get("/admin", (_q, res) => res.sendFile(path.join(__dirname, "public", "admin.html")));
app.post("/api/login", (req, res) => {
  if ((req.body?.password || "") !== ADMIN_PASSWORD) return res.status(401).json({ ok: false });
  res.setHeader("Set-Cookie", `adm=${tokenOf(ADMIN_PASSWORD)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`);
  res.json({ ok: true });
});
app.get("/api/me", (req, res) => res.json({ ok: authed(req) }));

app.get("/api/admin/config/:lang", guard, (req, res) => res.json(getCfg(req.params.lang)));
app.put("/api/admin/config/:lang", guard, (req, res) => {
  if (!LANGS.includes(req.params.lang)) return res.status(404).json({ error: "lang" });
  if (!req.body?.steps || !req.body?.meta) return res.status(400).json({ error: "shape" });
  saveCfg(req.params.lang, req.body);
  res.json({ ok: true });
});

/* ── métricas por idioma ── */
function funnelFor(lang, since) {
  const cfg = getCfg(lang);
  const rows = db.prepare(
    `SELECT step_index i, COUNT(DISTINCT sid) v FROM events
     WHERE lang=? AND type='view' AND ts>=? GROUP BY step_index ORDER BY i`).all(lang, since);
  const byIdx = Object.fromEntries(rows.map(r => [r.i, r.v]));
  return cfg.steps.map((s, idx) => ({
    i: idx,
    label: stepName(s, idx),
    type: s.type,
    views: byIdx[idx] || 0,
  }));
}
function stepName(s, idx) {
  if (s.type === "q") return `P${idx + 1} · ${s.key}`;
  return `P${idx + 1} · ${{ intro: "Abertura", st: "Statement", loading: "Análise", diag: "Diagnóstico", vsl: "VSL", offer: "Oferta" }[s.type] || s.type}`;
}
app.get("/api/admin/metrics/:lang", guard, (req, res) => {
  const lang = req.params.lang;
  const days = Math.max(1, Math.min(365, parseInt(req.query.days || "30", 10)));
  const since = now() - days * 864e5;

  const funnel = funnelFor(lang, since);
  const starts = funnel[0]?.views || 0;
  const finish = funnel[funnel.length - 1]?.views || 0;
  const ctas = db.prepare(
    `SELECT COUNT(DISTINCT sid) v FROM events WHERE lang=? AND type='cta' AND step_label='checkout' AND ts>=?`
  ).get(lang, since).v;

  const sAgg = db.prepare(
    `SELECT COUNT(*) c, COALESCE(SUM(amount),0) s FROM sales WHERE lang=? AND status='approved' AND ts>=?`
  ).get(lang, since);
  const refunds = db.prepare(
    `SELECT COUNT(*) c FROM sales WHERE lang=? AND status='refunded' AND ts>=?`).get(lang, since).c;
  const byCountry = db.prepare(
    `SELECT country k, COUNT(*) c, COALESCE(SUM(amount),0) s FROM sales
     WHERE lang=? AND status='approved' AND ts>=? GROUP BY country ORDER BY c DESC LIMIT 30`).all(lang, since);
  const byState = db.prepare(
    `SELECT state k, COUNT(*) c, COALESCE(SUM(amount),0) s FROM sales
     WHERE lang=? AND status='approved' AND country='BR' AND ts>=? AND state!='' GROUP BY state ORDER BY c DESC`).all(lang, since);
  const byDay = db.prepare(
    `SELECT date(ts/1000,'unixepoch') d, COUNT(*) c, COALESCE(SUM(amount),0) s FROM sales
     WHERE lang=? AND status='approved' AND ts>=? GROUP BY d ORDER BY d`).all(lang, since);
  const viewsByDay = db.prepare(
    `SELECT date(ts/1000,'unixepoch') d, COUNT(DISTINCT sid) v FROM events
     WHERE lang=? AND type='view' AND step_index=0 AND ts>=? GROUP BY d ORDER BY d`).all(lang, since);
  const byHour = db.prepare(
    `SELECT strftime('%H', ts/1000, 'unixepoch') h, COUNT(*) c FROM sales
     WHERE lang=? AND status='approved' AND ts>=? GROUP BY h ORDER BY h`).all(lang, since);
  const byWeekday = db.prepare(
    `SELECT strftime('%w', ts/1000, 'unixepoch') w, COUNT(*) c FROM sales
     WHERE lang=? AND status='approved' AND ts>=? GROUP BY w ORDER BY w`).all(lang, since);

  res.json({
    days, starts, finish, checkoutClicks: ctas,
    sales: sAgg.c, revenue: sAgg.s, refunds,
    convQuiz: starts ? +(finish / starts * 100).toFixed(1) : 0,
    convCheckout: starts ? +(ctas / starts * 100).toFixed(1) : 0,
    convSale: starts ? +(sAgg.c / starts * 100).toFixed(2) : 0,
    funnel, byCountry, byState, byDay, viewsByDay, byHour, byWeekday,
  });
});

/* ── insights (motor de sugestões) ── */
app.get("/api/admin/insights/:lang", guard, (req, res) => {
  const lang = req.params.lang;
  const days = Math.max(1, Math.min(365, parseInt(req.query.days || "30", 10)));
  const since = now() - days * 864e5;
  const cfg = getCfg(lang);
  const f = funnelFor(lang, since).filter(s => s.views > 0 || s.i === 0);
  const out = [];

  if ((f[0]?.views || 0) < 30) {
    out.push({ sev: "info", where: "Geral", msg: `Amostra pequena (${f[0]?.views || 0} sessões em ${days} dias). As sugestões abaixo ganham confiança a partir de ~300 sessões.` });
  }
  /* quedas por etapa */
  const drops = [];
  for (let i = 1; i < f.length; i++) {
    const prev = f[i - 1].views, cur = f[i].views;
    if (prev > 0) drops.push({ i, from: f[i - 1], to: f[i], pct: (prev - cur) / prev });
  }
  const sorted = [...drops].map(d => d.pct).sort((a, b) => a - b);
  const median = sorted.length ? sorted[Math.floor(sorted.length / 2)] : 0;
  const SUG = {
    intro: ["Teste outra headline na abertura (curiosidade vs. dor).", "Reduza o texto acima do botão; CTA mais cedo na tela."],
    q: ["Encurte o título da pergunta (máx. ~2 linhas no celular).", "Reduza para 3 opções — opções demais geram fadiga.", "Adicione imagem de apoio (slot 1080×1350) se a etapa não tiver.", "Suavize a pergunta: nesta posição do funil, dor demais sem esperança expulsa.", "Teste mover esta pergunta para depois do primeiro statement."],
    st: ["Statement longo derruba ritmo: corte para 2 frases de impacto.", "Troque o CTA do statement por algo de curiosidade (ex.: 'O que é isso? →')."],
    loading: ["Reduza a duração da análise para ~4s.", "Confira se a tela de análise não trava em conexões lentas."],
    diag: ["Diagnóstico deve elogiar antes de apontar a falha — confira a 1ª barra alta.", "Encurte o texto do diagnóstico; o CTA precisa aparecer sem rolar muito no celular."],
    vsl: [`Reduza o delay do botão (hoje ${cfg.meta.vslDelay}s) — teste 60s.`, "Use o 'exibir elemento' nativo do player em vez do timer fixo.", "Acrescente uma linha de promessa específica acima do vídeo."],
    offer: ["Suba a garantia para perto do primeiro botão de preço.", "Confirme se os 3 depoimentos placeholder já foram trocados pelos reais.", "Teste âncora de preço maior e/ou order bump no checkout.", "Reduza a distância entre o diagnóstico e o primeiro preço (menos blocos)."],
  };
  for (const d of drops) {
    const flag = d.pct > Math.max(0.15, median * 1.8);
    if (flag) {
      const tips = SUG[d.to.type] || SUG.q;
      out.push({
        sev: d.pct > 0.35 ? "alta" : "media",
        where: `${d.from.label} → ${d.to.label}`,
        msg: `Queda de ${(d.pct * 100).toFixed(1)}% (${d.from.views} → ${d.to.views}). Mediana do funil: ${(median * 100).toFixed(1)}%.`,
        tips,
      });
    }
  }
  /* conversões finais */
  const ctas = db.prepare(`SELECT COUNT(DISTINCT sid) v FROM events WHERE lang=? AND type='cta' AND step_label='checkout' AND ts>=?`).get(lang, since).v;
  const sales = db.prepare(`SELECT COUNT(*) c FROM sales WHERE lang=? AND status='approved' AND ts>=?`).get(lang, since).c;
  if (ctas >= 30 && sales / ctas < 0.25)
    out.push({ sev: "alta", where: "Checkout", msg: `Só ${(sales / ctas * 100).toFixed(1)}% de quem clica em comprar conclui. Investigue: preço, métodos de pagamento, velocidade do checkout, order bump agressivo demais.`, tips: ["Ative Pix com desconto.", "Checkout transparente na mesma identidade visual.", "Reforce garantia ao lado do botão de pagar."] });
  const refunded = db.prepare(`SELECT COUNT(*) c FROM sales WHERE lang=? AND status='refunded' AND ts>=?`).get(lang, since).c;
  if (sales >= 20 && refunded / sales > 0.12)
    out.push({ sev: "alta", where: "Pós-venda", msg: `Reembolso em ${(refunded / sales * 100).toFixed(1)}%. Acima de 12% indica promessa além da entrega — alinhe copy da oferta com o conteúdo, melhore o onboarding na área de membros.` });
  if (!out.some(o => o.sev !== "info"))
    out.push({ sev: "ok", where: "Geral", msg: "Nenhum vazamento crítico detectado no período. Otimize com testes A/B de headline e delay da VSL." });
  res.json({ insights: out });
});

/* ── dash geral (todos os idiomas) ── */
app.get("/api/admin/global", guard, (req, res) => {
  const days = Math.max(1, Math.min(365, parseInt(req.query.days || "30", 10)));
  const since = now() - days * 864e5;
  const langs = LANGS.map(l => {
    const starts = db.prepare(`SELECT COUNT(DISTINCT sid) v FROM events WHERE lang=? AND type='view' AND step_index=0 AND ts>=?`).get(l, since).v;
    const s = db.prepare(`SELECT COUNT(*) c, COALESCE(SUM(amount),0) sum FROM sales WHERE lang=? AND status='approved' AND ts>=?`).get(l, since);
    return { lang: l, starts, sales: s.c, revenue: s.sum };
  });
  res.json({ days, langs,
    totals: langs.reduce((a, x) => ({ starts: a.starts + x.starts, sales: a.sales + x.sales, revenue: a.revenue + x.revenue }), { starts: 0, sales: 0, revenue: 0 }) });
});

app.listen(PORT, () => console.log(
  `\n✅ Quiz rodando:  http://localhost:${PORT}/q/pt | /q/es | /q/en` +
  `\n🔐 Admin:        http://localhost:${PORT}/admin  (senha: env ADMIN_PASSWORD, padrão admin123)` +
  `\n🪝 Webhooks:     POST /webhook/kiwify/pt?token=${WEBHOOK_TOKEN}  (também hotmart|generic, pt|es|en)\n`));
