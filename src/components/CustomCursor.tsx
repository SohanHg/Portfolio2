'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const cursor = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const dot = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isTouch = 'ontouchstart' in window || window.matchMedia('(hover: none)').matches;
      setIsTouchDevice(isTouch);
      if (!isTouch) {
        document.body.style.cursor = 'none';
      }
    }
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const onMouseMove = (e: MouseEvent) => {
      cursor.current.x = e.clientX;
      cursor.current.y = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-magnetic]')
      ) {
        isHovering.current = true;
      } else {
        isHovering.current = false;
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    let animationFrameId: number;

    const render = () => {
      // Lerp
      ring.current.x += (cursor.current.x - ring.current.x) * 0.15;
      ring.current.y += (cursor.current.y - ring.current.y) * 0.15;

      dot.current.x += (cursor.current.x - dot.current.x) * 0.25;
      dot.current.y += (cursor.current.y - dot.current.y) * 0.25;

      if (ringRef.current && dotRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%) scale(${
          isHovering.current ? 1.5 : 1
        })`;
        ringRef.current.style.borderColor = isHovering.current ? 'rgba(224, 0, 42, 0.8)' : 'rgba(196, 0, 36, 0.5)';

        dotRef.current.style.transform = `translate3d(${dot.current.x}px, ${dot.current.y}px, 0) translate(-50%, -50%) scale(${
          isHovering.current ? 0.5 : 1
        })`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border-[1.5px] border-[var(--accent-red)] rounded-full pointer-events-none z-[9999] transition-[border-color,transform] duration-150 ease-out will-change-transform"
        style={{ transform: 'translate(-50%, -50%)', borderColor: 'rgba(196, 0, 36, 0.5)' }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[var(--accent-red)] rounded-full pointer-events-none z-[9999] transition-transform duration-150 ease-out will-change-transform"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
}
