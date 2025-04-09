import Link from "next/link"
import { BrainCircuit, Github, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-brand-black pt-12 pb-6 border-t border-brand-gray/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-brand-purple to-brand-teal flex items-center justify-center mr-2">
                <BrainCircuit className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg text-white">USAAIO Guide</span>
            </div>
            <p className="text-gray-400 mb-4">
              A comprehensive learning platform for students preparing for the USA Artificial Intelligence Olympiad.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-brand-purple transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-purple transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-purple transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Learning</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/learning-paths/foundations" className="text-gray-400 hover:text-white transition-colors">
                  AI Foundations
                </Link>
              </li>
              <li>
                <Link
                  href="/learning-paths/machine-learning"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Machine Learning
                </Link>
              </li>
              <li>
                <Link href="/learning-paths/deep-learning" className="text-gray-400 hover:text-white transition-colors">
                  Deep Learning
                </Link>
              </li>
              <li>
                <Link href="/learning-paths/advanced" className="text-gray-400 hover:text-white transition-colors">
                  Advanced Topics
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Practice</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/problems" className="text-gray-400 hover:text-white transition-colors">
                  Problem Archive
                </Link>
              </li>
              <li>
                <Link href="/competitions" className="text-gray-400 hover:text-white transition-colors">
                  Mock Competitions
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-gray-400 hover:text-white transition-colors">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/submissions" className="text-gray-400 hover:text-white transition-colors">
                  My Submissions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About USAAIO
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-gray-400 hover:text-white transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-gray/20 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} USAAIO Guide. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/terms" className="text-gray-500 hover:text-gray-300 text-sm">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-gray-500 hover:text-gray-300 text-sm">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="text-gray-500 hover:text-gray-300 text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

