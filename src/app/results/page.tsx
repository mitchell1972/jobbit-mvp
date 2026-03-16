"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TradeMatch } from "@/types";
import {
  Trophy,
  Star,
  DollarSign,
  AlertTriangle,
  Lock,
  ArrowRight,
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
  RotateCcw,
} from "lucide-react";

function MatchCard({
  match,
  expanded,
  onToggle,
}: {
  match: TradeMatch;
  expanded: boolean;
  onToggle: () => void;
}) {
  const rankColors: Record<number, string> = {
    1: "from-amber-400 to-amber-500",
    2: "from-gray-300 to-gray-400",
    3: "from-orange-300 to-orange-400",
  };

  const rankLabels: Record<number, string> = {
    1: "Best Match",
    2: "Great Fit",
    3: "Strong Option",
  };

  return (
    <article
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Header */}
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`bg-gradient-to-br ${rankColors[match.rank] || rankColors[3]} text-white w-12 h-12 rounded-xl flex items-center justify-center`}
            >
              {match.rank === 1 ? (
                <Trophy className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Star className="h-6 w-6" aria-hidden="true" />
              )}
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                #{match.rank} {rankLabels[match.rank] || "Match"}
              </span>
              <h3 className="text-2xl font-bold text-gray-900">{match.trade}</h3>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary-600">{match.matchScore}%</div>
            <span className="text-xs text-gray-500">Match Score</span>
          </div>
        </div>

        {/* Match score bar */}
        <div className="mb-6">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"
              style={{ width: `${match.matchScore}%` }}
              role="progressbar"
              aria-valuenow={match.matchScore}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${match.matchScore}% match score`}
            />
          </div>
        </div>

        {/* Info grid */}
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 rounded-xl p-4">
            <dt className="flex items-center gap-2 text-sm text-green-700 font-medium mb-1">
              <DollarSign className="h-4 w-4" aria-hidden="true" />
              Salary Range
            </dt>
            <dd className="text-lg font-bold text-green-800">{match.salaryRange}</dd>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <dt className="flex items-center gap-2 text-sm text-blue-700 font-medium mb-1">
              <Target className="h-4 w-4" aria-hidden="true" />
              Skill Gaps
            </dt>
            <dd>
              <ul className="space-y-1">
                {match.skillGaps.map((gap) => (
                  <li key={gap} className="text-sm text-blue-800 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" aria-hidden="true" />
                    {gap}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        {/* Why match */}
        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary-500" aria-hidden="true" />
            Why This Match?
          </h4>
          <p className="text-gray-700 text-sm leading-relaxed">{match.whyMatch}</p>
        </div>

        {/* Action Plan Preview / Toggle */}
        <button
          onClick={onToggle}
          aria-expanded={expanded}
          aria-controls={`action-plan-${match.rank}`}
          className="w-full flex items-center justify-between p-4 bg-primary-50 hover:bg-primary-100 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <span className="font-semibold text-primary-700 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" aria-hidden="true" />
            {expanded ? "Hide" : "View"} 6-Step Action Plan
          </span>
          <ArrowRight
            className={`h-5 w-5 text-primary-600 transition-transform ${expanded ? "rotate-90" : ""}`}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Action Plan (Teaser: first 2 visible, rest locked) */}
      {expanded && (
        <div id={`action-plan-${match.rank}`} role="region" aria-label={`Action plan for ${match.trade}`} className="border-t border-gray-100 p-6 md:p-8">
          <h4 className="text-lg font-bold text-gray-900 mb-6">Your Personalized Action Plan</h4>
          <div className="space-y-4">
            {match.actionPlan.map((step, i) => {
              const isLocked = i >= 2;
              return (
                <div
                  key={step.step}
                  className={`relative rounded-xl border p-4 ${
                    isLocked
                      ? "border-gray-200 bg-gray-50 opacity-60"
                      : "border-primary-100 bg-white"
                  }`}
                >
                  {isLocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl z-10">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Lock className="h-4 w-4" aria-hidden="true" />
                        <span className="text-sm font-medium">Create free account to unlock</span>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                        isLocked
                          ? "bg-gray-200 text-gray-400"
                          : "bg-primary-100 text-primary-700"
                      }`}
                    >
                      {step.step}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-semibold text-gray-900">{step.title}</h5>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            step.priority === "high"
                              ? "bg-red-50 text-red-700"
                              : step.priority === "medium"
                              ? "bg-yellow-50 text-yellow-700"
                              : "bg-green-50 text-green-700"
                          }`}
                        >
                          {step.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{step.detail}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" aria-hidden="true" />
                          {step.timeEstimate}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" aria-hidden="true" />
                          {step.cost}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Unlock CTA */}
          <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl border border-primary-100 text-center">
            <p className="text-sm text-gray-700 mb-3">
              <strong>Create a free account</strong> to unlock all 6 steps and track your progress
            </p>
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-2.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Sign Up Free
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </article>
  );
}

export default function ResultsPage() {
  const router = useRouter();
  const [matches, setMatches] = useState<TradeMatch[]>([]);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem("jobbit_matches");
    if (stored) {
      try {
        setMatches(JSON.parse(stored));
      } catch {
        router.push("/quiz");
      }
    } else {
      router.push("/quiz");
    }
    setLoading(false);
  }, [router]);

  if (loading || matches.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center" role="status">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4" aria-hidden="true" />
          <p className="text-gray-600">Loading your results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-sm font-medium px-4 py-2 rounded-full mb-4">
            <CheckCircle className="h-4 w-4 text-green-400" aria-hidden="true" />
            Quiz Complete
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Your Top Trade Matches</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Based on your quiz answers, here are your top 3 trade career matches — each with a
            personalized action plan to get started.
          </p>
        </div>
      </section>

      {/* Results */}
      <section aria-label="Career match results" className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        <div className="space-y-8" role="list" aria-label="Trade career matches">
          {matches.map((match) => (
            <div key={match.rank} role="listitem">
              <MatchCard
                match={match}
                expanded={expandedCard === match.rank}
                onToggle={() =>
                  setExpandedCard(expandedCard === match.rank ? null : match.rank)
                }
              />
            </div>
          ))}
        </div>

        {/* Bottom CTAs */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/auth/signup"
            className="flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold py-4 px-6 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <CheckCircle className="h-5 w-5" aria-hidden="true" />
            Create Account & Save Results
          </Link>
          <button
            onClick={() => {
              sessionStorage.removeItem("jobbit_matches");
              sessionStorage.removeItem("jobbit_answers");
              router.push("/quiz");
            }}
            className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-4 px-6 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <RotateCcw className="h-5 w-5" aria-hidden="true" />
            Retake Quiz
          </button>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-amber-800">
            <strong>Note:</strong> These matches are AI-generated recommendations based on your
            quiz answers. Salary ranges are estimates and may vary by location, experience, and
            employer. Always do your own research before making career decisions.
          </p>
        </div>
      </section>
    </div>
  );
}
