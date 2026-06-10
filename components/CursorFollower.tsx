import React, { useEffect, useRef } from 'react';

const CursorFollower: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const trailPos = useRef({ x: -100, y: -100 });
  const visible = useRef(false);
  const hovering = useRef(false);
  const raf = useRef(0);

  useEffect(() => {
    // Hide on touch devices, small screens, or when the user prefers reduced motion
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice || window.innerWidth < 768) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible.current) {
        visible.current = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
        if (trailRef.current) trailRef.current.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      visible.current = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
      if (trailRef.current) trailRef.current.style.opacity = '0';
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]');
      hovering.current = !!isInteractive;
    };

    const animate = () => {
      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }

      // Ring follows with smooth lag
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15;
      if (ringRef.current) {
        const scale = hovering.current ? 1.8 : 1;
        const borderColor = hovering.current ? 'rgba(101, 60, 135, 0.5)' : 'rgba(168, 162, 171, 0.4)';
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%) scale(${scale})`;
        ringRef.current.style.borderColor = borderColor;
      }

      // Trail follows with heavier lag
      trailPos.current.x += (pos.current.x - trailPos.current.x) * 0.08;
      trailPos.current.y += (pos.current.y - trailPos.current.y) * 0.08;
      if (trailRef.current) {
        const scale = hovering.current ? 2.2 : 1;
        trailRef.current.style.transform = `translate(${trailPos.current.x}px, ${trailPos.current.y}px) translate(-50%, -50%) scale(${scale})`;
      }

      raf.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  // Don't render on touch devices (SSR-safe check done in useEffect)
  return (
    <>
      {/* Outer soft glow trail */}
      <div
        ref={trailRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] opacity-0"
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(154, 121, 186, 0.18) 0%, transparent 70%)',
          transition: 'opacity 0.4s ease',
          willChange: 'transform',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] opacity-0"
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid rgba(168, 162, 171, 0.4)',
          transition: 'opacity 0.4s ease, border-color 0.3s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform',
          backdropFilter: 'blur(1px)',
        }}
      />
      {/* Dot center */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] opacity-0"
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#9A79BA',
          boxShadow: '0 0 8px rgba(154, 121, 186, 0.5), 0 0 20px rgba(154, 121, 186, 0.2)',
          transition: 'opacity 0.3s ease',
          willChange: 'transform',
        }}
      />
    </>
  );
};

export default CursorFollower;
