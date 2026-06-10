import React, { useState, useEffect } from 'react';
import { Content, Language } from '../types';

interface HeaderProps {
  content: Content['nav'];
  lang: Language;
  toggleLang: () => void;
}

const Monogram: React.FC = () => (
  <a
    href="#home"
    aria-label="Dr. Thana Al-Tukbali"
    className="group inline-flex items-center gap-3 select-none rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-deep/40"
  >
    <span className="hidden sm:block w-8 h-px bg-brand-secondary/50 transition-all duration-500 group-hover:w-10 group-hover:bg-brand-primary/60" />
    <span dir="ltr" className="inline-flex items-baseline gap-1.5 text-brand-primary-deep">
      <span className="font-messiri text-xl font-bold leading-none">ث</span>
      <span className="text-brand-secondary text-xs leading-none">·</span>
      <span className="font-cormorant text-2xl font-semibold leading-none">T</span>
    </span>
    <span className="hidden sm:block w-8 h-px bg-brand-secondary/50 transition-all duration-500 group-hover:w-10 group-hover:bg-brand-primary/60" />
  </a>
);

const Header: React.FC<HeaderProps> = ({ content, lang, toggleLang }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: content.home, href: '#home' },
    { label: content.message, href: '#message' },
    { label: content.advice, href: '#advice' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-brand-surface/85 backdrop-blur-md shadow-[0_8px_30px_rgba(101,60,135,0.06)] border-b border-brand-secondary/20'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-16">
          {/* Start: nav links (desktop) */}
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[0.7rem] font-medium tracking-[0.18em] uppercase text-brand-dark/70 hover:text-brand-primary-deep transition-colors duration-300 rounded px-1 py-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-deep/40"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <span className="md:hidden" aria-hidden="true" />

          {/* Center: monogram */}
          <div className="flex justify-center">
            <Monogram />
          </div>

          {/* End: language toggle */}
          <div className="flex justify-end">
            <button
              onClick={toggleLang}
              className="text-xs font-medium tracking-wide text-brand-primary hover:text-brand-primary-deep transition-colors duration-300 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-deep/40 rounded px-2 py-1"
              aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
            >
              {lang === 'ar' ? 'English' : 'العربية'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
