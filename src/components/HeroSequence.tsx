"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 240;
const FRAME_START = 1;

export default function HeroSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // Store images in a ref to avoid re-renders
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  useGSAP(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Helper to retrieve nearest available frame if one is missing
    const getFrameImage = (targetIndex: number): HTMLImageElement | null => {
      const images = imagesRef.current;
      if (!images || images.length === 0) return null;
      if (images[targetIndex]) return images[targetIndex];

      // Search backward
      for (let i = targetIndex - 1; i >= 0; i--) {
        if (images[i]) return images[i];
      }
      // Search forward
      for (let i = targetIndex + 1; i < images.length; i++) {
        if (images[i]) return images[i];
      }
      return null;
    };

    // Render logic - guarantees canvas resolution matches display size at 120 FPS
    const renderFrame = (index: number) => {
      const img = getFrameImage(index);
      if (!img) return;

      const cvs = canvasRef.current;
      if (!cvs) return;
      const ctx = cvs.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const displayWidth = Math.round(cvs.clientWidth * dpr);
      const displayHeight = Math.round(cvs.clientHeight * dpr);

      if (displayWidth === 0 || displayHeight === 0) return;

      // Update buffer size only if changed
      if (cvs.width !== displayWidth || cvs.height !== displayHeight) {
        cvs.width = displayWidth;
        cvs.height = displayHeight;
      }

      const width = cvs.width;
      const height = cvs.height;

      ctx.clearRect(0, 0, width, height);

      // Use contain (Math.min) on mobile portrait so the whole image fits inside the phone frame without overflowing, cover (Math.max) on desktop
      const isMobile = (width / height) < 1.1;
      const scale = isMobile 
        ? Math.min(width / img.width, height / img.height)
        : Math.max(width / img.width, height / img.height);

      const x = (width - img.width * scale) / 2;
      const y = (height - img.height * scale) / 2;

      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    // Detect device mode accurately
    const checkIsMobile = () => {
      if (typeof window === "undefined") return false;
      return (
        window.matchMedia("(max-width: 768px)").matches ||
        window.innerWidth < 768 ||
        window.innerWidth < window.innerHeight ||
        /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
      );
    };

    let currentFolder = checkIsMobile() ? "mobile" : "desktop";

    // Parallel load images from desktop or mobile folder
    const loadImages = async (folderName: string) => {
      setLoaded(false);
      setLoadingProgress(0);
      let loadedCount = 0;
      const images: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);
      const promises: Promise<void>[] = [];

      for (let i = 0; i < FRAME_COUNT; i++) {
        const frameNumber = i + FRAME_START;
        const paddedNumber = String(frameNumber).padStart(3, "0");
        const img = new Image();
        
        const p = new Promise<void>((resolve) => {
          img.onload = () => {
            images[i] = img;
            loadedCount++;
            setLoadingProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
            resolve();
          };
          img.onerror = () => {
            loadedCount++;
            setLoadingProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
            resolve();
          };
        });

        img.src = `/frames/${folderName}/video_frame_${paddedNumber}.webp`;
        promises.push(p);
      }

      await Promise.all(promises);

      imagesRef.current = images;
      setLoadingProgress(100);
      
      setTimeout(() => {
        setLoaded(true);
        requestAnimationFrame(() => {
          renderFrame(0);
          ScrollTrigger.refresh();
        });
      }, 350);
    };

    loadImages(currentFolder);

    // Resize handler with mode switching if breakpoint changes
    const handleResize = () => {
      const newFolder = checkIsMobile() ? "mobile" : "desktop";
      if (newFolder !== currentFolder) {
        currentFolder = newFolder;
        loadImages(newFolder);
      } else {
        const currentIndex = Math.round(scrollObj.frame);
        renderFrame(currentIndex);
      }
    };

    window.addEventListener("resize", handleResize);

    // Scroll animation with GSAP Pinning
    const scrollObj = { frame: 0 };
    
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=350%",
      pin: true,
      pinSpacing: true,
      scrub: 0.5,
      animation: gsap.to(scrollObj, {
        frame: FRAME_COUNT - 1,
        snap: "frame",
        ease: "none",
        onUpdate: () => renderFrame(Math.round(scrollObj.frame)),
      }),
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      trigger.kill();
    };
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden bg-[#06090e]"
    >
      {/* Liquid Glass Loader - Fixed Perfectly Centered */}
      {!loaded && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-md transition-opacity duration-700">
          {/* Dynamic Ambient Fluid Glow Orbs behind the Glass */}
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#00e5ff]/25 blur-[100px] pointer-events-none animate-pulse" />
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#9d4edd]/25 blur-[100px] pointer-events-none animate-pulse delay-1000" />

          {/* Main Liquid Glass Container */}
          <div className="relative flex flex-col items-center px-8 py-9 sm:px-10 sm:py-10 rounded-[36px] bg-white/[0.07] backdrop-blur-2xl border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),inset_0_1.5px_2px_rgba(255,255,255,0.5),inset_0_-1px_2px_rgba(0,0,0,0.3)] max-w-[320px] sm:max-w-[360px] w-full mx-5 overflow-hidden">
            
            {/* Specular Edge Highlights */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
            <div className="absolute -top-16 -left-16 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />

            {/* Liquid Glass Circular Gauge */}
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center my-2">
              {/* Circular SVG Progress Ring */}
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
                <defs>
                  <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00e5ff" />
                    <stop offset="50%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#c084fc" />
                  </linearGradient>
                  <filter id="liquidGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Inactive Track Ring */}
                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  className="text-white/10"
                  stroke="currentColor"
                  strokeWidth="5"
                  fill="transparent"
                />

                {/* Glowing Liquid Progress Ring */}
                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  stroke="url(#liquidGrad)"
                  strokeWidth="6"
                  strokeDasharray={301.6}
                  strokeDashoffset={301.6 - (301.6 * loadingProgress) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  filter="url(#liquidGlow)"
                  className="transition-all duration-200 ease-out"
                />
              </svg>

              {/* Center Counter */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff] mb-1 animate-pulse" />
                <div className="flex items-baseline">
                  <span className="text-4xl sm:text-5xl font-bold tracking-tight text-white font-sans drop-shadow-[0_2px_12px_rgba(255,255,255,0.4)]">
                    {loadingProgress}
                  </span>
                  <span className="text-lg sm:text-xl font-light text-[#00e5ff] ml-0.5">
                    %
                  </span>
                </div>
              </div>
            </div>

            {/* Liquid Horizontal Shimmer Capsule Tube */}
            <div className="w-full h-2 bg-black/40 rounded-full p-[1px] border border-white/15 overflow-hidden relative shadow-inner mt-4">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-[#00e5ff] via-[#38bdf8] to-[#c084fc] transition-all duration-200 ease-out shadow-[0_0_12px_rgba(0,229,255,0.7)] relative"
                style={{ width: `${loadingProgress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
              </div>
            </div>

            {/* Minimal Subtitle */}
            <div className="mt-4 text-[11px] font-medium tracking-[0.22em] text-white/60 uppercase">
              Wczytywanie...
            </div>
          </div>
        </div>
      )}
      
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block object-cover"
      />
    </div>
  );
}




