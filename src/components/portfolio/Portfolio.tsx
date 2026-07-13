import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowUp,
  Download,
  ExternalLink,
  Menu,
  X,
  MapPin,
  Mail,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Send,
  Sun,
  Moon,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import avatarImg from "@/assets/profile.jpeg";
import {
  NAV,
  SOCIALS,
  STATS,
  ROLES,
  SKILL_CATEGORIES,
  TECH_STACK,
  EXPERIENCE,
  EDUCATION,
  CERTIFICATIONS,
  ACHIEVEMENTS,
  PROJECTS,
  PUBLICATIONS,
  OSS,
  SERVICES,
  TESTIMONIALS,
  ICONS,
} from "./data";

/* ---------- Small primitives ---------- */

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="mb-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
      <span>{index}</span>
      <span className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent" />
      <span className="text-muted-foreground">{children}</span>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-8 max-w-3xl text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
      {children}
    </h2>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function TypingRoles() {
  const [i, setI] = useState(0);
  const [display, setDisplay] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = ROLES[i % ROLES.length];
    const speed = deleting ? 40 : 80;
    const timer = setTimeout(() => {
      if (!deleting) {
        const next = target.slice(0, display.length + 1);
        setDisplay(next);
        if (next === target) setTimeout(() => setDeleting(true), 1400);
      } else {
        const next = target.slice(0, display.length - 1);
        setDisplay(next);
        if (next === "") {
          setDeleting(false);
          setI((v) => v + 1);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [display, deleting, i]);

  return (
    <span className="text-gradient font-mono">{display}<span className="cursor-blink" /></span>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setValue(Math.floor(p * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{value.toLocaleString()}{suffix}</span>;
}

/* ---------- Layout: nav, progress, back-to-top ---------- */

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && setActive(id)),
        { rootMargin: "-40% 0px -55% 0px" },
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);
  return active;
}

function FloatingNav() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <>
      <nav className="fixed left-1/2 top-4 z-50 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-border bg-surface/70 px-2 py-2 shadow-2xl backdrop-blur-xl md:flex">
        <a href="#home" className="mx-2 font-mono text-xs font-bold tracking-tighter text-accent">
          NS_01
        </a>
        <div className="mx-1 h-4 w-px bg-border" />
        {NAV.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            className={`relative rounded-full px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors ${active === n.id ? "text-background" : "text-muted-foreground hover:text-foreground"
              }`}
          >
            {active === n.id && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 -z-10 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            {n.label}
          </a>
        ))}
        <div className="mx-1 h-4 w-px bg-border" />
        <button
          aria-label="Toggle theme"
          onClick={() => setDark((v) => !v)}
          className="grid size-8 place-items-center rounded-full text-muted-foreground hover:text-accent"
        >
          {dark ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </button>
      </nav>

      {/* Mobile */}
      <div className="fixed left-4 right-4 top-4 z-50 flex items-center justify-between rounded-full border border-border bg-surface/80 px-4 py-3 backdrop-blur-xl md:hidden">
        <a href="#home" className="font-mono text-xs font-bold text-accent">NS_01</a>
        <button aria-label="Menu" onClick={() => setOpen(true)} className="text-foreground">
          <Menu className="size-5" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between p-6">
              <span className="font-mono text-xs font-bold text-accent">NS_01</span>
              <button aria-label="Close" onClick={() => setOpen(false)}>
                <X className="size-6" />
              </button>
            </div>
            <div className="flex flex-col items-center gap-6 pt-16">
              {NAV.map((n, i) => (
                <motion.a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-3xl font-bold tracking-tight"
                >
                  {n.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const w = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      style={{ scaleX: w, transformOrigin: "0% 50%" }}
      className="fixed left-0 top-0 z-[70] h-0.5 w-full bg-gradient-to-r from-accent via-accent-2 to-accent-3"
    />
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 grid size-12 place-items-center rounded-xl border border-border bg-surface text-foreground shadow-2xl transition-colors hover:border-accent hover:text-accent"
          aria-label="Back to top"
        >
          <ArrowUp className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ---------- Sections ---------- */

function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center px-6 pt-32 md:pt-24">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-orb absolute -left-40 top-20 h-[40rem] w-[40rem] rounded-full bg-accent-2/20 blur-[120px]" />
        <div
          className="animate-orb absolute -right-40 top-1/3 h-[40rem] w-[40rem] rounded-full bg-accent/20 blur-[120px]"
          style={{ animationDelay: "-4s" }}
        />
        <div
          className="animate-orb absolute bottom-0 left-1/3 h-[30rem] w-[30rem] rounded-full bg-accent-3/15 blur-[120px]"
          style={{ animationDelay: "-8s" }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-accent/25 bg-accent/5 px-3 py-1"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
              Available for AI & Full-Stack roles
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl"
          >
            BUILDING
            <br />
            <span className="text-gradient italic">INTELLIGENT</span>
            <br />
            INFRASTRUCTURE
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 font-mono text-lg text-muted-foreground"
          >
            I'm Nandan S — <TypingRoles />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 max-w-xl text-pretty leading-relaxed text-muted-foreground"
          >
            AI Engineer building intelligent, scalable, and user-centric applications
            by combining Generative AI, Machine Learning, Full-Stack Development,
            and modern technologies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-xs font-bold uppercase tracking-widest text-background transition-transform hover:-translate-y-0.5"
            >
              View Projects
              <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="/nandan_s_resume.pdf"
              download="Nandan_S_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-xs font-bold uppercase tracking-widest backdrop-blur transition-colors hover:border-accent hover:text-accent"
            >
              <Download className="size-4" /> Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-10 flex items-center gap-5 text-muted-foreground"
          >
            {SOCIALS.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="transition-colors hover:text-accent"
                >
                  <Icon className="size-5" />
                </a>
              );
            })}
          </motion.div>
        </div>

        {/* Portrait card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-accent/30 via-accent-2/30 to-accent-3/30 blur-2xl" />
          <div className="glass relative overflow-hidden rounded-3xl">
            <img
              src={avatarImg}
              alt="Portrait of Nandan S"
              width={768}
              height={768}
              className="aspect-square w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/70 to-transparent p-5">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">

                <span className="flex items-center gap-1.5 text-accent-4">
                  <span className="size-1.5 animate-pulse rounded-full bg-accent-4" /> ONLINE
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TechMarquee() {
  const items = [...TECH_STACK, ...TECH_STACK];
  return (
    <div className="relative overflow-hidden border-y border-border bg-surface/40 py-6">
      <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
        {items.map((t, i) => (
          <span key={i} className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
            <span className="mr-4 text-accent">◆</span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <SectionLabel index="01">About</SectionLabel>
      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <SectionHeading>
            Bridging <span className="text-gradient">machine intelligence</span> and human interfaces.
          </SectionHeading>
          <div className="space-y-4 text-pretty leading-relaxed text-muted-foreground">
            <p>
              I'm a passionate Full-Stack Developer and AI Engineer who enjoys transforming ideas into intelligent,
              scalable applications. My work combines Generative AI, machine learning, backend engineering,
              and modern web technologies to build solutions that are innovative, user-focused, and impactful.
            </p>
            <p>
              Recent focus: Retrieval-Augmented systems (RAG), agentic workflows,
              & the developer tooling around them. When I'm
              not writing code, I'm exploring new things, or
              learning new frameworks.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="glass rounded-2xl p-6 transition-colors hover:border-accent/40"
              >
                <div className="font-mono text-3xl font-extrabold text-gradient">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="border-y border-border bg-surface/40 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="02">Skills · Stack</SectionLabel>
        <SectionHeading>The tools I reach for.</SectionHeading>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {SKILL_CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <Reveal key={cat.key} delay={i * 0.05}>
                <div
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background/60 p-5 transition-transform hover:-translate-y-1"
                  style={{ boxShadow: `0 0 0 1px transparent` }}
                >
                  <div
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(300px circle at 50% 0%, ${cat.color}22, transparent 60%)`,
                    }}
                  />
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className="grid size-9 place-items-center rounded-lg"
                      style={{ background: `${cat.color}1a`, color: cat.color }}
                    >
                      <Icon className="size-4" />
                    </div>
                    <h3 className="text-sm font-semibold uppercase tracking-widest">
                      {cat.label}
                    </h3>
                  </div>
                  <ul className="flex flex-1 flex-col justify-between gap-3">
                    {cat.items.map((it) => (
                      <li key={it.name}>
                        <div className="mb-1 flex items-center justify-between font-mono text-xs">
                          <span className="text-foreground/90">{it.name}</span>
                          <span style={{ color: cat.color }}>{it.level}%</span>
                        </div>
                        <div className="h-1 overflow-hidden rounded-full bg-muted">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${it.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{ background: cat.color }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-24">
      <SectionLabel index="03">Experience</SectionLabel>
      <SectionHeading>A brief operating history.</SectionHeading>
      <div className="relative ml-3 space-y-12 border-l border-border pl-10">
        {EXPERIENCE.map((e, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="relative">
              <span
                className="absolute -left-[46px] top-1 grid size-4 place-items-center rounded-full"
                style={{ background: e.color, boxShadow: `0 0 20px ${e.color}` }}
              />
              <p className="mb-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {e.period}
              </p>
              <h3 className="text-xl font-bold">{e.role}</h3>
              <p className="mb-3 font-mono text-sm" style={{ color: e.color }}>
                @ {e.company}
              </p>
              <ul className="max-w-2xl space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                {e.bullets.map((b, k) => (
                  <li key={k} className="flex gap-2">
                    <ChevronRight className="mt-1 size-3 shrink-0 text-accent" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function EducationCerts() {
  return (
    <section className="border-y border-border bg-surface/40 px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
        <div>
          <SectionLabel index="04">Education</SectionLabel>
          <div className="space-y-4">
            {EDUCATION.map((ed, i) => (
              <Reveal key={i}>
                <div className="glass rounded-2xl p-6">
                  <div className="mb-2 flex items-center gap-2 text-accent">
                    <ICONS.GraduationCap className="size-4" />
                    <span className="font-mono text-xs uppercase tracking-widest">
                      {ed.period}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold">{ed.school}</h3>
                  <p className="text-sm text-muted-foreground">{ed.place}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{ed.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10">
            <SectionLabel index="05">Achievements</SectionLabel>
            <ul className="space-y-3">
              {ACHIEVEMENTS.map((a, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <li className="flex gap-3 rounded-xl border border-border bg-background/50 p-4">
                    <ICONS.Award className="mt-0.5 size-4 shrink-0 text-accent-5" />
                    <div>
                      <p className="text-sm font-semibold">{a.title}</p>
                      <p className="text-xs text-muted-foreground">{a.detail}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <SectionLabel index="06">Certifications</SectionLabel>
          <div className="grid gap-4 sm:grid-cols-2">
            {CERTIFICATIONS.map((c, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-background/50 p-5 transition-colors hover:border-accent/40">
                  <ICONS.Sparkles className="mb-3 size-4 text-accent" />
                  <h4 className="text-sm font-bold leading-snug">{c.title}</h4>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    {c.issuer} · {c.year}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      <SectionLabel index="07">Projects</SectionLabel>
      <div className="mb-10 flex items-end justify-between">
        <SectionHeading>Selected works.</SectionHeading>
        <a
          href="https://github.com/nandu160903"
          className="hidden font-mono text-xs uppercase tracking-widest text-accent hover:underline sm:block"
        >
          Browse all →
        </a>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {PROJECTS.map((p, i) => {
          const Icon = p.icon;
          const isOpen = open === i;
          return (
            <Reveal key={p.title} delay={(i % 2) * 0.08}>
              <motion.article
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-background/60 transition-colors hover:border-accent/40"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    width={1200}
                    height={750}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-accent/30 bg-background/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent backdrop-blur">
                    <Icon className="size-3" /> {p.tag}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-border bg-surface px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                          {p.features.map((f) => (
                            <li key={f} className="flex items-center gap-2">
                              <CheckCircle2 className="size-3.5 text-accent-4" /> {f}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex gap-3">
                      <a
                        href={p.github}
                        aria-label="GitHub"
                        className="text-muted-foreground hover:text-accent"
                      >
                        <FaGithub className="size-4" />
                      </a>
                      <a
                        href={p.demo}
                        aria-label="Live demo"
                        className="text-muted-foreground hover:text-accent"
                      >
                        <ExternalLink className="size-4" />
                      </a>
                    </div>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="font-mono text-[10px] uppercase tracking-widest text-accent hover:underline"
                    >
                      {isOpen ? "Hide details" : "Details →"}
                    </button>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function PublicationsOSS() {
  return (
    <section id="publications" className="border-y border-border bg-surface/40 px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
        <div>
          <SectionLabel index="08">Publications</SectionLabel>
          <SectionHeading>Research & writing.</SectionHeading>
          <div className="space-y-3">
            {PUBLICATIONS.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <a
                  href={p.href}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-background/50 p-5 transition-colors hover:border-accent/40"
                >
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
                      {p.venue} · {p.year}
                    </p>
                    <h4 className="mt-1 text-base font-bold leading-snug">{p.title}</h4>
                  </div>
                  <Download className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-y-0.5 group-hover:text-accent" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        <div>
          <SectionLabel index="09">Open Source</SectionLabel>
          <SectionHeading>Contributions.</SectionHeading>
          <div className="space-y-3">
            {OSS.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <a
                  href={p.href}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-background/50 p-5 transition-colors hover:border-accent/40"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <FaGithub className="size-4 text-muted-foreground" />
                      <h4 className="text-base font-bold">{p.title}</h4>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{p.detail}</p>
                  </div>
                  <ExternalLink className="size-4 shrink-0 text-muted-foreground group-hover:text-accent" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionLabel index="08">Services</SectionLabel>
      <SectionHeading>What I can build for you.</SectionHeading>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.title} delay={i * 0.05}>
              <div
                className="group relative overflow-hidden rounded-2xl border border-border bg-background/60 p-6 transition-transform hover:-translate-y-1"
              >
                <div
                  className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(400px circle at 50% -20%, ${s.color}22, transparent 60%)`,
                  }}
                />
                <div
                  className="mb-5 grid size-11 place-items-center rounded-xl"
                  style={{ background: `${s.color}1a`, color: s.color }}
                >
                  <Icon className="size-5" />
                </div>
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.detail}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  const next = () => setI((v) => (v + 1) % TESTIMONIALS.length);
  const prev = () => setI((v) => (v - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const t = TESTIMONIALS[i];
  return (
    <section className="border-y border-border bg-surface/40 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionLabel index="11">Testimonials</SectionLabel>
        <div className="glass relative overflow-hidden rounded-3xl p-10 text-center">
          <div className="pointer-events-none absolute -inset-24 bg-gradient-to-tr from-accent-2/10 via-transparent to-accent/10 blur-3xl" />
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <p className="text-balance text-xl italic leading-relaxed md:text-2xl">
                “{t.quote}”
              </p>
              <footer className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                <span className="text-accent">{t.name}</span> · {t.role}
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              aria-label="Previous"
              onClick={prev}
              className="grid size-9 place-items-center rounded-full border border-border hover:border-accent hover:text-accent"
            >
              <ChevronLeft className="size-4" />
            </button>
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, k) => (
                <button
                  key={k}
                  onClick={() => setI(k)}
                  aria-label={`Slide ${k + 1}`}
                  className={`h-1.5 rounded-full transition-all ${k === i ? "w-6 bg-accent" : "w-1.5 bg-border"
                    }`}
                />
              ))}
            </div>
            <button
              aria-label="Next"
              onClick={next}
              className="grid size-9 place-items-center rounded-full border border-border hover:border-accent hover:text-accent"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function GitHubStats() {
  // Fake contribution heatmap
  const weeks = 26;
  const days = 7;
  const cells = useMemo(
    () =>
      Array.from({ length: weeks * days }, () => {
        const r = Math.random();
        if (r < 0.35) return 0;
        if (r < 0.6) return 1;
        if (r < 0.82) return 2;
        if (r < 0.95) return 3;
        return 4;
      }),
    [],
  );
  const shades = ["rgba(255,255,255,0.05)", "rgba(0,245,255,0.2)", "rgba(0,245,255,0.4)", "rgba(0,245,255,0.65)", "rgba(0,245,255,0.9)"];
  const langs = [
    { name: "Python", pct: 42, color: "var(--accent-2)" },
    { name: "TypeScript", pct: 31, color: "var(--accent)" },
    { name: "Go", pct: 12, color: "var(--accent-4)" },
    { name: "Rust", pct: 8, color: "var(--accent-5)" },
    { name: "Other", pct: 7, color: "var(--accent-3)" },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionLabel index="12">GitHub · Activity</SectionLabel>
      <SectionHeading>Signal from the terminal.</SectionHeading>

      <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
        <Reveal>
          <div className="glass rounded-2xl p-6">
            <div className="mb-4 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <span>Contributions · last 26 weeks</span>
              <span className="text-accent">2,401 commits</span>
            </div>
            <div
              className="grid gap-1"
              style={{
                gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))`,
                gridAutoFlow: "column",
                gridTemplateRows: `repeat(${days}, minmax(0, 1fr))`,
              }}
            >
              {cells.map((v, k) => (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (k % 40) * 0.005 }}
                  className="aspect-square rounded-[2px]"
                  style={{ background: shades[v] }}
                />
              ))}
            </div>
            <div className="mt-4 flex items-center justify-end gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Less
              {shades.map((c, k) => (
                <span key={k} className="size-2.5 rounded-[2px]" style={{ background: c }} />
              ))}
              More
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass h-full rounded-2xl p-6">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Top languages
            </p>
            <div className="flex h-3 w-full overflow-hidden rounded-full">
              {langs.map((l) => (
                <div key={l.name} style={{ width: `${l.pct}%`, background: l.color }} />
              ))}
            </div>
            <ul className="mt-6 space-y-3 text-sm">
              {langs.map((l) => (
                <li key={l.name} className="flex items-center justify-between font-mono">
                  <span className="flex items-center gap-2">
                    <span className="size-2 rounded-full" style={{ background: l.color }} />
                    {l.name}
                  </span>
                  <span className="text-muted-foreground">{l.pct}%</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    setTimeout(() => setState("sent"), 900);
  };
  return (
    <section id="contact" className="border-t border-border bg-surface/40 px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2">
        <div>
          <SectionLabel index="09">Contact</SectionLabel>
          <h2 className="mb-6 text-5xl font-extrabold leading-[0.95] tracking-tight md:text-6xl">
            LET'S
            <br />
            <span className="text-gradient">COLLABORATE</span>
          </h2>
          <p className="mb-8 max-w-md text-muted-foreground">
            Open to full-time roles, freelance contracts, and interesting
            research collaborations. Fastest reply via email.
          </p>

          <ul className="space-y-3 font-mono text-sm">
            <li className="flex items-center gap-3">
              <Mail className="size-4 text-accent" /> nandannagarathna16@gmail.com
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="size-4 text-accent" /> Remote · GMT+5:30 (IN)
            </li>
            <li className="flex items-center gap-3">
              <span className="size-2 animate-pulse rounded-full bg-accent-4" />
              <span className="text-accent-4">Open To Work</span>
            </li>
          </ul>

          <div className="mt-10 flex gap-4">
            {SOCIALS.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid size-11 place-items-center rounded-xl border border-border bg-background/50 text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              required
              placeholder="Name"
              className="rounded-xl border border-border bg-background/60 px-4 py-3 font-mono text-xs uppercase tracking-widest outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
            />
            <input
              required
              type="email"
              placeholder="Email"
              className="rounded-xl border border-border bg-background/60 px-4 py-3 font-mono text-xs uppercase tracking-widest outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
            />
          </div>
          <input
            placeholder="Company / Subject"
            className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 font-mono text-xs uppercase tracking-widest outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
          />
          <textarea
            required
            rows={6}
            placeholder="Tell me about the project..."
            className="w-full resize-none rounded-xl border border-border bg-background/60 px-4 py-3 font-mono text-xs uppercase tracking-widest outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
          />
          <button
            type="submit"
            disabled={state !== "idle"}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 text-xs font-bold uppercase tracking-widest text-background transition-transform hover:-translate-y-0.5 disabled:opacity-70"
          >
            {state === "idle" && (
              <>
                Transmit <Send className="size-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
            {state === "sending" && "Transmitting..."}
            {state === "sent" && (
              <>
                <CheckCircle2 className="size-4" /> Message sent
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          © {new Date().getFullYear()} Nandan S.
        </p>
        <div className="flex gap-5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <a href="#home" className="hover:text-accent">Top</a>
          <a href="#projects" className="hover:text-accent">Work</a>
          <a href="#contact" className="hover:text-accent">Contact</a>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Loading screen + cursor ---------- */

function LoadingScreen() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 900);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground">
              Initializing
            </div>
            <div className="mt-3 text-3xl font-extrabold tracking-tight">
              <span className="text-gradient">NANDAN_S</span>
              <span className="cursor-blink" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Composed page ---------- */

export default function Portfolio() {
  return (
    <div className="relative min-h-screen">
      <LoadingScreen />
      <ScrollProgress />
      <FloatingNav />
      <Hero />
      <TechMarquee />
      <About />
      <Skills />
      <Experience />
      <EducationCerts />
      <Projects />
      <Services />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}
