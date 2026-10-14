import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

type CursorMode = 'default' | 'pointer' | 'project' | 'magnetic' | 'text' | 'hidden';

export const CustomCursor: React.FC = () => {
  const { language } = useLanguage();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const [cursorText, setCursorText] = useState<string>('');

  // Refs for animation coordinates (lerp interpolation)
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const magneticTarget = useRef<HTMLElement | null>(null);
  const rafId = useRef<number | null>(null);

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  // Check if device supports fine pointer and motion is allowed
  useEffect(() => {
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasPointer && !prefersReducedMotion) {
      setIsEnabled(true);
    }
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    // Track mouse movement
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible) {
        setIsVisible(true);
      }

      // Check current hovered element and its ancestors for custom cursor modes
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectCard = target.closest('[data-cursor="project"], .project-card-interactive') as HTMLElement | null;
      const magneticElement = target.closest('[data-cursor="magnetic"], [data-magnetic="true"], .btn-magnetic') as HTMLElement | null;
      const customCursorEl = target.closest('[data-cursor]') as HTMLElement | null;
      const isInput = target.closest('input, textarea, select, [contenteditable="true"]');
      const isClickable = target.closest('button, a, [role="button"], input[type="submit"], select');

      if (isInput) {
        setCursorMode('text');
        setCursorText('');
        magneticTarget.current = null;
      } else if (projectCard) {
        setCursorMode('project');
        const customLabel = projectCard.getAttribute('data-cursor-label');
        setCursorText(customLabel || (language === 'fr' ? 'VOIR' : 'VIEW'));
        magneticTarget.current = null;
      } else if (magneticElement) {
        setCursorMode('magnetic');
        setCursorText('');
        magneticTarget.current = magneticElement;
      } else if (customCursorEl) {
        const mode = customCursorEl.getAttribute('data-cursor') as CursorMode;
        setCursorMode(mode || 'pointer');
        setCursorText(customCursorEl.getAttribute('data-cursor-label') || '');
        magneticTarget.current = null;
      } else if (isClickable) {
        setCursorMode('pointer');
        setCursorText('');
        magneticTarget.current = null;
      } else {
        setCursorMode('default');
        setCursorText('');
        magneticTarget.current = null;
      }
    };

    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);

    const onMouseLeave = () => {
      setIsVisible(false);
      magneticTarget.current = null;
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);

    // Smooth RAF loop for follower ring physics
    const updatePosition = () => {
      let targetX = mousePos.current.x;
      let targetY = mousePos.current.y;

      // Magnetic pull when hovering a magnetic element
      if (magneticTarget.current) {
        const rect = magneticTarget.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Attract towards element center (pull factor: 45%)
        const distanceX = mousePos.current.x - centerX;
        const distanceY = mousePos.current.y - centerY;

        targetX = mousePos.current.x - distanceX * 0.45;
        targetY = mousePos.current.y - distanceY * 0.45;

        // Apply a gentle physical magnetic translation to the button itself
        const btnPullX = (mousePos.current.x - centerX) * 0.18;
        const btnPullY = (mousePos.current.y - centerY) * 0.18;
        magneticTarget.current.style.transform = `translate3d(${btnPullX}px, ${btnPullY}px, 0)`;
      } else {
        // Reset any previously pulled magnetic element transforms smoothly
        const allMagnetics = document.querySelectorAll<HTMLElement>('[data-cursor="magnetic"], [data-magnetic="true"], .btn-magnetic');
        allMagnetics.forEach((el) => {
          if (el.style.transform && el.style.transform !== '') {
            el.style.transform = '';
          }
        });
      }

      // Linear interpolation (lerp) for smooth trailing inertia
      const ease = 0.16;
      ringPos.current.x += (targetX - ringPos.current.x) * ease;
      ringPos.current.y += (targetY - ringPos.current.y) * ease;

      // Update follower ring position via GPU-accelerated transform
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Exact pinpoint dot position
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(updatePosition);
    };

    rafId.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isEnabled, isVisible, language]);

  if (!isEnabled) return null;

  // Determine classes and styling for different cursor states
  let ringStyles = 'w-9 h-9 border border-[#FF5500]/50 bg-[#FF5500]/[0.06] backdrop-blur-[1px]';
  let dotStyles = 'w-2 h-2 bg-[#FF5500] shadow-[0_0_8px_#FF5500]';

  if (cursorMode === 'project') {
    // Large circular interactive pill for project cards
    ringStyles = 'w-20 h-20 bg-[#FF5500] text-black border-none shadow-[0_10px_25px_rgba(255,85,0,0.45)]';
    dotStyles = 'opacity-0 scale-0';
  } else if (cursorMode === 'magnetic') {
    // Snappy glowing amber halo with higher presence
    ringStyles = 'w-14 h-14 border-2 border-[#FF5500] bg-[#FF5500]/15 backdrop-blur-[2px] shadow-[0_0_20px_rgba(255,85,0,0.35)]';
    dotStyles = 'w-1.5 h-1.5 bg-white shadow-[0_0_10px_white]';
  } else if (cursorMode === 'pointer') {
    // Smooth expansion on links and standard buttons
    ringStyles = 'w-12 h-12 border border-[#FF5500]/70 bg-[#FF5500]/10';
    dotStyles = 'w-1.5 h-1.5 bg-[#FF5500] scale-75';
  } else if (cursorMode === 'text') {
    // Subtle non-intrusive state for text inputs
    ringStyles = 'w-5 h-5 border border-white/20 bg-white/5 opacity-40';
    dotStyles = 'opacity-0 scale-0';
  }

  // Click compression modifier
  const clickScale = isMouseDown ? 'scale-75' : 'scale-100';

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Trailing Physics Ring / Follower Element */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full flex items-center justify-center transition-[width,height,background-color,border-color,box-shadow] duration-200 ease-out will-change-transform ${ringStyles} ${clickScale}`}
        style={{ pointerEvents: 'none' }}
      >
        {cursorMode === 'project' && (
          <div className="flex items-center gap-1 text-[11px] font-black tracking-widest uppercase select-none animate-in fade-in zoom-in-75 duration-200">
            <span>{cursorText}</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
        )}
      </div>

      {/* Instant Precision Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full transition-opacity duration-150 will-change-transform ${dotStyles} ${clickScale}`}
        style={{ pointerEvents: 'none' }}
      />
    </div>
  );
};
