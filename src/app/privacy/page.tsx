import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Convertino",
  description: "Convertino Privacy Policy — how we handle your data and respect your privacy.",
};

export default function PrivacyPage() {
  return (
    <main className="w-full flex flex-col items-center px-4 py-24">
      <div className="bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-xl p-8 max-w-4xl mx-auto my-12">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-8">
          Privacy Policy
        </h1>

        <p className="text-gray-400 text-sm mb-6">
          <strong>Last updated:</strong> June 2026
        </p>

        <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-3">1. Introduction</h2>
            <p>
              Convertino (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, and safeguard your information when you visit{" "}
              <strong>convertino.xyz</strong> (the &ldquo;Site&rdquo;).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-3">2. Data We Collect</h2>
            <p>
              We collect minimal data necessary to operate and improve the Site:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>
                <strong>Analytics Data:</strong> Anonymous usage statistics (page views, browser type,
                approximate location) via Google Analytics and Microsoft Clarity. This data is
                aggregated and not linked to any personal identity.
              </li>
              <li>
                <strong>Image Files:</strong> All image transformations happen entirely
                <strong> client-side</strong> in your browser. Your images are never uploaded,
                stored, or transmitted to our servers.
              </li>
              <li>
                <strong>Cookies:</strong> Functional and analytical cookies — see our{" "}
                <a href="/cookies" className="text-purple-400 hover:text-purple-300 underline underline-offset-2">
                  Cookie Policy
                </a>{" "}
                for details.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-3">3. How We Use Your Data</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To analyze traffic patterns and improve site performance.</li>
              <li>To detect and prevent technical issues or abuse.</li>
              <li>To understand which features are most valuable to our users.</li>
            </ul>
            <p className="mt-2">
              We do <strong>not</strong> sell, rent, or share your personal data with third parties
              for their own marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-3">4. Third-Party Services</h2>
            <p>
              We use the following third-party services, each bound by their own privacy policies:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 underline underline-offset-2"
                >
                  Google Analytics
                </a>{" "}
                — anonymous traffic analysis.
              </li>
              <li>
                <a
                  href="https://privacy.microsoft.com/en-us/privacystatement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 underline underline-offset-2"
                >
                  Microsoft Clarity
                </a>{" "}
                — anonymous session behavior insights.
              </li>
              <li>
                <a
                  href="https://ko-fi.com/privacypolicy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 underline underline-offset-2"
                >
                  Ko-fi
                </a>{" "}
                — voluntary support widget.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-3">5. Your Rights (GDPR)</h2>
            <p>
              If you are in the European Economic Area (EEA), you have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Access, correct, or delete any personal data we hold about you.</li>
              <li>Withdraw consent for cookie usage at any time.</li>
              <li>Object to processing of your data for analytics.</li>
              <li>Lodge a complaint with your local data protection authority.</li>
            </ul>
            <p className="mt-2">
              To exercise these rights, contact us at{" "}
              <a
                href="mailto:privacy@convertino.xyz"
                className="text-purple-400 hover:text-purple-300 underline underline-offset-2"
              >
                privacy@convertino.xyz
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-3">6. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this
              page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-3">7. Contact</h2>
            <p>
              If you have questions about this Privacy Policy, please reach out:
            </p>
            <p className="mt-2">
              <a
                href="mailto:privacy@convertino.xyz"
                className="text-purple-400 hover:text-purple-300 underline underline-offset-2"
              >
                privacy@convertino.xyz
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
