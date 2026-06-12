# QUIZ — Código Invisível da Reconquista
Sistema completo: quiz multilíngue (PT/ES/EN) + área admin + métricas de funil + webhooks de venda.

## Requisitos
- Node.js **22.5 ou superior** (usa SQLite nativo do Node — zero banco externo)

## Rodar
```bash
npm install
ADMIN_PASSWORD=suasenha WEBHOOK_TOKEN=seutoken npm start
```
- Quiz: `http://localhost:3000/q/pt` · `/q/es` · `/q/en`
- Admin: `http://localhost:3000/admin`
- Os dados ficam em `data.db` (faça backup deste arquivo).

> Em produção, defina SEMPRE `ADMIN_PASSWORD` e `WEBHOOK_TOKEN` (os padrões são inseguros).

## Deploy
Qualquer VPS/host Node (Railway, Render, EasyPanel, VPS com PM2). Atrás de Cloudflare, o
sistema captura automaticamente o país do visitante (header `cf-ipcountry`) — recomendado.

## Área admin
Abas por idioma (🇧🇷 🇪🇸 🇺🇸) + 🌎 GERAL. Em cada idioma:
- **Editor** — todas as etapas: títulos, opções (uma por linha), statements, barras do
  diagnóstico (`Rótulo || 58`), posição do marcador de risco (%), textos por persona.
- **Oferta** — headline, as 3 imagens grandes em sequência, entregáveis, bônus (capas
  600×840), preço/âncora, garantia, depoimentos, FAQ.
- **Configurações** — link do checkout (UTMs do quiz são repassadas automaticamente),
  embed da VSL (Vturb/Panda/YouTube), delay do botão, header genérico e nome do produto
  (revelado apenas via `{PRODUTO}` no diagnóstico e na oferta).
- **Métricas** — sessões, funil etapa a etapa (absoluto + retenção + queda %), sessões/dia,
  vendas e faturamento/dia, vendas por país e por estado (BR), tabela completa.
- **Insights** — motor de sugestões: sinaliza etapas com queda acima de 15% ou 1,8× a
  mediana, com recomendações específicas por tipo de etapa (pergunta, statement, VSL,
  oferta), alerta de conversão baixa no checkout e de taxa de reembolso alta.

## Webhooks (cole na plataforma de pagamento)
```
Kiwify : POST https://SEUDOMINIO/webhook/kiwify/pt?token=SEU_TOKEN
Hotmart: POST https://SEUDOMINIO/webhook/hotmart/pt?token=SEU_TOKEN
Genérico: POST https://SEUDOMINIO/webhook/generic/pt?token=SEU_TOKEN
          body JSON: { status, amount, currency, country, state }
```
Troque `/pt` por `/es` ou `/en` conforme o idioma do funil. Upsell/downsell (OB/OTO):
crie produtos separados na plataforma apontando para o mesmo webhook — entram no
faturamento do idioma. Estado (UF) das vendas BR vem no payload da plataforma.

## Imagens
Cada slot mostra a dimensão recomendada e o prompt de geração:
- Perguntas/abertura: **1080×1350 (4:5)** · Statement do mecanismo: **1080×1080**
- Capas de bônus: **600×840** · Imagens grandes da oferta: **1080×1350**
Cole a URL da imagem hospedada no campo correspondente do Editor/Oferta.

## ⚠ Antes de publicar
1. Substituir os 3 depoimentos placeholder por **depoimentos reais com autorização**
   (a tarja vermelha some quando você apagar o texto do campo "tarja" na aba Oferta).
2. Colar o link real do checkout e o embed da VSL.
3. Trocar `ADMIN_PASSWORD` e `WEBHOOK_TOKEN`.
