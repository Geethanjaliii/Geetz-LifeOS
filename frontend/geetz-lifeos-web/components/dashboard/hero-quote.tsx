export function HeroQuote() {
  return (
    <section className="relative w-full h-48 rounded-xl overflow-hidden glass-panel border-none">
      <div className="relative z-10 h-full flex flex-col justify-center px-xl bg-gradient-to-r from-background via-transparent to-transparent">
        <span className="text-primary font-code text-code uppercase tracking-widest mb-sm">
          Daily Protocol
        </span>
        <h3 className="font-headline-lg text-headline-lg italic max-w-2xl leading-tight">
          &ldquo;The only way to do great work is to love what you do. If you
          haven&apos;t found it yet, keep looking.&rdquo;
        </h3>
        <p className="font-label-md text-label-md text-on-surface-variant mt-md">
          — Steve Jobs
        </p>
      </div>
    </section>
  );
}
