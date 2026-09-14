import { useEffect, lazy, Suspense, useState, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  CheckCircle2,
  GraduationCap,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Sun,
  Terminal,
  X,
} from "lucide-react";
import { useTheme } from "@/contexts/theme-context";
import { ContactForm } from "@/components/contact-form";
import { HeroSceneFallback } from "@/components/hero-scene-fallback";

// The three.js/canvas stack is heavy — load it only after the rest of the
// page is interactive, instead of blocking first paint on it.
const HeroScene = lazy(() => import("@/components/hero-scene").then((m) => ({ default: m.HeroScene })));

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

const STATS = [
  { value: "20,000+", label: "lines shipped in SysNova CLI's Python codebase" },
  { value: "30", label: "security findings self-audited and remediated" },
  { value: "3", label: "tenant roles isolated at the database layer in MediNest" },
  { value: "41", label: "automated tests across both flagship projects" },
];

const SKILL_GROUPS = [
  { label: "Languages", dot: "chart-1", items: ["Python", "PHP", "JavaScript", "SQL", "HTML / CSS", "Bash"] },
  { label: "Backend & frameworks", dot: "chart-2", items: ["Laravel", "FastAPI", "REST API design", "SQLAlchemy", "Alembic"] },
  { label: "Databases", dot: "chart-3", items: ["MySQL / MariaDB", "PostgreSQL", "SQLite"] },
  { label: "DevOps & deployment", dot: "chart-4", items: ["Git", "GitHub Actions", "Railway", "Netlify", "Hostinger", "PyInstaller", "Inno Setup"] },
  {
    label: "Engineering practices",
    dot: "chart-1",
    items: [
      "Multi-tenant architecture",
      "RBAC & authentication",
      "Automated testing",
      "Concurrency control",
      "Security auditing",
    ],
  },
];

type Project = {
  index: string;
  slug: string;
  name: string;
  tagline: string;
  period: string;
  stack: string[];
  summary: string;
  details: { heading: string; body: string }[];
  links: { label: string; href: string }[];
  featured: boolean;
};

const PROJECTS: Project[] = [
  {
    index: "01",
    slug: "~/projects/medinest",
    name: "MediNest",
    tagline: "Multi-tenant pharmacy management SaaS",
    period: "2026",
    stack: ["Laravel 12", "PHP", "MySQL / MariaDB", "Tailwind CSS"],
    summary:
      "A production SaaS platform where independent pharmacies share one application while their data never touches each other — built for a real deployment, not a classroom demo.",
    details: [
      {
        heading: "Isolation is enforced in the database, not the UI",
        body:
          "Every pharmacy-owned record is scoped to its tenant through a global Eloquent query scope. A route that forgets to filter by pharmacy still can't leak another tenant's data, because the scope is applied at the query layer automatically.",
      },
      {
        heading: "Stock can't be sold twice",
        body:
          "Purchases and sales run inside database transactions with row-level locking, so two staff members completing sales against the same batch at the same moment can't oversell it. Sales validate live stock before they're allowed to complete.",
      },
      {
        heading: "Shipped, tested, and fixed under real conditions",
        body:
          "An automated PHPUnit suite covers authentication, role access, tenant isolation, and transactions, running on every push via GitHub Actions. Deployed to production on Hostinger — including diagnosing and fixing a live checkout defect end to end, from log analysis to root cause.",
      },
    ],
    links: [
      { label: "Live application", href: "https://medinest.bela002.com" },
      { label: "Source", href: "https://github.com/tayab-ghafoor/MediNest" },
    ],
    featured: true,
  },
  {
    index: "02",
    slug: "~/projects/sysnova-cli",
    name: "SysNova CLI",
    tagline: "Cross-platform system management platform",
    period: "Ongoing",
    stack: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy"],
    summary:
      "An independent, ~20,000-line Python application for system health monitoring, log analysis, and automated backups — distributed as native Windows and Linux installers, not just a script on GitHub.",
    details: [
      {
        heading: "Audited its own authentication system before anyone asked",
        body:
          "Wrote and documented a full security audit of the offline-first auth fallback — 30 findings, including a critical plaintext credential leak — then remediated every one: session invalidation, brute-force protection, rate-limiter concurrency bugs, timing side-channels.",
      },
      {
        heading: "AI log analysis, with the sensitive data removed first",
        body:
          "A log-analysis feature sends errors to an AI API for fix suggestions — but scrubs credentials, tokens, and IPs out of every log locally, before anything leaves the machine. The AI never sees what it doesn't need to.",
      },
      {
        heading: "A real release pipeline, not just \u2018it runs on my machine\u2019",
        body:
          "GitHub Actions, PyInstaller, and Inno Setup produce checksum-verified, auto-updating installers. Cloud backup integrates with rclone and OS-native credential storage across multiple providers.",
      },
    ],
    links: [{ label: "Source", href: "https://github.com/tayab-ghafoor/sysnova_cli" }],
    featured: true,
  },
  {
    index: "03",
    slug: "~/projects/context-handoff",
    name: "Context Handoff",
    tagline: "Cross-platform AI chat extension",
    period: "2026",
    stack: ["JavaScript", "Chrome Extension", "Manifest V3"],
    summary:
      "A browser extension that carries an in-progress conversation from one AI chat platform to another — Claude, ChatGPT, Gemini — without losing code blocks or asking you to retype your context.",
    details: [
      {
        heading: "Tiered summarization, human in the loop",
        body:
          "Compacts a conversation with a heuristic pass, on-device browser AI, or an optional cloud API, then shows the handoff before it sends — never a silent, unreviewed transfer.",
      },
    ],
    links: [{ label: "Source", href: "https://github.com/tayab-ghafoor/ai-context-handoff" }],
    featured: false,
  },
];

