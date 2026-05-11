import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1400;
    const step = 16;
    const increment = value / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}{suffix}
    </span>
  );
}

export function HeroStats({ stats }: { stats: StatItem[] }) {
  return (
    <div className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-border/50">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col" data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}>
          <span className="text-2xl font-extrabold font-mono text-foreground leading-none">
            <Counter value={stat.value} suffix={stat.suffix} />
          </span>
          <span className="text-xs text-muted-foreground mt-1 font-mono tracking-wide uppercase">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
