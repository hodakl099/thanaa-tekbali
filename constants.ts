import { Content, Language } from './types';

export const CONTENT: Record<Language, Content> = {
  en: {
    nav: {
      home: "Home",
      message: "The Letter",
      advice: "My Advice",
    },
    hero: {
      eyebrow: "A heartfelt farewell",
      greeting: "Thank you for being my first students.",
      welcome: "Welcome to the final stop of our journey in the General Anatomy Lab.",
      name: "Dr. Thana Al-Tukbali",
      role: "General Anatomy Lab",
      scrollCue: "Read the letter",
    },
    letter: {
      label: "A letter to you",
      salutation: "To my remarkable students,",
      paragraphs: [
        "The end of today's practical isn't merely the end of a semester — it is your very first real step into the world of dentistry.",
        "You were the most beautiful beginning of my academic journey, and I am so proud to have watched you grow and to have seen your passion throughout this time. Thank you for every effort, and for the lovely spirit that filled the lab with life.",
      ],
    },
    advice: {
      label: "My advice to you",
      title: "Hold on to your passion",
      intro: "Dentistry is an enchanting blend of science and art. Hold on to your passion, be patient on your learning journey, and always remember:",
      quote: "The fingertips that carved and learned in the labs today are the very same hands that will craft smiles and change people's lives tomorrow.",
      closing: "Believe in yourselves, because I believe in you completely.",
    },
    signature: {
      closing: "With all my pride,",
      name: "Dr. Thana Al-Tukbali",
      heart: "🤍",
    },
    encouragement: {
      label: "Before you go",
      title: "You're ready for this",
      revealLabel: "Open the gift",
      items: [
        "Future doctor loading",
        "You've got this!",
        "Believe in yourself",
        "The best is next!",
      ],
    },
    footer: {
      line: "Made with love for the first cohort.",
      name: "Dr. Thana Al-Tukbali",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      message: "الرسالة",
      advice: "نصيحتي",
    },
    hero: {
      eyebrow: "كلمة وداع من القلب",
      greeting: "شكراً لكونكم أوّل طلبتي.",
      welcome: "مرحباً بكم في المحطة الأخيرة من رحلتنا في معمل التشريح العام.",
      name: "د. ثناء التكبالي",
      role: "معمل التشريح العام",
      scrollCue: "اقرؤوا الرسالة",
    },
    letter: {
      label: "رسالة إليكم",
      salutation: "إلى طلبتي المميّزين،",
      paragraphs: [
        "نهاية العملي اليوم ليست مجرد نهاية فصل دراسي، بل هي خطوتكم الحقيقية الأولى في عالم طب الأسنان.",
        "كنتم أجمل بداية لمسيرتي الأكاديمية، وفخورة جداً بمراقبة تطوركم وشغفكم طوال هذه الفترة. شكراً لكم على كل مجهود، وعلى روحكم الجميلة التي ملأت المعمل حياة.",
      ],
    },
    advice: {
      label: "نصيحتي لكم",
      title: "تمسّكوا بشغفكم",
      intro: "طب الأسنان مزيج ساحر بين العلم والفن. تمسكوا بشغفكم، وكونوا صبورين في رحلة تعلمكم، وتذكروا دائماً:",
      quote: "الأنامل التي نحتت وتعلّمت في المعامل اليوم، هي ذاتها الأيدي التي ستصنع الابتسامات وتغير حياة الناس غداً.",
      closing: "ثقوا بأنفسكم، لأنني أؤمن بكم تماماً.",
    },
    signature: {
      closing: "مع كل الفخر،",
      name: "د. ثناء التكبالي",
      heart: "🤍",
    },
    encouragement: {
      label: "قبل أن تذهبوا",
      title: "أنتم جاهزون لهذا",
      revealLabel: "افتحوا الهدية",
      items: [
        "Future doctor loading",
        "You've got this!",
        "Believe in yourself",
        "The best is next!",
      ],
    },
    footer: {
      line: "صُنع بكل حب للدفعة الأولى.",
      name: "د. ثناء التكبالي",
    },
  },
};
