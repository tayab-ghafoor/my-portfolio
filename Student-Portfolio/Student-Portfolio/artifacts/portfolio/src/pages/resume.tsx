import { Download, ArrowLeft, Mail, Github, Linkedin, ExternalLink, Phone, MapPin } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Resume() {
  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="no-print sticky top-0 z-50 bg-background/90 backdrop-blur border-b border-border px-6 py-3 flex items-center justify-between">
        <Link href="/">
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-mono">
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </button>
        </Link>
        <Button onClick={handlePrint} className="gap-2 font-mono" data-testid="button-download-resume">
          <Download className="w-4 h-4" /> Download PDF
        </Button>
      </div>

      <div className="resume-page max-w-[800px] mx-auto my-8 px-8 py-10 bg-white dark:bg-[#0f1117] text-black dark:text-white border border-border shadow-2xl rounded-lg">

        {/* Header */}
        <header className="border-b-2 border-primary pb-6 mb-6">
          <h1 className="text-4xl font-extrabold tracking-tight mb-1">Tayab Ghafoor</h1>
          <p className="text-lg text-primary font-mono mb-4">Software Engineering Student</p>
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> Bela, Pakistan
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" /> 0340-2129407
            </span>
            <a href="mailto:tayabghafoor786@gmail.com" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Mail className="w-3.5 h-3.5" /> tayabghafoor786@gmail.com
            </a>
            <a href="https://github.com/tayab-ghafoor" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Github className="w-3.5 h-3.5" /> github.com/tayab-ghafoor
            </a>
            <a href="https://www.linkedin.com/in/tayab-ghafoor-100100338" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Linkedin className="w-3.5 h-3.5" /> linkedin.com/in/tayab-ghafoor-100100338
            </a>
          </div>
        </header>

        {/* Summary */}
        <section className="mb-6">
          <h2 className="resume-section-title">Professional Summary</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            First-semester Software Engineering student with hands-on experience building Python-based tools and exploring
            web development and IT automation. Passionate about system administration, scripting, and solving practical
            problems through code. Seeking an internship or assistant role to apply and grow technical and teamwork skills.
          </p>
        </section>

        {/* Education */}
        <section className="mb-6">
          <h2 className="resume-section-title">Education</h2>
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-bold text-base">B.Sc. Software Engineering (First Semester)</h3>
              <p className="text-sm text-muted-foreground">University of the Punjab, Lahore</p>
              <p className="text-sm text-muted-foreground mt-1">
                Relevant Coursework: Introduction to Programming (Python), Calculus I, Discrete Mathematics, Computing Fundamentals
              </p>
            </div>
            <span className="text-sm font-mono text-primary whitespace-nowrap ml-4">Expected 2030</span>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Additional Training</p>
            <ul className="text-sm text-muted-foreground space-y-0.5 list-disc list-inside">
              <li>Google IT Automation with Python Professional Certificate — In Progress (Coursera)</li>
              <li>AI Web Development — DTAN, Lahore (In Progress)</li>
              <li>Web Development Fundamentals — DTAN, Lahore</li>
            </ul>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-6">
          <h2 className="resume-section-title">Technical Skills</h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="font-semibold">Languages:</span>
              <span className="text-muted-foreground ml-2">Python, HTML, CSS, JavaScript (basic)</span>
            </div>
            <div>
              <span className="font-semibold">Automation:</span>
              <span className="text-muted-foreground ml-2">File handling, system monitoring, task scheduling, shell scripting</span>
            </div>
            <div>
              <span className="font-semibold">Tools:</span>
              <span className="text-muted-foreground ml-2">Git, GitHub, VS Code, Command Line (Linux/Windows)</span>
            </div>
            <div>
              <span className="font-semibold">Concepts:</span>
              <span className="text-muted-foreground ml-2">Procedural programming, error handling, log parsing, CRON scheduling, system resource monitoring</span>
            </div>
            <div>
              <span className="font-semibold">Soft Skills:</span>
              <span className="text-muted-foreground ml-2">Problem-solving, self-directed learning, time management, clear documentation</span>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="mb-6">
          <h2 className="resume-section-title">Projects</h2>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-base">System Manager CLI (Python) — Ongoing Personal Project</h3>
                <a href="https://github.com/tayab-ghafoor" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs font-mono text-primary hover:underline no-print">
                  <ExternalLink className="w-3 h-3" /> GitHub
                </a>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                A modular CLI tool to automate common system administration tasks. Demonstrates ability to design, structure,
                and maintain a multi-feature application from scratch.
              </p>
              <ul className="text-sm text-muted-foreground mt-1 list-disc list-inside space-y-0.5">
                <li>Health Monitor: Real-time CPU, memory, and disk usage with visual alerts</li>
                <li>Backup Logic: Automated file backup with versioning; cloud integration planned</li>
                <li>Logs Analysis System: Parses system/app logs to identify errors and usage patterns</li>
                <li>Temp File Organizer: Scans, organizes, and securely deletes temporary files</li>
                <li>Scheduled Tasks: Built-in scheduler runs health checks or backups at user-defined intervals</li>
              </ul>
              <p className="text-xs font-mono text-primary mt-1">Python &bull; CLI &bull; System Administration &bull; Automation</p>
            </div>

            <div>
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-base">Calculator App (Python) — Introductory Project</h3>
                <a href="https://github.com/tayab-ghafoor" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs font-mono text-primary hover:underline no-print">
                  <ExternalLink className="w-3 h-3" /> GitHub
                </a>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                An interactive command-line calculator supporting basic arithmetic operations with input validation and
                continuous calculation loops — used as a foundation for understanding Python syntax, functions, and user interaction.
              </p>
              <p className="text-xs font-mono text-primary mt-1">Python &bull; CLI &bull; Input Validation &bull; Error Handling</p>
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="mb-6">
          <h2 className="resume-section-title">Leadership & Activities</h2>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-base">Peer Learning & Study Groups</h3>
              <p className="text-sm text-muted-foreground">Self-Organized — University of the Punjab</p>
              <ul className="text-sm text-muted-foreground mt-1 list-disc list-inside space-y-0.5">
                <li>Organized weekly programming study sessions to review concepts and solve coding exercises</li>
                <li>Helped classmates troubleshoot Python errors and explain basic programming concepts</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-6">
          <h2 className="resume-section-title">Certifications & Courses</h2>
          <ul className="text-sm text-muted-foreground space-y-0.5 list-disc list-inside">
            <li>Google IT Automation with Python — Coursera (In Progress)</li>
            <li>AI Web Development — DTAN, Lahore (In Progress)</li>
            <li>Web Development — DTAN, Lahore</li>
          </ul>
        </section>

        {/* Languages */}
        <section>
          <h2 className="resume-section-title">Languages</h2>
          <div className="flex gap-8 text-sm">
            <div><span className="font-semibold">Urdu</span> <span className="text-muted-foreground">— Native</span></div>
            <div><span className="font-semibold">English</span> <span className="text-muted-foreground">— Fluent</span></div>
          </div>
        </section>
      </div>

      <p className="no-print text-center text-xs text-muted-foreground font-mono pb-8">
        Tip: Click "Download PDF" or use Ctrl+P / Cmd+P to save as PDF. Choose "Save as PDF" in the print dialog.
      </p>
    </div>
  );
}
