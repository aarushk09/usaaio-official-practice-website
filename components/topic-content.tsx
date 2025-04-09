"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, ChevronLeft, Check, BookOpen } from "lucide-react"
import Link from "next/link"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

interface TopicContentProps {
  content: string
  nextTopic?: {
    title: string
    slug: string
  }
  prevTopic?: {
    title: string
    slug: string
  }
  onComplete?: () => void
  isCompleted?: boolean
}

export function TopicContent({ content, nextTopic, prevTopic, onComplete, isCompleted = false }: TopicContentProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("python")
  const [showCompletionConfetti, setShowCompletionConfetti] = useState(false)

  useEffect(() => {
    // For demo purposes, automatically scroll to top when content changes
    window.scrollTo(0, 0)
  }, [content])

  const handleMarkComplete = () => {
    if (onComplete) {
      onComplete()
      setShowCompletionConfetti(true)

      setTimeout(() => {
        setShowCompletionConfetti(false)
      }, 3000)
    }
  }

  // Parse the markdown content
  const renderMarkdown = () => {
    const elements = []
    let currentCodeBlock = null
    let codeLanguage = ""
    let inCodeBlock = false

    // Split content by lines
    const lines = content.split("\n")

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      // Handle code blocks
      if (line.trim().startsWith("```")) {
        if (inCodeBlock) {
          // End of code block
          elements.push(
            <div key={`code-${i}`} className="my-6">
              <div className="bg-brand-navy/50 border-t border-l border-r border-brand-gray/30 rounded-t-lg px-4 py-2 flex justify-between items-center">
                <span className="text-sm text-brand-teal">{codeLanguage}</span>
                <div className="flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <SyntaxHighlighter
                language={codeLanguage}
                style={vscDarkPlus}
                className="rounded-b-lg border-b border-l border-r border-brand-gray/30"
              >
                {currentCodeBlock}
              </SyntaxHighlighter>
            </div>,
          )
          inCodeBlock = false
          currentCodeBlock = null
          codeLanguage = ""
        } else {
          // Start of code block
          inCodeBlock = true
          currentCodeBlock = ""
          codeLanguage = line.trim().slice(3).trim() || "text"
        }
        continue
      }

      if (inCodeBlock) {
        currentCodeBlock += line + "\n"
        continue
      }

      // Handle headings
      if (line.startsWith("# ")) {
        const headingText = line.slice(2).trim()
        const headingId = headingText.toLowerCase().replace(/[^\w]+/g, "-")
        elements.push(
          <motion.h1
            key={`h1-${i}`}
            id={headingId}
            className="text-2xl font-bold text-white mt-8 mb-4 scroll-mt-20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {headingText}
          </motion.h1>,
        )
      } else if (line.startsWith("## ")) {
        const headingText = line.slice(3).trim()
        const headingId = headingText.toLowerCase().replace(/[^\w]+/g, "-")
        elements.push(
          <motion.h2
            key={`h2-${i}`}
            id={headingId}
            className="text-xl font-semibold text-white mt-6 mb-3 scroll-mt-20 border-l-4 border-brand-purple pl-3 py-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {headingText}
          </motion.h2>,
        )
      } else if (line.startsWith("### ")) {
        const headingText = line.slice(4).trim()
        const headingId = headingText.toLowerCase().replace(/[^\w]+/g, "-")
        elements.push(
          <motion.h3
            key={`h3-${i}`}
            id={headingId}
            className="text-lg font-medium text-white mt-5 mb-2 scroll-mt-20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {headingText}
          </motion.h3>,
        )
      }
      // Handle lists
      else if (line.trim().startsWith("- ")) {
        elements.push(
          <ul key={`ul-${i}`} className="list-disc list-inside text-gray-300 my-2 ml-4">
            <motion.li initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }}>
              {line.trim().slice(2)}
            </motion.li>
          </ul>,
        )
      }
      // Handle math blocks
      else if (line.includes("$$")) {
        const mathContent = line.split("$$")[1]
        elements.push(
          <div
            key={`math-${i}`}
            className="my-4 py-2 px-4 bg-brand-navy/50 rounded-md overflow-x-auto border border-brand-gray/30"
          >
            <pre className="text-brand-teal font-mono">{mathContent}</pre>
          </div>,
        )
      }
      // Handle language tabs
      else if (line.startsWith(":::")) {
        const tabsContent = []
        let j = i + 1
        let currentTab = null
        let currentTabContent = ""

        while (j < lines.length && !lines[j].startsWith(":::")) {
          if (lines[j].startsWith("==")) {
            if (currentTab) {
              tabsContent.push({
                language: currentTab,
                content: currentTabContent.trim(),
              })
            }
            currentTab = lines[j].slice(2).trim()
            currentTabContent = ""
          } else if (currentTab) {
            currentTabContent += lines[j] + "\n"
          }
          j++
        }

        if (currentTab) {
          tabsContent.push({
            language: currentTab,
            content: currentTabContent.trim(),
          })
        }

        elements.push(
          <Tabs
            key={`tabs-${i}`}
            defaultValue={tabsContent[0]?.language || "python"}
            className="my-6 bg-brand-navy/20 rounded-lg p-1 border border-brand-gray/30"
          >
            <TabsList className="bg-brand-navy rounded-md mb-2">
              {tabsContent.map((tab, idx) => (
                <TabsTrigger
                  key={idx}
                  value={tab.language}
                  className="data-[state=active]:bg-brand-purple data-[state=active]:text-white"
                >
                  {tab.language}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabsContent.map((tab, idx) => (
              <TabsContent key={idx} value={tab.language}>
                <div className="bg-brand-navy/50 border-t border-l border-r border-brand-gray/30 rounded-t-lg px-4 py-2 flex justify-between items-center">
                  <span className="text-sm text-brand-teal">{tab.language}</span>
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <SyntaxHighlighter
                  language={tab.language.toLowerCase()}
                  style={vscDarkPlus}
                  className="rounded-b-lg border-b border-l border-r border-brand-gray/30"
                >
                  {tab.content}
                </SyntaxHighlighter>
              </TabsContent>
            ))}
          </Tabs>,
        )

        i = j
      }
      // Handle paragraphs
      else if (line.trim() !== "") {
        elements.push(
          <motion.p
            key={`p-${i}`}
            className="text-gray-300 my-3 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 * i }}
          >
            {line}
          </motion.p>,
        )
      } else {
        elements.push(<div key={`br-${i}`} className="h-4"></div>)
      }
    }

    return elements
  }

  return (
    <div className="mdx-content relative">
      <div className="sticky top-16 z-10 bg-brand-dark/90 backdrop-blur-sm border-b border-brand-gray/30 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen size={18} className="text-brand-teal" />
            <div className="text-sm md:text-base font-medium text-white">Learning Content</div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              className={`text-xs md:text-sm ${isCompleted ? "bg-brand-teal/20 text-brand-teal border-brand-teal" : "bg-transparent text-gray-400 border-gray-600"}`}
              onClick={handleMarkComplete}
              disabled={isCompleted}
            >
              {isCompleted ? (
                <span className="flex items-center">
                  <Check size={16} className="mr-1" />
                  Completed
                </span>
              ) : (
                "Mark as Complete"
              )}
            </Button>

            <div className="flex items-center">
              <Button
                variant="outline"
                size="sm"
                className="mr-2 text-gray-400 border-gray-600 hover:text-white hover:bg-brand-gray/20"
                disabled={!prevTopic}
              >
                {prevTopic ? (
                  <Link href={`/topics/${prevTopic.slug}`} className="flex items-center">
                    <ChevronLeft size={16} className="mr-1" />
                    <span className="hidden sm:inline">Previous</span>
                  </Link>
                ) : (
                  <span className="flex items-center">
                    <ChevronLeft size={16} className="mr-1" />
                    <span className="hidden sm:inline">Previous</span>
                  </span>
                )}
              </Button>

              <Button
                variant={nextTopic ? "default" : "outline"}
                size="sm"
                className={
                  nextTopic ? "bg-brand-purple hover:bg-brand-violet text-white" : "text-gray-400 border-gray-600"
                }
                disabled={!nextTopic}
              >
                {nextTopic ? (
                  <Link href={`/topics/${nextTopic.slug}`} className="flex items-center">
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                ) : (
                  <span className="flex items-center">
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight size={16} className="ml-1" />
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="prose prose-invert max-w-none p-4">{renderMarkdown()}</div>

      {/* Navigation buttons at the bottom */}
      <div className="flex justify-between items-center mt-8 p-4 border-t border-brand-gray/30">
        <div>
          {prevTopic && (
            <Link
              href={`/topics/${prevTopic.slug}`}
              className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft size={16} className="mr-2" />
              <div>
                <div className="text-xs">Previous</div>
                <div className="text-sm font-medium">{prevTopic.title}</div>
              </div>
            </Link>
          )}
        </div>

        <div>
          {nextTopic && (
            <Link
              href={`/topics/${nextTopic.slug}`}
              className="flex items-center text-right text-gray-400 hover:text-white transition-colors"
            >
              <div>
                <div className="text-xs">Next</div>
                <div className="text-sm font-medium">{nextTopic.title}</div>
              </div>
              <ChevronRight size={16} className="ml-2" />
            </Link>
          )}
        </div>
      </div>

      {/* Completion confetti */}
      {showCompletionConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="bg-brand-black rounded-lg p-8 border-2 border-brand-teal relative z-10 text-center"
          >
            <div className="text-brand-teal text-4xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-white mb-2">Congratulations!</h3>
            <p className="text-gray-300 mb-4">You've completed this topic</p>
            {nextTopic && (
              <Button className="bg-brand-purple hover:bg-brand-violet mt-2">
                <Link href={`/topics/${nextTopic.slug}`} className="flex items-center">
                  Continue to Next Topic <ChevronRight size={16} className="ml-1" />
                </Link>
              </Button>
            )}
          </motion.div>
        </div>
      )}
    </div>
  )
}

