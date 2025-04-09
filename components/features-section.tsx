import { Code, FileCode, Database, BarChart3, Layers, PenTool, Users, GitPullRequest } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: Code,
      title: "Interactive Tutorials",
      description: "Learn through hands-on coding examples with real-time feedback and guidance.",
    },
    {
      icon: FileCode,
      title: "MDX Documentation",
      description: "Clear, comprehensive documentation with rich code samples and illustrations.",
    },
    {
      icon: Database,
      title: "Problem Database",
      description: "Hundreds of USAAIO-style problems with increasing difficulty levels.",
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Monitor your progress, identify strengths and areas for improvement.",
    },
    {
      icon: Layers,
      title: "Structured Learning",
      description: "Organized learning paths designed to build skills progressively.",
    },
    {
      icon: PenTool,
      title: "Mock Competitions",
      description: "Simulate real competition environments with timed challenges.",
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with peers and mentors for guidance and collaboration.",
    },
    {
      icon: GitPullRequest,
      title: "Regular Updates",
      description: "Fresh content aligned with the latest USAAIO syllabus and AI trends.",
    },
  ]

  return (
    <section className="py-20 neural-bg">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Platform <span className="gradient-text">Features</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to prepare for the USA AI Olympiad in one place
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="glass rounded-xl p-6 card-hover transition-all duration-300">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-brand-purple to-brand-magenta p-0.5 mb-4">
                <div className="h-full w-full rounded-lg bg-brand-black flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-brand-magenta" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

