import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hoveredEl, setHoveredEl] = useState(null);
  const [isTouch, setIsTouch] = useState(false);
  
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
    }
  }, []);

  const mouseX = useMotionValue(window.innerWidth / 2);
  const mouseY = useMotionValue(window.innerHeight / 2);
  
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 300, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 300, mass: 0.5 });
  
  const width = useSpring(useMotionValue(12), { damping: 25, stiffness: 300 });
  const height = useSpring(useMotionValue(12), { damping: 25, stiffness: 300 });
  const borderRadius = useSpring(useMotionValue(9999), { damping: 25, stiffness: 300 });
  const opacity = useSpring(useMotionValue(1), { damping: 25, stiffness: 300 });

  useEffect(() => {
    const onMove = (e) => {
      if (!hoveredEl) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      } else {
        // Magnetic pull toward the center of the hovered element
        const rect = hoveredEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate a slight parallax based on mouse position within the element
        const pullX = (e.clientX - centerX) * 0.1;
        const pullY = (e.clientY - centerY) * 0.1;
        
        mouseX.set(centerX + pullX);
        mouseY.set(centerY + pullY);
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [hoveredEl, mouseX, mouseY]);

  useEffect(() => {
    const attach = () => {
      const els = document.querySelectorAll("a, button, [data-hover]");
      const handlers = [];

      els.forEach((el) => {
        const onEnter = () => {
          setHoveredEl(el);
          const rect = el.getBoundingClientRect();
          const padding = 8;
          width.set(rect.width + padding);
          height.set(rect.height + padding);
          borderRadius.set(12); // rounded-xl look
          opacity.set(0.15); // fade out slightly when snapped
        };
        const onLeave = () => {
          setHoveredEl(null);
          width.set(12);
          height.set(12);
          borderRadius.set(9999);
          opacity.set(1);
        };

        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
        handlers.push({ el, onEnter, onLeave });
      });

      return handlers;
    };
    
    // Slight delay to allow DOM to render
    const t = setTimeout(() => {
      window.__cursorHandlers = attach();
    }, 500);

    return () => {
      clearTimeout(t);
      if (window.__cursorHandlers) {
        window.__cursorHandlers.forEach(({ el, onEnter, onLeave }) => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
        });
      }
    };
  }, [width, height, borderRadius, opacity]);

  if (isTouch) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] bg-neon"
      style={{
        x: smoothX,
        y: smoothY,
        width,
        height,
        borderRadius,
        opacity,
        translateX: "-50%",
        translateY: "-50%",
      }}
    />
  );
}
