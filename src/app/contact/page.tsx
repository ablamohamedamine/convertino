"use client";
import React, { useEffect, useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import FloatingBackground from '@/app/components/FloatingBackground';

export default function ContactPage() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Create intersection observer for scroll-triggered animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all elements with scroll-animate class
    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <main className="w-full flex flex-col items-center px-4 relative overflow-hidden min-h-screen pt-24">
      {/* Dynamic Background */}
      <FloatingBackground />

      <section id="contact" className="w-full max-w-4xl mb-20 relative z-10 scroll-animate opacity-0 translate-y-8">
        <div className="text-center mb-12">
          <div className="inline-block relative">
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 animate-expand-line"></div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Get In Touch
            </h1>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 bg-zinc-900/40 backdrop-blur-xl border border-zinc-700/50 rounded-3xl p-8 md:p-12 shadow-2xl">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-200">Let&apos;s Connect</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Have questions, suggestions, or want to collaborate? We&apos;d love to hear from you! Fill out the form or reach out directly via email or LinkedIn.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
                  <span className="text-blue-400 text-xl">📧</span>
                </div>
                <div>
                  <div className="font-medium text-gray-200 mb-1">Email</div>
                  {/* Fixed the missing mailto: in the href */}
                  <a href="mailto:billel.chami.dev@gmail.com" className="text-blue-400 hover:text-blue-300 transition">
                    billel.chami.dev@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-300">
                  <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-200 mb-1">Billal's LinkedIn</div>
                  <a href="https://www.linkedin.com/in/billal-chami/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition">
                    Connect on LinkedIn
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-300">
                  <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-200 mb-1">Amine's LinkedIn</div>
                  <a href="https://www.linkedin.com/in/ablamohamedamine/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition">
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form 
              ref={formRef}
              className="space-y-5"
              onSubmit={async (e) => {
                e.preventDefault();
                setFormStatus('sending');
                try {
                  await emailjs.sendForm(
                    'service_ftfofc7',
                    'template_rcy710u',
                    formRef.current!,
                  );
                  setFormStatus('success');
                  formRef.current?.reset();
                } catch {
                  setFormStatus('error');
                }
              }}
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-600 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-600 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-600 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell us what's on your mind..."
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-60 disabled:hover:translate-y-0"
                disabled={formStatus === 'sending'}
              >
                {formStatus === 'sending' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : 'Send Message'}
              </button>
              
              {formStatus === 'success' && (
                <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg text-center font-medium animate-fade-in-up">
                  Message sent successfully! We&apos;ll get back to you soon.
                </div>
              )}
              {formStatus === 'error' && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-center font-medium animate-fade-in-up">
                  Failed to send message. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}