import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Convertino",
  description: "Convertino Terms of Service — rules and guidelines for using our image converter.",
};

export default function TermsPage() {
  return (
    <main className="w-full flex flex-col items-center px-4 py-24">
      <div className="bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-xl p-8 max-w-4xl mx-auto my-12">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-8">
          Terms of Service
        </h1>

        <p className="text-gray-400 text-sm mb-6">
          <strong>Last updated:</strong> June 2026
        </p>

        <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Convertino (&ldquo;the Service&rdquo;), you agree to be bound by these
              Terms of Service. If you do not agree, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-3">2. Description of Service</h2>
            <p>
              Convertino is a free, online image conversion tool. All image processing is performed
              <strong> entirely client-side</strong> within your browser. No images are uploaded to
              our servers. The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without any
              warranty, express or implied.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-3">3. User Responsibilities</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Use the Service for any unlawful purpose or in violation of applicable laws.</li>
              <li>Attempt to disrupt, overload, or harm the Service or its infrastructure.</li>
              <li>
                Reverse-engineer, decompile, or attempt to extract the source code of the Service
                beyond what is permitted by applicable law.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-3">4. Intellectual Property</h2>
            <p>
              The Convertino name, logo, and brand assets are trademarks of the project authors.
              The underlying source code may be open-source where indicated; otherwise, all rights
              are reserved.
            </p>
            <p className="mt-2">
              Images you convert using the Service remain your property. We do not claim any
              ownership over your content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-3">5. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Convertino and its authors shall not be liable
              for any indirect, incidental, special, consequential, or punitive damages arising from
              your use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-3">6. Third-Party Services</h2>
            <p>
              The Service may integrate with third-party services (e.g., Google Analytics, Microsoft
              Clarity, Ko-fi). We are not responsible for the practices of these third parties.
              Please review their respective terms and privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-3">7. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be posted on this
              page with an updated revision date. Continued use of the Service after changes
              constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-3">8. Contact</h2>
            <p>
              For questions about these terms, contact us at{" "}
              <a
                href="mailto:legal@convertino.xyz"
                className="text-purple-400 hover:text-purple-300 underline underline-offset-2"
              >
                legal@convertino.xyz
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
