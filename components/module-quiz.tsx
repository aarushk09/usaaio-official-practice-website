"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, HelpCircle, ArrowRight, ArrowLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ModuleQuizProps {
  moduleTitle: string
  onComplete: (score: number) => void
  onCancel: () => void
}

// Mock quiz data
const quizQuestions = [
  {
    id: 1,
    question: "Which of the following is NOT a valid comparison operator in Python?",
    options: [
      { id: "a", text: "==" },
      { id: "b", text: "!=" },
      { id: "c", text: "=>" },
      { id: "d", text: "<=" },
    ],
    correctAnswer: "c",
    explanation:
      "The correct comparison operators in Python are ==, !=, >, <, >=, and <=. There is no => operator in Python.",
  },
  {
    id: 2,
    question: "What will the following code output?\n\nfor i in range(5):\n    if i == 3:\n        break\n    print(i)",
    options: [
      { id: "a", text: "0 1 2" },
      { id: "b", text: "0 1 2 3" },
      { id: "c", text: "0 1 2 3 4" },
      { id: "d", text: "0 1 2 4" },
    ],
    correctAnswer: "a",
    explanation:
      "The loop prints 0, 1, and 2, but when i equals 3, the break statement is executed, which terminates the loop before printing 3.",
  },
  {
    id: 3,
    question: "Which statement is used to skip the current iteration of a loop and continue with the next?",
    options: [
      { id: "a", text: "pass" },
      { id: "b", text: "skip" },
      { id: "c", text: "continue" },
      { id: "d", text: "next" },
    ],
    correctAnswer: "c",
    explanation:
      "The continue statement is used to skip the current iteration and move to the next iteration of the loop.",
  },
  {
    id: 4,
    question:
      "What is the output of the following code?\n\ncount = 0\nwhile count < 5:\n    count += 1\n    if count == 3:\n        continue\n    print(count)",
    options: [
      { id: "a", text: "1 2 3 4 5" },
      { id: "b", text: "1 2 4 5" },
      { id: "c", text: "1 2 3 4" },
      { id: "d", text: "0 1 2 4 5" },
    ],
    correctAnswer: "b",
    explanation:
      "The loop prints 1, 2, 4, and 5. When count equals 3, the continue statement skips the print statement for that iteration.",
  },
  {
    id: 5,
    question: "Which of the following is a valid way to iterate through a list in Python?",
    options: [
      { id: "a", text: "for i in range(list):" },
      { id: "b", text: "for item in list:" },
      { id: "c", text: "foreach item in list:" },
      { id: "d", text: "while item in list:" },
    ],
    correctAnswer: "b",
    explanation: "In Python, you can iterate through a list using 'for item in list:' syntax.",
  },
]

