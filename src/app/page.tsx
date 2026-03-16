import Link from "next/link";
import {
  Compass,
  Brain,
  Target,
  TrendingUp,
  Shield,
  Users,
  Clock,
  ArrowRight,
  CheckCircle,
  Zap,
} from "lucide-react";

const trades = [
  { name: "Electrician", salary: "$60K–$100K", icon: Zap, demand: "High" },
  { name: "Plumber", salary: "$55K–$95K", icon: Shield, demand: "High" },
  { name: "HVAC Tech", salary: "$50K–$80K", icon: TrendingUp, demand: "Growing" },
  { name: "Welder", salary: "$45K–$85K", icon: Target, demand: "Steady" },
  { name: "Carpenter", salary: "$48K–$78K", icon: Users, demand: "Steady" },
  { name: "Diesel Mechanic", salary: "$50K–$75K", icon: Clock, demand: "Growing" },
];

const steps = [
  {
    step: 1,
    title: "Take the Career Quiz",
    description: "Answer 10 quick questions about your interests, strengths, and preferences.",
    icon: Brain,
  },
  {
    step: 2,
    title: "Get AI-Powered Matches",
    description: "Our AI analyzes your answers and matches you with the top 3 trade careers.",
    icon: Target,
  },
  {
    step: 3,
    title: "View Your Action Plan",
    description: "Get a personalized 6-step plan with timelines, costs, and resources for each match.",
    icon: TrendingUp,
  },
  {
    step: 4,
    title: "Track Your Progress",
    description: "Create a free account to save your matches and track completed action steps.",
    icon: CheckCircle,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section
        aria-labelledby="hero-heading"
        className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2dyaWQpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')] opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-sm font-medium px-4 py-2 rounded-full mb-6">
              <Compass className="h-4 w-4" aria-hidden="true" />
              AI-Powered Career Navigation
            </div>
            <h1 id="hero-heading" className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Find Your Perfect
              <span className="text-accent-300 block">Skilled Trade Career</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl">
              Take a 3-minute quiz and let AI match you with high-demand trade careers,
              apprenticeships, and certifications — complete with salary data and a
              personalized action plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 text-gray-900 font-bold px-8 py-4 rounded-full text-lg transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-primary-700"
              >
                Start Free Career Quiz
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-full text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-primary-700"
              >
                Learn How It Works
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-8 text-sm text-blue-200">
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-400" aria-hidden="true" />
                Free to use
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-400" aria-hidden="true" />
                3 min quiz
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-400" aria-hidden="true" />
                Instant results
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section aria-label="Platform statistics" className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "17+", label: "Trade Careers" },
              { value: "6-Step", label: "Action Plans" },
              { value: "$50K–$100K", label: "Avg Salary Range" },
              { value: "100%", label: "Free to Start" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-bold text-primary-600">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        aria-labelledby="how-heading"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="text-center mb-16">
          <h2 id="how-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How Jobbit Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Four simple steps to discover your ideal trade career path
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map(({ step, title, description, icon: Icon }) => (
            <article
              key={step}
              className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary-50 text-primary-600 w-10 h-10 rounded-xl flex items-center justify-center font-bold">
                  {step}
                </div>
                <Icon className="h-6 w-6 text-primary-500" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Trades Grid */}
      <section
        aria-labelledby="trades-heading"
        className="bg-gray-50 py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="trades-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Trade Careers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore high-demand careers with strong earning potential and job security
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trades.map(({ name, salary, icon: Icon, demand }) => (
              <article
                key={name}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-primary-50 text-primary-600 w-12 h-12 rounded-xl flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-medium bg-green-50 text-green-700 px-2 py-1 rounded-full">
                    {demand} Demand
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
                <p className="text-primary-600 font-bold text-lg">{salary}</p>
                <p className="text-sm text-gray-500 mt-1">Annual salary range</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        aria-labelledby="cta-heading"
        className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Discover Your Trade?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of young people finding their path to rewarding skilled trade careers.
            The quiz takes just 3 minutes.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-gray-900 font-bold px-10 py-4 rounded-full text-lg transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-primary-700"
          >
            Take the Free Quiz Now
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
