import Link from "next/link";
import { Compass } from "lucide-react";

export function Footer() {
  return (
    <footer role="contentinfo" className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 text-white text-lg font-bold mb-4">
              <Compass className="h-6 w-6" aria-hidden="true" />
              Jobbit
            </Link>
            <p className="text-sm text-gray-400 max-w-xs">
              AI-powered career navigation matching young people with skilled trade careers,
              apprenticeships, and certification programs.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/quiz" className="hover:text-white transition-colors">
                  Take the Quiz
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="hover:text-white transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/auth/signup" className="hover:text-white transition-colors">
                  Create Account
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="text-white font-semibold mb-3">Trades We Match</h3>
            <ul className="space-y-2 text-sm">
              <li>Electrician</li>
              <li>Plumber</li>
              <li>HVAC Technician</li>
              <li>Welder</li>
              <li>Carpenter</li>
              <li>And 12+ more</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Jobbit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
