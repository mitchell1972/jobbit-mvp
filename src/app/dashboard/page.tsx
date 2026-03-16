"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { TradeMatch } from "@/types";
import {
  Compass,
  Trophy,
  Star,
  DollarSign,
  CheckCircle,
  Circle,
  Clock,
  Target,
  TrendingUp,
  LogOut,
  ArrowRight,
  User,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [matches, setMatches] = useState<TradeMatch[]>([]);
  const [completedSteps, setCompletedSteps] = useState<Record<string, number[]>>({});
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        // If no session, try loading from sessionStorage for demo purposes
        const stored = sessionStorage.getItem("jobbit_matches");
        if (stored) {
          setMatches(JSON.parse(stored));
          setUser({ email: "demo@jobbit.com" });
        } else {
          router.push("/auth/login");
          return;
        }
      } else {
        setUser({ email: session.user.email });
        // Load matches from localStorage (saved during signup)
        const pending = localStorage.getItem("jobbit_pending_matches");
        const stored = sessionStorage.getItem("jobbit_matches");
        if (pending) {
          setMatches(JSON.parse(pending));
        } else if (stored) {
          setMatches(JSON.parse(stored));
        }
      }

      // Load completed steps
      const savedSteps = localStorage.getItem("jobbit_completed_steps");
      if (savedSteps) {
        setCompletedSteps(JSON.parse(savedSteps));
      }

      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const toggleStep = useCallback(
    (trade: string, stepNum: number) => {
      setCompletedSteps((prev) => {
        const tradeSteps = prev[trade] || [];
        const updated = tradeSteps.includes(stepNum)
          ? tradeSteps.filter((s) => s !== stepNum)
          : [...tradeSteps, stepNum];
        const newState = { ...prev, [trade]: updated };
        localStorage.setItem("jobbit_completed_steps", JSON.stringify(newState));
        return newState;
      });
    },
    []
  );

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" role="status">
        <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full" aria-hidden="true" />
        <span className="sr-only">Loading dashboard...</span>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Compass className="h-8 w-8 text-primary-600" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">No Matches Yet</h1>
          <p className="text-gray-600 mb-6">
            Take the career quiz to get your personalized trade matches and action plans.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Start Career Quiz
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    );
  }

  const activeMatch = matches[activeTab];
  const tradeSteps = completedSteps[activeMatch?.trade] || [];
  const progressPercent = activeMatch
    ? Math.round((tradeSteps.length / activeMatch.actionPlan.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                <User className="h-3.5 w-3.5" aria-hidden="true" />
                {user?.email}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg px-3 py-2"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Trade Tabs */}
        <div className="mb-8" role="tablist" aria-label="Your trade matches">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {matches.map((match, i) => {
              const stepsComplete = (completedSteps[match.trade] || []).length;
              const total = match.actionPlan.length;
              return (
                <button
                  key={match.rank}
                  role="tab"
                  aria-selected={activeTab === i}
                  aria-controls={`tabpanel-${i}`}
                  onClick={() => setActiveTab(i)}
                  className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 font-medium whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    activeTab === i
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {match.rank === 1 ? (
                    <Trophy className="h-5 w-5 text-amber-500" aria-hidden="true" />
                  ) : (
                    <Star className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  )}
                  <span>{match.trade}</span>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                    {stepsComplete}/{total}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Match Content */}
        {activeMatch && (
          <div
            id={`tabpanel-${activeTab}`}
            role="tabpanel"
            aria-label={`${activeMatch.trade} details`}
          >
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary-50 w-10 h-10 rounded-lg flex items-center justify-center">
                    <Target className="h-5 w-5 text-primary-600" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Match Score</p>
                    <p className="text-2xl font-bold text-primary-600">{activeMatch.matchScore}%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-green-50 w-10 h-10 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-green-600" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Salary Range</p>
                    <p className="text-2xl font-bold text-green-700">{activeMatch.salaryRange}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-amber-50 w-10 h-10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-amber-600" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Plan Progress</p>
                    <p className="text-2xl font-bold text-amber-700">{progressPercent}%</p>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                    role="progressbar"
                    aria-valuenow={progressPercent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Action plan ${progressPercent}% complete`}
                  />
                </div>
              </div>
            </div>

            {/* Why Match + Skill Gaps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary-500" aria-hidden="true" />
                  Why This Match?
                </h2>
                <p className="text-gray-700 text-sm leading-relaxed">{activeMatch.whyMatch}</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-500" aria-hidden="true" />
                  Skills to Develop
                </h2>
                <ul className="space-y-2">
                  {activeMatch.skillGaps.map((gap) => (
                    <li key={gap} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" aria-hidden="true" />
                      {gap}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Full Action Plan */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary-500" aria-hidden="true" />
                Your 6-Step Action Plan
              </h2>
              <div className="space-y-4">
                {activeMatch.actionPlan.map((step) => {
                  const isComplete = tradeSteps.includes(step.step);
                  return (
                    <div
                      key={step.step}
                      className={`rounded-xl border p-4 transition-all ${
                        isComplete
                          ? "border-green-200 bg-green-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <button
                          onClick={() => toggleStep(activeMatch.trade, step.step)}
                          className="mt-0.5 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
                          aria-label={`${isComplete ? "Unmark" : "Mark"} step ${step.step}: ${step.title} as ${isComplete ? "incomplete" : "complete"}`}
                        >
                          {isComplete ? (
                            <CheckCircle className="h-6 w-6 text-green-500" />
                          ) : (
                            <Circle className="h-6 w-6 text-gray-300 hover:text-primary-400 transition-colors" />
                          )}
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3
                              className={`font-semibold ${
                                isComplete ? "text-green-800 line-through" : "text-gray-900"
                              }`}
                            >
                              Step {step.step}: {step.title}
                            </h3>
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
