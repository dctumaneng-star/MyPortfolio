import { useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';

export default function DraggableMarquee({ items, baseVelocity = -1 }) {
  const x = useMotionValue(0);
  const trackRef = useRef(null);

  useAnimationFrame((t, delta) => {
    // baseVelocity is translated to roughly pixels per frame.
    // e.g. -1 * (16 / 16.6) approx -1px per frame.
    let moveBy = baseVelocity * (delta / 16.6);
    let currentX = x.get();
    
    // Add auto-scroll velocity
    currentX += moveBy;
    
    if (trackRef.current) {
      // The track contains 4 copies. We wrap seamlessly around the halfway point.
      const wrapWidth = trackRef.current.scrollWidth / 2;
      
      if (wrapWidth > 0) {
        // Wrap logic: keep currentX between -wrapWidth and 0
        if (currentX <= -wrapWidth) {
          currentX += wrapWidth;
        } else if (currentX > 0) {
          currentX -= wrapWidth;
        }
      }
    }
    
    // Manually apply the wrapped position. 
    // Framer Motion's drag handles its own pixel updates to this exact same useMotionValue,
    // so they stay perfectly in sync without conflicting transforms.
    x.set(currentX);
  });

  return (
    <div className="overflow-hidden w-full flex flex-nowrap shrink-0 cursor-grab active:cursor-grabbing">
      <motion.div
        ref={trackRef}
        className="flex flex-nowrap whitespace-nowrap w-max"
        style={{ x }}
        drag="x"
        dragElastic={0}
      >
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="font-display font-medium text-xl md:text-2xl text-ink dark:text-chalk px-6 tracking-tight lowercase select-none">
              {item}
            </span>
            <span className="text-neon font-mono text-sm px-2 select-none pointer-events-none">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
