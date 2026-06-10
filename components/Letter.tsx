import React from 'react';
import { Content, Language } from '../types';
import FadeIn from './FadeIn';

interface LetterProps {
  content: Content['letter'];
  lang: Language;
}

const Letter: React.FC<LetterProps> = ({ content, lang }) => {
  const isAr = lang === 'ar';

  return (
    <section id="message" className="relative py-24 md:py-36 px-6">
      <div className="max-w-2xl mx-auto">
        <FadeIn direction="up">
          <div
            className="relative bg-brand-surface rounded-[28px] border border-brand-secondary/25
              shadow-[0_24px_70px_rgba(101,60,135,0.08)]
              px-7 py-10 sm:px-12 sm:py-14 md:px-16 md:py-16 overflow-hidden"
          >
            {/* Soft corner wash */}
            <div className="absolute -top-16 ltr:-right-16 rtl:-left-16 w-48 h-48 rounded-full bg-brand-primary/[0.05] blur-3xl pointer-events-none" />

            {/* Label */}
            <p className="text-[0.7rem] font-medium tracking-[0.3em] uppercase text-brand-dark/70 mb-5">
              {content.label}
            </p>

            {/* Salutation with inline-start accent rule */}
            <h2
              className={`text-brand-primary-deep border-s-[3px] border-brand-primary ps-4 mb-8 ${
                isAr ? 'font-messiri text-2xl sm:text-3xl font-semibold' : 'font-cormorant text-2xl sm:text-3xl font-semibold'
              }`}
            >
              {content.salutation}
            </h2>

            {/* Body paragraphs, staggered */}
            <div className="relative z-10 space-y-6">
              {content.paragraphs.map((para, idx) => (
                <FadeIn key={idx} direction="up" delay={idx * 140}>
                  <p className="font-tajawal text-brand-dark/90 text-base sm:text-lg leading-[1.95]">
                    {para}
                  </p>
                </FadeIn>
              ))}
            </div>

            {/* Closing hairline */}
            <div className="mt-10 w-14 h-px bg-brand-primary/40" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Letter;