export default function ModuleQuiz({ moduleTitle, onComplete, onCancel }: ModuleQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})
  const [showResults, setShowResults] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const currentQuestion = quizQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100

  const handleAnswer = (optionId: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: optionId })
  }

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setShowExplanation(false)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setShowExplanation(false)
    }
  }

  const calculateScore = () => {
    let correctCount = 0
    quizQuestions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++
      }
    })
    return {
      score: correctCount,
      total: quizQuestions.length,
      percentage: Math.round((correctCount / quizQuestions.length) * 100),
    }
  }

  const scoreData = calculateScore()

  if (showResults) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="glass rounded-xl p-8 border border-brand-gray/20">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Quiz Results</h2>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">Score:</span>
              <span className="text-white font-bold">
                {scoreData.score} / {scoreData.total}
              </span>
            </div>
            <Progress value={scoreData.percentage} className="h-3 bg-brand-gray/30">
              <div
                className={`h-full rounded-full ${
                  scoreData.percentage >= 80
                    ? "bg-green-500"
                    : scoreData.percentage >= 60
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                style={{ width: `${scoreData.percentage}%` }}
              />
            </Progress>
            <div className="text-center mt-2">
              <span
                className={`text-lg font-medium ${
                  scoreData.percentage >= 80
                    ? "text-green-500"
                    : scoreData.percentage >= 60
                      ? "text-yellow-500"
                      : "text-red-500"
                }`}
              >
                {scoreData.percentage}%
              </span>
            </div>
          </div>

          <div className="space-y-6 mb-8">
            {quizQuestions.map((question, index) => (
              <div key={question.id} className="bg-brand-navy/20 rounded-lg p-4 border border-brand-gray/30">
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    {answers[question.id] === question.correctAnswer ? (
                      <CheckCircle className="text-green-500" size={20} />
                    ) : (
                      <XCircle className="text-red-500" size={20} />
                    )}
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-2">
                      Question {index + 1}: {question.question}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                      {question.options.map((option) => (
                        <div
                          key={option.id}
                          className={`p-2 rounded-md border ${
                            option.id === question.correctAnswer
                              ? "border-green-500 bg-green-500/10"
                              : option.id === answers[question.id] && option.id !== question.correctAnswer
                                ? "border-red-500 bg-red-500/10"
                                : "border-brand-gray/30 bg-brand-gray/10"
                          }`}
                        >
                          <span
                            className={`${
                              option.id === question.correctAnswer
                                ? "text-green-500"
                                : option.id === answers[question.id] && option.id !== question.correctAnswer
                                  ? "text-red-500"
                                  : "text-gray-300"
                            }`}
                          >
                            {option.id.toUpperCase()}. {option.text}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-400 mt-2">
                      <span className="text-brand-teal font-medium">Explanation:</span> {question.explanation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              className="bg-brand-purple hover:bg-brand-violet text-white"
              onClick={() => onComplete(scoreData.score)}
            >
              Complete Module
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="glass rounded-xl p-8 border border-brand-gray/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">{moduleTitle} Quiz</h2>
          <span className="text-gray-300">
            Question {currentQuestionIndex + 1} of {quizQuestions.length}
          </span>
        </div>

        <div className="mb-8">
          <Progress value={progress} className="h-2 bg-brand-gray/30">
            <div
              className="h-full bg-gradient-to-r from-brand-purple to-brand-teal rounded-full"
              style={{ width: `${progress}%` }}
            />
          </Progress>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-8">
              <h3 className="text-xl text-white font-medium mb-6 whitespace-pre-wrap">{currentQuestion.question}</h3>

              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <div
                    key={option.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      answers[currentQuestion.id] === option.id
                        ? "border-brand-purple bg-brand-purple/20"
                        : "border-brand-gray/30 bg-brand-gray/10 hover:border-brand-gray/50 hover:bg-brand-gray/20"
                    }`}
                    onClick={() => handleAnswer(option.id)}
                  >
                    <div className="flex items-center">
                      <div
                        className={`h-5 w-5 rounded-full border mr-3 flex items-center justify-center ${
                          answers[currentQuestion.id] === option.id
                            ? "border-brand-purple bg-brand-purple"
                            : "border-gray-500"
                        }`}
                      >
                        {answers[currentQuestion.id] === option.id && <div className="h-2 w-2 rounded-full bg-white" />}
                      </div>
                      <span className="text-white">
                        {option.id.toUpperCase()}. {option.text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {showExplanation && (
              <div className="bg-brand-navy/20 rounded-lg p-4 border border-brand-gray/30 mb-8">
                <div className="flex items-start">
                  <HelpCircle className="text-brand-teal mr-2 mt-1" size={20} />
                  <div>
                    <h4 className="text-white font-medium mb-1">Explanation</h4>
                    <p className="text-gray-300">{currentQuestion.explanation}</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between">
          <div>
            <Button
              variant="outline"
              className="border-brand-gray/50 text-gray-300 hover:text-white hover:bg-brand-gray/20"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>

          <div className="flex space-x-3">
            {answers[currentQuestion.id] && !showExplanation && (
              <Button
                variant="outline"
                className="border-brand-teal text-brand-teal hover:bg-brand-teal/10"
                onClick={() => setShowExplanation(true)}
              >
                Show Explanation
              </Button>
            )}

            <div className="flex space-x-2">
              <Button
                variant="outline"
                className="border-brand-gray/50 text-gray-300 hover:text-white hover:bg-brand-gray/20"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                <ArrowLeft size={16} className="mr-1" />
                Previous
              </Button>

              <Button
                className="bg-brand-purple hover:bg-brand-violet text-white"
                onClick={handleNext}
                disabled={!answers[currentQuestion.id]}
              >
                {currentQuestionIndex < quizQuestions.length - 1 ? (
                  <>
                    Next
                    <ArrowRight size={16} className="ml-1" />
                  </>
                ) : (
                  "Finish Quiz"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
