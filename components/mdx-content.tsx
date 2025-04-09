"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

interface MDXContentProps {
  content: string
}

export function MDXContent({ content }: MDXContentProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("python")

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
              <SyntaxHighlighter language={codeLanguage} style={vscDarkPlus} className="rounded-md">
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
          <h1 key={`h1-${i}`} id={headingId} className="text-2xl font-bold text-white mt-8 mb-4 scroll-mt-20">
            {headingText}
          </h1>,
        )
      } else if (line.startsWith("## ")) {
        const headingText = line.slice(3).trim()
        const headingId = headingText.toLowerCase().replace(/[^\w]+/g, "-")
        elements.push(
          <h2 key={`h2-${i}`} id={headingId} className="text-xl font-semibold text-white mt-6 mb-3 scroll-mt-20">
            {headingText}
          </h2>,
        )
      } else if (line.startsWith("### ")) {
        const headingText = line.slice(4).trim()
        const headingId = headingText.toLowerCase().replace(/[^\w]+/g, "-")
        elements.push(
          <h3 key={`h3-${i}`} id={headingId} className="text-lg font-medium text-white mt-5 mb-2 scroll-mt-20">
            {headingText}
          </h3>,
        )
      }
      // Handle lists
      else if (line.trim().startsWith("- ")) {
        elements.push(
          <ul key={`ul-${i}`} className="list-disc list-inside text-gray-300 my-2 ml-4">
            <li>{line.trim().slice(2)}</li>
          </ul>,
        )
      }
      // Handle math blocks
      else if (line.includes("$$")) {
        const mathContent = line.split("$$")[1]
        elements.push(
          <div key={`math-${i}`} className="my-4 py-2 px-4 bg-gray-800 rounded-md overflow-x-auto">
            <pre className="text-gray-300 font-mono">{mathContent}</pre>
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
          <Tabs key={`tabs-${i}`} defaultValue={tabsContent[0]?.language || "python"} className="my-6">
            <TabsList className="bg-gray-800">
              {tabsContent.map((tab, idx) => (
                <TabsTrigger key={idx} value={tab.language} className="data-[state=active]:bg-gray-700">
                  {tab.language}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabsContent.map((tab, idx) => (
              <TabsContent key={idx} value={tab.language}>
                <SyntaxHighlighter language={tab.language.toLowerCase()} style={vscDarkPlus} className="rounded-md">
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
          <p key={`p-${i}`} className="text-gray-300 my-3">
            {line}
          </p>,
        )
      } else {
        elements.push(<div key={`br-${i}`} className="h-4"></div>)
      }
    }

    return elements
  }

  return (
    <div className="mdx-content">
      <div className="flex items-center mb-6">
        <div className="mr-2 text-gray-300">Language:</div>
        <Button
          variant={selectedLanguage === "Python" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedLanguage("Python")}
          className="mr-2"
        >
          Python
        </Button>
        <Button
          variant={selectedLanguage === "Java" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedLanguage("Java")}
        >
          Java
        </Button>
      </div>

      <div className="prose prose-invert max-w-none">{renderMarkdown()}</div>
    </div>
  )
}

