"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronRight, Menu, X, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TopicContent } from "@/components/topic-content"
import { cn } from "@/lib/utils"
import { getTopicData, getRelatedTopics } from "@/lib/topics"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function TopicPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [completedTopics, setCompletedTopics] = useState<string[]>([])

  const topic = getTopicData(slug)
  const relatedTopics = getRelatedTopics(slug, 3)

  useEffect(() => {
    if (!topic) {
      router.push("/404")
      return
    }

    // Load completed topics from localStorage
    const savedCompletedTopics = localStorage.getItem("completedTopics")
    if (savedCompletedTopics) {
      setCompletedTopics(JSON.parse(savedCompletedTopics))
    }

    // Set up intersection observer for headings
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-100px 0px -80% 0px" },
    )

    // Observe all heading elements
    document.querySelectorAll("h1, h2, h3").forEach((heading) => {
      observer.observe(heading)
    })

    return () => {
      observer.disconnect()
    }
  }, [topic, router, slug])

  if (!topic) {
    return <div>Loading...</div>
  }

  const isTopicCompleted = completedTopics.includes(slug)

  const handleCompleteClick = () => {
    if (!isTopicCompleted) {
      const updatedCompletedTopics = [...completedTopics, slug]
      setCompletedTopics(updatedCompletedTopics)
      localStorage.setItem("completedTopics", JSON.stringify(updatedCompletedTopics))
    }
  }

  return (
    <div className="min-h-screen bg-brand-dark pt-16">
      {/* Mobile Sidebar Toggle */}
      <div className="fixed top-20 left-4 z-40 lg:hidden">
        <Button
          variant="outline"
          size="icon"
          className="bg-brand-navy/80 border-brand-gray/30 text-white hover:bg-brand-navy"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </Button>
      </div>

      {/* Sidebar - Desktop and Mobile */}
      <AnimatePresence>
        {(isSidebarOpen || true) && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "fixed top-16 left-0 bottom-0 z-30 w-72 bg-brand-black border-r border-brand-gray/30 overflow-y-auto",
              isSidebarOpen ? "block" : "hidden lg:block",
            )}
          >
            <div className="sticky top-0 bg-brand-navy z-10 p-4 border-b border-brand-gray/30 flex items-center">
              <BookOpen size={18} className="text-brand-teal mr-2" />
              <h3 className="font-medium text-white">Table of Contents</h3>
            </div>

            <div className="p-4">
              {/* TOC based on headings */}
              <div className="space-y-2">
                {topic.headings.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className={cn(
                      "block py-1 px-2 text-sm rounded-md transition-colors",
                      heading.level === 1 ? "font-medium" : "",
                      activeSection === heading.id
                        ? "bg-brand-purple/20 text-brand-purple"
                        : "text-gray-400 hover:text-white",
                      heading.level === 2 && "ml-3",
                      heading.level === 3 && "ml-6",
                    )}
                    style={{
                      borderLeft:
                        heading.level === 1
                          ? "3px solid var(--brand-purple)"
                          : activeSection === heading.id
                            ? "3px solid var(--brand-teal)"
                            : "3px solid transparent",
                    }}
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(heading.id)?.scrollIntoView({
                        behavior: "smooth",
                      })
                      // Close sidebar on mobile after click
                      if (window.innerWidth < 1024) {
                        setIsSidebarOpen(false)
                      }
                    }}
                  >
                    {heading.text}
                  </a>
                ))}
              </div>

              {/* Prerequisites */}
              {topic.prerequisites.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-white font-medium mb-2">Prerequisites</h4>
                  <ul className="space-y-1">
                    {topic.prerequisites.map((prereq, index) => (
                      <li key={index}>
                        <Link
                          href={`/topics/${prereq.slug}`}
                          className={cn(
                            "flex items-center text-sm py-1 px-2",
                            completedTopics.includes(prereq.slug) ? "text-brand-teal" : "text-brand-blue",
                          )}
                        >
                          {completedTopics.includes(prereq.slug) ? (
                            <svg
                              className="mr-1 h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                          ) : (
                            <svg
                              className="mr-1 h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>
                          )}
                          {prereq.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related Topics */}
              {relatedTopics.length > 0 && (
                <div className="mt-8 border-t border-brand-gray/30 pt-6">
                  <h4 className="text-white font-medium mb-2">Related Topics</h4>
                  <ul className="space-y-2">
                    {relatedTopics.map((relTopic, index) => (
                      <li key={index}>
                        <Link
                          href={`/topics/${relTopic.slug}`}
                          className="block py-2 px-3 text-sm rounded-md bg-brand-gray/10 hover:bg-brand-gray/20 text-gray-300 hover:text-white transition-colors"
                        >
                          {relTopic.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className={cn("transition-all duration-300", isSidebarOpen ? "lg:ml-72" : "lg:ml-72")}>
        {/* Topic Header */}
        <div className="bg-gradient-to-r from-brand-navy to-brand-black p-6 border-b border-brand-gray/30">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center text-sm text-gray-400 mb-4">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <ChevronRight size={16} className="mx-1" />
              <Link href="/learning-paths" className="hover:text-white">
                Learning Paths
              </Link>
              <ChevronRight size={16} className="mx-1" />
              <span className="text-white">{topic.title}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <div className="flex items-center mb-2">
                  <div
                    className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      topic.frequency === "Very Frequent"
                        ? "bg-brand-teal/20 text-brand-teal"
                        : topic.frequency === "Somewhat Frequent"
                          ? "bg-brand-blue/20 text-brand-blue"
                          : "bg-brand-gray/20 text-gray-400",
                    )}
                  >
                    {topic.frequency}
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{topic.title}</h1>
                <p className="text-gray-400 mb-2">Authors: {topic.authors.join(", ")}</p>
                <p className="text-gray-300 italic">{topic.description}</p>
              </div>

              <div className="shrink-0">
                <Button
                  variant={isTopicCompleted ? "outline" : "default"}
                  className={
                    isTopicCompleted
                      ? "bg-brand-teal/20 text-brand-teal border-brand-teal"
                      : "bg-brand-purple hover:bg-brand-violet"
                  }
                  disabled={isTopicCompleted}
                  onClick={handleCompleteClick}
                >
                  {isTopicCompleted ? "Completed" : "Mark as Complete"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Topic Content */}
        <div className="max-w-4xl mx-auto py-8 px-4">
          <TopicContent
            content={topic.content}
            prevTopic={topic.prerequisites.length > 0 ? topic.prerequisites[0] : undefined}
            nextTopic={relatedTopics.length > 0 ? relatedTopics[0] : undefined}
            onComplete={handleCompleteClick}
            isCompleted={isTopicCompleted}
          />
        </div>
      </div>
    </div>
  )
}

