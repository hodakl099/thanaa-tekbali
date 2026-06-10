import React, { useEffect, useRef, useState } from 'react';
import { Content, Language } from '../types';

interface SignatureProps {
  content: Content['signature'];
  lang: Language;
}

const Signature: React.FC<SignatureProps> = ({ content, lang }) => {
  const isAr = lang === 'ar';
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-16 md:py-24 px-6">
      <div ref={ref} className="max-w-2xl mx-auto">
        <div
          className="text-end transition-all duration-700 ease-out"
          style={{ opacity: drawn ? 1 : 0, transform: drawn ? 'translateY(0)' : 'translateY(16px)' }}
        >
          {/* Lead-in */}
          <p className="font-tajawal text-brand-dark/70 text-base mb-1">
            {content.closing}
          </p>

          {/* Name in calligraphic / script display */}
          <div className="inline-flex items-end gap-3">
            <span
              className={`text-brand-primary-deep leading-[1.1] ${
                isAr ? 'font-ruqaa text-4xl md:text-5xl' : 'font-tangerine text-6xl md:text-7xl'
              }`}
            >
              {content.name}
            </span>
            <span className="heart-pulse text-2xl md:text-3xl pb-1" aria-hidden="true">
              {content.heart}
            </span>
          </div>

          {/* Hand-drawn underline flourish */}
          <svg
            viewBox="0 0 300 22"
            fill="none"
            className="block w-56 md:w-64 ms-auto mt-1 text-brand-primary"
            aria-hidden="true"
          >
            <path
              d="M6 13C58 4 120 3 176 10c40 5 78 13 118 1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              style={{
                strokeDasharray: 320,
                strokeDashoffset: drawn ? 0 : 320,
                transition: 'stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.2s',
              }}
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Signature;
