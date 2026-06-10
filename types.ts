export type Language = 'ar' | 'en';

export interface Content {
  nav: {
    home: string;
    message: string;
    advice: string;
  };
  hero: {
    eyebrow: string;
    greeting: string;
    welcome: string;
    name: string;
    role: string;
    scrollCue: string;
  };
  letter: {
    label: string;
    salutation: string;
    paragraphs: string[];
  };
  advice: {
    label: string;
    title: string;
    intro: string;
    quote: string;
    closing: string;
  };
  signature: {
    closing: string;
    name: string;
    heart: string;
  };
  encouragement: {
    label: string;
    title: string;
    /** Stylistic English motivational "stickers" — kept in English in both languages. */
    items: string[];
  };
  footer: {
    line: string;
    name: string;
  };
}
