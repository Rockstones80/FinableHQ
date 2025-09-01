// src/app/blog/[slug]/ClientMotionWrapper.tsx
'use client'

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface ClientMotionWrapperProps {
  children: ReactNode
}

export default function ClientMotionWrapper({ children }: ClientMotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}