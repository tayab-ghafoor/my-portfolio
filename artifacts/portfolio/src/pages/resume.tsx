import { Download, ArrowLeft, Mail, Github, Linkedin, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Resume() {
  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Print controls — hidden when printing */}
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

      {/* Resume document */}
      <div className="resume-page max-w-[800px] mx-auto my-8 px-8 py-10 bg-white dark:bg-[#0f1117] text-black dark:text-white border border-border shadow-2xl rounded-lg">

        {/* Header */}
        <header className="border-b-2 border-primary pb-6 mb-6">
          <h1 className="text-4xl font-extrabold tracking-tight mb-1">Alex Morgan</h1>
          <p className="text-lg text-primary font-mono mb-4">Software Engineering Student</p>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
            <a href="mailto:alex@example.com" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Mail className="w-3.5 h-3.5" /> alex@example.com
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Github className="w-3.5 h-3.5" /> github.com/alexmorgan
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Linkedin className="w-3.5 h-3.5" /> linkedin.com/in/alexmorgan
            </a>
          </div>
        </header>

        {/* Summary */}
        <section className="mb-6">
          <h2 className="resume-section-title">Summary</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Ambitious first-semester Software Engineering student with a passion for building well-crafted software. 
            Actively developing skills in web development, algorithms, and open source contribution. 
            Quick learner, detail-oriented, and eager to take on real-world challenges through internships and collaborative projects.
          </p>
        </section>

        {/* Education */}
        <section className="mb-6">
          <h2 className="resume-section-title">Education</h2>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-base">B.S. Software Engineering</h3>
              <p className="text-sm text-muted-foreground">State University &mdash; 1st Semester</p>
              <p className="text-sm text-muted-foreground mt-1">
                Relevant Coursework: Intro to Programming (Java), Discrete Mathematics, Computer Architecture
              </p>
            </div>
            <span className="text-sm font-mono text-primary whitespace-nowrap ml-4">2025 &ndash; Present</span>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-6">
          <h2 className="resume-section-title">Technical Skills</h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="font-semibold">Languages:</span>
              <span className="text-muted-foreground ml-2">Python, JavaScript, Java, HTML5, CSS3</span>
            </div>
            <div>
              <span className="font-semibold">Frameworks:</span>
              <span className="text-muted-foreground ml-2">React (learning), Tailwind CSS</span>
            </div>
            <div>
              <span className="font-semibold">Tools:</span>
              <span className="text-muted-foreground ml-2">Git, GitHub, VS Code, Linux</span>
            </div>
            <div>
              <span className="font-semibold">Concepts:</span>
              <span className="text-muted-foreground ml-2">OOP, Algorithms, Data Structures (intro), REST APIs</span>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="mb-6">
          <h2 className="resume-section-title">Projects</h2>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-base">CLI Todo App</h3>
                <a href="#" className="flex items-center gap-1 text-xs font-mono text-primary hover:underline no-print">
                  <ExternalLink className="w-3 h-3" /> GitHub
                </a>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                A command-line task manager built in Python as a first independent project. Features persistent JSON storage, 
                task prioritization, and color-coded terminal output.
              </p>
              <p className="text-xs font-mono text-primary mt-1">Python &bull; JSON &bull; CLI</p>
            </div>

            <div>
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-base">Personal Budget Tracker</h3>
                <a href="#" className="flex items-center gap-1 text-xs font-mono text-primary hover:underline no-print">
                  <ExternalLink className="w-3 h-3" /> GitHub
                </a>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                A browser-based app to track income and expenses. Calculates running totals dynamically and 
                persists data with localStorage — no backend required.
              </p>
              <p className="text-xs font-mono text-primary mt-1">HTML &bull; CSS &bull; Vanilla JavaScript &bull; localStorage</p>
            </div>

            <div>
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-base">Sorting Algorithm Visualizer</h3>
                <a href="#" className="flex items-center gap-1 text-xs font-mono text-primary hover:underline no-print">
                  <ExternalLink className="w-3 h-3" /> GitHub
                </a>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                An interactive web page that animates bubble sort and insertion sort in real time, 
                built to deepen understanding of algorithm complexity through visual feedback.
              </p>
              <p className="text-xs font-mono text-primary mt-1">JavaScript &bull; DOM Manipulation &bull; CSS Animations</p>
            </div>
          </div>
        </section>

        {/* Interests */}
        <section>
          <h2 className="resume-section-title">Interests</h2>
          <p className="text-sm text-muted-foreground">
            Open source contribution, web development, competitive programming, algorithm design, Linux customization.
          </p>
        </section>
      </div>

      <p className="no-print text-center text-xs text-muted-foreground font-mono pb-8">
        Tip: Click "Download PDF" or use Ctrl+P / Cmd+P to save as PDF. Choose "Save as PDF" in the print dialog.
      </p>
    </div>
  );
}
