import React from 'react';
import { Content, Language } from '../types';
import FadeIn from './FadeIn';

interface AdviceProps {
  content: Content['advice'];
  lang: Language;
}

const Advice: React.FC<AdviceProps> = ({ content, lang }) => {
  const isAr = lang === 'ar';

  return (
    <section id="advice" className="relative py-20 md:py-28 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Top hairline */}
        <FadeIn direction="none">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-secondary/40 to-transparent mb-14" />
        </FadeIn>

        <div className="text-center">
          {/* Label */}
          <FadeIn direction="up">
            <p className="text-[0.7rem] font-medium tracking-[0.3em] uppercase text-brand-dark/70 mb-4">
              {content.label}
            </p>
          </FadeIn>

          {/* Title */}
          <FadeIn direction="up" delay={100}>
            <h2
              className={`text-brand-primary-deep mb-6 ${
                isAr ? 'font-messiri text-3xl md:text-4xl font-bold' : 'font-cormorant text-3xl md:text-4xl font-semibold'
              }`}
            >
              {content.title}
            </h2>
          </FadeIn>

          {/* Intro */}
          <FadeIn direction="up" delay={200}>
            <p className="font-tajawal text-brand-dark/80 text-base md:text-lg leading-[1.95] mb-10">
              {content.intro}
            </p>
          </FadeIn>
        </div>

        {/* Gradient pull-quote panel */}
        <FadeIn direction="up" delay={300}>
          <figure
            className="relative rounded-[32px] px-8 py-12 md:px-12 md:py-14 overflow-hidden
              shadow-[0_24px_60px_rgba(101,60,135,0.22)]"
            style={{ background: 'linear-gradient(135deg, #9A79BA 0%, #653C87 100%)' }}
          >
            {/* Giant decorative quote watermark */}
            <span
              dir="ltr"
              aria-hidden="true"
              className="font-cormorant absolute -top-6 ltr:left-6 rtl:right-6 text-[10rem] leading-none text-white/[0.12] select-none"
            >
              &ldquo;
            </span>
            {/* Light reflection streak */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            <blockquote
              className={`relative z-10 text-white text-center ${
                isAr ? 'font-messiri text-2xl md:text-[1.9rem] font-bold leading-[1.7]' : 'font-cormorant text-2xl md:text-[1.9rem] font-semibold italic leading-[1.5]'
              }`}
            >
              {content.quote}
            </blockquote>
          </figure>
        </FadeIn>

        {/* Closing line */}
        <FadeIn direction="up" delay={400}>
          <p
            className={`text-center text-brand-primary-deep mt-10 ${
              isAr ? 'font-tajawal text-lg md:text-xl font-medium' : 'font-cormorant italic text-xl md:text-2xl'
            }`}
          >
            {content.closing}
          </p>
        </FadeIn>

        {/* Bottom hairline */}
        <FadeIn direction="none" delay={150}>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-secondary/40 to-transparent mt-14" />
        </FadeIn>
      </div>
    </section>
  );
};

export default Advice;
