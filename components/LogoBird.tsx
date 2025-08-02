'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTheme } from '@/contexts/theme-context'

const LogoBird = () => {
  const { theme } = useTheme()
  const logoColor = theme === 'light' ? '#000000' : '#ffffff'
  
  return (
    <div className="flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative"
      >
        {/* Blackbird Logo Image - Increased size to match ring */}
        <Image
          src="/blackbirdlogo.svg"
          alt="Blackbird Logo"
          width={220}
          height={220}
          className="drop-shadow-2xl relative z-10"
          style={{ 
            color: logoColor,
            filter: theme === 'light' ? 'brightness(0)' : 'brightness(1)'
          }}
          priority
        />
        
        {/* Animated glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'} 0%, transparent 70%)`,
            filter: 'blur(15px)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  )
}

export default LogoBird