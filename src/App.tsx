import type { FormEvent } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Briefcase,
  Building2,
  Check,
  Globe,
  Handshake,
  Home,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import "./index.css";
import {
  brandConfig,
  institutionalContent,
  type ContactField,
  type ProofPoint,
  type Segment,
  type ServiceFront,
  type TextBlock,
} from "./content";
import { cn } from "./lib/cn";

const navigationItems: { label: string; id: string; icon: LucideIcon }[] = [
  { label: "Início", id: "inicio", icon: Home },
  { label: "Quem somos", id: "quem-somos", icon: Building2 },
  { label: "Serviços", id: "servicos", icon: Briefcase },
  { label: "Diferenciais", id: "diferenciais", icon: Sparkles },
  { label: "Segmentos", id: "segmentos", icon: Globe },
  { label: "Contato", id: "contato", icon: MessageCircle },
];

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  id: string;
  align?: "left" | "center";
};

type MetricValueParts = {
  prefix: string;
  target: number;
  suffix: string;
};

type LeadFormValues = Record<ContactField["name"], string>;

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
      <span className="font-display text-lg uppercase leading-tight text-gold">
        {eyebrow}
      </span>
      <h2
        id={id}
        className="mt-3 text-[clamp(1.6rem,3.2vw,2.4rem)] font-[760] leading-[1.02] text-balance sm:text-[clamp(2.2rem,4vw,3.2rem)]"
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-[18px] max-w-[680px] text-[clamp(1rem,1.4vw,1.14rem)] leading-[1.65] text-navy-soft sm:max-w-[780px] sm:text-[clamp(1.08rem,1.6vw,1.24rem)]",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

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
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (
      !parts ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

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
          setDisplayValue(formatMetricValue(parts, 0));
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
  }, [parts, value]);

  return (
    <strong
      ref={nodeRef}
      aria-label={value}
      className="text-[clamp(2.2rem,4vw,3.5rem)] font-[760]"
    >
      {displayValue}
    </strong>
  );
}

function MetricCard({ point }: { point: ProofPoint }) {
  return (
    <article className="flex min-h-[150px] flex-col justify-between rounded-sm border border-line bg-white/[0.94] p-[22px] shadow-[0_1px_0_rgba(255,255,255,0.8)_inset]">
      <AnimatedMetricValue value={point.value} />
      <span className="leading-[1.45] text-navy-muted">{point.label}</span>
    </article>
  );
}

function TextCard({
  block,
  marker,
  dark = false,
}: {
  block: TextBlock;
  marker?: string;
  dark?: boolean;
}) {
  return (
    <article
      className={cn(
        "min-h-[190px] rounded-sm border p-[clamp(22px,3vw,32px)] shadow-[0_1px_0_rgba(255,255,255,0.8)_inset]",
        dark
          ? "border-white/[0.13] bg-white/[0.06] text-white shadow-[0_1px_0_rgba(255,255,255,0.08)_inset]"
          : "border-line bg-white/[0.94] text-navy",
      )}
    >
      {marker && (
        <span className="mb-6 inline-flex font-extrabold text-gold">
          {marker}
        </span>
      )}
      <h3 className="text-[clamp(1.24rem,2vw,1.68rem)] font-[760] leading-[1.02]">
        {block.title}
      </h3>
      <p
        className={cn(
          "mt-[14px] leading-[1.65]",
          dark ? "text-white/[0.78]" : "text-navy-soft",
        )}
      >
        {block.text}
      </p>
    </article>
  );
}

