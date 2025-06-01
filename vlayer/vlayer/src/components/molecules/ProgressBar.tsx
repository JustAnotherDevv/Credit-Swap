import React from "react";
import { motion } from "motion/react";

interface ProgressBarProps {
  progress?: number; // 0-100
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress = 50,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className={`progress-bar ${className}`}
    >
      <motion.div
        className="progress-fill"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </motion.div>
  );
};
