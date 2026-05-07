import nixLogo from "./assets/brand/nix-logo-principal.png";

export type ProofPoint = {
  value: string;
  label: string;
};

export type TextBlock = {
  title: string;
  text: string;
};

export type ServiceFront = {
  name: string;
  tagline: string;
  description: string;
  gains: string[];
  featured?: boolean;
};

export type OnboardingStep = {
  phase: string;
  period: string;
  objective: string;
  items: string[];
};

export type ClientStat = {
  label: string;
  value: string;
  note?: string;
};

export type ClientAnalysis = {
  eyebrow: string;
  title: string;
  description: string;
  stats: ClientStat[];
  fitStatement: string;
};

export type SegmentResult = {
  title: string;
  text: string;
  icon: SegmentResultIcon;
};

export type SegmentResultIcon =
  | "growth"
  | "credits"
  | "network"
  | "invoices"
  | "pricing"
  | "clients";

export type ProposalPlanId = "essential" | "consultive" | "strategic";

export type ProposalPlan = {
  id: ProposalPlanId;
  name: string;
  focus: string;
  price: string;
  featured?: boolean;
};

export type ProposalFeature = {
  name: string;
  includedIn: ProposalPlanId[];
};

export type TechDifferential = {
  name: string;
  text: string;
};

export type ProposalContent = {
  recipientName: string;
  title: string;
  summary: string;
  heroTagline: string;
  proofPoints: ProofPoint[];
  companyProfile: {
    label: string;
    title: string;
    text: string;
  };
  dna: TextBlock[];
  values: TextBlock[];
  clientAnalysis: ClientAnalysis;
  segmentResults: SegmentResult[];
  serviceFronts: ServiceFront[];
  segments: string[];
  onboardingSteps: OnboardingStep[];
  proposalPlans: ProposalPlan[];
  proposalFeatures: ProposalFeature[];
  additionalServices: string[];
  collaboratorRanges: string[];
  techDifferentials: TechDifferential[];
  mentor: {
    label: string;
    name: string;
    role: string;
    text: string;
  };
  terms: string[];
  cta: {
    label: string;
    href: string;
    email: string;
    social: string;
    phone: string;
  };
};

export const brandConfig = {
  companyName: "NIX Contábil & RH",
  tagline: "Rapidez, eficiência e parceria.",
  logo: nixLogo,
  contactLabel: "Proposta comercial",
};

