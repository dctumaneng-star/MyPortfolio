import { useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion';

const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export default function DraggableMarquee({ items, baseVelocity = -1 }) {
  const baseX = useMotionValue(0);

  useAnimationFrame((t, delta) => {
    let moveBy = baseVelocity * (delta / 25);
    baseX.set(baseX.get() + moveBy);
  });

  // We wrap between -50% and 0%.
  // We duplicate the items 4 times to ensure it can seamlessly wrap.
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  return (
    <div className="overflow-hidden w-full flex flex-nowrap shrink-0 cursor-grab active:cursor-grabbing">
      <motion.div
        className="flex flex-nowrap whitespace-nowrap"
        style={{ x }}
        drag="x"
        dragElastic={0.1}
        onDrag={(e, info) => {
          // Add the drag delta directly to baseX
          // Multiply by a smaller scalar since baseX represents percentage, not pixels
          baseX.set(baseX.get() + (info.delta.x * 0.05));
        }}
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
