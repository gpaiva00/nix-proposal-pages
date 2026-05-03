import './App.css'
import { brandConfig, proposalContent, type ProposalPlan } from './content'

function PlanCard({ plan }: { plan: ProposalPlan }) {
  return (
    <article className={plan.featured ? 'plan-card plan-card--featured' : 'plan-card'}>
      <div className="plan-card__topline">
        <span>{plan.cadence}</span>
        {plan.featured && <strong>Recomendado</strong>}
      </div>
      <div className="plan-card__heading">
        <h3>{plan.name}</h3>
        <p>{plan.price}</p>
      </div>
      <p className="plan-card__description">{plan.description}</p>
      <ul>
        {plan.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
    </article>
  )
}

function App() {
  return (
    <main className="proposal-page">
      <section className="hero-section" aria-labelledby="proposal-title">
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
          </div>

          <aside className="company-card" aria-label="Apresentacao da NIX">
            <span className="company-card__label">Empresa responsavel</span>
            <h2>{brandConfig.companyName}</h2>
            <p>{brandConfig.tagline}</p>
          </aside>
        </div>
      </section>

      <section className="content-section" aria-labelledby="plans-title">
        <div className="section-heading">
          <span>{proposalContent.validUntil}</span>
          <h2 id="plans-title">Opcoes de atendimento</h2>
        </div>

        <div className="plans-grid">
          {proposalContent.plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>
      </section>

      <section className="terms-section" aria-labelledby="terms-title">
        <div>
          <span className="eyebrow">Condicoes</span>
          <h2 id="terms-title">A proposta muda. A marca permanece.</h2>
        </div>
        <ul>
          {proposalContent.terms.map((term) => (
            <li key={term}>{term}</li>
          ))}
        </ul>
      </section>

      <section className="closing-section" aria-label="Encerramento">
        <div>
          <span className="eyebrow">Proximo passo</span>
          <h2>Validar os dados finais e enviar a proposta personalizada.</h2>
        </div>
        <a href={proposalContent.cta.href}>{proposalContent.cta.label}</a>
      </section>
    </main>
  )
}

export default App
