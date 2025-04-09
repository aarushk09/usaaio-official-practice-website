"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Lightbulb, PieChart, Cpu, Network, Check, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface PathModule {
  id: string
  title: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced"
  estimatedHours: number
  topics: number
  completed?: boolean
  inProgress?: boolean
}

interface LearningPath {
  id: string
  title: string
  description: string
  icon: React.ElementType
  color: string
  progress: number
  modules: PathModule[]
}

export default function LearningPaths() {
  const [selectedPath, setSelectedPath] = useState<string>("foundations")

  const learningPaths: LearningPath[] = [
    {
      id: "foundations",
      title: "AI Foundations",
      description: "Start your AI journey with core concepts and programming fundamentals",
      icon: Lightbulb,
      color: "from-brand-teal to-brand-blue",
      progress: 0,
      modules: [
        {
          id: "python-basics",
          title: "Python Programming",
          description: "Learn Python programming fundamentals for AI development",
          difficulty: "beginner",
          estimatedHours: 10,
          topics: 8,
        },
        {
          id: "numpy-pandas",
          title: "NumPy & Pandas",
          description: "Master data manipulation with essential Python libraries",
          difficulty: "beginner",
          estimatedHours: 8,
          topics: 6,
        },
        {
          id: "data-visualization",
          title: "Data Visualization",
          description: "Create insightful visualizations with Matplotlib and Seaborn",
          difficulty: "beginner",
          estimatedHours: 6,
          topics: 5,
        },
        {
          id: "math-foundations",
          title: "Mathematical Foundations",
          description: "Linear algebra, calculus, and statistics for AI",
          difficulty: "intermediate",
          estimatedHours: 12,
          topics: 10,
        },
      ],
    },
    {
      id: "machine-learning",
      title: "Machine Learning",
      description: "Explore supervised and unsupervised learning algorithms",
      icon: PieChart,
      color: "from-brand-purple to-brand-magenta",
      progress: 0,
      modules: [
        {
          id: "ml-fundamentals",
          title: "Machine Learning Fundamentals",
          description: "Core concepts of machine learning algorithms",
          difficulty: "intermediate",
          estimatedHours: 15,
          topics: 12,
        },
        {
          id: "supervised-learning",
          title: "Supervised Learning",
          description: "Regression, classification, and evaluation metrics",
          difficulty: "intermediate",
          estimatedHours: 18,
          topics: 14,
        },
        {
          id: "unsupervised-learning",
          title: "Unsupervised Learning",
          description: "Clustering, dimensionality reduction, and anomaly detection",
          difficulty: "intermediate",
          estimatedHours: 12,
          topics: 8,
        },
        {
          id: "feature-engineering",
          title: "Feature Engineering",
          description: "Transform raw data into model-ready features",
          difficulty: "advanced",
          estimatedHours: 10,
          topics: 7,
        },
      ],
    },
    {
      id: "deep-learning",
      title: "Deep Learning",
      description: "Master neural networks and advanced architectures",
      icon: Network,
      color: "from-brand-violet to-brand-purple",
      progress: 0,
      modules: [
        {
          id: "nn-foundations",
          title: "Neural Network Foundations",
          description: "Architecture, backpropagation, and optimization",
          difficulty: "intermediate",
          estimatedHours: 14,
          topics: 10,
        },
        {
          id: "convolutional-networks",
          title: "Convolutional Neural Networks",
          description: "Computer vision and image processing",
          difficulty: "advanced",
          estimatedHours: 16,
          topics: 12,
        },
        {
          id: "recurrent-networks",
          title: "Recurrent Neural Networks",
          description: "Sequence modeling and time series analysis",
          difficulty: "advanced",
          estimatedHours: 15,
          topics: 10,
        },
        {
          id: "transformers",
          title: "Transformers",
          description: "Attention mechanisms and large language models",
          difficulty: "advanced",
          estimatedHours: 18,
          topics: 14,
        },
      ],
    },
    {
      id: "advanced",
      title: "Advanced Topics",
      description: "Explore cutting-edge AI techniques and applications",
      icon: Cpu,
      color: "from-brand-blue to-brand-teal",
      progress: 0,
      modules: [
        {
          id: "reinforcement-learning",
          title: "Reinforcement Learning",
          description: "Train agents to make decisions through rewards",
          difficulty: "advanced",
          estimatedHours: 20,
          topics: 15,
        },
        {
          id: "generative-ai",
          title: "Generative AI",
          description: "Create content with GANs, VAEs, and diffusion models",
          difficulty: "advanced",
          estimatedHours: 18,
          topics: 12,
        },
        {
          id: "ai-ethics",
          title: "AI Ethics & Governance",
          description: "Ethical considerations and responsible AI development",
          difficulty: "intermediate",
          estimatedHours: 8,
          topics: 6,
        },
        {
          id: "competition-strategies",
          title: "Competition Strategies",
          description: "Advanced techniques for winning AI competitions",
          difficulty: "advanced",
          estimatedHours: 10,
          topics: 8,
        },
      ],
    },
  ]

  const currentPath = learningPaths.find((path) => path.id === selectedPath) || learningPaths[0]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "text-brand-teal"
      case "intermediate":
        return "text-brand-blue"
      case "advanced":
        return "text-brand-purple"
      default:
        return "text-gray-400"
    }
  }

  const getDifficultyBg = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-brand-teal/20"
      case "intermediate":
        return "bg-brand-blue/20"
      case "advanced":
        return "bg-brand-purple/20"
      default:
        return "bg-gray-700"
    }
  }

  return (
    <section className="py-20 bg-brand-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Learning Paths</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Structured pathways to master AI concepts and prepare for the USAAIO competition
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="space-y-3">
              {learningPaths.map((path) => (
                <motion.div key={path.id} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <button
                    onClick={() => setSelectedPath(path.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                      selectedPath === path.id
                        ? "bg-gradient-to-r " + path.color + " text-white"
                        : "bg-brand-gray/20 text-gray-300 hover:bg-brand-gray/30"
                    }`}
                  >
                    <div className="flex items-center">
                      <path.icon
                        className={`h-5 w-5 ${selectedPath === path.id ? "text-white" : "text-gray-400"} mr-3`}
                      />
                      <span className="font-medium">{path.title}</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-brand-gray/10 rounded-xl p-6 border border-brand-gray/20">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-2">{currentPath.title}</h3>
                  <p className="text-gray-400">{currentPath.description}</p>
                </div>
                <div className={`p-3 rounded-full bg-gradient-to-r ${currentPath.color}`}>
                  <currentPath.icon className="h-6 w-6 text-white" />
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Overall Progress</span>
                  <span className="text-sm text-white">{currentPath.progress}%</span>
                </div>
                <div className="h-2 w-full bg-brand-gray/30 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${currentPath.color} progress-indicator`}
                    style={{ width: `${currentPath.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-4">
                {currentPath.modules.map((module) => (
                  <div
                    key={module.id}
                    className="bg-brand-gray/20 rounded-lg p-4 transition-all hover:shadow-lg hover:shadow-brand-purple/10 border border-brand-gray/20"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-medium text-white">{module.title}</h4>
                      <div
                        className={`px-2 py-1 rounded-full ${getDifficultyBg(module.difficulty)} ${getDifficultyColor(module.difficulty)} text-xs font-medium`}
                      >
                        {module.difficulty.charAt(0).toUpperCase() + module.difficulty.slice(1)}
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{module.description}</p>
                    <div className="flex flex-wrap items-center justify-between">
                      <div className="flex items-center text-gray-400 text-sm space-x-3">
                        <span className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {module.estimatedHours} hours
                        </span>
                        <span className="flex items-center">
                          <Lightbulb size={14} className="mr-1" />
                          {module.topics} topics
                        </span>
                      </div>

                      <div>
                        {module.completed ? (
                          <span className="flex items-center text-brand-teal text-sm">
                            <Check size={14} className="mr-1" /> Completed
                          </span>
                        ) : module.inProgress ? (
                          <span className="flex items-center text-brand-blue text-sm">
                            <Clock size={14} className="mr-1" /> In Progress
                          </span>
                        ) : (
                          <Button
                            size="sm"
                            className="bg-transparent border border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white"
                          >
                            <Link href={`/learning-paths/${currentPath.id}/${module.id}`}>Start Module</Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-brand-purple to-brand-violet hover:opacity-90 text-white"
                >
                  <Link href={`/learning-paths/${currentPath.id}`} className="flex items-center">
                    Explore Full Path <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

