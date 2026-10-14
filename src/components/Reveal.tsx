import React, { ElementType } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  durationMs?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distancePx?: number;
  as?: ElementType;
  threshold?: number;
  rootMargin?: string;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delayMs = 0,
  durationMs = 600,
  direction = 'up',
  distancePx = 28,
  as: Component = 'div',
  threshold = 0.12,
  rootMargin = '0px 0px -40px 0px'
}) => {
  const { ref, isVisible } = useIntersectionObserver<HTMLElement>({
    threshold,
    rootMargin,
    freezeOnceVisible: true
  });

  // Calculate transform offset based on direction
  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0)';
    switch (direction) {
      case 'up':
        return `translate3d(0, ${distancePx}px, 0)`;
      case 'down':
        return `translate3d(0, -${distancePx}px, 0)`;
      case 'left':
        return `translate3d(${distancePx}px, 0, 0)`;
      case 'right':
        return `translate3d(-${distancePx}px, 0, 0)`;
      case 'none':
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: getTransform(),
    transition: `opacity ${durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform ${durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`,
    willChange: 'opacity, transform'
  };

  return (
    <Component
      ref={ref}
      style={style}
      className={className}
    >
      {children}
    </Component>
  );
};
