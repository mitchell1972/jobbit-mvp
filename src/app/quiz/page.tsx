"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { quizQuestions } from "@/lib/questions";
import { QuizAnswer } from "@/types";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  CheckCircle,
  Brain,
} from "lucide-react";

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const question = quizQuestions[currentQuestion];
  const totalQuestions = quizQuestions.length;
  const progress = ((currentQuestion) / totalQuestions) * 100;

  const handleSelectOption = useCallback((option: string) => {
    setSelectedOption(option);
    setError(null);
  }, []);

  const handleNext = useCallback(async () => {
    if (!selectedOption) return;

    const newAnswers: QuizAnswer[] = [
      ...answers.filter((a) => a.questionId !== question.id),
      {
        questionId: question.id,
        answer: selectedOption,
        category: question.category,
      },
    ];
    setAnswers(newAnswers);

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(
        newAnswers.find((a) => a.questionId === quizQuestions[currentQuestion + 1]?.id)?.answer || null
      );
    } else {
      // Submit to API
      setIsSubmitting(true);
      setError(null);
      try {
        const res = await fetch("/api/match", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: newAnswers }),
        });

        if (!res.ok) {
          throw new Error("Failed to get matches");
        }

        const data = await res.json();
        // Store results in sessionStorage for the results page
        sessionStorage.setItem("jobbit_matches", JSON.stringify(data.matches));
        sessionStorage.setItem("jobbit_answers", JSON.stringify(newAnswers));
        router.push("/results");
      } catch {
        setError("Something went wrong generating your matches. Please try again.");
        setIsSubmitting(false);
      }
    }
  }, [selectedOption, answers, question, currentQuestion, totalQuestions, router]);

  const handleBack = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setSelectedOption(
        answers.find((a) => a.questionId === quizQuestions[currentQuestion - 1]?.id)?.answer || null
      );
      setError(null);
    }
  }, [currentQuestion, answers]);

  const isLastQuestion = currentQuestion === totalQuestions - 1;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-16">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestion + 1} of {totalQuestions}
            </span>
            <span className="text-sm font-medium text-primary-600">
              {Math.round(progress)}% complete
            </span>
          </div>
          <div
            className="h-3 bg-gray-200 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Quiz progress: ${Math.round(progress)}% complete`}
          >
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* Step indicators */}
          <div className="flex justify-between mt-3" aria-hidden="true">
            {quizQuestions.map((_, i) => (
              <div
                key={i}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                  i < currentQuestion
                    ? "bg-primary-500 text-white"
                    : i === currentQuestion
                    ? "bg-primary-100 text-primary-700 ring-2 ring-primary-500"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {i < currentQuestion ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  i + 1
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Loading overlay */}
        {isSubmitting && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 text-center max-w-sm mx-4 shadow-2xl" role="status">
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-primary-600 animate-pulse" aria-hidden="true" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Analyzing Your Answers</h2>
              <p className="text-gray-600 mb-4">
                Our AI is matching you with the best trade careers...
              </p>
              <Loader2 className="h-6 w-6 text-primary-500 animate-spin mx-auto" aria-hidden="true" />
            </div>
          </div>
        )}

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-primary-50 text-primary-600 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
              {question.category}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            {question.question}
          </h2>

          <fieldset>
            <legend className="sr-only">{question.question}</legend>
            <div className="space-y-3" role="radiogroup">
              {question.options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedOption === option
                      ? "border-primary-500 bg-primary-50 shadow-sm"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    checked={selectedOption === option}
                    onChange={() => handleSelectOption(option)}
                    className="sr-only"
                  />
                  <span
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedOption === option
                        ? "border-primary-500 bg-primary-500"
                        : "border-gray-300"
                    }`}
                    aria-hidden="true"
                  >
                    {selectedOption === option && (
                      <span className="w-2.5 h-2.5 rounded-full bg-white" />
                    )}
                  </span>
                  <span
                    className={`text-base ${
                      selectedOption === option
                        ? "text-primary-800 font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Error message */}
          {error && (
            <div role="alert" className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={handleBack}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg px-3 py-2"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={!selectedOption || isSubmitting}
              className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Analyzing...
                </>
              ) : isLastQuestion ? (
                <>
                  Get My Matches
                  <Brain className="h-4 w-4" aria-hidden="true" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
