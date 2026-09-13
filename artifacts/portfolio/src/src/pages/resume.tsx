import { Link } from "wouter";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

const SKILLS = [
  { label: "Languages", value: "Python, PHP, JavaScript, SQL, HTML/CSS, Bash" },
  { label: "Backend & Frameworks", value: "Laravel, FastAPI, RESTful API design, SQLAlchemy, Alembic" },
  { label: "Databases", value: "MySQL/MariaDB, PostgreSQL, SQLite" },
  { label: "Frontend", value: "Blade, Tailwind CSS, Bootstrap, responsive design" },
  { label: "DevOps & Deployment", value: "Git, GitHub Actions (CI/CD), Railway, Netlify, Hostinger, PyInstaller, Inno Setup" },
  {
    label: "Engineering Practices",
    value: "Multi-tenant architecture, authentication & RBAC, automated testing (PHPUnit, pytest), database transactions & concurrency control, security auditing, cross-platform development",
  },
  {
    label: "AI-Assisted Development",
    value: "Use Claude and GitHub Copilot to accelerate implementation, debugging, and architecture planning — all resulting code independently tested and verified before integration; also integrate OpenAI's API as a product feature (voice-to-structured-data extraction in MediNest)",
  },
];

const PROJECTS = [
  {
    name: "MediNest — Multi-Tenant Pharmacy Management SaaS",
    meta: "Laravel 12, PHP, MySQL/MariaDB, Tailwind CSS  |  github.com/tayab-ghafoor/MediNest  |  Live: medinest.bela002.com",
    bullets: [
      "Designed a multi-tenant SaaS platform with a three-tier role system (Super Admin, Pharmacy Admin, Staff); tenant isolation is enforced at the database query layer via a global Eloquent scope, not just hidden in the UI.",
      "Built purchase and sale transactions with database-level row locking to prevent overselling under concurrent access; sales validate real-time stock before completing and auto-generate invoices.",
      "Added voice-assisted data entry with deterministic parsing and optional AI-based (OpenAI) extraction for free-form speech.",
      "Wrote an automated PHPUnit test suite and configured GitHub Actions CI; deployed to production on Hostinger and diagnosed/fixed a live defect end-to-end, from log analysis to root-cause resolution.",
    ],
  },
  {
    name: "SysNova CLI — Cross-Platform System Management Platform",
    meta: "Python, FastAPI, PostgreSQL, SQLAlchemy  |  github.com/tayab-ghafoor/sysnova_cli",
    bullets: [
      "Architected a ~20,000-line, 100+ module Python application with a 23-file automated test suite, covering system health monitoring, automated backups, and diagnostics — distributed as native Windows and Linux installers.",
      "Built an AI-powered log analysis feature that scrubs sensitive data (credentials, tokens, IPs) from logs locally before any content reaches an AI API or remote server, then returns AI-generated fix suggestions.",
      "Built a FastAPI backend with JWT authentication, subscription/payment handling, and an offline-first SQLite fallback for local-only operation.",
      "Conducted and documented a full security audit of the authentication system (30 findings, including a critical plaintext credential leak) and remediated every finding, including brute-force protection and rate-limiter concurrency bugs.",
      "Built a cross-platform CI/CD release pipeline (GitHub Actions, PyInstaller, Inno Setup) producing checksum-verified, auto-updating installers, and integrated cloud backup via rclone with OS-native credential storage across multiple providers.",
    ],
  },
  {
    name: "Context Handoff — Cross-Platform AI Chat Extension",
    meta: "JavaScript, Chrome Extension (Manifest V3)  |  github.com/tayab-ghafoor/ai-context-handoff",
    bullets: [
      "Built a browser extension that carries compacted, code-preserving context from one AI chat platform (Claude, ChatGPT, Gemini) to another, with tiered summarization and a review-before-send handoff step.",
    ],
  },
];

export default function Resume() {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="no-print sticky top-0 z-10 glass-strong">
        <div className="mx-auto max-w-4xl px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            data-testid="link-back-home"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to portfolio
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => window.print()} data-testid="button-print">
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <a href="/Tayab_Ghafoor_CV.pdf" download data-testid="link-download-pdf">
              <Button size="sm">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="resume-page bg-card text-card-foreground border border-border rounded-2xl p-8 sm:p-12 shadow-xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-semibold">Tayab Ghafoor</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Bela, Punjab, Pakistan &nbsp;|&nbsp; +92 340 2129407 &nbsp;|&nbsp; tayabghafoor786@gmail.com
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              linkedin.com/in/tayab-ghafoor-100100338 &nbsp;|&nbsp; github.com/tayab-ghafoor &nbsp;|&nbsp;{" "}
              tayab-ghafoor-portfolio.netlify.app
            </p>
          </div>

          {/* Summary */}
          <section className="mb-7">
            <h2 className="resume-section-title">Summary</h2>
            <p className="text-[0.95rem] leading-relaxed text-foreground/90">
              Self-directed software developer with hands-on production experience across full-stack web
              development and backend systems engineering, currently pursuing a B.Sc. in Software Engineering.
              Built and deployed a multi-tenant SaaS platform (Laravel/PHP) with tenant-isolated data and
              role-based access control, and an independent cross-platform system-management application
              (Python/FastAPI) spanning backend API design, security auditing, desktop packaging, and CI/CD
              release automation. Comfortable across the full lifecycle: architecture, implementation, automated
              testing, and deployment. Open to freelance projects, remote roles, and internship opportunities.
            </p>
          </section>

          {/* Skills */}
          <section className="mb-7">
            <h2 className="resume-section-title">Technical Skills</h2>
            <dl className="space-y-2">
              {SKILLS.map((skill) => (
                <div key={skill.label} className="text-[0.92rem] leading-relaxed">
                  <span className="font-semibold">{skill.label}: </span>
                  <span className="text-foreground/90">{skill.value}</span>
                </div>
              ))}
            </dl>
          </section>

          {/* Projects */}
          <section className="mb-7">
            <h2 className="resume-section-title">Projects</h2>
            <div className="space-y-6">
              {PROJECTS.map((project) => (
                <div key={project.name}>
                  <h3 className="font-medium text-[0.98rem]">{project.name}</h3>
                  <p className="text-xs text-muted-foreground italic mt-0.5 mb-2">{project.meta}</p>
                  <ul className="space-y-1.5">
                    {project.bullets.map((bullet, i) => (
                      <li key={i} className="text-[0.92rem] leading-relaxed text-foreground/90 pl-4 relative">
                        <span className="absolute left-0">-</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="mb-7">
            <h2 className="resume-section-title">Education</h2>
            <div className="flex items-baseline justify-between">
              <h3 className="font-medium text-[0.98rem]">
                B.Sc. Software Engineering &mdash; University of the Punjab, Lahore
              </h3>
            </div>
            <p className="text-xs text-muted-foreground italic mt-0.5">Expected Graduation: 2030</p>
          </section>

          {/* Certifications */}
          <section>
            <h2 className="resume-section-title">Certifications &amp; Training</h2>
            <p className="text-[0.92rem] leading-relaxed text-foreground/90">
              AI Web Development Cohort &mdash; DTAN, Lahore (2026) &nbsp;&middot;&nbsp; Web Development
              Fundamentals &mdash; DTAN, Lahore &nbsp;&middot;&nbsp; Google IT Automation with Python &mdash;
              Coursera (In Progress)
            </p>
            <p className="text-[0.92rem] mt-3">
              <span className="font-semibold text-primary">Languages: </span>
              Urdu (Native) &nbsp;&middot;&nbsp; English (Fluent)
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
