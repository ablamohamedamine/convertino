"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "convertino_cookie_consent";

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [consent, setConsent] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    setConsent(stored);
  }, []);

  const acceptAll = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setConsent("accepted");
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setConsent("declined");
  };

  if (!mounted || consent !== null) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md w-full animate-fade-in-up">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-30 blur transition duration-300" />
        <div className="relative bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 rounded-xl p-5 shadow-2xl">
          <div className="flex items-start gap-3">
            <div className="shrink-0 mt-0.5">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-100 mb-1">Cookie Consent</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                We use cookies to analyze traffic and optimize performance. No user account is required —
                the service is fully unlimited and free.
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <Link
              href="/cookies"
              className="text-xs text-gray-500 hover:text-purple-400 transition-colors underline underline-offset-2"
            >
              Learn more
            </Link>
            <div className="flex gap-2">
              <button
                onClick={decline}
                className="text-xs font-medium px-3 py-1.5 rounded-lg bg-zinc-800 text-gray-300 hover:bg-zinc-700 hover:text-white border border-zinc-700 transition-all"
              >
                Decline
              </button>
              <button
                onClick={acceptAll}
                className="text-xs font-medium px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-600/20"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
