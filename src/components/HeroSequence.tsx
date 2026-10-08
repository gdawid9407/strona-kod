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

      // Cover scaling for full pixel clarity on both desktop & mobile
      const scale = Math.max(width / img.width, height / img.height);
      const x = (width - img.width * scale) / 2;
      const y = (height - img.height * scale) / 2;

      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    // Parallel load images from desktop or mobile folder
    const loadImages = async () => {
      let loadedCount = 0;
      const images: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);
      const promises: Promise<void>[] = [];

      const isMobileDevice = window.innerWidth < 768 || (window.innerWidth / window.innerHeight) < 1.1;
      const folder = isMobileDevice ? "mobile" : "desktop";

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
            // Fallback to desktop frame if mobile frame is not found
            if (folder === "mobile") {
              const fallbackImg = new Image();
              fallbackImg.onload = () => {
                images[i] = fallbackImg;
                loadedCount++;
                setLoadingProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
                resolve();
              };
              fallbackImg.onerror = () => {
                loadedCount++;
                setLoadingProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
                resolve();
              };
              fallbackImg.src = `/frames/desktop/video_frame_${paddedNumber}.webp`;
            } else {
              loadedCount++;
              setLoadingProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
              resolve();
            }
          };
        });

        img.src = `/frames/${folder}/video_frame_${paddedNumber}.webp`;
        promises.push(p);
      }

      await Promise.all(promises);

      imagesRef.current = images;
      setLoaded(true);
      
      requestAnimationFrame(() => {
        renderFrame(0);
        ScrollTrigger.refresh();
      });
    };

    loadImages();

    // Resize handler
    const handleResize = () => {
      const currentIndex = Math.round(scrollObj.frame);
      renderFrame(currentIndex);
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
      {/* Minimal Loader */}
      {!loaded && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#06090e]">
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#00e5ff] transition-all duration-150 ease-out shadow-[0_0_12px_#00e5ff]"
              style={{ width: `${loadingProgress}%` }}
            />
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




