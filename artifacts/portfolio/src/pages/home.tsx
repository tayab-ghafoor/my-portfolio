import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Terminal,
  Code2,
  Briefcase,
  GraduationCap,
  Mail,
  ExternalLink,
  Github,
  Linkedin,
  Download,
  Sun,
  Moon,
  Award,
  Menu,
  X,
} from "lucide-react";
import { SiPython, SiJavascript, SiHtml5, SiCss, SiGnubash, SiGit } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/theme-context";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const ROLES = [
  "Software Engineering Student",
  "Python Developer",
  "IT Automation Enthusiast",
  "Problem Solver",
  "System Scripter",
];

function useTypingEffect(words: string[], typeSpeed = 70, deleteSpeed = 40, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const tick = () => {
      if (!isDeleting) {
        setDisplayed(current.slice(0, displayed.length + 1));
        if (displayed.length + 1 === current.length) {
          timeoutRef.current = setTimeout(() => setIsDeleting(true), pause);
          return;
        }
      } else {
        setDisplayed(current.slice(0, displayed.length - 1));
        if (displayed.length - 1 === 0) {
          setIsDeleting(false);
          setWordIndex((i) => i + 1);
          return;
        }
      }
    };
    timeoutRef.current = setTimeout(tick, isDeleting ? deleteSpeed : typeSpeed);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayed, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, pause]);

  return displayed;
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const typedRole = useTypingEffect(ROLES);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Sticky Nav */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div
            className="font-mono font-bold text-lg tracking-tighter cursor-pointer"
            onClick={() => scrollTo("hero")}
          >
            <span className="text-primary">&lt;</span>
            Tayab Ghafoor
            <span className="text-primary"> /&gt;</span>
          </div>
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {SECTIONS.slice(1).map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === sec.id ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {sec.label}
              </button>
            ))}
            <button
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
              className="p-2 rounded-md border border-border hover:border-primary/50 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link href="/resume">
              <Button size="sm" variant="outline" className="font-mono gap-1.5" data-testid="link-resume-nav">
                <Download className="w-3.5 h-3.5" /> Resume
              </Button>
            </Link>
          </nav>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md border border-border text-muted-foreground hover:text-primary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="p-2 rounded-md border border-border text-muted-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
              data-testid="button-mobile-menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md px-6 py-4 flex flex-col gap-1">
            {SECTIONS.slice(1).map((sec) => (
              <button
                key={sec.id}
                onClick={() => { scrollTo(sec.id); setMobileOpen(false); }}
                className={`text-left py-2.5 text-sm font-medium transition-colors hover:text-primary border-b border-border/30 last:border-0 ${
                  activeSection === sec.id ? "text-primary" : "text-muted-foreground"
                }`}
                data-testid={`mobile-link-${sec.id}`}
              >
                {sec.label}
              </button>
            ))}
            <Link href="/resume">
              <Button size="sm" variant="outline" className="font-mono gap-1.5 mt-3 w-full" onClick={() => setMobileOpen(false)}>
                <Download className="w-3.5 h-3.5" /> Download Resume
              </Button>
            </Link>
          </div>
        )}
      </header>

      <main className="flex-1 w-full pt-16">

        {/* HERO */}
        <section id="hero" className="hero-grid min-h-[90vh] flex items-center px-6 py-20 relative overflow-hidden">
          <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.div variants={fadeInUp}>
              <span className="section-label">Hello, world. I am</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="gradient-name text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
              Tayab Ghafoor.
            </motion.h1>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold text-muted-foreground mb-6 min-h-[1.2em]"
              data-testid="text-typed-role"
            >
              {typedRole}
              <span className="inline-block w-[3px] h-[0.85em] bg-primary ml-1 align-middle animate-pulse" />
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
              First-semester Software Engineering student at University of the Punjab. I build Python-based automation tools,
              explore web development, and solve practical problems through code.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Button onClick={() => scrollTo("projects")} className="font-mono" data-testid="button-view-projects">
                View Projects
              </Button>
              <Button onClick={() => scrollTo("contact")} variant="outline" className="font-mono" data-testid="button-get-in-touch">
                Get in Touch
              </Button>
              <Link href="/resume">
                <Button variant="outline" className="font-mono gap-2" data-testid="link-resume-hero">
                  <Download className="w-4 h-4" /> Download Resume
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-24 bg-card/30">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
              <div className="flex items-center gap-4 mb-10">
                <Terminal className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold font-mono">/about</h2>
                <div className="h-[1px] bg-border flex-1 ml-4" />
              </div>
              <div className="text-muted-foreground leading-loose space-y-6 text-lg">
                <p>
                  I'm a first-semester Software Engineering student at the University of the Punjab, Lahore, with a deep curiosity for how systems work and a drive to build tools that solve real problems.
                </p>
                <p>
                  I specialize in Python-based automation and system scripting. My work revolves around creating command-line utilities that are genuinely useful — from real-time system monitoring and automated cloud backups to log analysis and intelligent file organization. My main project, a modular System Manager CLI, reflects this passion and is the foundation of my technical growth.
                </p>
                <p>
                  Beyond scripting, I'm actively expanding into web development and IT automation. I'm currently pursuing the Google IT Automation with Python Professional Certificate and studying AI-driven web technologies through DTAN — blending automation, backend logic, and modern web practices.
                </p>
                <p>
                  I'm looking for an internship or assistant role where I can contribute to meaningful projects, learn from experienced engineers, and keep turning curiosity into code that works.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="py-24">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-12">
                <Code2 className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold font-mono">/skills</h2>
                <div className="h-[1px] bg-border flex-1 ml-4" />
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "Python", icon: SiPython, color: "text-blue-400" },
                  { name: "HTML5", icon: SiHtml5, color: "text-orange-500" },
                  { name: "CSS3", icon: SiCss, color: "text-blue-500" },
                  { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
                  { name: "Git", icon: SiGit, color: "text-orange-600" },
                  { name: "Linux / CLI", icon: SiGnubash, color: "text-green-400" },
                ].map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={fadeInUp}
                    className="card-hover flex flex-col items-center justify-center p-6 bg-card border border-border/50 rounded-xl"
                    data-testid={`card-skill-${skill.name.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <skill.icon className={`w-10 h-10 mb-4 ${skill.color}`} />
                    <span className="font-mono text-sm">{skill.name}</span>
                  </motion.div>
                ))}
              </div>

              {/* Automation & Concepts tags */}
              <motion.div variants={fadeInUp} className="mt-8">
                <p className="font-mono text-sm text-muted-foreground uppercase tracking-wider mb-3">Automation & Concepts</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "File Handling", "System Monitoring", "Task Scheduling", "Shell Scripting",
                    "Log Parsing", "CRON", "Error Handling", "Procedural Programming", "Backup Automation",
                  ].map((tag) => (
                    <span key={tag} className="text-xs font-mono px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-24 bg-card/30">
          <div className="container mx-auto px-6 max-w-5xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-12">
                <Briefcase className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold font-mono">/projects</h2>
                <div className="h-[1px] bg-border flex-1 ml-4" />
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "System Manager CLI",
                    badge: "Ongoing",
                    desc: "A modular command-line tool to automate common system administration tasks. Features a health monitor, backup logic with versioning, log analysis, temp file organizer, and a built-in task scheduler.",
                    tech: ["Python", "CLI", "Automation", "System Admin"],
                    link: "https://github.com/tayab-ghafoor",
                  },
                  {
                    title: "Calculator App",
                    badge: "Completed",
                    desc: "An interactive command-line calculator with support for basic arithmetic operations, input validation, and continuous calculation loops — built to master Python fundamentals.",
                    tech: ["Python", "CLI", "Input Validation", "Error Handling"],
                    link: "https://github.com/tayab-ghafoor",
                  },
                ].map((project) => (
                  <motion.div
                    key={project.title}
                    variants={fadeInUp}
                    className="card-hover flex flex-col bg-background border border-border rounded-xl p-6"
                    data-testid={`card-project-${project.title.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Terminal className="w-6 h-6 text-primary" />
                        </div>
                        <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${
                          project.badge === "Ongoing"
                            ? "border-yellow-500/40 text-yellow-500 bg-yellow-500/10"
                            : "border-green-500/40 text-green-500 bg-green-500/10"
                        }`}>
                          {project.badge}
                        </span>
                      </div>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        data-testid={`link-project-github-${project.title.toLowerCase().replace(/\s/g, "-")}`}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm flex-1 mb-6">{project.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span key={t} className="text-xs font-mono px-2 py-1 bg-secondary text-secondary-foreground rounded-md">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className="py-24">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-12">
                <GraduationCap className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold font-mono">/education</h2>
                <div className="h-[1px] bg-border flex-1 ml-4" />
              </motion.div>

              {/* Degree */}
              <motion.div variants={fadeInUp} className="bg-card border border-border rounded-xl p-8 max-w-2xl relative overflow-hidden mb-6">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold">B.Sc. Software Engineering</h3>
                  <span className="font-mono text-primary bg-primary/10 px-3 py-1 rounded-md text-sm mt-2 md:mt-0">Expected 2030</span>
                </div>
                <p className="text-muted-foreground mb-6 text-lg">University of the Punjab, Lahore &bull; 1st Semester</p>
                <div className="space-y-3">
                  <h4 className="font-mono text-sm text-muted-foreground uppercase tracking-wider">Relevant Coursework</h4>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {["Introduction to Programming (Python)", "Calculus I", "Discrete Mathematics", "Computing Fundamentals"].map((c) => (
                      <li key={c} className="flex items-center gap-2 text-sm">
                        <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" /> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Certifications */}
              <motion.div variants={fadeInUp}>
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-5 h-5 text-primary" />
                  <h3 className="font-mono text-sm text-muted-foreground uppercase tracking-wider">Certifications & Training</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { name: "Google IT Automation with Python", provider: "Coursera", status: "In Progress" },
                    { name: "AI Web Development", provider: "DTAN, Lahore", status: "In Progress" },
                    { name: "Web Development Fundamentals", provider: "DTAN, Lahore", status: "Completed" },
                  ].map((cert) => (
                    <div
                      key={cert.name}
                      className="bg-card border border-border/50 rounded-lg p-4 hover:border-primary/40 transition-colors"
                    >
                      <p className="font-semibold text-sm">{cert.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{cert.provider}</p>
                      <span className={`text-xs font-mono mt-2 inline-block px-2 py-0.5 rounded-full border ${
                        cert.status === "Completed"
                          ? "border-green-500/40 text-green-500 bg-green-500/10"
                          : "border-yellow-500/40 text-yellow-500 bg-yellow-500/10"
                      }`}>
                        {cert.status}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-32 bg-card/30">
          <div className="container mx-auto px-6 max-w-2xl text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="font-mono text-primary mb-4">
                What's next?
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6">
                Let's Connect
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto">
                I'm actively looking for internship opportunities, mentorship, and open source collaboration.
                Based in Bela, Pakistan — my inbox is always open.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="font-mono gap-2" asChild>
                  <a href="mailto:tayabghafoor786@gmail.com" data-testid="link-email">
                    <Mail className="w-4 h-4" /> Say Hello
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="gap-2" asChild>
                  <a href="https://github.com/tayab-ghafoor" target="_blank" rel="noreferrer" data-testid="link-github">
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="gap-2" asChild>
                  <a href="https://www.linkedin.com/in/tayab-ghafoor-100100338" target="_blank" rel="noreferrer" data-testid="link-linkedin">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background">
        <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-mono font-bold text-base">
              <span className="text-primary">&lt;</span>Tayab Ghafoor<span className="text-primary"> /&gt;</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              &copy; {new Date().getFullYear()} — Built with React &amp; Tailwind
            </p>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="mailto:tayabghafoor786@gmail.com"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
              data-testid="footer-link-email"
            >
              <span className="p-1.5 rounded-md border border-border group-hover:border-primary/50 transition-colors">
                <Mail className="w-3.5 h-3.5" />
              </span>
              <span className="hidden sm:inline">tayabghafoor786@gmail.com</span>
            </a>
            <a
              href="https://github.com/tayab-ghafoor"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
              data-testid="footer-link-github"
            >
              <span className="p-1.5 rounded-md border border-border group-hover:border-primary/50 transition-colors">
                <Github className="w-3.5 h-3.5" />
              </span>
              <span className="hidden sm:inline">tayab-ghafoor</span>
            </a>
            <a
              href="https://www.linkedin.com/in/tayab-ghafoor-100100338"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
              data-testid="footer-link-linkedin"
            >
              <span className="p-1.5 rounded-md border border-border group-hover:border-primary/50 transition-colors">
                <Linkedin className="w-3.5 h-3.5" />
              </span>
              <span className="hidden sm:inline">tayab-ghafoor</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
