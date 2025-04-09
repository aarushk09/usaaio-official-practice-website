"use client"

import { useState, useEffect } from "react"
import {
  ChevronRight,
  ChevronLeft,
  Search,
  BookOpen,
  Code,
  PlayCircle,
  CheckCircle,
  HelpCircle,
  Lightbulb,
  List,
  X,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Link from "next/link"
import CodeEditor from "@/components/code-editor"
import ModuleQuiz from "@/components/module-quiz"
import GlossaryPopover from "@/components/glossary-popover"

// Mock data for the Python module
const pythonModule = {
  id: "python-basics",
  title: "Python Programming",
  description: "Learn Python programming fundamentals for AI development",
  estimatedHours: 10,
  lessons: [
    {
      id: "introduction",
      title: "Introduction to Python",
      duration: "15 min",
      completed: true,
    },
    {
      id: "variables",
      title: "Variables and Data Types",
      duration: "30 min",
      completed: true,
    },
    {
      id: "control-flow",
      title: "Control Flow",
      duration: "45 min",
      active: true,
    },
    {
      id: "functions",
      title: "Functions",
      duration: "45 min",
    },
    {
      id: "data-structures",
      title: "Data Structures",
      duration: "60 min",
    },
    {
      id: "modules",
      title: "Modules and Packages",
      duration: "45 min",
    },
    {
      id: "file-handling",
      title: "File Handling",
      duration: "30 min",
    },
    {
      id: "error-handling",
      title: "Error Handling",
      duration: "30 min",
    },
  ],
  currentLesson: {
    id: "control-flow",
    title: "Control Flow",
    sections: [
      {
        id: "if-statements",
        title: "Conditional Statements (if/else)",
        content: `
# Conditional Statements in Python

Conditional statements allow your program to make decisions based on certain conditions. Python uses \`if\`, \`elif\` (else if), and \`else\` statements for this purpose.

## Basic Syntax

\`\`\`python
if condition:
    # code to execute if condition is True
elif another_condition:
    # code to execute if another_condition is True
else:
    # code to execute if all conditions are False
\`\`\`

## Example

Let's look at a simple example that determines whether a number is positive, negative, or zero:
        `,
      },
      {
        id: "code-example-1",
        type: "code-example",
        title: "Example: Checking Number Sign",
        code: `number = 42

if number > 0:
    print("The number is positive")
elif number < 0:
    print("The number is negative")
else:
    print("The number is zero")
`,
        output: "The number is positive",
      },
      {
        id: "comparison-operators",
        title: "Comparison Operators",
        content: `
## Comparison Operators

Python provides several comparison operators that you can use in conditional statements:

| Operator | Description | Example |
|----------|-------------|---------|
| \`==\` | Equal to | \`x == y\` |
| \`!=\` | Not equal to | \`x != y\` |
| \`>\` | Greater than | \`x > y\` |
| \`<\` | Less than | \`x < y\` |
| \`>=\` | Greater than or equal to | \`x >= y\` |
| \`<=\` | Less than or equal to | \`x <= y\` |

## Logical Operators

You can combine conditions using logical operators:

| Operator | Description | Example |
|----------|-------------|---------|
| \`and\` | True if both conditions are true | \`x > 0 and x < 10\` |
| \`or\` | True if at least one condition is true | \`x < 0 or x > 10\` |
| \`not\` | True if the condition is false | \`not x == y\` |
        `,
      },
      {
        id: "code-example-2",
        type: "code-example",
        title: "Example: Combining Conditions",
        code: `age = 25
has_license = True

if age >= 18 and has_license:
    print("You can drive")
elif age >= 18 and not has_license:
    print("You need to get a license first")
else:
    print("You're too young to drive")
`,
        output: "You can drive",
      },
      {
        id: "loops-intro",
        title: "Loops",
        content: `
# Loops in Python

Loops allow you to execute a block of code multiple times. Python has two main types of loops: \`for\` loops and \`while\` loops.

## For Loops

For loops are used to iterate over a sequence (like a list, tuple, dictionary, set, or string).

### Basic Syntax

\`\`\`python
for item in sequence:
    # code to execute for each item
\`\`\`

### Example: Iterating through a list
        `,
      },
      {
        id: "code-example-3",
        type: "code-example",
        title: "Example: For Loop with a List",
        code: `fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(f"I like {fruit}s")
`,
        output: `I like apples
I like bananas
I like cherrys`,
      },
      {
        id: "range-function",
        title: "The range() Function",
        content: `
## The range() Function

The \`range()\` function generates a sequence of numbers, which is often used with for loops:

- \`range(stop)\`: Generates numbers from 0 to stop-1
- \`range(start, stop)\`: Generates numbers from start to stop-1
- \`range(start, stop, step)\`: Generates numbers from start to stop-1 with the given step

### Example: Using range()
        `,
      },
      {
        id: "code-example-4",
        type: "code-example",
        title: "Example: For Loop with range()",
        code: `# Print numbers from 0 to 4
for i in range(5):
    print(i)

print("\\nNumbers from 2 to 6:")
# Print numbers from 2 to 6
for i in range(2, 7):
    print(i)

print("\\nEven numbers from 0 to 10:")
# Print even numbers from 0 to 10
for i in range(0, 11, 2):
    print(i)
`,
        output: `0
1
2
3
4

Numbers from 2 to 6:
2
3
4
5
6

Even numbers from 0 to 10:
0
2
4
6
8
10`,
      },
      {
        id: "while-loops",
        title: "While Loops",
        content: `
## While Loops

While loops execute a block of code as long as a condition is true.

### Basic Syntax

\`\`\`python
while condition:
    # code to execute while condition is True
\`\`\`

### Example: Basic while loop
        `,
      },
      {
        id: "code-example-5",
        type: "code-example",
        title: "Example: While Loop",
        code: `count = 0

while count < 5:
    print(f"Count is {count}")
    count += 1  # Increment count by 1
`,
        output: `Count is 0
Count is 1
Count is 2
Count is 3
Count is 4`,
      },
      {
        id: "break-continue",
        title: "Break and Continue Statements",
        content: `
## Break and Continue Statements

- \`break\`: Exits the loop completely
- \`continue\`: Skips the current iteration and moves to the next one

### Example: Using break and continue
        `,
      },
      {
        id: "code-example-6",
        type: "code-example",
        title: "Example: Break and Continue",
        code: `# Using break
print("Break example:")
for i in range(10):
    if i == 5:
        break
    print(i)

# Using continue
print("\\nContinue example:")
for i in range(10):
    if i % 2 == 0:  # Skip even numbers
        continue
    print(i)
`,
        output: `Break example:
0
1
2
3
4

Continue example:
1
3
5
7
9`,
      },
      {
        id: "practice-exercise",
        type: "interactive-exercise",
        title: "Practice Exercise: FizzBuzz",
        instructions:
          "Write a program that prints numbers from 1 to 15. But for multiples of 3, print 'Fizz' instead of the number, and for multiples of 5, print 'Buzz'. For numbers that are multiples of both 3 and 5, print 'FizzBuzz'.",
        starterCode: `# Write your FizzBuzz solution here
# For numbers 1 to 15:
# - Print "Fizz" for multiples of 3
# - Print "Buzz" for multiples of 5
# - Print "FizzBuzz" for multiples of both 3 and 5
# - Print the number itself for other cases

`,
        solution: `for i in range(1, 16):
    if i % 3 == 0 and i % 5 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)`,
        hints: [
          "Use the modulo operator (%) to check if a number is divisible by another number",
          "Check for multiples of both 3 and 5 first, then check for multiples of 3, then multiples of 5",
          "Use a for loop with range(1, 16) to iterate from 1 to 15",
        ],
      },
    ],
  },
}

// Glossary terms
const glossaryTerms = [
  {
    term: "Conditional Statement",
    definition:
      "A programming construct that performs different actions depending on whether a condition is true or false.",
  },
  {
    term: "Loop",
    definition: "A programming construct that repeats a group of commands until a specific condition is met.",
  },
  {
    term: "Iteration",
    definition:
      "The process of repeating a set of instructions a certain number of times or until a specific condition is met.",
  },
  {
    term: "Boolean",
    definition: "A data type that has one of two possible values: true or false.",
  },
  {
    term: "Operator",
    definition:
      "A symbol that tells the compiler or interpreter to perform specific mathematical, relational, or logical operations.",
  },
  {
    term: "Modulo",
    definition:
      "An operation that returns the remainder of a division operation. Represented by the % symbol in Python.",
  },
]

export default function PythonBasicsModule() {
  const [progress, setProgress] = useState(25)
  const [activeSection, setActiveSection] = useState("if-statements")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showQuiz, setShowQuiz] = useState(false)
  const [codeOutput, setCodeOutput] = useState<{ [key: string]: string }>({})
  const [userCode, setUserCode] = useState<{ [key: string]: string }>({})
  const [exerciseStatus, setExerciseStatus] = useState<{ [key: string]: "not-started" | "in-progress" | "completed" }>({
    "practice-exercise": "not-started",
  })

  // Initialize user code from examples
  useEffect(() => {
    const initialUserCode: { [key: string]: string } = {}
    pythonModule.currentLesson.sections
      .filter((section) => section.type === "code-example" || section.type === "interactive-exercise")
      .forEach((section) => {
        if (section.type === "code-example") {
          initialUserCode[section.id] = section.code
          setCodeOutput((prev) => ({ ...prev, [section.id]: section.output }))
        } else if (section.type === "interactive-exercise") {
          initialUserCode[section.id] = section.starterCode
        }
      })
    setUserCode(initialUserCode)
  }, [])

  // Filter sections based on search query
  const filteredSections = searchQuery
    ? pythonModule.currentLesson.sections.filter(
        (section) =>
          section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (section.content && section.content.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    : pythonModule.currentLesson.sections

  // Handle code execution
  const handleRunCode = (sectionId: string, code: string) => {
    // In a real implementation, this would send the code to a backend for execution
    // For this demo, we'll simulate execution with predefined outputs for examples
    // and basic validation for the exercise

    if (sectionId === "practice-exercise") {
      // Simple validation for FizzBuzz exercise
      const expectedOutput = [
        "1",
        "2",
        "Fizz",
        "4",
        "Buzz",
        "Fizz",
        "7",
        "8",
        "Fizz",
        "Buzz",
        "11",
        "Fizz",
        "13",
        "14",
        "FizzBuzz",
      ]

      // Very basic simulation of code execution
      try {
        let output = ""
        let isCorrect = true

        // Check if the code contains the expected patterns
        const hasForLoop = code.includes("for") && code.includes("range")
        const hasModulo3 = code.includes("% 3") || code.includes("%3")
        const hasModulo5 = code.includes("% 5") || code.includes("%5")
        const hasFizzBuzz = code.includes("FizzBuzz")
        const hasFizz = code.includes("Fizz")
        const hasBuzz = code.includes("Buzz")

        if (hasForLoop && hasModulo3 && hasModulo5 && hasFizzBuzz && hasFizz && hasBuzz) {
          output = expectedOutput.join("\n")
          setExerciseStatus({ ...exerciseStatus, [sectionId]: "completed" })
        } else {
          output = "Your solution doesn't match the expected output. Try again!"
          setExerciseStatus({ ...exerciseStatus, [sectionId]: "in-progress" })
          isCorrect = false
        }

        setCodeOutput({ ...codeOutput, [sectionId]: output })

        // Update progress if exercise is completed
        if (isCorrect) {
          setProgress(Math.min(100, progress + 10))
        }
      } catch (error) {
        setCodeOutput({ ...codeOutput, [sectionId]: "Error executing code" })
      }
    } else {
      // For code examples, just show the predefined output
      const section = pythonModule.currentLesson.sections.find((s) => s.id === sectionId)
      if (section && section.type === "code-example") {
        setCodeOutput({ ...codeOutput, [sectionId]: section.output })
      }
    }
  }

  // Handle completing the module
  const handleCompleteModule = () => {
    setProgress(100)
    // In a real app, this would update the user's progress in the database
  }

  // Handle quiz completion
  const handleQuizComplete = (score: number) => {
    // In a real app, this would save the quiz score and update progress
    setShowQuiz(false)
    handleCompleteModule()
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

      {/* Module Header - Sticky Banner */}
      <div className="bg-gradient-to-r from-brand-navy to-brand-black p-6 border-b border-brand-gray/30 sticky top-16 z-30 shadow-lg shadow-black/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center text-sm text-gray-400 mb-2">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                <ChevronRight size={16} className="mx-1" />
                <Link href="/learning-paths" className="hover:text-white">
                  Learning Paths
                </Link>
                <ChevronRight size={16} className="mx-1" />
                <Link href="/learning-paths/foundations" className="hover:text-white">
                  Foundations
                </Link>
                <ChevronRight size={16} className="mx-1" />
                <span className="text-white">{pythonModule.title}</span>
              </div>

              <h1 className="text-3xl font-bold text-white mb-1">{pythonModule.title}</h1>
              <p className="text-gray-300">{pythonModule.description}</p>
            </div>

            <div className="flex flex-col items-end">
              <div className="flex items-center mb-2">
                <span className="text-gray-400 mr-2">Progress:</span>
                <span className="text-white font-medium">{progress}%</span>
              </div>
              <div className="w-full md:w-64">
                <Progress value={progress} className="h-2 bg-brand-gray/30">
                  <div
                    className="h-full bg-gradient-to-r from-brand-purple to-brand-teal rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </Progress>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 flex flex-col lg:flex-row">
        {/* Sidebar - Lesson Navigation */}
        <div
          className={cn(
            "w-full lg:w-64 lg:min-h-screen lg:block fixed lg:sticky top-[144px] lg:top-[112px] left-0 z-20 bg-brand-black lg:bg-transparent border-r border-brand-gray/30 overflow-y-auto transition-all duration-300 transform h-[calc(100vh-144px)]",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          )}
        >
          <div className="p-4 sticky top-0 bg-brand-navy z-10 border-b border-brand-gray/30">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search in module..."
                className="w-full bg-brand-gray/20 border border-brand-gray/30 text-white pl-9 pr-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-violet"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="p-4">
            <h3 className="text-white font-medium mb-2 flex items-center">
              <BookOpen size={16} className="mr-2" />
              Lessons
            </h3>

            <div className="space-y-1 mb-6">
              {pythonModule.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className={cn(
                    "flex items-center p-2 rounded-md transition-colors",
                    lesson.active
                      ? "bg-brand-purple/20 text-brand-purple"
                      : "text-gray-400 hover:text-white hover:bg-brand-gray/20",
                  )}
                >
                  {lesson.completed ? (
                    <CheckCircle size={16} className="mr-2 text-brand-teal" />
                  ) : lesson.active ? (
                    <PlayCircle size={16} className="mr-2 text-brand-purple" />
                  ) : (
                    <Circle size={16} className="mr-2" />
                  )}
                  <span>{lesson.title}</span>
                  <span className="ml-auto text-xs text-gray-500">{lesson.duration}</span>
                </div>
              ))}
            </div>

            <h3 className="text-white font-medium mb-2 flex items-center">
              <List size={16} className="mr-2" />
              Current Lesson Sections
            </h3>

            <div className="space-y-1">
              {pythonModule.currentLesson.sections.map((section) => (
                <div
                  key={section.id}
                  className={cn(
                    "flex items-center p-2 rounded-md transition-colors cursor-pointer",
                    activeSection === section.id
                      ? "bg-brand-purple/20 text-brand-purple"
                      : "text-gray-400 hover:text-white hover:bg-brand-gray/20",
                  )}
                  onClick={() => {
                    setActiveSection(section.id)
                    if (window.innerWidth < 1024) {
                      setIsSidebarOpen(false)
                    }
                    document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  {section.type === "interactive-exercise" ? (
                    <Code size={16} className="mr-2" />
                  ) : section.type === "code-example" ? (
                    <Code size={16} className="mr-2" />
                  ) : (
                    <BookOpen size={16} className="mr-2" />
                  )}
                  <span className="truncate">{section.title}</span>

                  {section.type === "interactive-exercise" && (
                    <Badge
                      className={cn(
                        "ml-auto",
                        exerciseStatus[section.id] === "completed"
                          ? "bg-brand-teal/20 text-brand-teal"
                          : exerciseStatus[section.id] === "in-progress"
                            ? "bg-brand-blue/20 text-brand-blue"
                            : "bg-gray-700/50 text-gray-400",
                      )}
                    >
                      {exerciseStatus[section.id] === "completed"
                        ? "Completed"
                        : exerciseStatus[section.id] === "in-progress"
                          ? "In Progress"
                          : "Not Started"}
                    </Badge>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button
                className="w-full bg-gradient-to-r from-brand-purple to-brand-violet text-white"
                onClick={() => setShowQuiz(true)}
              >
                Take Module Quiz
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8 lg:ml-64 pt-6">
          {showQuiz ? (
            <ModuleQuiz
              moduleTitle={pythonModule.title}
              onComplete={handleQuizComplete}
              onCancel={() => setShowQuiz(false)}
            />
          ) : (
            <div className="max-w-4xl mx-auto">
              {filteredSections.map((section) => (
                <div
                  key={section.id}
                  id={section.id}
                  className={cn("mb-12 scroll-mt-40", activeSection === section.id ? "relative" : "")}
                >
                  {activeSection === section.id && (
                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-brand-purple rounded-full" />
                  )}

                  <div className="flex items-center mb-4">
                    <h2 className="text-2xl font-bold text-white">{section.title}</h2>

                    {section.type === "interactive-exercise" && (
                      <Badge
                        className={cn(
                          "ml-4",
                          exerciseStatus[section.id] === "completed"
                            ? "bg-brand-teal/20 text-brand-teal"
                            : exerciseStatus[section.id] === "in-progress"
                              ? "bg-brand-blue/20 text-brand-blue"
                              : "bg-gray-700/50 text-gray-400",
                        )}
                      >
                        {exerciseStatus[section.id] === "completed"
                          ? "Completed"
                          : exerciseStatus[section.id] === "in-progress"
                            ? "In Progress"
                            : "Practice Exercise"}
                      </Badge>
                    )}

                    {section.type === "code-example" && (
                      <Badge className="ml-4 bg-brand-blue/20 text-brand-blue">Code Example</Badge>
                    )}
                  </div>

                  {section.content && (
                    <div className="prose prose-invert max-w-none mb-6">
                      <GlossaryContent content={section.content} terms={glossaryTerms} />
                    </div>
                  )}

                  {(section.type === "code-example" || section.type === "interactive-exercise") && (
                    <div className="mb-6">
                      {section.type === "interactive-exercise" && (
                        <div className="bg-brand-navy/30 border border-brand-gray/30 rounded-lg p-4 mb-4">
                          <h3 className="text-white font-medium flex items-center mb-2">
                            <Lightbulb size={16} className="mr-2 text-brand-teal" />
                            Instructions
                          </h3>
                          <p className="text-gray-300">{section.instructions}</p>
                        </div>
                      )}

                      <CodeEditor
                        code={userCode[section.id] || ""}
                        onChange={(code) => setUserCode({ ...userCode, [section.id]: code })}
                        onRun={() => handleRunCode(section.id, userCode[section.id] || "")}
                        output={codeOutput[section.id] || ""}
                        readOnly={section.type === "code-example"}
                      />

                      {section.type === "interactive-exercise" && (
                        <div className="mt-4">
                          <Tabs defaultValue="hints">
                            <TabsList className="bg-brand-navy rounded-md mb-2">
                              <TabsTrigger value="hints">Hints</TabsTrigger>
                              <TabsTrigger value="solution">Solution</TabsTrigger>
                            </TabsList>
                            <TabsContent value="hints" className="space-y-2">
                              {section.hints.map((hint, index) => (
                                <div
                                  key={index}
                                  className="bg-brand-navy/20 border border-brand-gray/30 rounded-lg p-3"
                                >
                                  <div className="flex items-center">
                                    <HelpCircle size={16} className="mr-2 text-brand-blue" />
                                    <span className="text-gray-300">{hint}</span>
                                  </div>
                                </div>
                              ))}
                            </TabsContent>
                            <TabsContent value="solution">
                              <div className="bg-brand-navy/20 border border-brand-gray/30 rounded-lg p-4">
                                <h4 className="text-white font-medium mb-2">Solution</h4>
                                <pre className="bg-brand-black p-4 rounded-md overflow-x-auto">
                                  <code className="text-brand-teal">{section.solution}</code>
                                </pre>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-12 border-t border-brand-gray/30 pt-6">
                <Button
                  variant="outline"
                  className="border-brand-gray/50 text-gray-300 hover:text-white hover:bg-brand-gray/20 flex items-center"
                >
                  <ChevronLeft size={16} className="mr-2" />
                  Previous Lesson: Variables and Data Types
                </Button>

                <Button className="bg-brand-purple hover:bg-brand-violet text-white flex items-center">
                  Next Lesson: Functions
                  <ChevronRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Helper component to render content with glossary terms
function GlossaryContent({ content, terms }: { content: string; terms: any[] }) {
  // Simple markdown parser that highlights glossary terms
  const parts = content
    .split("\n")
    .map((line, lineIndex) => {
      // Check if the line contains any glossary terms
      let lineContent = line
      terms.forEach((term) => {
        // Case insensitive search for the term
        const regex = new RegExp(`\\b${term.term}\\b`, "gi")
        lineContent = lineContent.replace(regex, (match) => {
          return `<GlossaryTerm term="${term.term}" definition="${term.definition}">${match}</GlossaryTerm>`
        })
      })

      // Parse markdown headings
      if (lineContent.startsWith("# ")) {
        return (
          <h1 key={lineIndex} className="text-2xl font-bold text-white mt-6 mb-4">
            {lineContent.slice(2)}
          </h1>
        )
      } else if (lineContent.startsWith("## ")) {
        return (
          <h2 key={lineIndex} className="text-xl font-semibold text-white mt-5 mb-3">
            {lineContent.slice(3)}
          </h2>
        )
      } else if (lineContent.startsWith("### ")) {
        return (
          <h3 key={lineIndex} className="text-lg font-medium text-white mt-4 mb-2">
            {lineContent.slice(4)}
          </h3>
        )
      }

      // Parse code blocks (simplified)
      if (lineContent.startsWith("```")) {
        return null // Skip code block markers
      }

      // Parse tables (simplified)
      if (lineContent.includes("|")) {
        return null // Skip table lines for this demo
      }

      // Regular paragraph
      if (lineContent.trim() && !lineContent.startsWith("```")) {
        // Replace glossary term markers with actual components
        if (lineContent.includes("<GlossaryTerm")) {
          const segments = []
          let lastIndex = 0

          // Very simplified parsing - in a real app, use a proper parser
          const regex = /<GlossaryTerm term="([^"]+)" definition="([^"]+)">([^<]+)<\/GlossaryTerm>/g
          let match

          while ((match = regex.exec(lineContent)) !== null) {
            // Add text before the match
            if (match.index > lastIndex) {
              segments.push(lineContent.substring(lastIndex, match.index))
            }

            // Add the glossary term
            segments.push(
              <GlossaryPopover key={match.index} term={match[1]} definition={match[2]}>
                <span className="text-brand-teal underline cursor-help">{match[3]}</span>
              </GlossaryPopover>,
            )

            lastIndex = match.index + match[0].length
          }

          // Add any remaining text
          if (lastIndex < lineContent.length) {
            segments.push(lineContent.substring(lastIndex))
          }

          return (
            <p key={lineIndex} className="text-gray-300 my-2">
              {segments}
            </p>
          )
        }

        return (
          <p key={lineIndex} className="text-gray-300 my-2">
            {lineContent}
          </p>
        )
      }

      return null
    })
    .filter(Boolean)

  return <>{parts}</>
}

// Simple Circle component for the sidebar
function Circle({ size, className }: { size: number; className?: string }) {
  return <div className={cn("rounded-full border border-gray-500", className)} style={{ width: size, height: size }} />
}
