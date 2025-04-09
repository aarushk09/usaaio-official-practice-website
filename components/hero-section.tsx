"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Brain, Zap, Award, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="relative min-h-screen pt-16 overflow-hidden neural-bg">
      {/* Neural Network Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-30 circuit-pattern"></div>

      {/* Animated Nodes */}
      <div className="absolute inset-0 z-0">
        <div className="neural-node absolute top-1/4 left-1/4 h-3 w-3 rounded-full bg-brand-purple"></div>
        <div
          className="neural-node absolute top-1/3 right-1/3 h-4 w-4 rounded-full bg-brand-teal"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="neural-node absolute bottom-1/4 right-1/4 h-2 w-2 rounded-full bg-brand-magenta"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="neural-node absolute bottom-1/3 left-1/5 h-3 w-3 rounded-full bg-brand-blue"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="neural-node absolute top-1/2 right-1/5 h-2 w-2 rounded-full bg-brand-violet"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[85vh] text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-brand-gray/20 border border-brand-gray/30 backdrop-blur-sm">
              <span className="text-brand-teal text-sm font-medium">USAAIO 2025 Preparation Guide</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Master <span className="gradient-text">Artificial Intelligence</span> and Ace the Olympiad
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              A comprehensive learning platform designed to guide you through AI concepts, practice problems, and
              competitive strategies for the USA AI Olympiad.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-brand-purple to-brand-violet hover:opacity-90 text-white"
              >
                <Link href="/learning-paths/foundations" className="flex items-center">
                  Start Learning Now <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>

              <Button size="lg" variant="outline" className="border-brand-teal text-brand-teal hover:bg-brand-teal/10">
                <Link href="/about" className="flex items-center">
                  About the Competition
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
          >
            <div className="glass rounded-xl p-5 card-hover">
              <div className="h-10 w-10 rounded-full bg-brand-purple/20 flex items-center justify-center mb-3">
                <Brain size={20} className="text-brand-magenta" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI Fundamentals</h3>
              <p className="text-gray-400">Learn core AI and ML concepts through interactive tutorials.</p>
            </div>

            <div className="glass rounded-xl p-5 card-hover">
              <div className="h-10 w-10 rounded-full bg-brand-teal/20 flex items-center justify-center mb-3">
                <Zap size={20} className="text-brand-teal" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Practice Arena</h3>
              <p className="text-gray-400">Solve real competition problems with immediate feedback.</p>
            </div>

            <div className="glass rounded-xl p-5 card-hover">
              <div className="h-10 w-10 rounded-full bg-brand-blue/20 flex items-center justify-center mb-3">
                <Award size={20} className="text-brand-blue" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Competition Prep</h3>
              <p className="text-gray-400">Strategic guidance and timed practice for the USAAIO.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
          >
            <ChevronDown size={24} className="text-gray-400" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

