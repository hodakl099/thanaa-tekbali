import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Letter from './components/Letter';
import Advice from './components/Advice';
import Signature from './components/Signature';
import Encouragement from './components/Encouragement';
import Footer from './components/Footer';
import CursorFollower from './components/CursorFollower';
import { CONTENT } from './constants';
import { Language } from './types';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ar');

  const toggleLang = () => {
    setLang(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const content = CONTENT[lang];

  return (
    <div className="relative min-h-screen flex flex-col bg-brand-bg overflow-x-hidden">
      {/* ── Fixed ambient lavender glows ── */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="glow-drift absolute -top-40 -right-32 w-[36rem] h-[36rem] rounded-full bg-brand-primary/[0.16] blur-[120px]" />
        <div
          className="glow-drift absolute -bottom-48 -left-40 w-[34rem] h-[34rem] rounded-full bg-brand-secondary/[0.14] blur-[120px]"
          style={{ animationDelay: '-6s' }}
        />
      </div>

      {/* Skip link — first focusable element for keyboard users */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-3 focus:start-3 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-brand-surface focus:text-brand-primary-deep focus:shadow-lg focus:ring-2 focus:ring-brand-primary-deep/40"
      >
        {lang === 'ar' ? 'تخطَّ إلى المحتوى' : 'Skip to content'}
      </a>

      <CursorFollower />
      <Header content={content.nav} lang={lang} toggleLang={toggleLang} />

      <main id="main" tabIndex={-1} className="flex-grow focus:outline-none">
        <Hero content={content.hero} lang={lang} />
        <Letter content={content.letter} lang={lang} />
        <Advice content={content.advice} lang={lang} />
        <Signature content={content.signature} lang={lang} />
        <Encouragement content={content.encouragement} lang={lang} />
      </main>

      <Footer content={content.footer} lang={lang} />
    </div>
  );
};

export default App;
