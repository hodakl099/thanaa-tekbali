import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Content, Language } from '../types';
import { CONTENT } from '../constants';
import FadeIn from './FadeIn';

interface HeroProps {
  content: Content['hero'];
  lang: Language;
}

/* A faint, single-stroke molar outline used as a quiet anatomy motif. */
const ToothOutline: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 64 78" fill="none" className={className} aria-hidden="true">
    <path
      d="M32 5C19 5 11 15 11 29c0 10 4 17 6 29 1.5 9 5 13 8 13s4-7 5-15c.4-3 1.6-3 2 0 1 8 2 15 5 15s6.5-4 8-13c2-12 6-19 6-29C51 15 45 5 32 5Z"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
    />
  </svg>
);

const Hero: React.FC<HeroProps> = ({ content, lang }) => {
  const isAr = lang === 'ar';
  const year = isAr ? '٢٠٢٦' : '2026';

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
    >
      {/* Breathing violet orb behind the text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div
          className="orb-breathe w-[26rem] h-[26rem] md:w-[34rem] md:h-[34rem] rounded-full blur-[80px]"
          style={{ background: 'radial-gradient(circle, rgba(154,121,186,0.30) 0%, rgba(154,121,186,0) 70%)' }}
        />
      </div>

      {/* Faint tooth motif — top corner, gentle drift */}
      <ToothOutline className="tooth-drift absolute top-24 ltr:right-[8%] rtl:left-[8%] w-16 h-20 md:w-20 md:h-24 text-brand-primary/[0.12] pointer-events-none" />
      {/* second tooth — delayed drift so the two don't move in sync */}
      <div
        className="tooth-drift absolute bottom-28 ltr:left-[10%] rtl:right-[10%] pointer-events-none"
        style={{ animationDelay: '-7s' }}
      >
        <ToothOutline className="w-10 h-12 md:w-12 md:h-14 text-brand-secondary/[0.12]" />
      </div>

      {/* Soft floating motes */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <span className="mote-float absolute top-[28%] left-[18%] w-1.5 h-1.5 rounded-full bg-brand-primary/30" />
        <span className="mote-float absolute top-[62%] right-[22%] w-2 h-2 rounded-full bg-brand-secondary/30" style={{ animationDelay: '-5s' }} />
        <span className="mote-float absolute top-[40%] right-[14%] w-1 h-1 rounded-full bg-brand-primary/40" style={{ animationDelay: '-9s' }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Eyebrow + year */}
        <FadeIn direction="up" delay={150}>
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="hidden sm:block w-10 h-px bg-brand-secondary/50" />
            <p className="text-[0.7rem] md:text-xs font-medium tracking-[0.3em] uppercase text-brand-dark/70">
              {content.eyebrow}
            </p>
            <span dir="ltr" className="text-[0.7rem] md:text-xs font-medium tracking-[0.2em] text-brand-dark/70">
              {year}
            </span>
            <span className="hidden sm:block w-10 h-px bg-brand-secondary/50" />
          </div>
        </FadeIn>

        {/* Big greeting */}
        <FadeIn direction="up" delay={300}>
          <h1
            className={`text-brand-dark leading-[1.15] mb-6 ${
              isAr
                ? 'font-messiri font-bold text-4xl sm:text-5xl md:text-6xl'
                : 'font-cormorant italic font-semibold text-4xl sm:text-5xl md:text-6xl text-brand-primary-deep'
            }`}
          >
            {content.greeting}
          </h1>
        </FadeIn>

        {/* Bilingual accent: surface the English thank-you in Arabic mode */}
        {isAr && (
          <FadeIn direction="up" delay={420}>
            <p dir="ltr" lang="en" className="font-cormorant italic text-xl sm:text-2xl text-brand-primary-deep/80 mb-7">
              {CONTENT.en.hero.greeting}
            </p>
          </FadeIn>
        )}

        {/* Welcome subtitle */}
        <FadeIn direction="up" delay={520}>
          <p className="font-tajawal text-base md:text-lg text-brand-dark/65 leading-[1.9] max-w-xl mx-auto mb-10">
            {content.welcome}
          </p>
        </FadeIn>

        {/* Divider + name + role */}
        <FadeIn direction="up" delay={680}>
          <div className="flex flex-col items-center gap-3">
            <span className="w-16 h-px bg-brand-primary/40" />
            <p className={`text-brand-primary-deep ${isAr ? 'font-messiri text-2xl font-semibold' : 'font-cormorant text-2xl font-semibold'}`}>
              {content.name}
            </p>
            <p className="text-xs tracking-[0.25em] uppercase text-brand-dark/70">
              {content.role}
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Scroll cue */}
      <FadeIn direction="up" delay={900}>
        <a
          href="#message"
          className="scroll-bob absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-brand-primary-deep hover:opacity-80 transition-opacity duration-300 rounded px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-deep/40"
        >
          <span className="text-[0.65rem] tracking-[0.2em] uppercase font-tajawal">{content.scrollCue}</span>
          <ChevronDown className="w-4 h-4" />
        </a>
      </FadeIn>
    </section>
  );
};

export default Hero;
