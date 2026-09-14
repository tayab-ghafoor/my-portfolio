import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type FormState = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormState>("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  function validate() {
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = "Name is required.";
    if (!email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email.";
    if (!message.trim()) errs.message = "Message is required.";
    else if (message.trim().length < 10) errs.message = "Message must be at least 10 characters.";
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");

    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(
      `Hi Tayab,\n\nMy name is ${name} (${email}).\n\n${message}\n\n— Sent via your portfolio contact form`
    );
    const mailto = `mailto:tayabghafoor786@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      window.location.href = mailto;
      setStatus("sent");
    }, 500);
  }

  function handleReset() {
    setName("");
    setEmail("");
    setMessage("");
    setStatus("idle");
    setErrors({});
  }

  if (status === "sent") {
    return (
      <div
        className="flex flex-col items-start gap-4 rounded-2xl glass-strong p-8"
        data-testid="contact-success"
      >
        <CheckCircle2 className="w-8 h-8 text-signal" />
        <div>
          <h3 className="font-display text-lg font-semibold mb-1.5">Your email client opened</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Hit send in your email app and I'll get your message. Thanks for
            reaching out.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleReset} data-testid="button-send-another">
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl glass-strong p-7 space-y-5 max-w-lg"
      data-testid="contact-form"
    >
      <div className="space-y-1.5">
        <label htmlFor="cf-name" className="block text-sm font-medium">
          Your name
        </label>
        <input
          id="cf-name"
          type="text"
          value={name}
          onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: undefined })); }}
          placeholder="Jane Smith"
          disabled={status === "sending"}
          className={`w-full rounded-md border px-3.5 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:ring-2 focus:ring-primary/25 disabled:opacity-50 ${errors.name ? "border-destructive" : "border-border focus:border-primary/60"}`}
          data-testid="input-name"
        />
        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="cf-email" className="block text-sm font-medium">
          Your email
        </label>
        <input
          id="cf-email"
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
          placeholder="jane@example.com"
          disabled={status === "sending"}
          className={`w-full rounded-md border px-3.5 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:ring-2 focus:ring-primary/25 disabled:opacity-50 ${errors.email ? "border-destructive" : "border-border focus:border-primary/60"}`}
          data-testid="input-email"
        />
        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="cf-message" className="block text-sm font-medium">
          Message
        </label>
        <textarea
          id="cf-message"
          rows={5}
          value={message}
          onChange={(e) => { setMessage(e.target.value); setErrors((p) => ({ ...p, message: undefined })); }}
          placeholder="Hi Tayab, I'd love to connect about..."
          disabled={status === "sending"}
          className={`w-full rounded-md border px-3.5 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:ring-2 focus:ring-primary/25 resize-none disabled:opacity-50 ${errors.message ? "border-destructive" : "border-border focus:border-primary/60"}`}
          data-testid="input-message"
        />
        {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
      </div>

      <Button type="submit" className="w-full gap-2" disabled={status === "sending"} data-testid="button-send-message">
        {status === "sending" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Opening your email app&hellip;
          </>
        ) : (
          <>
            <Send className="w-4 h-4" /> Send message
          </>
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Opens your default email client &mdash; nothing is sent from this page directly.
      </p>
    </form>
  );
}
