/* SEED — quiz em 3 idiomas. Tudo isto é editável depois pela área admin. */

const IMG = (hint) => ({ url: "", hint });

const STR = {
pt: {
  brandHeader: "Análise Estratégica de Relacionamento",
  productName: "Código Invisível da Reconquista",
  intro: {
    h: "Poucos homens<br>chegam até aqui.",
    p1: "Descubra em <b>2 minutos</b> se ainda existe <b class='red'>influência emocional</b> suficiente para reativar a admiração dela — pelos <b>gatilhos certos, na ordem certa</b>.",
    p2: "O teste analisa o estado atual da sua relação e revela <b>quanto de influência você ainda tem sobre as emoções dela</b> — e o que fazer com isso.",
    cta: "COMEÇAR O TESTE", warn: "⚠ Análise individual. Responda com sinceridade.",
    img: "1080×1350 (4:5) — arte de abertura SEM o nome do produto: estátua + mão descendo, binário vermelho"
  },
  qs: [
    {k:"tempo", t:"Há quanto tempo vocês estão juntos <b>(ou estiveram)</b>?", o:["Menos de 1 ano","Entre 1 e 3 anos","Entre 3 e 7 anos","Mais de 7 anos — <b>construímos uma vida juntos</b>"]},
    {k:"situacao", t:"Qual dessas frases descreve <b>sua situação hoje</b>?", img:"1080×1350 — estátua olhando porta entreaberta com luz vermelha", o:["Ela terminou comigo recentemente","Terminamos há meses… e eu ainda não consegui seguir em frente","Ela pediu “um tempo” e está distante","Ainda estamos juntos, mas sinto que estou perdendo ela"]},
    {k:"frase", t:"Quando ela se afastou, qual dessas frases <b>ela disse</b> (ou deixou claro)?", o:["“Perdi a admiração por você” / “Você se acomodou”","“Eu te amo, mas não estou mais apaixonada”","“Preciso me encontrar / viver coisas novas”","“Cansei de tentar”"]},
    {k:"depois", t:"E o que <b>você</b> fez depois disso?", s:"(responda com sinceridade — ninguém está vendo)", img:"1080×1350 — estátua segurando celular, três rostos: raiva, tristeza, máscara", o:["Mandei mensagens demais, tentei conversar a todo custo","Implorei, prometi mudar, abri meu coração","Fingi indiferença — mas por dentro estou destruído","Dei espaço… mas não sei até quando aguento"]},
    {k:"reacao", t:"Como ela reage a você <b>hoje</b>?", o:["Me ignora ou responde seco e frio","Me bloqueou (ou some e reaparece)","Responde normal, mas me trata como “amigo”","Ainda visualiza meus stories… mas não puxa conversa"]},
    {k:"dor", t:"O que <b>mais dói</b> quando você pensa nela?", img:"1080×1350 — estátua rachada ao meio: metade cinza apagada, metade com brasas", o:["Imaginar ela com outro homem","A indiferença — parece que eu nunca existi","Lembrar de como ela já foi apaixonada por mim","Sentir que joguei fora a mulher da minha vida"]},
    {k:"rer", t:"Você sabia que insistência, cobrança e carência ativam nas mulheres a <b class='red'>Resposta Emocional Reversa</b> — que faz a atração <em>diminuir</em> a cada tentativa sua?", o:["Não sabia… e acho que fiz exatamente isso","Já percebi isso acontecendo na prática","Não sabia, mas explica muita coisa"]},
    {k:"admiracao", t:"Quando foi a última vez que você sentiu que ela <b>te admirava como homem</b>?", img:"1080×1350 — estátua com esferas de memória flutuando, uma acesa em âmbar", o:["Faz muito tempo","Não lembro exatamente","Ainda acontece, mas é raro","Sinto que nunca senti isso de verdade"]},
    {k:"lider", t:"Sendo honesto: no fundo, você sente que ela <b>deixou de te ver como o homem da relação</b>?", img:"1080×1350 — coroa de pedra caindo da cabeça de uma estátua", o:["Sim, claramente","Às vezes","Não quero admitir, mas é possível"]},
    {k:"sinais", t:"Olhando para trás, você percebeu os <b>sinais</b> antes do afastamento?", o:["Percebi, mas não sabia o que fazer","Não — pra mim foi do nada","Percebi e tentei consertar… do jeito errado"]},
    {k:"futuro", t:"Se <b>nada mudar</b>, como você imagina a situação daqui a <b>4 meses</b>?", img:"1080×1350 — estátua vendo silhueta feminina atravessar porta vermelha", o:["Ela seguindo em frente… com outro","Eu ainda preso nela, vendo a vida passar","Pior do que está hoje"]},
    {k:"valor", t:"Quanto vale pra você <b>virar esse jogo</b> — e fazer ela voltar a te olhar com os mesmos olhos do início?", img:"1080×1350 — balança: diamante incandescente vs. moedas", o:["<b>Tudo.</b> (isso não tem preço)","Muito — desde que exista um caminho real","Não sei se ainda vale o esforço"]},
    {k:"mc1", t:"Se existisse um <b>protocolo passo a passo</b> — desenhado para situações como a sua — pra reativar a admiração e a atração dela, você aplicaria?", o:["Sim, imediatamente","Sim, se for prático e claro","Preciso entender como funciona primeiro"]},
    {k:"mc2", t:"Algumas etapas do protocolo são <b class='red'>contraintuitivas</b> — vão contra tudo o que seu instinto manda fazer agora. Você seguiria mesmo assim?", img:"1080×1350 — estátua com correntes se rompendo em brasas", o:["Sim, estou pronto","Sim, com cautela","Talvez"]},
    {k:"id", t:"Você quer ser o homem que <b>dita o ritmo</b> — e que é <b class='red'>respeitado e desejado</b> de novo?", s:"(3 perguntas finais)", o:["Sim, agora","Sim, mas não sei como","Não tenho certeza"]},
    {k:"final", t:"Pra reconquistar <b>respeito, admiração e desejo</b>, o que você faria?", s:"(última pergunta)", img:"1080×1350 — homem de pedra subindo escadaria na névoa, chama na mão", o:["Qualquer coisa necessária","Seguiria um plano passo a passo","Provavelmente desistiria"]},
  ],
  st1: { html:"A atração que uma mulher já sentiu <b class='red'>não morre</b>.<span class='sep'></span>Ela fica <b>adormecida</b> — arquivada junto com as memórias emocionais que vocês criaram.<span class='sep'></span>O problema é que <b>tudo o que você fez até agora</b> provavelmente ativou o mecanismo <b class='red'>contrário</b>.", cta:"CONTINUAR ANÁLISE →" },
  st2: { html:"Existe um conjunto de <b>gatilhos psicológicos</b> — postura, escassez, memória emocional, imprevisibilidade — que, ativados <b class='red'>na sequência certa</b>, fazem uma mulher voltar a sentir o que sentia no início.<span class='sep'></span>A maioria dos homens nunca descobre essa sequência.<span class='sep'></span>Poucos têm acesso a ela.", cta:"QUERO ENTENDER →", img:"1080×1080 — sinapses vermelhas formando um cadeado se abrindo" },
  loading: { h:"Estamos analisando<br>suas respostas…", msgs:["Mapeando o estágio atual da relação…","Calculando seu Índice de Influência Emocional…","Identificando os gatilhos inativos…","Liberando seu diagnóstico…"], wait:"Aguarde…" },
  diag: {
    h:"Análise psicológica<br>do <span class='red'>seu perfil</span> na relação",
    bars:[{label:"Postura e Confiança",value:58},{label:"Controle Emocional",value:24},{label:"Domínio dos Gatilhos de Admiração",value:6}],
    riskLabel:"Influência na relação", riskTag:"EM RISCO", riskMarker:14, scale:["Baixa","Média","Alta"], here:"VOCÊ ESTÁ AQUI",
    p1:"Sua influência emocional sobre ela está em nível <b class='red'>baixo</b> — e caindo. Suas respostas indicam que você entregou o controle da dinâmica: demonstrou carência nos momentos errados, perdeu o fator imprevisibilidade e deixou os <b>gatilhos de admiração</b> completamente inativos.",
    p2:"A boa notícia: seu perfil mostra que a <b>base ainda existe</b> — história, memória emocional e atenção residual dela. Com a sequência certa de ações, esse jogo <b class='red'>pode ser virado</b>. Essa sequência tem nome: <b class='red'>{PRODUTO}</b>.",
    personas:{
      P1:"Anos de história significam um arquivo profundo de <b>memória emocional</b> — o ativo mais poderoso de todo o protocolo. Quase nenhum homem sabe usá-lo. Você está prestes a aprender.",
      P2:"Admiração não é um sentimento que morre — é um <b>interruptor</b> que desliga quando a percepção dela sobre você muda. E percepção se reconstrói com comportamento, não com palavras.",
      P3:"A atração intensa que ela já sentiu por você é o <b>melhor cenário possível</b> para a reativação. O caminho emocional já existe — ele só está adormecido.",
      P4:"Cada mensagem em excesso ativou a <b>Resposta Emocional Reversa</b>. O primeiro passo do protocolo desfaz exatamente esse dano — e é mais rápido do que você imagina."
    },
    cta:"QUERO VIRAR ESSE JOGO"
  },
  vsl: { h:"Antes de acessar o protocolo,<br>assista a isto.", p:"Em <b>2 minutos</b>, você vai entender por que tudo o que você tentou até hoje <b class='red'>falhou</b> — e o que os homens que reconquistaram fizeram de diferente.", wait:"O botão de acesso será liberado ao final do vídeo…", cta:"LIBERAR MEU ACESSO" },
  offer: {
    eyebrow:"ACESSO LIBERADO",
    h:"Ela vai voltar a te olhar como olhava <span class='red'>no início</span> — quando você ativar o {PRODUTO}.",
    imgs:[ IMG("1080×1350 — mockup oficial do produto em dispositivos (mockup_completo2_1.png)"), IMG("1080×1350 — arte 'conteúdo do protocolo' no estilo das capas (binário vermelho + P&B)"), IMG("1080×1350 — arte 'controle emocional / reencontro' fechando a narrativa visual") ],
    deliverTitle:"O QUE VOCÊ RECEBE HOJE",
    deliver:[
      "<b>O protocolo completo</b> — as 5 etapas, do distanciamento calculado ao reencontro",
      "<b>Módulo prático passo a passo</b> — o que fazer (e o que nunca fazer) em cada fase",
      "<b>Protocolo Anti-R.E.R.</b> — como desfazer o dano da insistência",
      "<b>Mapa da Memória Emocional</b> — os gatilhos que reativam o que ela sentia no início",
      "<b>Guia do Reencontro</b> — ambiente, postura e condução do encontro decisivo",
      "Acesso imediato e vitalício, direto no celular"
    ],
    bonusTitle:"+ 3 BÔNUS EXCLUSIVOS HOJE",
    bonus:[
      {title:"7 Hábitos Diários de um Casal Feliz", img:IMG("600×840 (3:4.2) — capa real do bônus 1")},
      {title:"Amor & Sexo — O Ponto de Equilíbrio", img:IMG("600×840 — capa real do bônus 2")},
      {title:"Vivendo o Relacionamento dos Sonhos", img:IMG("600×840 — capa real do bônus 3")}
    ],
    priceEyebrow:"ACESSO LIMITADO AO PROTOCOLO", priceAnchor:"de R$ 197 por", price:"R$ 37,90",
    priceNote:"Pagamento único. Acesso imediato após a confirmação. No checkout, o valor é exibido na sua moeda local antes de finalizar.",
    cta:"QUERO O CÓDIGO AGORA",
    guarantee:"<b>Garantia incondicional de 7 dias.</b> Entre, aplique a primeira etapa do protocolo e sinta a mudança na dinâmica. Se não for pra você, devolvemos cada centavo — sem perguntas. O risco é todo nosso.",
    testiTitle:"QUEM APLICOU, CONTA",
    testimonials:[
      {name:"[Nome do aluno]", meta:"[idade], [profissão]", text:"[EXEMPLO DE ESTRUTURA — situação antes → o que aplicou → mudança específica na atitude dela → estado atual. 3–5 linhas, tom de conversa.]"},
      {name:"[Nome do aluno]", meta:"[idade], [profissão]", text:"[EXEMPLO — começar com ceticismo (“achei que era papo furado…”) e terminar com resultado concreto. Objeção vencida converte mais.]"},
      {name:"[Nome do aluno]", meta:"[idade], [profissão]", text:"[EXEMPLO — print de WhatsApp real (com autorização) convertido em texto + imagem.]"}
    ],
    testiBanner:"SUBSTITUIR POR DEPOIMENTO REAL",
    faqTitle:"PERGUNTAS FREQUENTES",
    faq:[
      {q:"Como recebo o acesso?", a:"Imediatamente após a confirmação do pagamento, você recebe um e-mail com o link da área de membros. Cartão libera na hora; boleto/Pix pode levar até a compensação."},
      {q:"Funciona para o meu caso?", a:"O protocolo cobre os cenários mais comuns: término recente, afastamento gradual, relações longas e situações de bloqueio. O diagnóstico que você fez direciona por onde começar."},
      {q:"Em quanto tempo vejo mudança?", a:"Depende do estágio da relação e da sua aplicação. As primeiras etapas interrompem o padrão que afasta — isso começa no dia 1."},
      {q:"E se não for pra mim?", a:"Você tem 7 dias de garantia incondicional. Pediu, devolvemos."},
      {q:"Quais as formas de pagamento?", a:"Cartão de crédito, Pix e boleto, em ambiente seguro."}
    ],
    footer:"Acesso imediato · Garantia de 7 dias · Pagamento seguro"
  }
},

es: {
  brandHeader: "Análisis Estratégico de Relación",
  productName: "Código Invisible de la Reconquista",
  intro: {
    h:"Pocos hombres<br>llegan hasta aquí.",
    p1:"Descubre en <b>2 minutos</b> si todavía existe <b class='red'>influencia emocional</b> suficiente para reactivar su admiración — con los <b>gatillos correctos, en el orden correcto</b>.",
    p2:"El test analiza el estado actual de tu relación y revela <b>cuánta influencia aún tienes sobre sus emociones</b> — y qué hacer con eso.",
    cta:"COMENZAR EL TEST", warn:"⚠ Análisis individual. Responde con sinceridad.",
    img:"1080×1350 (4:5) — arte de apertura SIN el nombre del producto"
  },
  qs: [
    {k:"tempo", t:"¿Cuánto tiempo llevan juntos <b>(o estuvieron)</b>?", o:["Menos de 1 año","Entre 1 y 3 años","Entre 3 y 7 años","Más de 7 años — <b>construimos una vida juntos</b>"]},
    {k:"situacao", t:"¿Cuál de estas frases describe <b>tu situación hoy</b>?", img:"1080×1350 — estatua mirando una puerta entreabierta con luz roja", o:["Ella terminó conmigo recientemente","Terminamos hace meses… y aún no logro seguir adelante","Ella pidió “un tiempo” y está distante","Seguimos juntos, pero siento que la estoy perdiendo"]},
    {k:"frase", t:"Cuando ella se alejó, ¿cuál de estas frases <b>dijo</b> (o dejó claro)?", o:["“Perdí la admiración por ti” / “Te acomodaste”","“Te amo, pero ya no estoy enamorada”","“Necesito encontrarme / vivir cosas nuevas”","“Me cansé de intentar”"]},
    {k:"depois", t:"¿Y qué hiciste <b>tú</b> después de eso?", s:"(responde con sinceridad — nadie está mirando)", img:"1080×1350 — estatua con celular, tres rostros: rabia, tristeza, máscara", o:["Mandé demasiados mensajes, intenté hablar a toda costa","Rogué, prometí cambiar, abrí mi corazón","Fingí indiferencia — pero por dentro estoy destruido","Le di espacio… pero no sé hasta cuándo aguanto"]},
    {k:"reacao", t:"¿Cómo reacciona ella contigo <b>hoy</b>?", o:["Me ignora o responde seco y frío","Me bloqueó (o desaparece y reaparece)","Responde normal, pero me trata como “amigo”","Todavía ve mis historias… pero no inicia conversación"]},
    {k:"dor", t:"¿Qué es lo que <b>más duele</b> cuando piensas en ella?", img:"1080×1350 — estatua partida al medio: gris apagado vs. brasas", o:["Imaginarla con otro hombre","La indiferencia — como si yo nunca hubiera existido","Recordar cuando ella estaba enamorada de mí","Sentir que dejé ir a la mujer de mi vida"]},
    {k:"rer", t:"¿Sabías que la insistencia, los reclamos y la necesidad activan en las mujeres la <b class='red'>Respuesta Emocional Inversa</b> — que hace que la atracción <em>disminuya</em> con cada intento tuyo?", o:["No lo sabía… y creo que hice exactamente eso","Ya lo noté en la práctica","No lo sabía, pero explica muchas cosas"]},
    {k:"admiracao", t:"¿Cuándo fue la última vez que sentiste que ella <b>te admiraba como hombre</b>?", img:"1080×1350 — estatua con esferas de memoria flotando", o:["Hace mucho tiempo","No lo recuerdo exactamente","Todavía pasa, pero rara vez","Siento que nunca lo sentí de verdad"]},
    {k:"lider", t:"Siendo honesto: en el fondo, ¿sientes que ella <b>dejó de verte como el hombre de la relación</b>?", img:"1080×1350 — corona de piedra cayendo", o:["Sí, claramente","A veces","No quiero admitirlo, pero es posible"]},
    {k:"sinais", t:"Mirando atrás, ¿percibiste las <b>señales</b> antes del alejamiento?", o:["Las percibí, pero no sabía qué hacer","No — para mí fue de la nada","Las percibí e intenté arreglarlo… de la forma equivocada"]},
    {k:"futuro", t:"Si <b>nada cambia</b>, ¿cómo imaginas la situación dentro de <b>4 meses</b>?", img:"1080×1350 — silueta femenina cruzando puerta roja", o:["Ella siguiendo adelante… con otro","Yo todavía atrapado en ella, viendo pasar la vida","Peor de lo que está hoy"]},
    {k:"valor", t:"¿Cuánto vale para ti <b>darle la vuelta al juego</b> — y que ella vuelva a mirarte con los ojos del inicio?", img:"1080×1350 — balanza: diamante incandescente vs. monedas", o:["<b>Todo.</b> (eso no tiene precio)","Mucho — siempre que exista un camino real","No sé si todavía vale el esfuerzo"]},
    {k:"mc1", t:"Si existiera un <b>protocolo paso a paso</b> — diseñado para situaciones como la tuya — para reactivar su admiración y atracción, ¿lo aplicarías?", o:["Sí, de inmediato","Sí, si es práctico y claro","Necesito entender cómo funciona primero"]},
    {k:"mc2", t:"Algunas etapas del protocolo son <b class='red'>contraintuitivas</b> — van contra todo lo que tu instinto te pide hacer ahora. ¿Las seguirías igual?", img:"1080×1350 — estatua con cadenas rompiéndose en brasas", o:["Sí, estoy listo","Sí, con cautela","Tal vez"]},
    {k:"id", t:"¿Quieres ser el hombre que <b>marca el ritmo</b> — y que es <b class='red'>respetado y deseado</b> de nuevo?", s:"(3 preguntas finales)", o:["Sí, ahora","Sí, pero no sé cómo","No estoy seguro"]},
    {k:"final", t:"Para reconquistar <b>respeto, admiración y deseo</b>, ¿qué harías?", s:"(última pregunta)", img:"1080×1350 — hombre de piedra subiendo escalera en la niebla", o:["Cualquier cosa necesaria","Seguiría un plan paso a paso","Probablemente me rendiría"]},
  ],
  st1:{ html:"La atracción que una mujer ya sintió <b class='red'>no muere</b>.<span class='sep'></span>Queda <b>dormida</b> — archivada junto a las memorias emocionales que crearon juntos.<span class='sep'></span>El problema es que <b>todo lo que hiciste hasta ahora</b> probablemente activó el mecanismo <b class='red'>contrario</b>.", cta:"CONTINUAR ANÁLISIS →" },
  st2:{ html:"Existe un conjunto de <b>gatillos psicológicos</b> — postura, escasez, memoria emocional, imprevisibilidad — que, activados <b class='red'>en la secuencia correcta</b>, hacen que una mujer vuelva a sentir lo que sentía al inicio.<span class='sep'></span>La mayoría de los hombres nunca descubre esa secuencia.<span class='sep'></span>Pocos tienen acceso a ella.", cta:"QUIERO ENTENDER →", img:"1080×1080 — sinapsis rojas formando un candado abriéndose" },
  loading:{ h:"Estamos analizando<br>tus respuestas…", msgs:["Mapeando la etapa actual de la relación…","Calculando tu Índice de Influencia Emocional…","Identificando los gatillos inactivos…","Liberando tu diagnóstico…"], wait:"Espera…" },
  diag:{
    h:"Análisis psicológico de <span class='red'>tu perfil</span> en la relación",
    bars:[{label:"Postura y Confianza",value:58},{label:"Control Emocional",value:24},{label:"Dominio de los Gatillos de Admiración",value:6}],
    riskLabel:"Influencia en la relación", riskTag:"EN RIESGO", riskMarker:14, scale:["Baja","Media","Alta"], here:"ESTÁS AQUÍ",
    p1:"Tu influencia emocional sobre ella está en nivel <b class='red'>bajo</b> — y cayendo. Tus respuestas indican que entregaste el control de la dinámica: mostraste necesidad en los momentos equivocados, perdiste el factor imprevisibilidad y dejaste los <b>gatillos de admiración</b> completamente inactivos.",
    p2:"La buena noticia: tu perfil muestra que la <b>base todavía existe</b> — historia, memoria emocional y atención residual de ella. Con la secuencia correcta de acciones, este juego <b class='red'>puede revertirse</b>. Esa secuencia tiene nombre: <b class='red'>{PRODUTO}</b>.",
    personas:{
      P1:"Años de historia significan un archivo profundo de <b>memoria emocional</b> — el activo más poderoso de todo el protocolo. Casi ningún hombre sabe usarlo. Estás a punto de aprender.",
      P2:"La admiración no es un sentimiento que muere — es un <b>interruptor</b> que se apaga cuando su percepción sobre ti cambia. Y la percepción se reconstruye con comportamiento, no con palabras.",
      P3:"La atracción intensa que ella ya sintió por ti es el <b>mejor escenario posible</b> para la reactivación. El camino emocional ya existe — solo está dormido.",
      P4:"Cada mensaje de más activó la <b>Respuesta Emocional Inversa</b>. El primer paso del protocolo deshace exactamente ese daño — y es más rápido de lo que imaginas."
    },
    cta:"QUIERO DARLE LA VUELTA"
  },
  vsl:{ h:"Antes de acceder al protocolo,<br>mira esto.", p:"En <b>2 minutos</b> vas a entender por qué todo lo que intentaste hasta hoy <b class='red'>falló</b> — y qué hicieron diferente los hombres que reconquistaron.", wait:"El botón de acceso se liberará al final del video…", cta:"LIBERAR MI ACCESO" },
  offer:{
    eyebrow:"ACCESO LIBERADO",
    h:"Ella volverá a mirarte como te miraba <span class='red'>al inicio</span> — cuando actives el {PRODUTO}.",
    imgs:[ IMG("1080×1350 — mockup oficial del producto"), IMG("1080×1350 — arte 'contenido del protocolo'"), IMG("1080×1350 — arte 'control emocional / reencuentro'") ],
    deliverTitle:"LO QUE RECIBES HOY",
    deliver:["<b>El protocolo completo</b> — las 5 etapas, del distanciamiento calculado al reencuentro","<b>Módulo práctico paso a paso</b> — qué hacer (y qué nunca hacer) en cada fase","<b>Protocolo Anti-R.E.I.</b> — cómo deshacer el daño de la insistencia","<b>Mapa de la Memoria Emocional</b> — los gatillos que reactivan lo que ella sentía","<b>Guía del Reencuentro</b> — ambiente, postura y conducción del encuentro decisivo","Acceso inmediato y vitalicio, directo en tu celular"],
    bonusTitle:"+ 3 BONOS EXCLUSIVOS HOY",
    bonus:[
      {title:"7 Hábitos Diarios de una Pareja Feliz", img:IMG("600×840 — portada real del bono 1")},
      {title:"Amor & Sexo — El Punto de Equilibrio", img:IMG("600×840 — portada real del bono 2")},
      {title:"Viviendo la Relación de tus Sueños", img:IMG("600×840 — portada real del bono 3")}
    ],
    priceEyebrow:"ACCESO LIMITADO AL PROTOCOLO", priceAnchor:"de US$ 39 por", price:"US$ 9,90",
    priceNote:"Pago único. Acceso inmediato tras la confirmación. En el checkout, el valor se muestra en tu moneda local antes de finalizar.",
    cta:"QUIERO EL CÓDIGO AHORA",
    guarantee:"<b>Garantía incondicional de 7 días.</b> Entra, aplica la primera etapa del protocolo y siente el cambio en la dinámica. Si no es para ti, devolvemos cada centavo — sin preguntas.",
    testiTitle:"QUIENES LO APLICARON, CUENTAN",
    testimonials:[
      {name:"[Nombre del alumno]", meta:"[edad], [profesión]", text:"[EJEMPLO DE ESTRUCTURA — situación antes → qué aplicó → cambio específico en la actitud de ella → estado actual.]"},
      {name:"[Nombre del alumno]", meta:"[edad], [profesión]", text:"[EJEMPLO — empezar con escepticismo y terminar con resultado concreto.]"},
      {name:"[Nombre del alumno]", meta:"[edad], [profesión]", text:"[EJEMPLO — captura real de WhatsApp (con autorización).]"}
    ],
    testiBanner:"SUSTITUIR POR TESTIMONIO REAL",
    faqTitle:"PREGUNTAS FRECUENTES",
    faq:[
      {q:"¿Cómo recibo el acceso?", a:"Inmediatamente tras la confirmación del pago recibes un e-mail con el enlace del área de miembros."},
      {q:"¿Funciona para mi caso?", a:"El protocolo cubre los escenarios más comunes: ruptura reciente, alejamiento gradual, relaciones largas y bloqueo."},
      {q:"¿En cuánto tiempo veo cambios?", a:"Depende de la etapa de la relación y de tu aplicación. Las primeras etapas interrumpen el patrón que aleja — eso empieza el día 1."},
      {q:"¿Y si no es para mí?", a:"Tienes 7 días de garantía incondicional."},
      {q:"¿Formas de pago?", a:"Tarjeta de crédito y los métodos locales disponibles en el checkout."}
    ],
    footer:"Acceso inmediato · Garantía de 7 días · Pago seguro"
  }
},

en: {
  brandHeader: "Strategic Relationship Analysis",
  productName: "Invisible Code of Reconquest",
  intro: {
    h:"Few men<br>make it this far.",
    p1:"Find out in <b>2 minutes</b> whether there's still enough <b class='red'>emotional influence</b> left to reignite her admiration — using the <b>right triggers, in the right order</b>.",
    p2:"This test analyzes the current state of your relationship and reveals <b>how much influence you still hold over her emotions</b> — and what to do with it.",
    cta:"START THE TEST", warn:"⚠ Individual analysis. Answer honestly.",
    img:"1080×1350 (4:5) — opening art WITHOUT the product name"
  },
  qs: [
    {k:"tempo", t:"How long have you been together <b>(or were you)</b>?", o:["Less than 1 year","1 to 3 years","3 to 7 years","Over 7 years — <b>we built a life together</b>"]},
    {k:"situacao", t:"Which of these describes <b>your situation today</b>?", img:"1080×1350 — statue facing a half-open door with red light", o:["She broke up with me recently","We broke up months ago… and I still can't move on","She asked for “a break” and feels distant","We're still together, but I feel I'm losing her"]},
    {k:"frase", t:"When she pulled away, which of these did <b>she say</b> (or make clear)?", o:["“I lost my admiration for you” / “You got too comfortable”","“I love you, but I'm not in love anymore”","“I need to find myself / live new things”","“I'm tired of trying”"]},
    {k:"depois", t:"And what did <b>you</b> do after that?", s:"(answer honestly — no one is watching)", img:"1080×1350 — statue holding a phone, three faces: anger, sadness, mask", o:["Texted too much, tried to talk at all costs","Begged, promised to change, poured my heart out","Faked indifference — but inside I'm destroyed","Gave her space… but I don't know how long I can hold"]},
    {k:"reacao", t:"How does she react to you <b>today</b>?", o:["Ignores me or replies cold and dry","Blocked me (or disappears and reappears)","Replies normally, but treats me like a “friend”","Still watches my stories… but never starts a conversation"]},
    {k:"dor", t:"What <b>hurts the most</b> when you think about her?", img:"1080×1350 — statue cracked in half: faded gray vs. glowing embers", o:["Imagining her with another man","The indifference — like I never existed","Remembering when she was in love with me","Feeling I threw away the woman of my life"]},
    {k:"rer", t:"Did you know that insistence, pressure and neediness trigger in women the <b class='red'>Reverse Emotional Response</b> — making attraction <em>drop</em> with every attempt you make?", o:["I didn't know… and I think I did exactly that","I've already noticed it happening","I didn't know, but it explains a lot"]},
    {k:"admiracao", t:"When was the last time you felt she <b>admired you as a man</b>?", img:"1080×1350 — statue with floating memory spheres, one glowing amber", o:["A long time ago","I don't remember exactly","It still happens, but rarely","I feel I never truly felt it"]},
    {k:"lider", t:"Be honest: deep down, do you feel she <b>stopped seeing you as the man in the relationship</b>?", img:"1080×1350 — stone crown falling from a statue's head", o:["Yes, clearly","Sometimes","I don't want to admit it, but it's possible"]},
    {k:"sinais", t:"Looking back, did you notice the <b>signs</b> before she pulled away?", o:["I noticed, but didn't know what to do","No — for me it came out of nowhere","I noticed and tried to fix it… the wrong way"]},
    {k:"futuro", t:"If <b>nothing changes</b>, how do you picture things <b>4 months</b> from now?", img:"1080×1350 — female silhouette crossing a red-lit door", o:["Her moving on… with someone else","Me still stuck on her, watching life pass by","Worse than it is today"]},
    {k:"valor", t:"How much is it worth to you to <b>turn this game around</b> — and have her look at you the way she did at the start?", img:"1080×1350 — scale: glowing diamond vs. coins", o:["<b>Everything.</b> (that's priceless)","A lot — as long as there's a real path","I'm not sure it's worth the effort anymore"]},
    {k:"mc1", t:"If there were a <b>step-by-step protocol</b> — built for situations like yours — to reignite her admiration and attraction, would you apply it?", o:["Yes, immediately","Yes, if it's practical and clear","I need to understand how it works first"]},
    {k:"mc2", t:"Some steps of the protocol are <b class='red'>counterintuitive</b> — they go against everything your instinct tells you to do right now. Would you follow them anyway?", img:"1080×1350 — statue with chains breaking into embers", o:["Yes, I'm ready","Yes, with caution","Maybe"]},
    {k:"id", t:"Do you want to be the man who <b>sets the pace</b> — and is <b class='red'>respected and desired</b> again?", s:"(3 final questions)", o:["Yes, now","Yes, but I don't know how","I'm not sure"]},
    {k:"final", t:"To win back <b>respect, admiration and desire</b>, what would you do?", s:"(last question)", img:"1080×1350 — stone man climbing stairs in the mist, flame in hand", o:["Whatever it takes","Follow a step-by-step plan","Probably give up"]},
  ],
  st1:{ html:"The attraction a woman once felt <b class='red'>doesn't die</b>.<span class='sep'></span>It goes <b>dormant</b> — archived along with the emotional memories you built together.<span class='sep'></span>The problem: <b>everything you've done so far</b> has probably activated the <b class='red'>opposite</b> mechanism.", cta:"CONTINUE ANALYSIS →" },
  st2:{ html:"There is a set of <b>psychological triggers</b> — posture, scarcity, emotional memory, unpredictability — that, fired <b class='red'>in the right sequence</b>, make a woman feel again what she felt at the beginning.<span class='sep'></span>Most men never discover that sequence.<span class='sep'></span>Few ever get access to it.", cta:"I WANT TO UNDERSTAND →", img:"1080×1080 — red synapses forming an opening padlock" },
  loading:{ h:"Analyzing<br>your answers…", msgs:["Mapping the current stage of the relationship…","Calculating your Emotional Influence Index…","Identifying inactive triggers…","Unlocking your diagnosis…"], wait:"Please wait…" },
  diag:{
    h:"Psychological analysis of <span class='red'>your profile</span> in the relationship",
    bars:[{label:"Posture & Confidence",value:58},{label:"Emotional Control",value:24},{label:"Mastery of Admiration Triggers",value:6}],
    riskLabel:"Influence in the relationship", riskTag:"AT RISK", riskMarker:14, scale:["Low","Medium","High"], here:"YOU ARE HERE",
    p1:"Your emotional influence over her is at a <b class='red'>low</b> level — and dropping. Your answers show you handed over control of the dynamic: showed neediness at the wrong moments, lost the unpredictability factor and left the <b>admiration triggers</b> completely inactive.",
    p2:"The good news: your profile shows the <b>foundation still exists</b> — history, emotional memory and her residual attention. With the right sequence of actions, this game <b class='red'>can be turned around</b>. That sequence has a name: <b class='red'>{PRODUTO}</b>.",
    personas:{
      P1:"Years of history mean a deep archive of <b>emotional memory</b> — the most powerful asset in the entire protocol. Almost no man knows how to use it. You're about to learn.",
      P2:"Admiration isn't a feeling that dies — it's a <b>switch</b> that turns off when her perception of you changes. And perception is rebuilt with behavior, not words.",
      P3:"The intense attraction she once felt for you is the <b>best possible scenario</b> for reactivation. The emotional pathway already exists — it's just dormant.",
      P4:"Every extra message fired the <b>Reverse Emotional Response</b>. The first step of the protocol undoes exactly that damage — faster than you'd expect."
    },
    cta:"I WANT TO TURN THIS AROUND"
  },
  vsl:{ h:"Before accessing the protocol,<br>watch this.", p:"In <b>2 minutes</b>, you'll understand why everything you've tried so far has <b class='red'>failed</b> — and what the men who won their partners back did differently.", wait:"The access button unlocks at the end of the video…", cta:"UNLOCK MY ACCESS" },
  offer:{
    eyebrow:"ACCESS GRANTED",
    h:"She'll look at you the way she did <span class='red'>at the start</span> — once you activate the {PRODUTO}.",
    imgs:[ IMG("1080×1350 — official product mockup"), IMG("1080×1350 — 'protocol content' art"), IMG("1080×1350 — 'emotional control / reunion' art") ],
    deliverTitle:"WHAT YOU GET TODAY",
    deliver:["<b>The complete protocol</b> — all 5 stages, from calculated distance to the reunion","<b>Practical step-by-step module</b> — what to do (and what never to do) in each phase","<b>Anti-R.E.R. Protocol</b> — how to undo the damage of insistence","<b>Emotional Memory Map</b> — the triggers that reactivate what she once felt","<b>Reunion Guide</b> — setting, posture and leading the decisive encounter","Instant lifetime access, right on your phone"],
    bonusTitle:"+ 3 EXCLUSIVE BONUSES TODAY",
    bonus:[
      {title:"7 Daily Habits of a Happy Couple", img:IMG("600×840 — real bonus cover 1")},
      {title:"Love & Sex — The Balance Point", img:IMG("600×840 — real bonus cover 2")},
      {title:"Living the Relationship of Your Dreams", img:IMG("600×840 — real bonus cover 3")}
    ],
    priceEyebrow:"LIMITED ACCESS TO THE PROTOCOL", priceAnchor:"from $39 for", price:"$9.90",
    priceNote:"One-time payment. Instant access after confirmation. Checkout shows the final amount in your local currency.",
    cta:"GET THE CODE NOW",
    guarantee:"<b>Unconditional 7-day guarantee.</b> Get in, apply the first stage of the protocol and feel the dynamic shift. If it's not for you, we refund every cent — no questions asked.",
    testiTitle:"FROM THE MEN WHO APPLIED IT",
    testimonials:[
      {name:"[Student name]", meta:"[age], [occupation]", text:"[STRUCTURE EXAMPLE — situation before → what he applied → specific change in her attitude → current state.]"},
      {name:"[Student name]", meta:"[age], [occupation]", text:"[EXAMPLE — start with skepticism, end with a concrete result.]"},
      {name:"[Student name]", meta:"[age], [occupation]", text:"[EXAMPLE — real WhatsApp screenshot (with permission).]"}
    ],
    testiBanner:"REPLACE WITH REAL TESTIMONIAL",
    faqTitle:"FREQUENTLY ASKED QUESTIONS",
    faq:[
      {q:"How do I get access?", a:"Right after payment confirmation you receive an email with the members-area link."},
      {q:"Does it work for my case?", a:"The protocol covers the most common scenarios: recent breakup, gradual distancing, long relationships and being blocked."},
      {q:"How soon do I see change?", a:"It depends on the stage of the relationship and your application. The first stages interrupt the pattern that pushes her away — that starts on day 1."},
      {q:"What if it's not for me?", a:"You have a 7-day unconditional guarantee."},
      {q:"Payment methods?", a:"Credit card and the local methods available at checkout."}
    ],
    footer:"Instant access · 7-day guarantee · Secure payment"
  }
}
};

