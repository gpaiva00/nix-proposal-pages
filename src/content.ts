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

export type Segment = {
  title: string;
  text: string;
};

export type ContactField = {
  name: "name" | "company" | "phone" | "email" | "message";
  label: string;
  placeholder: string;
  required?: boolean;
  type?: "email" | "tel" | "text";
};

export type InstitutionalContent = {
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
  serviceFronts: ServiceFront[];
  differentials: TextBlock[];
  segments: Segment[];
  contact: {
    title: string;
    description: string;
    whatsappNumber: string;
    whatsappDisplay: string;
    email: string;
    social: string;
    fields: ContactField[];
    ctaLabel: string;
    directCtaLabel: string;
  };
};

export const brandConfig = {
  companyName: "NIX Contábil & RH",
  tagline: "Rapidez, eficiência e parceria.",
  logo: nixLogo,
  contactLabel: "Fale com a NIX",
};

export const institutionalContent: InstitutionalContent = {
  title: "NIX Contábil & RH",
  summary:
    "Contabilidade, fiscal, Departamento Pessoal e RH com atendimento próximo, tecnologia e visão estratégica para empresas que querem crescer com segurança.",
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
      value: "5",
      label: "frentes integradas para apoiar a gestão da empresa",
    },
  ],
  companyProfile: {
    label: "Quem somos",
    title: "Soluções completas para sua empresa prosperar.",
    text: "A NIX combina contabilidade, gestão de pessoas e planejamento estratégico para simplificar a rotina empresarial. Atuamos com processos claros, tecnologia e acompanhamento humano para transformar obrigações fiscais, trabalhistas e de RH em base de decisão.",
  },
  dna: [
    {
      title: "Propósito",
      text: "Simplificar a gestão com eficiência e inteligência tributária, garantindo segurança para crescer.",
    },
    {
      title: "Missão",
      text: "Proporcionar excelência no atendimento, com agilidade, eficácia e atenção real às necessidades de cada cliente.",
    },
    {
      title: "Visão",
      text: "Ser uma rede que conecta clientes, pessoas e oportunidades para promover crescimento conjunto.",
    },
  ],
  values: [
    {
      title: "Proximidade",
      text: "Acompanhamento humano, acessível e consultivo, com clientes no centro da operação.",
    },
    {
      title: "Agilidade",
      text: "Atendimento rápido e organizado para reduzir ruídos e dar fluidez à rotina.",
    },
    {
      title: "Personalização",
      text: "Soluções sob medida, construídas com escuta ativa e leitura do contexto do negócio.",
    },
    {
      title: "Ética",
      text: "Transparência nas ações, responsabilidade técnica e conformidade com a legislação.",
    },
  ],
  serviceFronts: [
    {
      name: "Contabilidade",
      tagline: "Base sólida para decisões seguras.",
      description:
        "Organização contábil, demonstrativos, obrigações e leitura dos números para manter a empresa em conformidade e apoiar decisões de gestão.",
      gains: [
        "Demonstrações contábeis organizadas",
        "Clareza sobre resultados",
        "Apoio para tomada de decisão",
      ],
    },
    {
      name: "Fiscal",
      tagline: "Conformidade e inteligência tributária.",
      description:
        "Rotina fiscal estruturada, apuração de impostos, revisão de enquadramento e orientação para reduzir riscos na operação.",
      gains: [
        "Apuração de impostos",
        "Obrigações acessórias",
        "Análise tributária consultiva",
      ],
    },
    {
      name: "DP/RH",
      tagline: "Rotina trabalhista sem ruídos.",
      description:
        "Folha de pagamento, admissões, férias, rescisões e suporte para manter a operação trabalhista clara, segura e pontual.",
      gains: [
        "Folha e encargos",
        "Admissões e desligamentos",
        "Suporte às rotinas trabalhistas",
      ],
      featured: true,
    },
    {
      name: "BPO RH/DP",
      tagline: "Gestão ativa para o time.",
      description:
        "Apoio operacional e estratégico para empresas que precisam estruturar processos de pessoas com mais eficiência e menos dependência interna.",
      gains: [
        "Processos de RH organizados",
        "Canal de suporte com colaboradores",
        "Redução de retrabalho",
      ],
    },
    {
      name: "Consultoria e Estratégia",
      tagline: "Direcionamento para crescer melhor.",
      description:
        "Análises, revisões e recomendações para conectar números, tributos, pessoas e operação em decisões mais inteligentes.",
      gains: [
        "Planejamento estratégico",
        "Revisões e diagnósticos",
        "Acompanhamento consultivo",
      ],
    },
  ],
  differentials: [
    {
      title: "Tecnologia",
      text: "Usamos ferramentas modernas para organizar documentos, rotinas, análises e comunicação com mais agilidade.",
    },
    {
      title: "Proximidade",
      text: "O cliente fala com pessoas que entendem o negócio, acompanham a rotina e resolvem com responsabilidade.",
    },
    {
      title: "Agilidade",
      text: "Processos claros e comunicação objetiva reduzem atrasos, dúvidas e retrabalho no dia a dia.",
    },
    {
      title: "Assessoria estratégica",
      text: "A NIX não fica apenas na entrega obrigatória: ajudamos a interpretar cenários e tomar decisões melhores.",
    },
  ],
  segments: [
    {
      title: "Comércio e varejo",
      text: "Operações com volume, giro de estoque, emissão fiscal recorrente e necessidade de controle tributário.",
    },
    {
      title: "Serviços",
      text: "Empresas que precisam de rotina contábil organizada, folha em dia e apoio para crescer com previsibilidade.",
    },
    {
      title: "Indústria",
      text: "Negócios com processos produtivos, controles fiscais específicos e decisões que dependem de números confiáveis.",
    },
    {
      title: "Tecnologia",
      text: "Empresas digitais e prestadores especializados que precisam de estrutura leve, clara e escalável.",
    },
    {
      title: "Saúde e educação",
      text: "Operações com equipes, obrigações recorrentes e necessidade de suporte próximo para manter regularidade.",
    },
    {
      title: "Construção, transporte e logística",
      text: "Atividades com contratos, equipes, documentação e rotinas fiscais que exigem acompanhamento consistente.",
    },
  ],
  contact: {
    title: "Vamos conversar sobre a sua empresa?",
    description:
      "Envie seus dados e abriremos uma conversa no WhatsApp com as informações organizadas para o primeiro atendimento.",
    whatsappNumber: "5511947554454",
    whatsappDisplay: "(11) 94755-4454",
    email: "Financeiro@nixcontabil.com.br",
    social: "@nixcontabil_rh",
    ctaLabel: "Enviar pelo WhatsApp",
    directCtaLabel: "Chamar no WhatsApp",
    fields: [
      {
        name: "name",
        label: "Nome",
        placeholder: "Seu nome",
        required: true,
        type: "text",
      },
      {
        name: "company",
        label: "Empresa",
        placeholder: "Nome da empresa",
        required: true,
        type: "text",
      },
      {
        name: "phone",
        label: "Telefone",
        placeholder: "(00) 00000-0000",
        required: true,
        type: "tel",
      },
      {
        name: "email",
        label: "E-mail",
        placeholder: "seuemail@empresa.com.br",
        type: "email",
      },
      {
        name: "message",
        label: "Mensagem",
        placeholder: "Conte rapidamente o que sua empresa precisa",
      },
    ],
  },
};
