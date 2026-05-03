import './App.css'
import {
  brandConfig,
  proposalContent,
  type OnboardingStep,
  type ProofPoint,
  type ServiceFront,
  type TextBlock,
} from './content'

type SectionHeaderProps = {
  eyebrow: string
  title: string
  description?: string
  id: string
  align?: 'left' | 'center'
}

function SectionHeader({ eyebrow, title, description, id, align = 'left' }: SectionHeaderProps) {
  return (
    <div className={align === 'center' ? 'section-header section-header--center' : 'section-header'}>
      <span className="section-eyebrow">{eyebrow}</span>
      <h2 id={id}>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}

function MetricCard({ point }: { point: ProofPoint }) {
  return (
    <article className="metric-card">
      <strong>{point.value}</strong>
      <span>{point.label}</span>
    </article>
  )
}

function TextCard({ block, marker }: { block: TextBlock; marker?: string }) {
  return (
    <article className="text-card">
      {marker && <span className="text-card__marker">{marker}</span>}
      <h3>{block.title}</h3>
      <p>{block.text}</p>
    </article>
  )
}

function ServiceCard({ service }: { service: ServiceFront }) {
  return (
    <article className={service.featured ? 'service-card service-card--featured' : 'service-card'}>
      <div className="service-card__header">
        <span>{service.tagline}</span>
        {service.featured && <strong>Destaque</strong>}
      </div>
      <h3>{service.name}</h3>
      <p>{service.description}</p>
      <ul>
        {service.gains.map((gain) => (
          <li key={gain}>{gain}</li>
        ))}
      </ul>
    </article>
  )
}

function TimelineCard({ step, index }: { step: OnboardingStep; index: number }) {
  return (
    <article className="timeline-card">
      <div className="timeline-card__step">
        <span>{String(index + 1).padStart(2, '0')}</span>
        <small>{step.period}</small>
      </div>
      <h3>{step.phase}</h3>
      <p>{step.objective}</p>
      <ul>
        {step.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  )
}

function App() {
  return (
    <main className="proposal-page">
      <section className="hero-section" aria-labelledby="proposal-title">
        <div className="page-shell">
          <header className="topbar">
            <img
              src={brandConfig.logo}
              alt={brandConfig.companyName}
              className="brand-logo"
              width="2442"
              height="2232"
              fetchPriority="high"
              decoding="async"
            />
            <span>{brandConfig.contactLabel}</span>
          </header>

          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Para {proposalContent.recipientName}</p>
              <h1 id="proposal-title">{proposalContent.title}</h1>
              <p className="hero-summary">{proposalContent.summary}</p>
              <div className="hero-actions">
                <a className="primary-cta" href={proposalContent.cta.href}>
                  {proposalContent.cta.label}
                </a>
                <p>
                  {proposalContent.cta.phone} · {proposalContent.cta.email}
                </p>
              </div>
            </div>

            <aside className="hero-panel" aria-label="Apresentação da NIX">
              <span className="section-eyebrow">{proposalContent.companyProfile.label}</span>
              <h2>{brandConfig.companyName}</h2>
              <p>{brandConfig.tagline}</p>
              <dl>
                {proposalContent.proofPoints.map((point) => (
                  <div key={point.label}>
                    <dt>{point.value}</dt>
                    <dd>{point.label}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section className="content-section profile-section" aria-labelledby="profile-title">
        <div className="page-shell">
          <SectionHeader
            eyebrow="Quem somos"
            id="profile-title"
            title={proposalContent.companyProfile.title}
          />
          <div className="profile-grid">
            <p>{proposalContent.companyProfile.text}</p>
            <div className="metric-grid" aria-label="Indicadores da NIX">
              {proposalContent.proofPoints.map((point) => (
                <MetricCard key={point.label} point={point} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="content-section why-section" aria-labelledby="why-title">
        <div className="page-shell">
          <SectionHeader
            eyebrow="Por que a NIX"
            id="why-title"
            title="Gestão simples, segura e próxima."
            description="Princípios claros para organizar a rotina da empresa, reduzir ruídos e manter a operação em conformidade."
          />
          <div className="stacked-groups">
            <div className="card-group">
              <p className="card-group__label">Nosso DNA</p>
              <div className="text-card-grid text-card-grid--three">
                {proposalContent.dna.map((block, index) => (
                  <TextCard key={block.title} block={block} marker={`0${index + 1}`} />
                ))}
              </div>
            </div>
            <div className="card-group">
              <p className="card-group__label">Valores</p>
              <div className="text-card-grid text-card-grid--four">
                {proposalContent.values.map((value) => (
                  <TextCard key={value.title} block={value} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section services-section" aria-labelledby="services-title">
        <div className="page-shell">
          <SectionHeader
            eyebrow="Frentes de atuação"
            id="services-title"
            title="Contabilidade, fiscal, trabalhista e RH."
            description="Serviços organizados para dar clareza, segurança e suporte próximo em cada etapa da operação."
            align="center"
          />
          <div className="services-grid">
            {proposalContent.serviceFronts.map((service) => (
              <ServiceCard key={service.name} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="content-section segments-section" aria-labelledby="segments-title">
        <div className="page-shell segments-layout">
          <SectionHeader
            eyebrow="Segmentos atendidos"
            id="segments-title"
            title="Atuação ampla para operações em expansão."
          />
          <ul aria-label="Segmentos atendidos">
            {proposalContent.segments.map((segment) => (
              <li key={segment}>{segment}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="content-section onboarding-section" aria-labelledby="onboarding-title">
        <div className="page-shell">
          <SectionHeader
            eyebrow="Plano 90 dias"
            id="onboarding-title"
            title="Em 30 dias organizamos. Em 90 dias evoluímos."
            description="Um início em fases para reduzir riscos na transição, estabilizar a rotina e criar base para melhorias."
          />
          <div className="timeline-grid">
            {proposalContent.onboardingSteps.map((step, index) => (
              <TimelineCard key={step.phase} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="content-section final-section" aria-labelledby="terms-title">
        <div className="page-shell final-layout">
          <div className="terms-card">
            <SectionHeader
              eyebrow="Condições"
              id="terms-title"
              title="A proposta é personalizada para cada operação."
            />
            <ul>
              {proposalContent.terms.map((term) => (
                <li key={term}>{term}</li>
              ))}
            </ul>
          </div>

          <aside className="cta-card" aria-label="Próximo passo">
            <span className="section-eyebrow">Próximo passo</span>
            <h2>Validar os dados finais e avançar com a proposta NIX.</h2>
            <p>
              {proposalContent.cta.phone} · {proposalContent.cta.email} ·{' '}
              {proposalContent.cta.social}
            </p>
            <a className="primary-cta" href={proposalContent.cta.href}>
              {proposalContent.cta.label}
            </a>
          </aside>
        </div>
      </section>
    </main>
  )
}

export default App