function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

/** Smooth, subtle perspective tilt that responds to the cursor — motion
 *  that answers a person's action, not an ambient animation. Disabled
 *  entirely under prefers-reduced-motion. */
function useTilt(strength = 7) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawX, { stiffness: 180, damping: 20, mass: 0.5 });
  const rotateY = useSpring(rawY, { stiffness: 180, damping: 20, mass: 0.5 });
  const reduceMotion = useReducedMotion();

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rawY.set(px * strength);
    rawX.set(-py * strength);
  }
  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return { ref, rotateX, rotateY, onMouseMove, onMouseLeave };
}

function Nav() {
  const { theme, toggleTheme } = useTheme();
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "glass-strong" : "border-b border-transparent"
      }`}
      data-testid="site-header"
    >
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="inline-flex items-center gap-2 group" data-testid="link-home">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand text-[13px] font-display font-bold text-background">
            TG
          </span>
          <span className="font-display text-[1.02rem] font-semibold tracking-tight">
            Tayab Ghafoor
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid={`link-nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="hover-elevate active-elevate-2 h-9 w-9 rounded-md border border-border flex items-center justify-center"
            data-testid="button-theme-toggle"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href="/resume"
            className="hidden sm:inline-flex hover-elevate active-elevate-2 h-9 items-center rounded-md border border-primary-border bg-primary text-primary-foreground px-4 text-sm font-medium"
            data-testid="link-resume"
          >
            R&eacute;sum&eacute;
          </a>
          <button
            type="button"
            className="md:hidden hover-elevate active-elevate-2 h-9 w-9 rounded-md border border-border flex items-center justify-center"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            data-testid="button-mobile-menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border glass-strong px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href="/resume" className="text-sm font-medium text-primary">
            R&eacute;sum&eacute;
          </a>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const rise = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="top" className="relative overflow-hidden pt-16">
      {/* Full-bleed 3D scene — the ambient backdrop for the whole hero */}
      <div className="absolute inset-0" aria-hidden={false}>
        <div
          className="pointer-events-none absolute -top-32 right-[-10%] h-[520px] w-[520px] rounded-full opacity-30 blur-[110px]"
          style={{ background: "hsl(var(--brand-cyan))" }}
        />
        <div
          className="pointer-events-none absolute bottom-[-15%] left-[-8%] h-[460px] w-[460px] rounded-full opacity-20 blur-[110px]"
          style={{ background: "hsl(var(--brand-violet))" }}
        />
        <Suspense fallback={<HeroSceneFallback />}>
          <HeroScene />
        </Suspense>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, hsl(var(--background) / 0.25) 0%, transparent 28%, hsl(var(--background) / 0.5) 78%, hsl(var(--background)) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-16 md:pt-32 md:pb-20 min-h-[640px] md:min-h-[760px] flex flex-col justify-center">
        <div className="max-w-2xl glass-strong rounded-3xl p-6 sm:p-8 md:p-10">
          <motion.div
            initial="hidden"
            animate="show"
            variants={rise}
            transition={{ duration: 0.5 }}
            className="mb-6 flex flex-wrap items-center gap-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3.5 py-1.5 text-sm">
              <span className="signal-dot" />
              Available for freelance &amp; remote work
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              Lahore, Pakistan
            </span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={rise}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="font-display text-4xl sm:text-5xl md:text-[3.4rem] font-semibold leading-[1.08] tracking-tight text-foreground"
            data-testid="text-headline"
          >
            I build software that has to keep working after the demo ends.
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            variants={rise}
            transition={{ duration: 0.55, delay: 0.14 }}
            className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed"
            data-testid="text-subhead"
          >
            Full-stack and systems developer pursuing a B.Sc. in Software Engineering.
            I ship production Laravel/PHP platforms and Python/FastAPI systems tooling
            &mdash; the kind that get tenant isolation, concurrency, and security audits
            right, because those are the parts that actually break in production.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={rise}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#work"
              className="hover-elevate active-elevate-2 inline-flex h-11 items-center rounded-full bg-gradient-brand text-background px-6 text-sm font-semibold glow-cyan"
              data-testid="link-view-work"
            >
              See the work
            </a>
            <a
              href="#contact"
              className="hover-elevate active-elevate-2 inline-flex h-11 items-center rounded-full border border-border bg-background/60 px-6 text-sm font-medium"
              data-testid="link-get-in-touch"
            >
              Get in touch
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-strong mt-16 md:mt-20 rounded-2xl px-6 py-7 md:px-10 md:py-8 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-7"
        >
          {STATS.map((stat) => (
            <div key={stat.label} data-testid={`stat-${stat.value}`}>
              <div className="font-display text-3xl font-semibold text-gradient-brand">{stat.value}</div>
              <div className="mt-1.5 text-sm text-muted-foreground leading-snug">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {!shouldReduceMotion && (
        <motion.a
          href="#about"
          aria-label="Scroll to About section"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex h-9 w-9 items-center justify-center rounded-full glass text-muted-foreground"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.a>
      )}
    </section>
  );
}

function About() {
  const facts = [
    { label: "Based in", value: "Lahore, Pakistan" },
    { label: "Focus", value: "Backend systems & multi-tenant SaaS" },
    { label: "Studying", value: "B.Sc. Software Engineering, 2030" },
    { label: "Status", value: "Open to freelance & remote roles" },
  ];

  return (
    <section id="about" className="py-20 md:py-28 rule-glow">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-[340px_1fr] gap-10 lg:gap-16">
          <div className="glass-strong rounded-2xl p-7 h-fit">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-background font-display font-bold">
                TG
              </span>
              <div>
                <p className="font-display font-semibold leading-tight">Tayab Ghafoor</p>
                <p className="text-xs text-muted-foreground">Full-stack &amp; systems developer</p>
              </div>
            </div>
            <dl className="space-y-4">
              {facts.map((fact) => (
                <div key={fact.label} className="text-sm">
                  <dt className="text-muted-foreground text-xs mb-0.5">{fact.label}</dt>
                  <dd className="font-medium">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6">About</h2>
            <div className="max-w-2xl space-y-5 text-[1.05rem] leading-relaxed text-foreground/90">
              <p>
                I'm a self-directed software developer and first-year Software
                Engineering student at the University of the Punjab, Lahore. Most of
                what I know didn't come from a syllabus &mdash; it came from building
                two production-scale projects independently and dealing with what
                actually goes wrong.
              </p>
              <p>
                I work across two distinct areas: full-stack web applications
                (Laravel/PHP, multi-tenant architecture, relational database design)
                and independent systems tooling (Python, FastAPI, desktop packaging,
                CI/CD release pipelines). Both share the same standard &mdash; I'd
                rather ship something smaller that's genuinely reliable than
                something bigger that mostly works.
              </p>
              <p className="text-muted-foreground">
                Currently open to freelance projects, remote roles, and internship
                opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const tilt = useTilt(5);

  if (!project.featured) {
    return (
      <motion.article
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformPerspective: 1200 }}
        className="glow-border-hover rounded-2xl border border-border bg-card/60 overflow-hidden"
        data-testid={`project-${project.name.toLowerCase().replace(/\s+/g, "-")}`}
      >
        <div className="flex items-center gap-2 px-5 py-3 border-b border-border bg-muted/40">
          <span className="terminal-dot" />
          <span className="terminal-dot" />
          <span className="terminal-dot" />
          <span className="ml-2 font-mono text-xs text-muted-foreground truncate">{project.slug}</span>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="case-index">{project.index}</span>
            <h3 className="font-display text-xl font-semibold">{project.name}</h3>
            <span className="text-sm text-muted-foreground">&mdash; {project.tagline}</span>
            <span className="text-xs text-muted-foreground font-mono ml-auto">{project.period}</span>
          </div>

          <p className="mt-4 text-foreground/90 leading-relaxed max-w-3xl">{project.summary}</p>

          {project.details.map((detail) => (
            <div key={detail.heading} className="flex gap-3 mt-5 max-w-3xl">
              <CheckCircle2 className="h-5 w-5 text-signal shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground mb-1">{detail.heading}</p>
                <p className="text-muted-foreground leading-relaxed">{detail.body}</p>
              </div>
            </div>
          ))}

          <div className="flex flex-wrap items-center gap-4 mt-6">
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[0.7rem] text-muted-foreground bg-muted rounded-full px-2.5 py-1"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4 ml-auto">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline underline-offset-4"
                  data-testid={`link-${project.name.toLowerCase()}-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformPerspective: 1200 }}
      className="glow-border-hover rounded-2xl border border-border bg-card/60 overflow-hidden"
      data-testid={`project-${project.name.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="flex items-center gap-2 px-5 py-3 border-b border-border bg-muted/40">
        <span className="terminal-dot" />
        <span className="terminal-dot" />
        <span className="terminal-dot" />
        <span className="ml-2 font-mono text-xs text-muted-foreground truncate">{project.slug}</span>
        {project.featured && (
          <span className="ml-auto text-[0.7rem] font-mono uppercase tracking-wide text-primary/90 hidden sm:inline">
            featured
          </span>
        )}
      </div>

      <div className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-12 p-6 md:p-9">
        <div>
          <span className="case-index">{project.index}</span>
          <h3 className="font-display text-2xl font-semibold mt-2">{project.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{project.tagline}</p>
          <p className="text-xs text-muted-foreground mt-3 font-mono">{project.period}</p>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[0.7rem] text-muted-foreground bg-muted rounded-full px-2.5 py-1"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-2 mt-5">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline underline-offset-4"
                data-testid={`link-${project.name.toLowerCase()}-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>

        <div className="max-w-2xl">
          <p className="text-[1.05rem] leading-relaxed text-foreground/90">{project.summary}</p>
          <dl className="mt-8 space-y-6">
            {project.details.map((detail) => (
              <div key={detail.heading} className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-signal shrink-0 mt-0.5" />
                <div>
                  <dt className="font-medium text-foreground mb-1.5">{detail.heading}</dt>
                  <dd className="text-muted-foreground leading-relaxed">{detail.body}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </motion.article>
  );
}

function Work() {
  return (
    <section id="work" className="py-20 md:py-28 rule-glow bg-muted/20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-2xl md:text-3xl font-semibold mb-2">Selected work</h2>
        <p className="text-muted-foreground max-w-xl">
          Three projects, in the order I'd want a recruiter to open them.
        </p>
        <div className="mt-10 space-y-8">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-20 md:py-28 rule-glow">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-2xl md:text-3xl font-semibold mb-10">Skills</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.label}
              className="rounded-2xl border border-border bg-card/50 p-6"
              data-testid={`skill-group-${group.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ background: `hsl(var(--${group.dot}))` }}
                />
                <h3 className="font-medium text-sm">{group.label}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs font-mono text-muted-foreground bg-muted rounded-full px-2.5 py-1"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="py-20 md:py-28 rule-glow">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-[340px_1fr] gap-10 lg:gap-16">
          <h2 className="font-display text-2xl md:text-3xl font-semibold">Education</h2>
          <div className="max-w-2xl rounded-2xl border border-border bg-card/50 p-7">
            <div className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-primary">
                <GraduationCap className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-medium text-[1.05rem]">B.Sc. Software Engineering</h3>
                  <span className="font-mono text-xs text-muted-foreground">Expected 2030</span>
                </div>
                <p className="text-muted-foreground text-sm mt-1">University of the Punjab, Lahore</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="text-sm font-medium mb-3">Certifications &amp; training</h3>
              <ul className="space-y-2.5 text-[0.95rem]">
                <li className="flex items-baseline justify-between gap-4">
                  <span>AI Web Development Cohort &mdash; DTAN, Lahore</span>
                  <span className="text-xs text-muted-foreground shrink-0 font-mono">2026</span>
                </li>
                <li className="flex items-baseline justify-between gap-4">
                  <span>Web Development Fundamentals &mdash; DTAN, Lahore</span>
                </li>
                <li className="flex items-baseline justify-between gap-4">
                  <span>Google IT Automation with Python &mdash; Coursera</span>
                  <span className="text-xs text-muted-foreground shrink-0 font-mono">In progress</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const links = [
    { icon: Mail, label: "tayabghafoor786@gmail.com", href: "mailto:tayabghafoor786@gmail.com", testid: "link-email" },
    { icon: Github, label: "github.com/tayab-ghafoor", href: "https://github.com/tayab-ghafoor", testid: "link-github" },
    {
      icon: Linkedin,
      label: "linkedin.com/in/tayab-ghafoor",
      href: "https://www.linkedin.com/in/tayab-ghafoor-100100338",
      testid: "link-linkedin",
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-28 rule-glow bg-muted/20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-[340px_1fr] gap-10 lg:gap-16">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4">Contact</h2>
            <p className="text-[1.05rem] leading-relaxed text-foreground/90 mb-8">
              I'm looking for freelance projects, remote roles, and internship
              opportunities. If you have something worth building well, I'd like
              to hear about it.
            </p>

            <div className="flex flex-col gap-3 text-sm">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="glow-border-hover inline-flex items-center gap-2.5 rounded-lg border border-border bg-card/50 px-4 py-3 hover:text-primary transition-colors"
                  data-testid={link.testid}
                >
                  <link.icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{link.label}</span>
                </a>
              ))}
              <span className="inline-flex items-center gap-2.5 text-muted-foreground px-4 py-1">
                <MapPin className="h-4 w-4 shrink-0" />
                Bela, Punjab, Pakistan
              </span>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="rule-top py-10">
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <span>&copy; {new Date().getFullYear()} Tayab Ghafoor</span>
        <span className="inline-flex items-center gap-1.5 font-mono text-xs">
          <Terminal className="h-3.5 w-3.5" />
          Built with React, Tailwind CSS &amp; Three.js
        </span>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
