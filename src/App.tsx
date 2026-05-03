import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Building2,
  Globe,
  Home,
  ListChecks,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import "./index.css";
import {
  brandConfig,
  proposalContent,
  type OnboardingStep,
  type ProofPoint,
  type ServiceFront,
  type TextBlock,
} from "./content";
import { cn } from "./lib/cn";

const navigationItems: { label: string; id: string; icon: LucideIcon }[] = [
  { label: "Início", id: "inicio", icon: Home },
  { label: "Quem somos", id: "quem-somos", icon: Building2 },
  { label: "Por que a NIX", id: "por-que-a-nix", icon: ShieldCheck },
  { label: "Frentes de atuação", id: "frentes-de-atuacao", icon: Briefcase },
  { label: "Segmentos", id: "segmentos", icon: Globe },
  { label: "Plano 90 dias", id: "plano-90-dias", icon: ListChecks },
  { label: "Proposta", id: "proposta", icon: MessageCircle },
];

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  id: string;
  align?: "left" | "center";
};

function SectionHeader({
  eyebrow,
  title,
  description,
  id,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-[26px] max-w-[760px] sm:mb-[46px] sm:max-w-[980px]",
        align === "center" && "mx-auto text-center",
      )}
    >
      <span className="font-display text-[0.78rem] uppercase leading-tight text-gold">
        {eyebrow}
      </span>
      <h2
        id={id}
        className="mt-3 text-[clamp(2.15rem,4.2vw,4rem)] font-[760] leading-[1.02] tracking-[-0.03em] text-balance sm:text-[clamp(3.15rem,6.1vw,5.65rem)]"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-[18px] max-w-[680px] text-[clamp(1rem,1.4vw,1.14rem)] leading-[1.65] text-navy-soft sm:max-w-[780px] sm:text-[clamp(1.08rem,1.6vw,1.24rem)]">
          {description}
        </p>
      )}
    </div>
  );
}

type MetricValueParts = {
  prefix: string;
  target: number;
  suffix: string;
};

function parseMetricValue(value: string): MetricValueParts | null {
  const match = value.match(/^([^0-9]*)(\d+)(.*)$/);
  if (!match) return null;

  return {
    prefix: match[1],
    target: Number(match[2]),
    suffix: match[3],
  };
}

function formatMetricValue(parts: MetricValueParts, value: number) {
  return `${parts.prefix}${Math.round(value)}${parts.suffix}`;
}

