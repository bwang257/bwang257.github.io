// src/hooks/useSmoothScroll.js
import { useState, useEffect } from "react";

/**
 * Returns a smoothed scroll position that eases toward the true window.scrollY value.
 * @param {number} smoothness - Lower values = slower interpolation (0.05–0.2 typical).
 */
export function useSmoothScroll(smoothness = 0.1) {
  const [scrollY, setScrollY] = useState(0);
  const [displayY, setDisplayY] = useState(0);

  useEffect(() => {
    let animationFrame;
    const handleScroll = () => setScrollY(window.scrollY);

    const smoothScroll = () => {
      setDisplayY(prev => prev + (scrollY - prev) * smoothness);
      animationFrame = requestAnimationFrame(smoothScroll);
    };

    window.addEventListener("scroll", handleScroll);
    animationFrame = requestAnimationFrame(smoothScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrame);
    };
  }, [smoothness, scrollY]);

  return displayY;
}
