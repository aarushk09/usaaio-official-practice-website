"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { getAllTopicCategories } from "@/lib/topics"

interface TopicSidebarProps {
  activeSlug?: string
}

export default function TopicSidebar({ activeSlug }: TopicSidebarProps) {
  const categories = getAllTopicCategories()

  // Initialize expanded sections based on active slug
  const initialExpandedSections = {}
  categories.forEach((category) => {
    const hasActiveTopic = category.topics.some((topic) => topic.slug === activeSlug)
    initialExpandedSections[category.title] = hasActiveTopic
  })

  const [expandedSections, setExpandedSections] = useState(initialExpandedSections)

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Scroll to active topic when sidebar loads
  useEffect(() => {
    if (activeSlug) {
      const activeElement = document.getElementById(`sidebar-${activeSlug}`)
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }, [activeSlug])

  return (
    <div className="w-64 bg-[#0a0f1a] border-r border-gray-800 h-screen overflow-y-auto hidden lg:block">
      <div className="p-4">
        <Link href="/" className="flex items-center space-x-2 mb-6">
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold">AI</span>
          </div>
          <span className="font-bold text-lg text-white">USAAIO Guide</span>
        </Link>

        <div className="mb-4">
          <Link href="/">
            <button className="flex items-center justify-between w-full text-white font-medium py-2 px-3 rounded hover:bg-gray-800">
              <span>Foundation</span>
              <ChevronDown size={16} />
            </button>
          </Link>
        </div>

        <div className="space-y-2">
          {categories.map((category, index) => (
            <div key={index}>
              <button
                className="flex items-center justify-between w-full text-white py-2 px-3 rounded hover:bg-gray-800"
                onClick={() => toggleSection(category.title)}
              >
                <span>{category.title}</span>
                {expandedSections[category.title] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>

              {expandedSections[category.title] && (
                <div className="ml-4 mt-1 space-y-1">
                  {category.topics.map((topic, topicIndex) => (
                    <Link
                      href={`/topics/${topic.slug}`}
                      key={topicIndex}
                      id={`sidebar-${topic.slug}`}
                      className={cn(
                        "block py-1 px-3 text-sm rounded transition-colors",
                        topic.slug === activeSlug
                          ? "text-blue-400 bg-gray-800"
                          : "text-gray-400 hover:text-white hover:bg-gray-800",
                      )}
                    >
                      {topic.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

