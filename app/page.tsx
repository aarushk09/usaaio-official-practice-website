import HeroSection from "@/components/hero-section"
import LearningPaths from "@/components/learning-paths"
import FeaturesSection from "@/components/features-section"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <LearningPaths />
      <FeaturesSection />

      {/* CTA Section */}
      <section className="py-20 bg-brand-navy">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Start Your AI Journey?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of students preparing for the USA AI Olympiad with our comprehensive learning platform
          </p>
          <Button size="lg" className="bg-brand-teal hover:bg-brand-blue text-white">
            <Link href="/learning-paths/foundations" className="flex items-center">
              Get Started for Free <ArrowRight size={18} className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}

