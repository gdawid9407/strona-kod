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
      {/* Liquid Glass Loader - Fixed 100% Guaranteed Centered */}
      {!loaded && (
        <div 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999999,
            backgroundColor: "rgba(6, 9, 14, 0.65)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          {/* Ambient Glowing Liquid Light Orbs */}
          <div 
            style={{
              position: "absolute",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: "rgba(0, 229, 255, 0.2)",
              filter: "blur(90px)",
              pointerEvents: "none",
            }}
          />
          <div 
            style={{
              position: "absolute",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: "rgba(157, 78, 221, 0.2)",
              filter: "blur(90px)",
              pointerEvents: "none",
            }}
          />

          {/* Liquid Glass Capsule Card */}
          <div 
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "36px 28px",
              borderRadius: "36px",
              backgroundColor: "rgba(255, 255, 255, 0.06)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255, 255, 255, 0.22)",
              boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.8), inset 0 1.5px 2px rgba(255, 255, 255, 0.4), inset 0 -1px 2px rgba(0, 0, 0, 0.3)",
              width: "min(320px, calc(100vw - 48px))",
              overflow: "hidden",
            }}
          >
            {/* Top Specular Reflection Highlight */}
            <div 
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "1.5px",
                background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)",
              }}
            />

            {/* Liquid Glass Circular Gauge */}
            <div 
              style={{
                position: "relative",
                width: "150px",
                height: "150px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "8px 0 16px 0",
              }}
            >
              <svg 
                style={{
                  width: "100%",
                  height: "100%",
                  transform: "rotate(-90deg)",
                }}
                viewBox="0 0 120 120"
              >
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
                  stroke="rgba(255, 255, 255, 0.08)"
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
                  style={{
                    transition: "stroke-dashoffset 0.2s ease-out",
                  }}
                />
              </svg>

              {/* Center Counter */}
              <div 
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Glowing droplet indicator */}
                <div 
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#00e5ff",
                    boxShadow: "0 0 10px #00e5ff",
                    marginBottom: "4px",
                  }}
                />
                <div style={{ display: "flex", alignItems: "baseline" }}>
                  <span 
                    style={{
                      fontSize: "44px",
                      fontWeight: 700,
                      color: "#ffffff",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      textShadow: "0 2px 14px rgba(255, 255, 255, 0.35)",
                      lineHeight: 1,
                    }}
                  >
                    {loadingProgress}
                  </span>
                  <span 
                    style={{
                      fontSize: "18px",
                      fontWeight: 300,
                      color: "#00e5ff",
                      marginLeft: "2px",
                      lineHeight: 1,
                    }}
                  >
                    %
                  </span>
                </div>
              </div>
            </div>

            {/* Slim Liquid Shimmer Tube */}
            <div 
              style={{
                width: "100%",
                height: "6px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                borderRadius: "999px",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                overflow: "hidden",
                position: "relative",
                marginTop: "12px",
              }}
            >
              <div 
                style={{
                  height: "100%",
                  width: `${loadingProgress}%`,
                  borderRadius: "999px",
                  background: "linear-gradient(90deg, #00e5ff, #38bdf8, #c084fc)",
                  boxShadow: "0 0 12px rgba(0, 229, 255, 0.7)",
                  transition: "width 0.2s ease-out",
                }}
              />
            </div>

            {/* Subtitle */}
            <div 
              style={{
                marginTop: "14px",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.22em",
                color: "rgba(255, 255, 255, 0.55)",
                textTransform: "uppercase",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
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