/* monta o JSON final de cada idioma */
function build(L){
  const steps = [];
  steps.push({ type:"intro", ...L.intro, img:IMG(L.intro.img) });
  const qAt = (n)=>{ const q=L.qs[n]; return { type:"q", key:q.k, title:q.t, sub:q.s||"", opts:q.o, img: q.img?IMG(q.img):null }; };
  for(let n=0;n<6;n++) steps.push(qAt(n));                 // 2–7
  steps.push({ type:"st", html:L.st1.html, cta:L.st1.cta, img:null });   // 8
  for(let n=6;n<10;n++) steps.push(qAt(n));                // 9–12
  steps.push({ type:"st", html:L.st2.html, cta:L.st2.cta, img:IMG(L.st2.img) }); // 13
  for(let n=10;n<16;n++) steps.push(qAt(n));               // 14–19
  steps.push({ type:"loading", ...L.loading });            // 20
  steps.push({ type:"diag", ...L.diag });                  // 21
  steps.push({ type:"vsl", ...L.vsl });                    // 22
  steps.push({ type:"offer", ...L.offer });                // 23
  return {
    meta: {
      brandHeader: L.brandHeader,
      productName: L.productName,
      checkoutUrl: "#COLE-AQUI-O-LINK-DO-CHECKOUT",
      vslEmbed: "",            // colar embed do Vturb/Panda/YouTube
      vslDelay: 95,            // segundos até liberar o botão
      active: true
    },
    steps
  };
}

module.exports = { pt: build(STR.pt), es: build(STR.es), en: build(STR.en) };
