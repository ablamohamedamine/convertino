import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Convertino",
  description: "Convertino Cookie Policy — how we use cookies to run the site smoothly.",
};

export default function CookiesPage() {
  return (
    <main className="w-full flex flex-col items-center px-4 py-24">
      <div className="bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-xl p-8 max-w-4xl mx-auto my-12">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-8">
          Cookie Policy
        </h1>

        <p className="text-gray-400 text-sm mb-6">
          <strong>Last updated:</strong> June 2026
        </p>

        <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-3">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device by your web browser. They help
              websites remember your preferences, understand how you use the site, and improve your
              browsing experience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-3">2. Cookies We Use</h2>
            <p className="mb-3">
              Convertino uses only strictly necessary and analytical cookies. We do
              <strong> not</strong> use advertising, targeting, or social media cookies.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-zinc-700">
                    <th className="py-2 pr-4 font-semibold text-gray-100">Cookie</th>
                    <th className="py-2 pr-4 font-semibold text-gray-100">Type</th>
                    <th className="py-2 pr-4 font-semibold text-gray-100">Purpose</th>
                    <th className="py-2 font-semibold text-gray-100">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  <tr>
                    <td className="py-2 pr-4 text-purple-400 font-mono text-xs">
                      convertino_cookie_consent
                    </td>
                    <td className="py-2 pr-4">Necessary</td>
                    <td className="py-2 pr-4">Stores your cookie preference choice.</td>
                    <td className="py-2">Persistent</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-purple-400 font-mono text-xs">_ga / _ga_*</td>
                    <td className="py-2 pr-4">Analytics</td>
                    <td className="py-2 pr-4">
                      Google Analytics — distinguishes unique users and throttles request rate.
                    </td>
                    <td className="py-2">2 years / 1 minute</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-purple-400 font-mono text-xs">_clck / _clsk</td>
                    <td className="py-2 pr-4">Analytics</td>
                    <td className="py-2 pr-4">
                      Microsoft Clarity — stores session and user behavior metadata.
                    </td>
                    <td className="py-2">1 year / 1 day</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-3">3. Your Consent</h2>
            <p>
              When you first visit Convertino, you will see a cookie consent banner. By clicking
              &ldquo;Accept All,&rdquo; you consent to the use of all cookies described above. If you
              click &ldquo;Decline,&rdquo; only strictly necessary cookies will be set.
            </p>
            <p className="mt-2">
              You can change your cookie preferences at any time through your browser settings.
              Instructions can be found at{" "}
              <a
                href="https://www.aboutcookies.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 underline underline-offset-2"
              >
                aboutcookies.org
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-3">
              4. Managing Cookies in Your Browser
            </h2>
            <p>Most browsers allow you to control cookies through their settings:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>
                <strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data.
              </li>
              <li>
                <strong>Firefox:</strong> Options → Privacy &amp; Security → Cookies and Site Data.
              </li>
              <li>
                <strong>Safari:</strong> Preferences → Privacy → Cookies and website data.
              </li>
              <li>
                <strong>Edge:</strong> Settings → Cookies and site permissions → Cookies.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-3">5. Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time. Any changes will be posted on this
              page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-3">6. Contact</h2>
            <p>
              If you have questions about our use of cookies, contact us at{" "}
              <a
                href="mailto:privacy@convertino.xyz"
                className="text-purple-400 hover:text-purple-300 underline underline-offset-2"
              >
                privacy@convertino.xyz
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
