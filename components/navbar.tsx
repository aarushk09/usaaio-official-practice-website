"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Search, Menu, X, ChevronDown, BookOpen, Home, BrainCircuit, BarChartBig, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-brand-dark/90 backdrop-blur-md border-b border-brand-gray/30" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-9 w-9 rounded-full bg-gradient-to-br from-brand-purple to-brand-teal flex items-center justify-center">
              <div className="absolute inset-0.5 rounded-full bg-brand-dark flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
            </div>
            <span className="font-bold text-lg text-white hidden sm:block">USAAIO</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className="px-3 py-2 text-gray-300 hover:text-white rounded-md transition-colors flex items-center"
            >
              <Home size={16} className="mr-1" />
              Home
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="px-3 py-2 text-gray-300 hover:text-white rounded-md transition-colors flex items-center">
                  <BookOpen size={16} className="mr-1" />
                  Learning Path
                  <ChevronDown size={16} className="ml-1" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-brand-black border-brand-gray w-56">
                <DropdownMenuItem className="hover:bg-brand-gray focus:bg-brand-gray text-gray-300 hover:text-white cursor-pointer">
                  <Link href="/learning-paths/foundations" className="w-full flex items-center">
                    <span className="h-2 w-2 rounded-full bg-brand-teal mr-2"></span>
                    Foundations
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-brand-gray focus:bg-brand-gray text-gray-300 hover:text-white cursor-pointer">
                  <Link href="/learning-paths/machine-learning" className="w-full flex items-center">
                    <span className="h-2 w-2 rounded-full bg-brand-magenta mr-2"></span>
                    Machine Learning
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-brand-gray focus:bg-brand-gray text-gray-300 hover:text-white cursor-pointer">
                  <Link href="/learning-paths/deep-learning" className="w-full flex items-center">
                    <span className="h-2 w-2 rounded-full bg-brand-violet mr-2"></span>
                    Deep Learning
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-brand-gray focus:bg-brand-gray text-gray-300 hover:text-white cursor-pointer">
                  <Link href="/learning-paths/advanced" className="w-full flex items-center">
                    <span className="h-2 w-2 rounded-full bg-brand-blue mr-2"></span>
                    Advanced Topics
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/problems"
              className="px-3 py-2 text-gray-300 hover:text-white rounded-md transition-colors flex items-center"
            >
              <BrainCircuit size={16} className="mr-1" />
              Practice Arena
            </Link>

            <Link
              href="/leaderboard"
              className="px-3 py-2 text-gray-300 hover:text-white rounded-md transition-colors flex items-center"
            >
              <BarChartBig size={16} className="mr-1" />
              Leaderboard
            </Link>

            <Link
              href="/community"
              className="px-3 py-2 text-gray-300 hover:text-white rounded-md transition-colors flex items-center"
            >
              <MessageSquare size={16} className="mr-1" />
              Community
            </Link>
          </div>

          {/* Right Side - Search & Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search topics..."
                className="bg-brand-gray/20 border border-brand-gray/30 text-gray-300 pl-9 pr-4 py-1.5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-violet focus:border-transparent w-[200px]"
              />
            </div>

            <Button className="bg-transparent hover:bg-brand-gray/20 border border-brand-purple text-brand-purple hover:text-brand-magenta">
              Sign In
            </Button>
          </div>

          {/* Mobile Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-300 hover:text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? "max-h-screen" : "max-h-0"}`}
      >
        <div className="py-2 px-4 space-y-1 bg-brand-black/90 backdrop-blur-md">
          <Link href="/" className="block px-3 py-2 text-gray-300 hover:text-white rounded-md transition-colors">
            Home
          </Link>
          <div className="block px-3 py-2 text-gray-300 rounded-md">
            Learning Path
            <div className="ml-4 mt-1 space-y-1">
              <Link href="/learning-paths/foundations" className="block py-1 text-gray-400 hover:text-white">
                Foundations
              </Link>
              <Link href="/learning-paths/machine-learning" className="block py-1 text-gray-400 hover:text-white">
                Machine Learning
              </Link>
              <Link href="/learning-paths/deep-learning" className="block py-1 text-gray-400 hover:text-white">
                Deep Learning
              </Link>
              <Link href="/learning-paths/advanced" className="block py-1 text-gray-400 hover:text-white">
                Advanced Topics
              </Link>
            </div>
          </div>
          <Link
            href="/problems"
            className="block px-3 py-2 text-gray-300 hover:text-white rounded-md transition-colors"
          >
            Practice Arena
          </Link>
          <Link
            href="/leaderboard"
            className="block px-3 py-2 text-gray-300 hover:text-white rounded-md transition-colors"
          >
            Leaderboard
          </Link>
          <Link
            href="/community"
            className="block px-3 py-2 text-gray-300 hover:text-white rounded-md transition-colors"
          >
            Community
          </Link>
          <div className="pt-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search topics..."
                className="w-full bg-brand-gray/20 border border-brand-gray/30 text-gray-300 pl-9 pr-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-violet focus:border-transparent"
              />
            </div>
          </div>
          <div className="pt-2">
            <Button className="w-full bg-transparent hover:bg-brand-gray/20 border border-brand-purple text-brand-purple hover:text-brand-magenta">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

