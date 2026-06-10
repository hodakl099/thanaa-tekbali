import React from 'react';
import { Content, Language } from '../types';

interface FooterProps {
  content: Content['footer'];
  lang: Language;
}

const Footer: React.FC<FooterProps> = ({ content, lang }) => {
  const isAr = lang === 'ar';
  const year = isAr ? '٢٠٢٦' : '2026';

  return (
    <footer className="relative py-16 px-6">
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
        {/* Top hairline */}
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-brand-secondary/40 to-transparent mb-8" />

        {/* Monogram */}
        <div dir="ltr" className="inline-flex items-baseline gap-1.5 text-brand-primary-deep mb-4">
          <span className="font-messiri text-lg font-bold leading-none">ث</span>
          <span className="text-brand-secondary text-xs leading-none">·</span>
          <span className="font-cormorant text-xl font-semibold leading-none">T</span>
        </div>

        {/* Name */}
        <p className={`text-brand-dark/80 mb-2 ${isAr ? 'font-messiri text-lg' : 'font-cormorant text-lg'}`}>
          {content.name}
        </p>

        {/* Line */}
        <p className="font-tajawal text-sm text-brand-dark/70 mb-5">
          {content.line}
        </p>

        {/* Violet dot */}
        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/60 mb-5" />

        {/* Year + heart */}
        <p dir="ltr" className="inline-flex items-center gap-2 text-xs tracking-[0.2em] text-brand-dark/70">
          <span>{year}</span>
          <span aria-hidden="true">🤍</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
