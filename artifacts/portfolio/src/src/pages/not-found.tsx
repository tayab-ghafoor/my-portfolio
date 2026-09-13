import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-6">
      <div className="max-w-sm text-center">
        <p className="font-mono text-sm text-primary mb-3">404</p>
        <h1 className="font-display text-2xl font-semibold">Page not found</h1>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          The page you're looking for doesn't exist, or it moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4"
          data-testid="link-back-home-404"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to the homepage
        </Link>
      </div>
    </div>
  );
}
