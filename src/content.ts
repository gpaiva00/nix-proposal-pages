import nixLogo from './assets/brand/nix-logo-principal.png'

export type ProposalPlan = {
  name: string
  price: string
  cadence: string
  description: string
  features: string[]
  featured?: boolean
}

export type ProposalContent = {
  recipientName: string
  title: string
  summary: string
  validUntil: string
  plans: ProposalPlan[]
  terms: string[]
  cta: {
    label: string
    href: string
  }
}

export const brandConfig = {
  companyName: 'NIX Contabilidade e RH',
  tagline: 'Atendimento rapido e eficaz!',
  logo: nixLogo,
  contactLabel: 'Proposta comercial',
}

export const proposalContent: ProposalContent = {
  recipientName: 'Cliente exemplo',
  title: 'Proposta de servicos contabeis e RH',
  summary:
    'Uma apresentacao clara da NIX, com escopo, valores e condicoes comerciais adaptados para cada cliente.',
  validUntil: 'Valida por 7 dias',
  plans: [
    {
      name: 'Essencial',
      price: 'R$ 890/mês',
      cadence: 'Rotina mensal',
      description: 'Para empresas que precisam organizar a base fiscal, contábil e trabalhista.',
      features: [
        'Acompanhamento contábil e fiscal',
        'Rotina de folha de pagamento',
        'Orientações recorrentes por WhatsApp',
        'Entrega mensal de guias e demonstrativos',
      ],
    },
    {
      name: 'Completo',
      price: 'R$ 1.290/mês',
      cadence: 'Atendimento ampliado',
      description: 'Para empresas que querem suporte mais próximo e visão preventiva da operação.',
      features: [
        'Tudo do plano Essencial',
        'Reunião mensal de alinhamento',
        'Revisão preventiva de pendências',
        'Prioridade para dúvidas e ajustes urgentes',
      ],
      featured: true,
    },
  ],
  terms: [
    'Valores ajustáveis conforme volume de notas, colaboradores e obrigações acessórias.',
    'Implantação e regularização inicial podem ser orçadas separadamente quando necessário.',
    'A proposta final será personalizada com os dados reais da empresa atendida.',
  ],
  cta: {
    label: 'Falar com a NIX',
    href: 'https://wa.me/5500000000000?text=Gostaria%20de%20falar%20sobre%20a%20proposta',
  },
}
