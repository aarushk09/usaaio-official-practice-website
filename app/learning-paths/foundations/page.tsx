import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, Lightbulb, Code, Database, BarChart3 } from "lucide-react"

export default function FoundationsPage() {
  const modules = [
    {
      id: "python-basics",
      title: "Python Programming",
      description: "Learn Python programming fundamentals for AI development",
      icon: Code,
      progress: 25,
      estimatedHours: 10,
      topics: 8,
      color: "from-brand-teal to-brand-blue",
    },
    {
      id: "numpy-pandas",
      title: "NumPy & Pandas",
      description: "Master data manipulation with essential Python libraries",
      icon: Database,
      progress: 0,
      estimatedHours: 8,
      topics: 6,
      color: "from-brand-purple to-brand-magenta",
    },
    {
      id: "data-visualization",
      title: "Data Visualization",
      description: "Create insightful visualizations with Matplotlib and Seaborn",
      icon: BarChart3,
      progress: 0,
      estimatedHours: 6,
      topics: 5,
      color: "from-brand-violet to-brand-purple",
    },
    {
      id: "math-foundations",
      title: "Mathematical Foundations",
      description: "Linear algebra, calculus, and statistics for AI",
      icon: Lightbulb,
      progress: 0,
      estimatedHours: 12,
      topics: 10,
      color: "from-brand-blue to-brand-teal",
    },
  ]

  return (
    <div className="min-h-screen bg-brand-dark pt-16">
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
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
              <span className="text-white">Foundations</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">AI Foundations</h1>
            <p className="text-gray-300">Start your AI journey with core concepts and programming fundamentals</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module) => (
            <Link href={`/learning-paths/foundations/${module.id}`} key={module.id} className="group">
              <div className="glass rounded-xl p-6 h-full card-hover border border-brand-gray/20 transition-all duration-300 group-hover:border-brand-purple/50">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-semibold text-white group-hover:text-brand-magenta transition-colors">
                    {module.title}
                  </h2>
                  <div className={`p-3 rounded-full bg-gradient-to-r ${module.color}`}>
                    <module.icon className="h-6 w-6 text-white" />
                  </div>
                </div>

                <p className="text-gray-400 mb-6">{module.description}</p>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Progress:</span>
                    <span className="text-sm text-white">{module.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-brand-gray/30 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${module.color}`}
                      style={{ width: `${module.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between text-sm text-gray-400">
                  <span>{module.estimatedHours} hours</span>
                  <span>{module.topics} topics</span>
                </div>

                <div className="mt-6">
                  <Button className="w-full bg-transparent border border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white group-hover:bg-brand-purple group-hover:text-white transition-colors">
                    {module.progress > 0 ? "Continue Learning" : "Start Learning"}
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