function AnimatedMetricValue({ value }: { value: string }) {
  const nodeRef = useRef<HTMLElement | null>(null);
  const parts = useMemo(() => parseMetricValue(value), [value]);

  const shouldAnimate =
    parts !== null &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [displayValue, setDisplayValue] = useState(() =>
    shouldAnimate && parts ? formatMetricValue(parts, 0) : value,
  );

  useEffect(() => {
    if (!shouldAnimate || !parts) return;

    const node = nodeRef.current;
    if (!node) return;

    let frame = 0;
    let startedAt: number | null = null;

    const animate = (timestamp: number) => {
      startedAt ??= timestamp;
      const progress = Math.min((timestamp - startedAt) / 1200, 1);
      const easedProgress = 1 - (1 - progress) ** 3;

      setDisplayValue(formatMetricValue(parts, parts.target * easedProgress));

      if (progress < 1) {
        frame = window.requestAnimationFrame(animate);
        return;
      }

      setDisplayValue(value);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          frame = window.requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [shouldAnimate, parts, value]);

  return (
    <strong ref={nodeRef} aria-label={value}>
      {displayValue}
    </strong>
  );
}

function MetricCard({ point }: { point: ProofPoint }) {
  return (
    <article className="flex min-h-[150px] flex-col justify-between border border-line bg-white/[0.94] rounded-sm p-[22px] shadow-[0_1px_0_rgba(255,255,255,0.8)_inset]">
      <AnimatedMetricValue value={point.value} />
      <span className="leading-[1.45] text-navy-muted">{point.label}</span>
    </article>
  );
}

function TextCard({ block, marker }: { block: TextBlock; marker?: string }) {
  return (
    <article className="min-h-[190px] border border-line bg-white/[0.94] rounded-sm p-[clamp(22px,3vw,32px)] shadow-[0_1px_0_rgba(255,255,255,0.8)_inset]">
      {marker && (
        <span className="mb-6 inline-flex font-extrabold text-gold">
          {marker}
        </span>
      )}
      <h3 className="text-[clamp(1.24rem,2vw,1.68rem)] font-[760] leading-[1.02] tracking-[-0.02em]">
        {block.title}
      </h3>
      <p className="mt-[14px] leading-[1.65] text-navy-soft">{block.text}</p>
    </article>
  );
}

function ServiceCard({ service }: { service: ServiceFront }) {
  return (
    <article
      className={cn(
        "flex min-h-[440px] flex-col border border-line bg-white/[0.94] rounded-sm p-[clamp(22px,3vw,32px)] shadow-[0_1px_0_rgba(255,255,255,0.8)_inset]",
        service.featured &&
          "border-gold/[0.52] bg-gradient-to-b from-yellow-50/[0.98] to-white/[0.96] shadow-[0_18px_48px_rgba(253,185,17,0.14)]",
      )}
    >
      <div className="flex min-h-[46px] items-start justify-between gap-[14px]">
        <span className="max-w-[250px] font-display text-[0.78rem] uppercase leading-tight text-gold">
          {service.tagline}
        </span>
        {service.featured && (
          <strong className="flex-none rounded-full bg-gold/[0.18] px-[9px] py-[6px] font-body text-[0.75rem] font-extrabold normal-case">
            Destaque
          </strong>
        )}
      </div>
      <h3 className="mt-[30px] text-[clamp(1.55rem,2.6vw,2.35rem)] font-[760] leading-[1.02] tracking-[-0.03em]">
        {service.name}
      </h3>
      <p className="mt-4 leading-[1.65] text-navy-soft">{service.description}</p>
      <ul className="mt-auto grid gap-[11px] list-none pt-7">
        {service.gains.map((gain) => (
          <li key={gain} className="bullet-gold relative pl-5">
            {gain}
          </li>
        ))}
      </ul>
    </article>
  );
}

function TimelineCard({
  step,
  index,
}: {
  step: OnboardingStep;
  index: number;
}) {
  return (
    <article className="timeline-bar relative min-h-[370px] border border-line bg-white/[0.94] rounded-sm p-[clamp(22px,3vw,32px)] shadow-[0_1px_0_rgba(255,255,255,0.8)_inset]">
      <div className="flex items-center justify-between gap-4">
        <span className="text-[2.25rem] font-extrabold leading-none tracking-[-0.04em] text-navy">
          {String(index + 1).padStart(2, "0")}
        </span>
        <small className="font-display text-[0.78rem] uppercase leading-tight text-gold">
          {step.period}
        </small>
      </div>
      <h3 className="mt-[34px] text-[clamp(1.45rem,2.4vw,2.05rem)] font-[760] leading-[1.02] tracking-[-0.025em]">
        {step.phase}
      </h3>
      <p className="mt-3 leading-[1.65] text-navy-soft">{step.objective}</p>
      <ul className="mt-[26px] grid gap-[10px] list-none">
        {step.items.map((item) => (
          <li key={item} className="bullet-gold relative pl-5">
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

function TabNav() {
  const [activeId, setActiveId] = useState(navigationItems[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );

    for (const item of navigationItems) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-[100] flex bg-navy border-t-2 border-gold tab-nav-safe-bottom [webkit-overflow-scrolling:touch] md:top-1/2 md:left-5 md:right-auto md:bottom-auto md:flex-col md:gap-1 md:max-w-fit md:border-t-0 md:rounded-r-tab md:bg-navy md:shadow-[0_8px_32px_rgba(5,45,80,0.18),0_2px_8px_rgba(0,0,0,0.08)] md:p-1.5 md:-translate-y-1/2"
      aria-label="Navegação por seções"
    >
      {navigationItems.map((item, index) => {
        const isCta = index === navigationItems.length - 1;
        const isActive = activeId === item.id;
        const Icon = item.icon;

        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "group relative flex min-h-[52px] flex-1 items-center justify-center px-3 py-2.5 text-center font-semibold text-white/[0.65] text-[0.82rem] whitespace-nowrap no-underline transition-colors duration-150 md:flex-none md:rounded-sm md:px-2.5",
              isActive && "bg-yellow-500/[0.12] text-yellow-400",
              isCta && "flex-[1.3] bg-gold font-[750] text-navy md:flex-none md:rounded-sm",
              isCta && isActive && "bg-yellow text-navy",
            )}
            onClick={(e) => handleClick(e, item.id)}
            aria-current={isActive ? "location" : undefined}
          >
            <Icon size={18} />
            <span className="pointer-events-none absolute whitespace-nowrap text-[0.82rem] font-semibold opacity-0 transition-opacity duration-150 md:left-[calc(100%+10px)] md:top-1/2 md:-translate-y-1/2 md:bg-white md:text-navy md:rounded-md md:px-2.5 md:py-1 md:shadow-[0_4px_16px_rgba(5,45,80,0.15)] group-hover:opacity-100">
              {item.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}

function App() {
  return (
    <main className="proposal-page-bg relative min-h-[100svh] overflow-x-hidden break-words pb-[72px] bg-gradient-to-b from-page-bg via-white to-surface-muted text-navy md:pl-[72px]">
      <section
        id="inicio"
        className="px-0 py-7 md:pb-[clamp(72px,9vw,112px)] md:pt-7"
        aria-labelledby="proposal-title"
      >
        <div className="relative z-[1] mx-auto w-[min(var(--container),calc(100%-40px))] max-w-[calc(100vw-40px)]">
          <header className="flex flex-col items-start justify-start gap-6 pb-[54px] md:flex-row">
            <img
              src={brandConfig.logo}
              alt={brandConfig.companyName}
              className="h-auto w-[clamp(124px,15vw,178px)] drop-shadow-[0_14px_30px_rgba(5,45,80,0.12)]"
              width="1254"
              height="1254"
              fetchPriority="high"
              decoding="async"
            />
          </header>

          <div className="grid grid-cols-1 items-center gap-[clamp(36px,7vw,92px)] lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
            <div className="min-w-0 max-w-[760px]">
              <p className="font-display mb-[18px] text-[0.78rem] uppercase leading-tight text-gold">
                Para {proposalContent.recipientName}
              </p>
              <h1
                id="proposal-title"
                className="max-w-[760px] text-[clamp(3.2rem,7.2vw,6.65rem)] font-[760] leading-[1.02] tracking-[-0.035em]"
              >
                {proposalContent.title}
              </h1>
              <p className="mt-7 max-w-[650px] text-[clamp(1.05rem,1.7vw,1.28rem)] leading-[1.7] text-navy-soft">
                {proposalContent.summary}
              </p>
            </div>

             <aside
               className="min-w-0 border border-line rounded-sm bg-white/[0.94] p-[clamp(24px,4vw,38px)] shadow-[0_24px_70px_rgba(5,45,80,0.09)]"
               aria-label="Apresentação da NIX"
             >
               <h2 className="mt-[18px] text-[clamp(1.9rem,3vw,2.7rem)] font-[760] leading-[1.02] tracking-[-0.025em]">
                 {proposalContent.heroTagline}
               </h2>
              <p className="mt-3 font-[750] text-gold">{brandConfig.tagline}</p>
              <dl className="mt-8 grid gap-4 border-t border-line pt-6">
                <div className="inline-flex min-h-[34px] items-center justify-center rounded-full border border-gold/[0.72] bg-yellow px-[14px] text-navy shadow-[0_10px_24px_rgba(253,185,17,0.18)] font-display text-[0.78rem] leading-tight uppercase md:min-h-[58px] md:px-[30px] md:text-[0.98rem] md:shadow-[0_18px_36px_rgba(253,185,17,0.22)]">
                  {brandConfig.contactLabel}
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section
        id="quem-somos"
        className="border-t border-[rgba(5,45,80,0.08)] py-[64px] md:py-[clamp(72px,9vw,112px)]"
        aria-labelledby="profile-title"
      >
        <div className="relative z-[1] mx-auto w-[min(var(--container),calc(100%-40px))] max-w-[calc(100vw-40px)]">
          <SectionHeader
            eyebrow="Quem somos"
            id="profile-title"
            title={proposalContent.companyProfile.title}
          />
          <div className="grid grid-cols-1 items-start gap-[clamp(32px,6vw,72px)] lg:grid-cols-[minmax(0,0.78fr)_minmax(420px,1fr)]">
            <p className="text-[clamp(1.05rem,1.5vw,1.22rem)] leading-[1.75] text-navy-soft">
              {proposalContent.companyProfile.text}
            </p>
            <div
              className="grid grid-cols-1 gap-[14px] md:grid-cols-3"
              aria-label="Indicadores da NIX"
            >
              {proposalContent.proofPoints.map((point) => (
                <MetricCard key={point.label} point={point} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="por-que-a-nix"
        className="border-t border-[rgba(5,45,80,0.08)] py-[64px] md:py-[clamp(72px,9vw,112px)]"
        aria-labelledby="why-title"
      >
        <div className="relative z-[1] mx-auto w-[min(var(--container),calc(100%-40px))] max-w-[calc(100vw-40px)]">
          <SectionHeader
            eyebrow="Por que a NIX"
            id="why-title"
            title="Gestão simples, segura e próxima."
            description="Princípios claros para organizar a rotina da empresa, reduzir ruídos e manter a operação em conformidade."
          />
          <div className="grid gap-[44px]">
            <div>
              <p className="mb-4 text-[0.96rem] font-[760] uppercase leading-tight text-navy-muted">
                Nosso DNA
              </p>
              <div className="grid grid-cols-1 gap-[14px] md:grid-cols-3">
                {proposalContent.dna.map((block, index) => (
                  <TextCard
                    key={block.title}
                    block={block}
                    marker={`0${index + 1}`}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="mb-4 text-[0.96rem] font-[760] uppercase leading-tight text-navy-muted">
                Valores
              </p>
              <div className="grid grid-cols-1 gap-[14px] md:grid-cols-2 lg:grid-cols-4">
                {proposalContent.values.map((value) => (
                  <TextCard key={value.title} block={value} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="frentes-de-atuacao"
        className="border-t border-[rgba(5,45,80,0.08)] bg-gradient-to-b from-page-bg-soft/[0.62] to-white/[0.78] py-[64px] md:py-[clamp(72px,9vw,112px)]"
        aria-labelledby="services-title"
      >
        <div className="relative z-[1] mx-auto w-[min(var(--container),calc(100%-40px))] max-w-[calc(100vw-40px)]">
          <SectionHeader
            eyebrow="Frentes de atuação"
            id="services-title"
            title="Contabilidade, fiscal, trabalhista e RH."
            description="Serviços organizados para dar clareza, segurança e suporte próximo em cada etapa da operação."
            align="center"
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {proposalContent.serviceFronts.map((service) => (
              <ServiceCard key={service.name} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="segmentos"
        className="border-t border-[rgba(5,45,80,0.08)] py-[64px] md:py-[clamp(72px,9vw,112px)]"
        aria-labelledby="segments-title"
      >
        <div className="relative z-[1] mx-auto grid w-[min(var(--container),calc(100%-40px))] max-w-[calc(100vw-40px)] grid-cols-1 items-start gap-[clamp(34px,7vw,82px)] lg:grid-cols-[minmax(0,0.72fr)_minmax(420px,1fr)]">
          <SectionHeader
            eyebrow="Segmentos atendidos"
            id="segments-title"
            title="Atuação ampla para operações em expansão."
          />
          <ul className="flex flex-wrap gap-2.5" aria-label="Segmentos atendidos">
            {proposalContent.segments.map((segment) => (
              <li
                key={segment}
                className="inline-flex min-h-[42px] items-center border border-line rounded-full bg-white/[0.88] px-[15px] font-[680] leading-tight text-navy-soft max-sm:min-h-[38px] max-sm:text-[0.94rem]"
              >
                {segment}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="plano-90-dias"
        className="border-t border-[rgba(5,45,80,0.08)] py-[64px] md:py-[clamp(72px,9vw,112px)]"
        aria-labelledby="onboarding-title"
      >
        <div className="relative z-[1] mx-auto w-[min(var(--container),calc(100%-40px))] max-w-[calc(100vw-40px)]">
          <SectionHeader
            eyebrow="Plano 90 dias"
            id="onboarding-title"
            title="Em 30 dias organizamos. Em 90 dias evoluímos."
            description="Um início em fases para reduzir riscos na transição, estabilizar a rotina e criar base para melhorias."
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {proposalContent.onboardingSteps.map((step, index) => (
              <TimelineCard key={step.phase} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="proposta"
        className="border-t border-[rgba(5,45,80,0.08)] py-[64px] pb-[clamp(56px,8vw,88px)] md:py-[clamp(72px,9vw,112px)]"
        aria-labelledby="terms-title"
      >
        <div className="relative z-[1] mx-auto grid w-[min(var(--container),calc(100%-40px))] max-w-[calc(100vw-40px)] grid-cols-1 items-stretch gap-[18px] lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.72fr)]">
          <div className="border border-line rounded-sm bg-white/[0.94] p-[clamp(22px,3vw,32px)] shadow-[0_1px_0_rgba(255,255,255,0.8)_inset]">
            <SectionHeader
              eyebrow="Condições"
              id="terms-title"
              title="A proposta é personalizada para cada operação."
            />
            <ul className="grid gap-[14px] list-none">
              {proposalContent.terms.map((term) => (
                <li key={term} className="bullet-gold relative pl-5">
                  {term}
                </li>
              ))}
            </ul>
          </div>

          <aside
            className="flex flex-col justify-between border border-line rounded-sm bg-navy p-[clamp(22px,3vw,32px)] shadow-[0_1px_0_rgba(255,255,255,0.8)_inset]"
            aria-label="Próximo passo"
          >
            <div>
              <span className="font-display text-[0.78rem] uppercase leading-tight text-yellow">
                Próximo passo
              </span>
              <h2 className="mt-[18px] text-[clamp(1.75rem,3vw,2.55rem)] font-[760] leading-[1.02] tracking-[-0.03em] text-white">
                Validar os dados finais e avançar com a proposta NIX.
              </h2>
              <p className="mt-[18px] text-white/[0.72]">
                {proposalContent.cta.phone} · {proposalContent.cta.email} ·{" "}
                {proposalContent.cta.social}
              </p>
            </div>
            <a
              className="mt-[34px] inline-flex min-h-[52px] w-fit cursor-pointer items-center justify-center rounded-sm bg-gold px-[22px] font-[750] text-navy no-underline transition-all duration-[180ms] hover:bg-yellow hover:shadow-[0_12px_32px_rgba(5,45,80,0.18)] hover:-translate-y-px focus-visible:outline-[3px] focus-visible:outline-yellow focus-visible:outline-offset-4 md:w-full"
              href={proposalContent.cta.href}
            >
              {proposalContent.cta.label}
            </a>
          </aside>
        </div>
      </section>

      <TabNav />
    </main>
  );
}

export default App;
