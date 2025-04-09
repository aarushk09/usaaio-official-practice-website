"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"

interface Topic {
  title: string
  frequency: string
  description: string
  updatedAt?: string
  slug: string
}

interface TopicSectionProps {
  title: string
  progress: string
  topics: Topic[]
}

export default function TopicSection({ title, progress, topics }: TopicSectionProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case "Very Frequent":
        return "bg-green-500"
      case "Somewhat Frequent":
        return "bg-blue-500"
      case "Not Frequent":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getFrequencyDots = (frequency: string) => {
    const dots = []
    for (let i = 0; i < 4; i++) {
      dots.push(
        <div
          key={i}
          className={`h-2 w-2 rounded-full ${
            frequency === "Very Frequent" ||
            (frequency === "Somewhat Frequent" && i < 3) ||
            (frequency === "Not Frequent" && i < 2)
              ? getFrequencyColor(frequency)
              : "bg-gray-700"
          }`}
        />,
      )
    }
    return dots
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-white text-2xl font-semibold">{title}</h2>
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-gray-400 hover:text-white">
            {isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </button>
        </div>
        <div className="flex items-center">
          <div className="w-32 h-2 bg-gray-700 rounded-full mr-2">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: "0%" }}></div>
          </div>
          <span className="text-gray-400 text-sm">{progress}</span>
        </div>
      </div>

      {!isCollapsed && (
        <div className="space-y-4">
          {topics.map((topic, index) => (
            <Link href={`/topics/${topic.slug}`} key={index} className="block">
              <div className="bg-[#0f172a] rounded-lg p-4 hover:bg-[#1a2234] transition-colors">
                <div className="flex items-center mb-2">
                  <div className="flex space-x-1 mr-2">{getFrequencyDots(topic.frequency)}</div>
                  <span className="text-[#10b981] text-sm">{topic.frequency}</span>
                </div>
                <h3 className="text-white text-lg font-medium mb-1">{topic.title}</h3>
                <p className="text-gray-400 mb-2">{topic.description}</p>
                {topic.updatedAt && <p className="text-gray-500 text-sm">Updated: {topic.updatedAt}</p>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

