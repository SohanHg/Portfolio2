"use client";

import { useEffect, useRef } from "react";

export default function CinematicVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const readyRef = useRef(false);

  const currentRef = useRef(0);
  const targetRef = useRef(0);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleReady = () => {
      if (readyRef.current) return;
      readyRef.current = true;
      video.pause();
      try {
        video.currentTime = 0;
      } catch {}
    };

    video.addEventListener("loadedmetadata", handleReady);
    video.addEventListener("canplay", handleReady);
    video.addEventListener("canplaythrough", handleReady);

    if (video.readyState >= 1) handleReady();

    return () => {
      video.removeEventListener("loadedmetadata", handleReady);
      video.removeEventListener("canplay", handleReady);
      video.removeEventListener("canplaythrough", handleReady);
    };
  }, []);

  useEffect(() => {
    // --- Mouse: ONLY controls 3D parallax tilt + red glow (NOT video time) ---
    const onMouseMove = (e: MouseEvent) => {
      const mx = e.clientX / window.innerWidth;
      const my = e.clientY / window.innerHeight;

      // 3D parallax tilt on full-bleed video container (covers entire browser)
      if (containerRef.current) {
        const dx = mx * 2 - 1;
        const dy = my * 2 - 1;
        containerRef.current.style.transform =
          `scale(1.05) translate3d(${dx * -10}px, ${dy * -10}px, 0) rotateX(${dy * -1}deg) rotateY(${dx * 1}deg)`;
      }

      // Cursor-tracking red spotlight
      const glow = document.getElementById("cine-glow");
      if (glow) {
        const xp = mx * 100;
        const yp = my * 100;
        glow.style.background = `radial-gradient(at ${xp}% ${yp}%, rgba(196,0,36,0.18), transparent 70%)`;
      }
    };

    // --- Touch Move: update parallax and ambient glow on smartphones and tablets ---
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      const mx = touch.clientX / window.innerWidth;
      const my = touch.clientY / window.innerHeight;

      if (containerRef.current) {
        const dx = mx * 2 - 1;
        const dy = my * 2 - 1;
        containerRef.current.style.transform =
          `scale(1.05) translate3d(${dx * -8}px, ${dy * -8}px, 0) rotateX(${dy * -1}deg) rotateY(${dx * 1}deg)`;
      }

      const glow = document.getElementById("cine-glow");
      if (glow) {
        const xp = mx * 100;
        const yp = my * 100;
        glow.style.background = `radial-gradient(at ${xp}% ${yp}%, rgba(196,0,36,0.18), transparent 70%)`;
      }
    };

    // --- Device Orientation (Gyroscope): ambient tilt when holding phone/tablet ---
    const onDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return;
      const dx = Math.max(-1, Math.min(1, e.gamma / 35));
      const dy = Math.max(-1, Math.min(1, (e.beta - 45) / 35));
      if (containerRef.current) {
        containerRef.current.style.transform =
          `scale(1.05) translate3d(${dx * -8}px, ${dy * -8}px, 0) rotateX(${dy * -1}deg) rotateY(${dx * 1}deg)`;
      }
    };

    // --- Scroll: controls video time (100% scroll-driven, section-based) ---
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        scrollYRef.current = Math.max(0, Math.min(1, scrollTop / scrollHeight));
      }

      // Update scroll progress bar
      if (progressRef.current) {
        progressRef.current.style.width = `${scrollYRef.current * 100}%`;
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    if (typeof window !== "undefined" && window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", onDeviceOrientation, { passive: true });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // --- requestAnimationFrame LERP loop (scroll-only video scrubbing) ---
    let rafId: number;

    const tick = () => {
      const video = videoRef.current;

      if (video && readyRef.current && video.duration && isFinite(video.duration) && video.duration > 0) {
        const dur = video.duration;

        // Video time is 100% driven by scroll position through sections
        targetRef.current = scrollYRef.current * dur;

        // Clamp to valid range
        if (targetRef.current < 0) targetRef.current = 0;
        if (targetRef.current > dur - 0.01) targetRef.current = dur - 0.01;

        // Faster LERP factor (0.15) for snappier response
        currentRef.current += (targetRef.current - currentRef.current) * 0.15;

        // Seek when difference exceeds threshold
        if (Math.abs(currentRef.current - video.currentTime) > 0.001) {
          try {
            video.currentTime = currentRef.current;
          } catch {}
        }

        // Ensure video stays paused
        if (!video.paused) video.pause();
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("deviceorientation", onDeviceOrientation);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Ambient red scroll progress bar */}
      <div
        ref={progressRef}
        className="fixed top-0 left-0 z-50 pointer-events-none"
        style={{
          height: "2px",
          width: "0%",
          background: "linear-gradient(to right, #c40024, #e0002a)",
          boxShadow: "0 0 8px rgba(196, 0, 36, 0.6)",
        }}
      />

      {/* Fixed video background covering the entire browser */}
      <div
        className="fixed inset-0 z-0 overflow-hidden"
        style={{ backgroundColor: "#030303" }}
      >
        <div
          ref={containerRef}
          className="absolute inset-0 w-full h-full will-change-transform flex items-center justify-center"
          style={{
            transform: "scale(1.05)",
            transformOrigin: "center center",
            transition: "transform 0.25s ease-out",
          }}
        >
          {/* Dark gradient fallback */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, #090909, #030303)",
              zIndex: -1,
            }}
          />

          <video
            ref={videoRef}
            playsInline
            muted
            preload="auto"
            className="w-full h-full object-cover"
            style={{
              opacity: 0.65,
              objectPosition: "center 28%",
              touchAction: "pan-y",
            }}
          >
            <source src="/video/portfolio-background.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </>
  );
}
