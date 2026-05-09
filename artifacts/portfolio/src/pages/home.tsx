import { useState, useEffect } from "react";
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
  Download
} from "lucide-react";
import { SiPython, SiJavascript, SiHtml5, SiCss, SiReact, SiGnubash, SiGit } from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
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
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Sticky Nav */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-mono font-bold text-lg tracking-tighter cursor-pointer" onClick={() => scrollTo("hero")}>
            <span className="text-primary">&lt;</span>
            Alex Morgan
            <span className="text-primary"> /&gt;</span>
          </div>
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
            <Link href="/resume">
              <Button size="sm" variant="outline" className="font-mono gap-1.5" data-testid="link-resume-nav">
                <Download className="w-3.5 h-3.5" /> Resume
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full pt-16">
        
        {/* HERO */}
        <section id="hero" className="min-h-[90vh] flex items-center container mx-auto px-6 py-20">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.div variants={fadeInUp} className="font-mono text-primary mb-4">
              Hello, world. I am
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
              Alex Morgan.
            </motion.h1>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-muted-foreground mb-6">
              Software Engineering Student.
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
              I'm an ambitious first-year CS student with a passion for building things that matter. I learn fast, code daily, and am eager to solve real problems.
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
                  I'm currently in my first semester of the Software Engineering program, but my journey started long before classes began. I've always been fascinated by how systems work under the hood, and diving into code felt like finding the missing manual for the digital world.
                </p>
                <p>
                  While I am at the beginning of my formal education, I approach my craft with the seriousness of a professional. I spend my free time exploring web development, algorithms, and open source projects. 
                </p>
                <p>
                  My goal is simple: write clean code, learn continuously, and build software that makes an impact.
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
                  { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
                  { name: "HTML5", icon: SiHtml5, color: "text-orange-500" },
                  { name: "CSS3", icon: SiCss, color: "text-blue-500" },
                  { name: "React", icon: SiReact, color: "text-cyan-400" },
                  { name: "Java", icon: FaJava, color: "text-red-500" },
                  { name: "Git", icon: SiGit, color: "text-orange-600" },
                  { name: "Linux Basics", icon: SiGnubash, color: "text-green-400" },
                  { name: "VS Code", icon: SiGit, color: "text-blue-400" },
                ].map((skill, i) => (
                  <motion.div 
                    key={skill.name} 
                    variants={fadeInUp}
                    className="flex flex-col items-center justify-center p-6 bg-card border border-border/50 rounded-xl hover:border-primary/50 transition-colors"
                  >
                    <skill.icon className={`w-10 h-10 mb-4 ${skill.color}`} />
                    <span className="font-mono text-sm">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
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

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "CLI Todo App",
                    desc: "A command-line task manager built as my very first programming project. Features JSON storage, task prioritization, and color-coded output.",
                    tech: ["Python", "JSON", "CLI"],
                    link: "#"
                  },
                  {
                    title: "Personal Budget Tracker",
                    desc: "A simple web app to track income and expenses. Calculates totals dynamically and stores data in localStorage.",
                    tech: ["HTML", "CSS", "Vanilla JS"],
                    link: "#"
                  },
                  {
                    title: "Sorting Visualizer",
                    desc: "An interactive web page that animates bubble sort and insertion sort to help visualize algorithmic complexity in real-time.",
                    tech: ["JavaScript", "DOM", "CSS Animations"],
                    link: "#"
                  }
                ].map((project) => (
                  <motion.div key={project.title} variants={fadeInUp} className="flex flex-col bg-background border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Terminal className="w-6 h-6 text-primary" />
                      </div>
                      <a href={project.link} className="text-muted-foreground hover:text-primary transition-colors">
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm flex-1 mb-6">
                      {project.desc}
                    </p>
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
              variants={fadeInUp}
            >
              <div className="flex items-center gap-4 mb-12">
                <GraduationCap className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold font-mono">/education</h2>
                <div className="h-[1px] bg-border flex-1 ml-4" />
              </div>

              <div className="bg-card border border-border rounded-xl p-8 max-w-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold">B.S. Software Engineering</h3>
                  <span className="font-mono text-primary bg-primary/10 px-3 py-1 rounded-md text-sm mt-2 md:mt-0">2025 - Present</span>
                </div>
                <p className="text-muted-foreground mb-6 text-lg">State University • 1st Semester</p>
                
                <div className="space-y-3">
                  <h4 className="font-mono text-sm text-muted-foreground uppercase tracking-wider">Relevant Coursework</h4>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    <li className="flex items-center gap-2 text-sm">
                      <ChevronRight className="w-4 h-4 text-primary" />
                      Intro to Programming (Java)
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <ChevronRight className="w-4 h-4 text-primary" />
                      Discrete Mathematics
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <ChevronRight className="w-4 h-4 text-primary" />
                      Computer Architecture
                    </li>
                  </ul>
                </div>
              </div>
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
                I am actively looking for mentorship, open source collaboration, and internship opportunities for next summer. My inbox is always open.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex justify-center gap-4">
                <Button size="lg" className="font-mono gap-2" asChild>
                  <a href="mailto:alex@example.com">
                    <Mail className="w-4 h-4" /> Say Hello
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="gap-2" asChild>
                  <a href="https://github.com" target="_blank" rel="noreferrer">
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="gap-2" asChild>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="py-6 border-t border-border bg-background text-center text-sm text-muted-foreground font-mono">
        <p>Built with React & Tailwind. &copy; {new Date().getFullYear()} Alex Morgan.</p>
      </footer>
    </div>
  );
}
