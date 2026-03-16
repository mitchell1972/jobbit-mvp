"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Compass } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg px-2 py-1"
          >
            <Compass className="h-7 w-7" aria-hidden="true" />
            <span>Jobbit</span>
          </Link>

          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-primary-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1"
            >
              Home
            </Link>
            <Link
              href="/quiz"
              className="text-gray-600 hover:text-primary-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1"
            >
              Career Quiz
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-primary-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1"
            >
              Dashboard
            </Link>
            <Link
              href="/quiz"
              className="bg-primary-500 hover:bg-primary-600 text-white px-5 py-2 rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Get Started
            </Link>
          </nav>

          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav
            id="mobile-menu"
            aria-label="Mobile navigation"
            className="md:hidden pb-4 border-t border-gray-100"
          >
            <div className="flex flex-col gap-2 pt-4">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-lg hover:bg-gray-50 font-medium"
              >
                Home
              </Link>
              <Link
                href="/quiz"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-lg hover:bg-gray-50 font-medium"
              >
                Career Quiz
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-lg hover:bg-gray-50 font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/quiz"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-primary-500 hover:bg-primary-600 text-white px-5 py-2 rounded-full font-semibold text-center mt-2"
              >
                Get Started
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
