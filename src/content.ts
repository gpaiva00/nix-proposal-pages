import nixLogo from './assets/brand/nix-logo-principal.png'

export type ProofPoint = {
  value: string
  label: string
}

export type TextBlock = {
  title: string
  text: string
}

export type ServiceFront = {
  name: string
  tagline: string
  description: string
  gains: string[]
  featured?: boolean
}

export type OnboardingStep = {
  phase: string
  period: string
  objective: string
  items: string[]
}

export type ProposalContent = {
  recipientName: string
  title: string
  summary: string
  proofPoints: ProofPoint[]
  companyProfile: {
    label: string
    title: string
    text: string
  }
  dna: TextBlock[]
  values: TextBlock[]
  serviceFronts: ServiceFront[]
  segments: string[]
  onboardingSteps: OnboardingStep[]
  terms: string[]
  cta: {
    label: string
    href: string
    email: string
    social: string
    phone: string
  }
}

export const brandConfig = {
  companyName: 'NIX Contábil & RH',
  tagline: 'Rapidez, eficiência e parceria.',
  logo: nixLogo,
  contactLabel: 'Proposta comercial',
}

export const proposalContent: ProposalContent = {
  recipientName: 'sua empresa',
  title: 'Do CNPJ ao time dos sonhos.',
  summary:
    'A NIX entrega soluções completas em contabilidade, fiscal, trabalhista e RH para empresas que precisam crescer com segurança, clareza e suporte próximo.',
  proofPoints: [
    {
      value: '+15',
      label: 'anos de experiência no setor contábil',
    },
    {
      value: '+100',
      label: 'empresas atendidas com confiança e parceria',
    },
    {
      value: '+20',
      label: 'empresas atendidas na cadeia de distribuição de autopeças',
    },
  ],
  companyProfile: {
    label: 'Somos a NIX Contábil & RH',
    title: 'Soluções completas para sua empresa prosperar.',
    text:
      'Unimos atuação contábil, fiscal, trabalhista e RH com uma operação consultiva, tecnologia em evolução e atendimento pessoal. A proposta é simplificar a gestão com eficiência e inteligência tributária, garantindo segurança para crescer.',
  },
  dna: [
    {
      title: 'Propósito',
      text: 'Simplificar a gestão com eficiência e inteligência tributária, garantindo segurança para crescer.',
    },
    {
      title: 'Missão',
      text: 'Proporcionar excelência no atendimento, com agilidade e eficácia.',
    },
    {
      title: 'Visão',
      text: 'Ser uma rede que conecta clientes e promove crescimento conjunto.',
    },
  ],
  values: [
    {
      title: 'Proximidade',
      text: 'Comunicação clara, constante e acompanhamento próximo do cliente.',
    },
    {
      title: 'Agilidade',
      text: 'Respostas rápidas, eficientes e entregas dentro do prazo.',
    },
    {
      title: 'Atendimento personalizado',
      text: 'Soluções sob medida, construídas com escuta ativa.',
    },
    {
      title: 'Ética',
      text: 'Transparência nas ações e conformidade com a legislação.',
    },
  ],
  serviceFronts: [
    {
      name: 'Contabilidade Completa',
      tagline: 'A base sólida para uma empresa segura e organizada.',
      description:
        'Cuidamos da estrutura contábil, fiscal e trabalhista para manter conformidade legal, organização financeira e clareza sobre números, impostos e decisões.',
      gains: ['Segurança fiscal e trabalhista', 'Organização financeira', 'Redução de riscos e erros'],
    },
    {
      name: 'BPO RH',
      tagline: 'Gestão estratégica de pessoas.',
      description:
        'Estruturamos o RH para apoiar contratações, desenvolvimento de equipe, processos claros e crescimento consistente.',
      gains: [
        'Contratações mais assertivas',
        'Descrições de cargo',
        'Avaliação de desempenho e PDI',
        'Plano de carreira',
      ],
      featured: true,
    },
    {
      name: 'BPO RH/DP',
      tagline: 'Gestão completa e suporte ativo.',
      description:
        'Assumimos a gestão ativa do Departamento Pessoal e criamos um canal direto com colaboradores para reduzir gargalos e dar fluidez à rotina trabalhista.',
      gains: [
        'Redução de erros e retrabalho',
        'Comunicação direta com colaboradores',
        'Mais eficiência na rotina trabalhista',
      ],
    },
  ],
  segments: [
    'Comércio',
    'Serviços',
    'Indústria',
    'Tecnologia',
    'Setor educacional',
    'Saúde',
    'Construção civil',
    'Transporte e logística',
    'Profissionais liberais e autônomos',
  ],
  onboardingSteps: [
    {
      phase: 'Implantação',
      period: 'Dias 1 a 30',
      objective: 'Transição segura e início da operação.',
      items: [
        'Reunião de boas-vindas e alinhamento de expectativas.',
        'Coleta de documentos e parametrização nos sistemas NIX.',
        'Kickoffs por área e go live da operação.',
      ],
    },
    {
      phase: 'Estabilização',
      period: 'Dias 31 a 60',
      objective: 'Consistência e clareza da operação.',
      items: [
        'Rotina ativa de folha, impostos, entregas acessórias e suporte.',
        'Reunião de acompanhamento no dia 60.',
        'Primeira análise dos números e ajustes de melhoria.',
      ],
    },
    {
      phase: 'Evolução estratégica',
      period: 'Dias 61 a 90',
      objective: 'Gerar valor e otimizar resultados.',
      items: [
        'Operação estabilizada com acompanhamento contínuo.',
        'Ajustes finos na rotina e identificação de oportunidades.',
        'Reunião estratégica NIX no dia 90.',
      ],
    },
  ],
  terms: [
    'A proposta final deve ser personalizada conforme volume de notas, colaboradores e obrigações acessórias.',
    'Honorários adicionais, regularizações, alterações cadastrais e demandas extraordinárias devem ser avaliados separadamente.',
    'Valores e condições comerciais do PDF não foram expostos nesta página pública.',
  ],
  cta: {
    label: 'Falar com a NIX',
    href: 'https://wa.me/5511947554454?text=Gostaria%20de%20falar%20sobre%20a%20proposta',
    email: 'Financeiro@nixcontabil.com.br',
    social: '@nixcontabil_rh',
    phone: '(11) 94755-4454',
  },
}
