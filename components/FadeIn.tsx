import React, { useEffect, useRef, useState } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  fullWidth?: boolean;
  distance?: string;
}

const FadeIn: React.FC<FadeInProps> = ({ 
  children, 
  delay = 0, 
  className = '', 
  direction = 'up',
  fullWidth = false,
  distance = '30px',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '30px',
      }
    );

    const el = ref.current;
    if (el) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const getTransform = (): string => {
    if (isVisible) return 'translate3d(0, 0, 0)';
    switch (direction) {
      case 'up': return `translate3d(0, ${distance}, 0)`;
      case 'down': return `translate3d(0, -${distance}, 0)`;
      case 'left': return `translate3d(-${distance}, 0, 0)`;
      case 'right': return `translate3d(${distance}, 0, 0)`;
      case 'none': return 'translate3d(0, 0, 0)';
      default: return `translate3d(0, ${distance}, 0)`;
    }
  };

  return (
    <div
      ref={ref}
      className={`${className} ${fullWidth ? 'w-full' : ''}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)`,
        transitionDelay: `${delay}ms`,
        willChange: isVisible ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;