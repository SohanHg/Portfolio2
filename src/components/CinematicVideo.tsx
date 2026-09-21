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

    // Detect mobile / touch device
    const isMobile =
      typeof window !== "undefined" &&
      (window.innerWidth < 768 ||
        window.matchMedia("(hover: none)").matches ||
        window.matchMedia("(pointer: coarse)").matches ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ));

    // Ensure audio is muted imperatively so mobile browsers permit playback
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    // ----------------------------------------------------
    // MOBILE STRATEGY: Smooth Autoplaying Cinematic Loop
    // ----------------------------------------------------
    if (isMobile) {
      video.loop = true;

      const attemptPlay = () => {
        const promise = video.play();
        if (promise !== undefined) {
          promise.catch(() => {
            // If autoplay was temporarily blocked by low power mode or browser policy,
            // unlock and play on first touch or scroll interaction
            const unlockOnInteraction = () => {
              video.play().catch(() => {});
              window.removeEventListener("touchstart", unlockOnInteraction);
              window.removeEventListener("scroll", unlockOnInteraction);
            };
            window.addEventListener("touchstart", unlockOnInteraction, {
              once: true,
              passive: true,
            });
            window.addEventListener("scroll", unlockOnInteraction, {
              once: true,
              passive: true,
            });
          });
        }
      };

      video.addEventListener("loadedmetadata", attemptPlay, { once: true });
      video.addEventListener("canplay", attemptPlay, { once: true });
      if (video.readyState >= 1) {
        attemptPlay();
      }

      // Keep fixed container clean and stable (zero 3D tilt overhead on mobile GPU)
      if (containerRef.current) {
        containerRef.current.style.transform = "scale(1.02)";
      }

      // Scroll progress bar listener (lightweight passive DOM update)
      const onMobileScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        if (scrollHeight > 0 && progressRef.current) {
          const pct = Math.max(0, Math.min(1, scrollTop / scrollHeight)) * 100;
          progressRef.current.style.width = `${pct}%`;
        }
      };

      window.addEventListener("scroll", onMobileScroll, { passive: true });
      onMobileScroll();

      // Pause when tab is backgrounded to preserve battery
      const onVisibilityChange = () => {
        if (document.hidden) {
          video.pause();
        } else {
          video.play().catch(() => {});
        }
      };
      document.addEventListener("visibilitychange", onVisibilityChange);

      return () => {
        window.removeEventListener("scroll", onMobileScroll);
        document.removeEventListener("visibilitychange", onVisibilityChange);
      };
    }

    // ----------------------------------------------------
    // DESKTOP STRATEGY: Cursor Parallax & Scroll-Scrubbing
    // ----------------------------------------------------
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

    // Mouse: controls 3D parallax tilt + red glow
    const onMouseMove = (e: MouseEvent) => {
      const mx = e.clientX / window.innerWidth;
      const my = e.clientY / window.innerHeight;

      if (containerRef.current) {
        const dx = mx * 2 - 1;
        const dy = my * 2 - 1;
        containerRef.current.style.transform = `scale(1.05) translate3d(${
          dx * -10
        }px, ${dy * -10}px, 0) rotateX(${dy * -1}deg) rotateY(${dx * 1}deg)`;
      }

      const glow = document.getElementById("cine-glow");
      if (glow) {
        const xp = mx * 100;
        const yp = my * 100;
        glow.style.background = `radial-gradient(at ${xp}% ${yp}%, rgba(196,0,36,0.18), transparent 70%)`;
      }
    };

    // Scroll: controls video time
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        scrollYRef.current = Math.max(0, Math.min(1, scrollTop / scrollHeight));
      }

      if (progressRef.current) {
        progressRef.current.style.width = `${scrollYRef.current * 100}%`;
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    let rafId: number;

    const tick = () => {
      const v = videoRef.current;
      if (
        v &&
        readyRef.current &&
        v.duration &&
        isFinite(v.duration) &&
        v.duration > 0
      ) {
        const dur = v.duration;
        targetRef.current = scrollYRef.current * dur;

        if (targetRef.current < 0) targetRef.current = 0;
        if (targetRef.current > dur - 0.01) targetRef.current = dur - 0.01;

        currentRef.current += (targetRef.current - currentRef.current) * 0.15;

        // Only seek when difference exceeds threshold and decoder isn't busy
        if (
          !v.seeking &&
          Math.abs(currentRef.current - v.currentTime) > 0.002
        ) {
          try {
            v.currentTime = currentRef.current;
          } catch {}
        }

        if (!v.paused) v.pause();
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      video.removeEventListener("loadedmetadata", handleReady);
      video.removeEventListener("canplay", handleReady);
      video.removeEventListener("canplaythrough", handleReady);
      window.removeEventListener("mousemove", onMouseMove);
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
            loop
            autoPlay
            preload="auto"
            className="w-full h-full object-cover"
            style={{
              opacity: 0.65,
              objectPosition: "center 28%",
            }}
          >
            <source src="/video/portfolio-background.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </>
  );
}
