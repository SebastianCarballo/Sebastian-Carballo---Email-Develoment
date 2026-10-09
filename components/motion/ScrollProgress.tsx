"use client";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

// Barra de progreso de scroll estilo "deliverability bar".
export default function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.4 });
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-inbox via-sent to-cta"
      style={{ scaleX }}
    />
  );
}
