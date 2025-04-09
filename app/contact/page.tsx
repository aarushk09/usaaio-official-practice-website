"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#0f3a3a]">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-white mb-8">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#0f172a] rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Get in Touch</h2>
            <p className="text-gray-300 mb-6">
              Have questions about USAAIO? Want to report an issue with the guide? Or perhaps you'd like to contribute?
              We'd love to hear from you!
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-600 p-2 rounded-full mr-3 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">Email</h3>
                  <p className="text-gray-400">contact@usaaio.org</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-600 p-2 rounded-full mr-3 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">Discord</h3>
                  <p className="text-gray-400">Join our community: discord.gg/usaaio</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-600 p-2 rounded-full mr-3 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">Resources</h3>
                  <p className="text-gray-400">Check our FAQ and documentation</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0f172a] rounded-lg p-6">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="bg-green-600 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-white mb-2">Message Sent!</h2>
                <p className="text-gray-300 mb-6">
                  Thank you for reaching out. We'll get back to you as soon as possible.
                </p>
                <Button onClick={() => setIsSubmitted(false)} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-white mb-4">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 mb-1">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-300 mb-1">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-gray-300 mb-1">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-gray-300 mb-1">
                      Category
                    </label>
                    <Select value={formData.category} onValueChange={handleSelectChange}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="content">Content Suggestion</SelectItem>
                        <SelectItem value="competition">Competition Question</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-300 mb-1">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

