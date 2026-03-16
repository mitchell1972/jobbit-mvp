"use client";

import { useState, useId } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Compass, Mail, Lock, Loader2, AlertCircle, CheckCircle } from "lucide-react";

export default function SignupPage() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const emailId = `${id}-email`;
  const passwordId = `${id}-password`;
  const confirmId = `${id}-confirm`;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const { error: signupError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signupError) {
        setError(signupError.message);
      } else {
        // Save quiz data if exists
        const matches = sessionStorage.getItem("jobbit_matches");
        const answers = sessionStorage.getItem("jobbit_answers");
        if (matches && answers) {
          // Store in Supabase after auth is confirmed
          localStorage.setItem("jobbit_pending_matches", matches);
          localStorage.setItem("jobbit_pending_answers", answers);
        }
        setSuccess(true);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full text-center">
          <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Created!</h1>
          <p className="text-gray-600 mb-6">
            Check your email to verify your account, then sign in to access your full career
            matches and action plans.
          </p>
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="bg-primary-50 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Compass className="h-7 w-7 text-primary-600" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Create Your Account</h1>
          <p className="text-gray-600 text-sm">
            Save your matches and unlock your full action plan
          </p>
        </div>

        <form onSubmit={handleSignup} noValidate>
          <fieldset disabled={loading}>
            <legend className="sr-only">Create account</legend>

            <div className="space-y-4">
              <div>
                <label htmlFor={emailId} className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <input
                    id={emailId}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label htmlFor={passwordId} className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <input
                    id={passwordId}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    placeholder="At least 6 characters"
                    minLength={6}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label htmlFor={confirmId} className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <input
                    id={confirmId}
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    placeholder="Confirm your password"
                    minLength={6}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div role="alert" className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-6 bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                  Creating Account...
                </>
              ) : (
                "Create Free Account"
              )}
            </button>
          </fieldset>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary-600 hover:text-primary-700 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
