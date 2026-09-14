/**
 * A CSS-only stand-in for the 3D hero scene — shown while the three.js
 * chunk is loading, and permanently if WebGL isn't available at all. Kept
 * in its own file, deliberately free of any three.js/@react-three import,
 * so bundlers can code-split the heavy 3D stack away from this lightweight
 * fallback (it's imported statically; the 3D scene is not).
 */
export function HeroSceneFallback() {
  return (
    <div
      className="relative w-full h-full min-h-[420px] flex items-center justify-center overflow-hidden bg-grid rounded-3xl"
      aria-hidden="true"
      data-testid="hero-scene-fallback"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 45%, transparent 0%, hsl(var(--background)) 85%)",
        }}
      />
      <div className="relative flex items-end gap-3">
        {[0.45, 0.9, 0.65, 1.25, 0.55, 0.85, 1.05, 0.5].map((h, i) => (
          <div
            key={i}
            className="w-8 rounded-md animate-pulse"
            style={{
              height: `${h * 72}px`,
              background:
                i % 2 === 0
                  ? "linear-gradient(180deg, hsl(var(--brand-cyan)) 0%, hsl(var(--brand-cyan) / 0.25) 100%)"
                  : "linear-gradient(180deg, hsl(var(--brand-violet)) 0%, hsl(var(--brand-violet) / 0.25) 100%)",
              boxShadow: "0 0 24px -6px hsl(var(--brand-cyan) / 0.4)",
              animationDelay: `${i * 90}ms`,
              animationDuration: "2.2s",
            }}
          />
        ))}
      </div>
    </div>
  );
}
