"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TableOfContentsProps {
  headings: Array<{
    id: string
    text: string
    level: number
  }>
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0px 0px -80% 0px" },
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [headings])

  return (
    <div className="space-y-2">
      {headings.map((heading, index) => (
        <a
          key={index}
          href={`#${heading.id}`}
          className={cn(
            "block py-1 px-2 text-sm transition-colors rounded",
            activeId === heading.id ? "text-blue-400 bg-gray-800" : "text-gray-400 hover:text-white",
            heading.level === 1 ? "" : "ml-4",
          )}
          onClick={(e) => {
            e.preventDefault()
            document.getElementById(heading.id)?.scrollIntoView({
              behavior: "smooth",
            })
          }}
        >
          {heading.text}
        </a>
      ))}
    </div>
  )
}