function ServiceCard({ service }: { service: ServiceFront }) {
  return (
    <article
      className={cn(
        "flex min-h-[390px] flex-col rounded-sm border border-line bg-white/[0.94] p-[clamp(22px,3vw,32px)] shadow-[0_1px_0_rgba(255,255,255,0.8)_inset]",
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
      <h3 className="mt-[30px] text-[clamp(1.55rem,2.6vw,2.35rem)] font-[760] leading-[1.02]">
        {service.name}
      </h3>
      <p className="mt-4 leading-[1.65] text-navy-soft">
        {service.description}
      </p>
      <ul className="mt-auto grid list-none gap-[11px] pt-7">
        {service.gains.map((gain) => (
          <li key={gain} className="bullet-gold relative pl-5">
            {gain}
          </li>
        ))}
      </ul>
    </article>
  );
}

function SegmentCard({ segment }: { segment: Segment }) {
  return (
    <article className="flex min-h-[190px] flex-col rounded-sm border border-line bg-white/[0.94] p-[clamp(20px,2.6vw,28px)] shadow-[0_1px_0_rgba(255,255,255,0.8)_inset]">
      <span className="mb-5 flex size-[42px] items-center justify-center rounded-full bg-gold/[0.16] text-gold">
        <Users size={22} strokeWidth={2.3} />
      </span>
      <h3 className="text-[clamp(1.18rem,1.8vw,1.45rem)] font-[760] leading-[1.08]">
        {segment.title}
      </h3>
      <p className="mt-3 leading-[1.62] text-navy-soft">{segment.text}</p>
    </article>
  );
}

function buildWhatsAppUrl(values: LeadFormValues) {
  const message = [
    "Olá, NIX! Gostaria de conversar sobre a minha empresa.",
    "",
    `Nome: ${values.name}`,
    `Empresa: ${values.company}`,
    `Telefone: ${values.phone}`,
    values.email ? `E-mail: ${values.email}` : null,
    values.message ? `Mensagem: ${values.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return `https://wa.me/${institutionalContent.contact.whatsappNumber}?text=${encodeURIComponent(
    message,
  )}`;
}

function LeadForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const values = institutionalContent.contact.fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]: String(formData.get(field.name) ?? "").trim(),
      }),
      {} as LeadFormValues,
    );

    window.open(buildWhatsAppUrl(values), "_blank", "noopener,noreferrer");
  }

  return (
    <form
      className="grid gap-4 rounded-sm border border-line bg-white/[0.94] p-[clamp(20px,3vw,30px)] shadow-[0_24px_70px_rgba(5,45,80,0.09)]"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {institutionalContent.contact.fields.map((field) => (
          <label
            key={field.name}
            className={cn(
              "grid gap-2 font-[720] text-navy",
              field.name === "message" && "md:col-span-2",
            )}
          >
            {field.label}
            {field.name === "message" ? (
              <textarea
                name={field.name}
                placeholder={field.placeholder}
                rows={5}
                className="min-h-[132px] resize-y rounded-sm border border-line bg-white px-4 py-3 font-[520] leading-[1.45] text-navy outline-none transition-colors focus:border-gold"
              />
            ) : (
              <input
                name={field.name}
                type={field.type ?? "text"}
                placeholder={field.placeholder}
                required={field.required}
                className="min-h-[48px] rounded-sm border border-line bg-white px-4 py-3 font-[520] leading-[1.2] text-navy outline-none transition-colors focus:border-gold"
              />
            )}
          </label>
        ))}
      </div>
      <button
        type="submit"
        className="inline-flex min-h-[52px] cursor-pointer items-center justify-center gap-2 rounded-sm bg-gold px-[22px] font-[750] text-navy transition-all duration-[180ms] hover:-translate-y-px hover:bg-yellow hover:shadow-[0_12px_32px_rgba(5,45,80,0.18)] focus-visible:outline-[3px] focus-visible:outline-yellow focus-visible:outline-offset-4"
      >
        <MessageCircle size={20} strokeWidth={2.5} />
        {institutionalContent.contact.ctaLabel}
      </button>
    </form>
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

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav
      className="tab-nav-safe-bottom fixed inset-x-0 bottom-0 z-[100] flex overflow-hidden border-t-2 border-gold bg-navy [webkit-overflow-scrolling:touch] md:top-1/2 md:right-auto md:bottom-auto md:left-5 md:max-w-fit md:-translate-y-1/2 md:flex-col md:gap-1 md:overflow-visible md:rounded-tab md:border-t-0 md:p-1.5 md:shadow-[0_8px_32px_rgba(5,45,80,0.18),0_2px_8px_rgba(0,0,0,0.08)]"
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
              "group relative flex min-h-[44px] flex-1 items-center justify-center px-3 py-2 text-center text-[0.82rem] font-semibold whitespace-nowrap text-white/[0.65] no-underline transition-colors duration-150 md:flex-none md:rounded-sm md:px-2.5",
              isActive && "bg-yellow-500/[0.12] text-yellow-400",
              isCta && "flex-[1.3] bg-gold font-[750] text-navy md:flex-none",
              isCta && isActive && "bg-yellow text-navy",
            )}
            onClick={(event) => handleClick(event, item.id)}
            aria-label={item.label}
            aria-current={isActive ? "location" : undefined}
          >
            <Icon size={18} />
            <span className="pointer-events-none absolute z-50 hidden text-[0.82rem] font-semibold whitespace-nowrap opacity-0 transition-opacity duration-150 md:top-1/2 md:left-[calc(100%+10px)] md:block md:-translate-y-1/2 md:rounded-md md:bg-white md:px-2.5 md:py-1 md:text-navy md:shadow-[0_4px_16px_rgba(5,45,80,0.15)] md:group-hover:opacity-100">
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
    <main className="institutional-page-bg relative min-h-[100svh] overflow-x-hidden break-words bg-gradient-to-b from-page-bg via-white to-surface-muted pb-[72px] text-navy md:pl-[72px]">
      <section
        id="inicio"
        className="px-0 py-7 md:pb-[clamp(72px,9vw,112px)] md:pt-7"
        aria-labelledby="site-title"
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
              <p className="mb-[18px] font-display text-lg uppercase leading-tight text-gold">
                {institutionalContent.heroTagline}
              </p>
              <h1
                id="site-title"
                className="max-w-[780px] text-[clamp(3.2rem,7.2vw,6.65rem)] font-[760] leading-[1.02] text-gold"
              >
                {institutionalContent.title}
              </h1>
              <p className="mt-7 max-w-[650px] text-[clamp(1.05rem,1.7vw,1.28rem)] leading-[1.7] text-navy-soft">
                {institutionalContent.summary}
              </p>
              <a
                className="mt-8 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-sm bg-gold px-[22px] font-[750] text-navy no-underline transition-all duration-[180ms] hover:-translate-y-px hover:bg-yellow hover:shadow-[0_12px_32px_rgba(5,45,80,0.18)] focus-visible:outline-[3px] focus-visible:outline-yellow focus-visible:outline-offset-4"
                href="#contato"
              >
                <MessageCircle size={20} strokeWidth={2.5} />
                {brandConfig.contactLabel}
              </a>
            </div>

            <aside
              className="min-w-0 rounded-sm border border-line bg-white/[0.94] p-[clamp(24px,4vw,38px)] shadow-[0_24px_70px_rgba(5,45,80,0.09)]"
              aria-label="Apresentação da NIX"
            >
              <h2 className="mt-[18px] text-[clamp(1.9rem,3vw,2.7rem)] font-[760] leading-[1.02]">
                {brandConfig.companyName}
              </h2>
              <p className="mt-3 font-[750] text-gold">{brandConfig.tagline}</p>
              <dl className="mt-8 grid gap-4 border-t border-line pt-6">
                {institutionalContent.proofPoints.map((point) => (
                  <div key={point.label} className="grid gap-1">
                    <dt className="text-[0.92rem] text-navy-muted">
                      {point.label}
                    </dt>
                    <dd className="text-[1.35rem] font-[760] text-navy">
                      {point.value}
                    </dd>
                  </div>
                ))}
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
            eyebrow={institutionalContent.companyProfile.label}
            id="profile-title"
            title={institutionalContent.companyProfile.title}
          />
          <div className="grid grid-cols-1 items-start gap-[clamp(32px,6vw,72px)] lg:grid-cols-[minmax(0,0.78fr)_minmax(420px,1fr)]">
            <p className="text-[clamp(1.05rem,1.5vw,1.22rem)] leading-[1.75] text-navy-soft">
              {institutionalContent.companyProfile.text}
            </p>
            <div
              className="grid grid-cols-1 gap-[14px] md:grid-cols-3"
              aria-label="Indicadores da NIX"
            >
              {institutionalContent.proofPoints.map((point) => (
                <MetricCard key={point.label} point={point} />
              ))}
            </div>
          </div>

          <div className="mt-[clamp(44px,7vw,76px)] grid gap-[44px]">
            <div>
              <p className="mb-4 text-[0.96rem] font-[760] uppercase leading-tight text-navy-muted">
                Nosso DNA
              </p>
              <div className="grid grid-cols-1 gap-[14px] md:grid-cols-3">
                {institutionalContent.dna.map((block, index) => (
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
                {institutionalContent.values.map((value) => (
                  <TextCard key={value.title} block={value} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="servicos"
        className="border-t border-[rgba(5,45,80,0.08)] bg-gradient-to-b from-page-bg-soft/[0.62] to-white/[0.78] py-[64px] md:py-[clamp(72px,9vw,112px)]"
        aria-labelledby="services-title"
      >
        <div className="relative z-[1] mx-auto w-[min(var(--container),calc(100%-40px))] max-w-[calc(100vw-40px)]">
          <SectionHeader
            eyebrow="Serviços"
            id="services-title"
            title="Contabilidade, fiscal, DP, RH e estratégia em uma só parceria."
            description="Frentes integradas para dar clareza, segurança e suporte próximo em cada etapa da operação."
            align="center"
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
            {institutionalContent.serviceFronts.map((service) => (
              <ServiceCard key={service.name} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="diferenciais"
        className="border-t border-[rgba(5,45,80,0.08)] bg-navy py-[64px] text-white md:py-[clamp(72px,9vw,112px)]"
        aria-labelledby="differentials-title"
      >
        <div className="relative z-[1] mx-auto w-[min(var(--container),calc(100%-40px))] max-w-[calc(100vw-40px)]">
          <SectionHeader
            eyebrow="Diferenciais"
            id="differentials-title"
            title="Tecnologia, proximidade e visão estratégica aplicadas à rotina."
            description="A NIX une ferramentas, atendimento humano e leitura consultiva para transformar obrigações em controle e crescimento."
            align="center"
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {institutionalContent.differentials.map((item) => (
              <TextCard key={item.title} block={item} dark />
            ))}
          </div>
        </div>
      </section>

      <section
        id="segmentos"
        className="border-t border-[rgba(5,45,80,0.08)] py-[64px] md:py-[clamp(72px,9vw,112px)]"
        aria-labelledby="segments-title"
      >
        <div className="relative z-[1] mx-auto w-[min(var(--container),calc(100%-40px))] max-w-[calc(100vw-40px)]">
          <SectionHeader
            eyebrow="Segmentos"
            id="segments-title"
            title="Atuação ampla para empresas que precisam de gestão consistente."
            description="A NIX atende diferentes modelos de negócio com o mesmo compromisso: rotina organizada, comunicação próxima e decisões com base em dados."
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {institutionalContent.segments.map((segment) => (
              <SegmentCard key={segment.title} segment={segment} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="contato"
        className="border-t border-[rgba(5,45,80,0.08)] py-[64px] pb-[clamp(56px,8vw,88px)] md:py-[clamp(72px,9vw,112px)]"
        aria-labelledby="contact-title"
      >
        <div className="relative z-[1] mx-auto grid w-[min(var(--container),calc(100%-40px))] max-w-[calc(100vw-40px)] grid-cols-1 items-start gap-[clamp(34px,7vw,82px)] lg:grid-cols-[minmax(0,0.72fr)_minmax(420px,1fr)]">
          <div>
            <SectionHeader
              eyebrow="Contato"
              id="contact-title"
              title={institutionalContent.contact.title}
              description={institutionalContent.contact.description}
            />
            <div className="grid gap-4">
              <a
                className="inline-flex min-h-[48px] w-fit items-center gap-3 rounded-sm border border-gold/[0.5] bg-yellow px-[18px] py-[12px] font-[760] text-navy no-underline transition-all hover:-translate-y-px hover:bg-gold"
                href={`https://wa.me/${institutionalContent.contact.whatsappNumber}`}
              >
                <Phone size={20} strokeWidth={2.4} />
                {institutionalContent.contact.whatsappDisplay}
              </a>
              <p className="flex items-center gap-3 text-navy-soft">
                <Mail size={20} strokeWidth={2.4} className="text-gold" />
                {institutionalContent.contact.email}
              </p>
              <p className="flex items-center gap-3 text-navy-soft">
                <Handshake size={20} strokeWidth={2.4} className="text-gold" />
                {institutionalContent.contact.social}
              </p>
              <div className="mt-5 grid gap-3 rounded-sm border border-line bg-white/[0.72] p-5">
                <p className="flex items-start gap-3 font-[720] text-navy">
                  <ShieldCheck
                    size={22}
                    strokeWidth={2.4}
                    className="mt-0.5 flex-none text-gold"
                  />
                  Atendimento consultivo para entender o momento da sua empresa
                  antes de propor o melhor caminho.
                </p>
                <p className="flex items-start gap-3 font-[720] text-navy">
                  <BarChart3
                    size={22}
                    strokeWidth={2.4}
                    className="mt-0.5 flex-none text-gold"
                  />
                  Rotina contábil, fiscal e de pessoas conectada a decisões de
                  gestão.
                </p>
                <p className="flex items-start gap-3 font-[720] text-navy">
                  <Check
                    size={22}
                    strokeWidth={2.4}
                    className="mt-0.5 flex-none text-gold"
                  />
                  Sem backend nesta versão: o envio abre uma conversa no
                  WhatsApp com os dados preenchidos.
                </p>
              </div>
            </div>
          </div>
          <LeadForm />
        </div>
      </section>

      <TabNav />
    </main>
  );
}

export default App;
