"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BarChart3, Filter, Tag, Clock, Check, Search } from "lucide-react"

interface Problem {
  id: number
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  category: string
  tags: string[]
  timeEstimate: string
  solved?: boolean
}

export default function ProblemsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Sample problems data
  const problems: Problem[] = [
    {
      id: 1,
      title: "Linear Regression House Price Prediction",
      difficulty: "Easy",
      category: "Supervised Learning",
      tags: ["Regression", "Feature Engineering"],
      timeEstimate: "30 mins",
      solved: true,
    },
    {
      id: 2,
      title: "Image Classification with CNNs",
      difficulty: "Medium",
      category: "Deep Learning",
      tags: ["Computer Vision", "Classification"],
      timeEstimate: "1 hour",
      solved: false,
    },
    {
      id: 3,
      title: "Sentiment Analysis with RNNs",
      difficulty: "Hard",
      category: "Natural Language Processing",
      tags: ["Text", "Classification"],
      timeEstimate: "2 hours",
      solved: false,
    },
    {
      id: 4,
      title: "K-Means Clustering for Customer Segmentation",
      difficulty: "Medium",
      category: "Unsupervised Learning",
      tags: ["Clustering", "Marketing"],
      timeEstimate: "45 mins",
      solved: false,
    },
    {
      id: 5,
      title: "Decision Trees for Diabetes Prediction",
      difficulty: "Easy",
      category: "Supervised Learning",
      tags: ["Classification", "Healthcare"],
      timeEstimate: "40 mins",
      solved: true,
    },
    {
      id: 6,
      title: "Transformer-Based Question Answering",
      difficulty: "Hard",
      category: "Natural Language Processing",
      tags: ["Transformers", "QA Systems"],
      timeEstimate: "3 hours",
      solved: false,
    },
    {
      id: 7,
      title: "Time Series Forecasting with LSTM",
      difficulty: "Medium",
      category: "Deep Learning",
      tags: ["Time Series", "Forecasting"],
      timeEstimate: "1.5 hours",
      solved: false,
    },
    {
      id: 8,
      title: "Recommender System with Collaborative Filtering",
      difficulty: "Medium",
      category: "Unsupervised Learning",
      tags: ["Recommendations", "Matrix Factorization"],
      timeEstimate: "1 hour",
      solved: false,
    },
  ]

  const categories = Array.from(new Set(problems.map((problem) => problem.category)))
  const difficulties = ["Easy", "Medium", "Hard"]

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesDifficulty = selectedDifficulty ? problem.difficulty === selectedDifficulty : true
    const matchesCategory = selectedCategory ? problem.category === selectedCategory : true
    return matchesSearch && matchesDifficulty && matchesCategory
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-brand-teal"
      case "Medium":
        return "text-brand-blue"
      case "Hard":
        return "text-brand-purple"
      default:
        return "text-gray-500"
    }
  }

  const getDifficultyBgColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-brand-teal/20"
      case "Medium":
        return "bg-brand-blue/20"
      case "Hard":
        return "bg-brand-purple/20"
      default:
        return "bg-gray-700/20"
    }
  }

  return (
    <div className="min-h-screen bg-brand-dark pt-16">
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Practice Arena</h1>
            <p className="text-gray-400">Solve real USAAIO-style problems and build your skills</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-brand-black/50 rounded-full px-3 py-1 text-brand-teal text-sm flex items-center">
              <Check size={14} className="mr-1" /> 2 Solved
            </div>
            <div className="bg-brand-black/50 rounded-full px-3 py-1 text-brand-blue text-sm flex items-center">
              <BarChart3 size={14} className="mr-1" /> 208 Available
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="glass rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
            <div className="relative w-full md:w-auto flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search problems by name or tag..."
                className="bg-brand-gray/10 border border-brand-gray/30 text-white pl-10 pr-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <div className="dropdown relative">
                <Button
                  variant="outline"
                  className="border-brand-gray/50 text-gray-300 hover:text-white hover:bg-brand-gray/20 flex items-center"
                >
                  <Filter size={16} className="mr-2" />
                  Difficulty
                </Button>
                <div className="dropdown-content absolute right-0 mt-2 w-40 bg-brand-black border border-brand-gray/50 rounded-md shadow-lg z-10 hidden group-hover:block">
                  {difficulties.map((difficulty) => (
                    <button
                      key={difficulty}
                      className={`block w-full text-left px-4 py-2 hover:bg-brand-gray/20 ${selectedDifficulty === difficulty ? "bg-brand-gray/30" : ""}`}
                      onClick={() => setSelectedDifficulty(selectedDifficulty === difficulty ? null : difficulty)}
                    >
                      {difficulty}
                    </button>
                  ))}
                </div>
              </div>

              <div className="dropdown relative">
                <Button
                  variant="outline"
                  className="border-brand-gray/50 text-gray-300 hover:text-white hover:bg-brand-gray/20 flex items-center"
                >
                  <Tag size={16} className="mr-2" />
                  Category
                </Button>
                <div className="dropdown-content absolute right-0 mt-2 w-64 bg-brand-black border border-brand-gray/50 rounded-md shadow-lg z-10 hidden group-hover:block">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`block w-full text-left px-4 py-2 hover:bg-brand-gray/20 ${selectedCategory === category ? "bg-brand-gray/30" : ""}`}
                      onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {(selectedDifficulty || selectedCategory || searchQuery) && (
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-white"
                  onClick={() => {
                    setSelectedDifficulty(null)
                    setSelectedCategory(null)
                    setSearchQuery("")
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProblems.map((problem) => (
            <Link href={`/problems/${problem.id}`} key={problem.id} className="group">
              <div className="glass rounded-xl p-6 h-full card-hover border border-brand-gray/20 transition-all duration-300 group-hover:border-brand-purple/50">
                <div className="flex justify-between items-start mb-3">
                  <span
                    className={`${getDifficultyColor(problem.difficulty)} ${getDifficultyBgColor(problem.difficulty)} text-xs font-medium px-2 py-1 rounded-full`}
                  >
                    {problem.difficulty}
                  </span>
                  {problem.solved && (
                    <span className="bg-brand-teal/20 text-brand-teal text-xs font-medium px-2 py-1 rounded-full flex items-center">
                      <Check size={12} className="mr-1" />
                      Solved
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-brand-magenta transition-colors">
                  {problem.title}
                </h3>

                <div className="flex items-center text-gray-400 text-sm mb-4">
                  <Clock size={14} className="mr-1" />
                  {problem.timeEstimate}
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {problem.tags.map((tag, index) => (
                    <span key={index} className="bg-brand-gray/20 text-gray-300 text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4">
                  <span className="text-brand-violet text-sm font-medium group-hover:text-brand-magenta transition-colors flex items-center">
                    Solve Problem
                    <svg
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredProblems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-white mb-2">No problems found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
            <Button
              variant="outline"
              className="border-brand-purple text-brand-purple"
              onClick={() => {
                setSelectedDifficulty(null)
                setSelectedCategory(null)
                setSearchQuery("")
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-10">
          <div className="flex space-x-1">
            <Button variant="outline" className="border-brand-gray/50 text-gray-400" disabled>
              Previous
            </Button>
            <Button variant="outline" className="border-brand-gray/50 bg-brand-gray/20 text-white">
              1
            </Button>
            <Button
              variant="outline"
              className="border-brand-gray/50 text-gray-300 hover:text-white hover:bg-brand-gray/20"
            >
              2
            </Button>
            <Button
              variant="outline"
              className="border-brand-gray/50 text-gray-300 hover:text-white hover:bg-brand-gray/20"
            >
              3
            </Button>
            <Button
              variant="outline"
              className="border-brand-gray/50 text-gray-300 hover:text-white hover:bg-brand-gray/20"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

