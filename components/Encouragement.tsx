import React, { useEffect, useRef, useState } from 'react';
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

const Encouragement: React.FC<EncouragementProps> = ({ content, lang }) => {
  const isAr = lang === 'ar';
  const [loadingLabel, ...marginalia] = content.items;

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
          <div className="max-w-xl mx-auto mb-14">
            <LoadingPill label={loadingLabel} />
          </div>
        </FadeIn>

        {/* Editorial marginalia — the other three phrases */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
          {marginalia.map((phrase, idx) => (
            <FadeIn key={phrase} direction="up" delay={250 + idx * 120}>
              <div className="text-center sm:text-start">
                <div className="flex items-center justify-center sm:justify-start gap-2.5 mb-3">
                  <span className="w-2 h-2 rounded-full border border-brand-primary" />
                  <span dir="ltr" lang="en" className="font-cormorant italic text-xl text-brand-primary-deep">
                    {phrase}
                  </span>
                </div>
                <div className="w-full h-px bg-brand-secondary/30" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Encouragement;
