"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function IntroSection() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-[#0f172a] rounded-lg p-6 mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-2xl font-semibold">Welcome to USAAIO Guide</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="text-gray-400 hover:text-white"
        >
          {expanded ? <ChevronDown /> : <ChevronRight />}
        </Button>
      </div>

      {expanded && (
        <div className="space-y-4 text-gray-300">
          <p>
            The USA Artificial Intelligence Olympiad (USAAIO) is a premier competition for high school students
            interested in artificial intelligence and machine learning. This guide is designed to help you prepare for
            the competition by providing comprehensive tutorials, practice problems, and resources.
          </p>

          <h3 className="text-white text-lg font-medium mt-4">About the Competition</h3>
          <p>
            USAAIO tests participants on both theoretical knowledge and practical implementation of AI concepts. The
            competition consists of multiple rounds, with the top performers advancing to the final round. Successful
            participants may qualify for the International Olympiad in Artificial Intelligence (IOAI).
          </p>

          <h3 className="text-white text-lg font-medium mt-4">How to Use This Guide</h3>
          <p>
            This guide is organized into sections covering different aspects of AI and machine learning. Each section
            contains tutorials, examples, and practice problems. We recommend starting with the fundamentals and
            progressively moving to more advanced topics.
          </p>

          <div className="mt-6">
            <Link href="/topics/what-is-usaaio">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Started with USAAIO</Button>
            </Link>
          </div>
        </div>
      )}

      {!expanded && (
        <p className="text-gray-400">
          Click to learn more about the USA Artificial Intelligence Olympiad and how to use this guide.
        </p>
      )}
    </div>
  )
}

