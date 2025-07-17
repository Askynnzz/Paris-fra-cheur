import React from "react";
import { motion } from "framer-motion";

export default function Spinner() {
  return (
    <motion.div
      className="flex justify-center items-center h-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"
        aria-label="Chargement..."
      />
    </motion.div>
  );
}
