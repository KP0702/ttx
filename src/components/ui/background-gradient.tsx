import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface BackgroundGradientProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export const BackgroundGradient: React.FC<BackgroundGradientProps> = ({
  children,
  className,
  animate = true,
}) => {
  return (
    <div className={cn("relative", className)}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20"
        animate={animate ? {
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        } : undefined}
        transition={animate ? {
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        } : undefined}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}; 