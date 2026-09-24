import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
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
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const attach = () => {
      const els = document.querySelectorAll("a, button, [data-hover]");
      const handlers = [];

      els.forEach((el) => {
        const onEnter = () => {
          setIsHovered(true);
          width.set(36);
          height.set(36);
          opacity.set(0.5); 
        };
        const onLeave = () => {
          setIsHovered(false);
          width.set(12);
          height.set(12);
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
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      animate={{
        backgroundColor: isHovered ? "transparent" : "#00E5C0",
        border: isHovered ? "1px solid #00E5C0" : "0px solid transparent",
        scale: isHovered ? [1, 1.05, 1] : 1
      }}
      transition={{ duration: 0.2, scale: { repeat: isHovered ? Infinity : 0, duration: 2 } }}
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
