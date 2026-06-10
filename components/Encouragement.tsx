import React, { useEffect, useRef, useState } from 'react';
import { Gift, Sparkles } from 'lucide-react';
import { Content, Language } from '../types';
import FadeIn from './FadeIn';

interface EncouragementProps {
  content: Content['encouragement'];
  lang: Language;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/* The "Future doctor loading" gag: a bar that fills to 100% with a synced counter. */
const LoadingPill: React.FC<{ label: string }> = ({ label }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId = 0;

    const run = () => {
      if (reduce) {
        setPct(100);
        return;
      }
      const duration = 2600;
      let start = 0;
      const tick = (now: number) => {
        if (!start) start = now;
        const t = Math.min((now - start) / duration, 1);
        setPct(Math.round(easeOutCubic(t) * 100));
        if (t < 1) rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative bg-brand-surface rounded-2xl border border-brand-secondary/25 shadow-[0_16px_44px_rgba(101,60,135,0.08)] px-6 py-6 sm:px-8 sm:py-7"
    >
      <div className="flex items-center justify-between mb-3">
        <span dir="ltr" lang="en" className="font-sora text-sm sm:text-base font-semibold text-brand-primary-deep tracking-tight">
          {label}
        </span>
        <span dir="ltr" aria-hidden="true" className="font-sora text-sm font-semibold text-brand-primary-deep tabular-nums">
          {pct}%
        </span>
      </div>
      <div aria-hidden="true" className="h-2 w-full rounded-full bg-brand-primary/15 overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #9A79BA 0%, #653C87 100%)',
            transition: 'width 0.08s linear',
          }}
        />
      </div>
    </div>
  );
};

/* Decorative one-shot sparkles that twinkle around the box on each reveal. */
const SPARKLES = [
  { top: '-8%', left: '6%', size: 18, delay: 0 },
  { top: '14%', right: '4%', size: 14, delay: 140 },
  { top: '55%', left: '-3%', size: 22, delay: 280 },
  { bottom: '-6%', right: '12%', size: 16, delay: 200 },
  { bottom: '8%', left: '16%', size: 14, delay: 360 },
];

const Encouragement: React.FC<EncouragementProps> = ({ content, lang }) => {
  const isAr = lang === 'ar';
  const [loadingLabel, ...phrases] = content.items;

  // tick 0 = gift prompt; each click advances and shows ONE phrase, cycling.
  const [tick, setTick] = useState(0);
  const started = tick > 0;
  const idx = started ? (tick - 1) % phrases.length : -1;
  const phrase = started ? phrases[idx] : null;
  const advance = () => setTick((t) => t + 1);

  const nextLabel = isAr ? 'اضغط للرسالة التالية' : 'Tap for the next message';

  return (
    <section className="relative bg-brand-surface/60 py-24 md:py-32 px-6 border-y border-brand-secondary/15">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <FadeIn direction="up">
            <p className="text-[0.7rem] font-medium tracking-[0.3em] uppercase text-brand-dark/70 mb-4">
              {content.label}
            </p>
            <h2
              className={`text-brand-primary-deep ${
                isAr ? 'font-messiri text-3xl md:text-4xl font-bold' : 'font-cormorant text-3xl md:text-4xl font-semibold'
              }`}
            >
              {content.title}
            </h2>
          </FadeIn>
        </div>

        {/* Loading gag */}
        <FadeIn direction="up" delay={150}>
          <div className="max-w-xl mx-auto">
            <LoadingPill label={loadingLabel} />
          </div>
        </FadeIn>

        {/* Click-to-cycle box — one different phrase per click */}
        <FadeIn direction="up" delay={250}>
          <div className="mt-12 flex flex-col items-center">
            <button
              onClick={advance}
              aria-label={started ? nextLabel : content.revealLabel}
              className={`relative w-full max-w-lg min-h-[9.5rem] rounded-[28px] bg-brand-surface
                border border-brand-secondary/30 px-8 py-8 flex items-center justify-center text-center
                shadow-[0_16px_40px_rgba(101,60,135,0.08)]
                transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_22px_52px_rgba(101,60,135,0.15)]
                focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-deep/40 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg
                ${!started ? 'invite-pulse' : ''}`}
            >
              {!started ? (
                <span className="inline-flex items-center gap-3 text-brand-primary-deep">
                  <Gift className="w-6 h-6" />
                  <span className="font-sora text-base font-semibold">{content.revealLabel}</span>
                </span>
              ) : (
                <span key={tick} aria-live="polite" className="pop-in inline-flex items-center gap-3">
                  <span className="shrink-0 w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary-deep">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <span dir="ltr" lang="en" className="font-cormorant italic text-3xl md:text-4xl text-brand-primary-deep">
                    {phrase}
                  </span>
                </span>
              )}

              {/* sparkle burst — re-keyed so it re-twinkles on every click */}
              {started && (
                <React.Fragment key={`sparkles-${tick}`}>
                  {SPARKLES.map((s, i) => (
                    <Sparkles
                      key={i}
                      aria-hidden="true"
                      className="sparkle-twinkle opacity-0 absolute text-brand-primary pointer-events-none"
                      style={{
                        top: s.top,
                        bottom: s.bottom,
                        left: s.left,
                        right: s.right,
                        width: s.size,
                        height: s.size,
                        animationDelay: `${s.delay}ms`,
                      }}
                    />
                  ))}
                </React.Fragment>
              )}
            </button>

            {/* progress dots — which of the three messages is showing */}
            <div className="flex items-center gap-2 mt-6" aria-hidden="true">
              {phrases.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === idx ? 'w-6 bg-brand-primary-deep' : 'w-1.5 bg-brand-secondary/40'
                  }`}
                />
              ))}
            </div>

            {/* hint to keep tapping */}
            <p className="font-tajawal text-xs text-brand-dark/60 mt-3 h-4">
              {started ? nextLabel : ''}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Encouragement;