export const proposalContent: ProposalContent = {
  recipientName: "TECNOPARTS",
  title: "NIX Contábil & RH",
  summary:
    "Uma proposta consultiva para organizar a operação fiscal, contábil e de RH da Tecnoparts com segurança, proximidade e inteligência aplicada ao comércio de autopeças.",
  heroTagline: "Do CNPJ ao time dos sonhos.",
  proofPoints: [
    {
      value: "+15",
      label: "anos de experiência no setor contábil",
    },
    {
      value: "+100",
      label: "empresas atendidas com confiança e parceria",
    },
    {
      value: "+20",
      label: "empresas atendidas na cadeia de distribuição de autopeças",
    },
  ],
  companyProfile: {
    label: "Somos a NIX Contábil & RH",
    title: "Soluções completas para sua empresa prosperar.",
    text: "Unimos contabilidade completa, gestão de pessoas e planejamento estratégico para empresas que precisam crescer sem perder controle. A NIX combina tecnologia, atendimento próximo e inteligência tributária para transformar rotina fiscal, trabalhista e de RH em base de decisão.",
  },
  dna: [
    {
      title: "Propósito",
      text: "Simplificar a gestão com eficiência e inteligência tributária, garantindo segurança para crescer.",
    },
    {
      title: "Missão",
      text: "Proporcionar excelência no atendimento, com agilidade e eficácia.",
    },
    {
      title: "Visão",
      text: "Ser uma rede que conecta clientes e promove crescimento conjunto.",
    },
  ],
  values: [
    {
      title: "Proximidade",
      text: "Acompanhamento humano, real e próximo, com clientes no centro da operação.",
    },
    {
      title: "Agilidade",
      text: "Atendimento rápido, eficiente e seguro para reduzir ruídos na rotina.",
    },
    {
      title: "Atendimento personalizado",
      text: "Soluções sob medida, construídas com escuta ativa.",
    },
    {
      title: "Ética",
      text: "Transparência nas ações e conformidade com a legislação.",
    },
  ],
  clientAnalysis: {
    eyebrow: "Análise do cliente",
    title: "Tecnoparts tem forte aderência ao modelo estratégico da NIX.",
    description:
      "A Tecnoparts atua como distribuidora de autopeças nacionais e importadas, com marcas reconhecidas como Axios, Bosch, Cofap, Cobra, SKF, Nakata, Sabó e TRW. O perfil combina volume, recorrência e necessidade de controle fiscal, contábil e de RH.",
    stats: [
      {
        label: "Faturamento",
        value: "R$ 470.000/mês",
        note: "média",
      },
      {
        label: "Equipe",
        value: "11 colaboradores",
      },
      {
        label: "Soluções de interesse",
        value: "Fiscal, Contábil e RH",
      },
      {
        label: "Segmento",
        value: "Comércio de Autopeças",
      },
    ],
    fitStatement: "Negócio com forte perfil ao modelo estratégico da NIX.",
  },
  segmentResults: [
    {
      title: "Gestão de + R$ 1,7 milhões/mês",
      text: "Experiência prática no comércio de autopeças, com leitura fiscal e contábil voltada para operações de giro rápido.",
      icon: "growth",
    },
    {
      title: "Recuperação de créditos tributários",
      text: "Atuação em créditos tributários de autopeças, com domínio de tributação monofásica e ICMS/ST.",
      icon: "credits",
    },
    {
      title: "+20 empresas atendidas no segmento",
      text: "Vivência na cadeia de distribuição, com apoio para indicação, operação fiscal e estruturação de rotinas.",
      icon: "network",
    },
    {
      title: "Alto volume de NF-e",
      text: "Processos preparados para operações com grande fluxo documental e necessidade de precisão.",
      icon: "invoices",
    },
    {
      title: "Formação de preço",
      text: "Apoio na leitura dos impostos para transformar detalhe fiscal em margem e decisão comercial.",
      icon: "pricing",
    },
    {
      title: "Mais de 6 nixers no segmento",
      text: "Clientes atendidos no comércio de autopeças com repertório específico para o setor.",
      icon: "clients",
    },
  ],
  serviceFronts: [
    {
      name: "Contabilidade Completa",
      tagline: "A base sólida para uma empresa segura e organizada.",
      description:
        "Cuidamos da estrutura contábil, fiscal e trabalhista para manter conformidade legal, organização financeira e clareza sobre números, impostos e decisões.",
      gains: [
        "Segurança fiscal e trabalhista",
        "Organização financeira",
        "Redução de riscos e erros",
      ],
    },
    {
      name: "BPO RH",
      tagline: "Gestão estratégica de pessoas.",
      description:
        "Estruturamos o RH para apoiar contratações, desenvolvimento de equipe, processos claros e crescimento consistente.",
      gains: [
        "Contratações mais assertivas",
        "Descrições de cargo",
        "Avaliação de desempenho e PDI",
        "Plano de carreira",
      ],
      featured: true,
    },
    {
      name: "BPO RH/DP",
      tagline: "Gestão completa e suporte ativo.",
      description:
        "Assumimos a gestão ativa do Departamento Pessoal e criamos um canal direto com colaboradores para reduzir gargalos e dar fluidez à rotina trabalhista.",
      gains: [
        "Redução de erros e retrabalho",
        "Comunicação direta com colaboradores",
        "Mais eficiência na rotina trabalhista",
        "Menos dependência interna",
      ],
    },
  ],
  segments: [
    "Comércio",
    "Serviços",
    "Indústria",
    "Tecnologia",
    "Setor educacional",
    "Saúde",
    "Construção civil",
    "Transporte e logística",
    "Profissionais liberais e autônomos",
  ],
  onboardingSteps: [
    {
      phase: "Implantação",
      period: "Dias 1 a 30",
      objective: "Transição segura e início da operação.",
      items: [
        "Dia 1: boas-vindas e alinhamento.",
        "Dias 2 a 10: coleta e organização de documentos.",
        "Dias 11 a 15: configuração dos sistemas.",
        "Dias 16 a 30: kickoff e direcionamento.",
      ],
    },
    {
      phase: "Estabilização",
      period: "Dias 31 a 60",
      objective: "Consistência e clareza da operação.",
      items: [
        "Dia 31: processos em andamento, entregas recorrentes e suporte contínuo.",
        "Dia 60: análise inicial, ajustes estratégicos e direcionamento.",
      ],
    },
    {
      phase: "Evolução estratégica",
      period: "Dias 61 a 90",
      objective: "Gerar valor e otimizar resultados.",
      items: [
        "Dias 70 a 80: revisão de performance, ajustes na operação e novas oportunidades.",
        "Dia 90: análise tributária, direcionamento estratégico e plano de crescimento.",
      ],
    },
  ],
  proposalPlans: [
    {
      id: "essential",
      name: "Plano Essencial",
      focus: "Operação segura",
      price: "R$ 6.675/mês",
    },
    {
      id: "consultive",
      name: "Plano Consultivo",
      focus: "Crescimento estruturado",
      price: "R$ 8.675/mês",
      featured: true,
    },
    {
      id: "strategic",
      name: "Plano Estratégico",
      focus: "Gestão completa e escala",
      price: "R$ 10.175/mês",
    },
  ],
  proposalFeatures: [
    {
      name: "Contábil & Fiscal",
      includedIn: ["essential", "consultive", "strategic"],
    },
    {
      name: "Folha de Pagamento",
      includedIn: ["essential", "consultive", "strategic"],
    },
    {
      name: "Obrigações Legais",
      includedIn: ["essential", "consultive", "strategic"],
    },
    {
      name: "Recrutamento & Seleção",
      includedIn: ["consultive", "strategic"],
    },
    {
      name: "Avaliação de Desempenho",
      includedIn: ["consultive", "strategic"],
    },
    {
      name: "Plano de Carreira",
      includedIn: ["consultive", "strategic"],
    },
    {
      name: "Canal direto com colaboradores (WhatsApp)",
      includedIn: ["strategic"],
    },
    {
      name: "Gestão Trabalhista (rotinas e suporte contínuo)",
      includedIn: ["strategic"],
    },
    {
      name: "NR-1 (adequação e acompanhamento)",
      includedIn: ["strategic"],
    },
  ],
  additionalServices: [
    "Parcelamentos e regularização de débitos fiscais de anos anteriores",
    "Alterações contratuais e cadastrais",
    "Fechamento (baixa) de empresa",
    "Recuperação de créditos tributários",
    "Revisão contábil de períodos anteriores",
    "Retificação anterior de declarações",
    "Deslocamento a fiscalizações, notificações e solicitações externas",
  ],
  collaboratorRanges: [
    "Até 02 colaboradores",
    "De 03 a 06 colaboradores",
    "De 07 a 15 colaboradores",
    "De 16 a 25 colaboradores",
    "De 26 a 35 colaboradores",
    "De 36 a 50 colaboradores",
    "De 51 a 70 colaboradores",
    "De 71 a 80 colaboradores",
    "De 81 a 90 colaboradores",
    "Acima de 91 colaboradores",
  ],
  techDifferentials: [
    {
      name: "Domínio",
      text: "Sistema de gestão contábil moderno, completo e eficiente, que garante mais agilidade, segurança e performance nos processos.",
    },
    {
      name: "Onvio",
      text: "Portal do cliente com integração ao aplicativo para colaboradores, facilitando comunicação, documentos e informações em tempo real.",
    },
    {
      name: "Kolossos",
      text: "Sistema avançado de auditoria fiscal, que amplia a precisão das análises, reduz riscos e fortalece a conformidade tributária.",
    },
    {
      name: "NIX IA",
      text: "Plataforma com criação de site integrada a agente de inteligência artificial para orientar e esclarecer dúvidas em tempo real.",
    },
    {
      name: "Econnect",
      text: "Plataforma de consulta e auditoria inteligente, que potencializa análises, valida informações e apoia decisões com mais segurança.",
    },
  ],
  mentor: {
    label: "Empresa mentorada",
    name: "Rogério Fameli",
    role: "Programa Contador CEO",
    text: "A NIX é mentorada por Rogério Fameli, referência em gestão e estratégia contábil, garantindo atuação atualizada, inovadora e alinhada às melhores práticas de mercado.",
  },
  terms: [
    "Plano mais escolhido para a Tecnoparts: Consultivo.",
    "Honorários adicionais, regularizações, alterações cadastrais e demandas extraordinárias são avaliados mediante consulta, conforme necessidade do cliente.",
    "Cresceu? Sua estrutura acompanha, com valores adicionais conforme a faixa de colaboradores.",
  ],
  cta: {
    label: "Falar com a NIX",
    href: "https://wa.me/5511947554454?text=Gostaria%20de%20falar%20sobre%20a%20proposta%20da%20Tecnoparts",
    email: "Financeiro@nixcontabil.com.br",
    social: "@nixcontabil_rh",
    phone: "(11) 94755-4454",
  },
};
