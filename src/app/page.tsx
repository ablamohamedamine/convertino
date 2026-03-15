"use client";
import { useEffect, useRef } from 'react';
import ImageConverter from './ImageConverter';
import FeaturesGrid, { Feature } from '@/app/components/FeaturesGrid';
import FloatingBackground from '@/app/components/FloatingBackground';

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);

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

  const features: Feature[] = [
    {
      title: "Bulk Upload",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
      description: "Drag and drop multiple images at once for batch processing"
    },
    {
      title: "Format Conversion",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      description: "Convert between WebP, PNG, JPEG, AVIF, and SVG formats"
    },
    {
      title: "Smart Compression",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      description: "Adjustable compression levels to balance quality and file size"
    },
    {
      title: "No Account Needed",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      description: "Start converting instantly. We don't ask for your email, and there's no login required."
    },
    {
      title: "Privacy First",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      description: "All processing happens in your browser - your images never leave your device"
    },
    {
      title: "Real-time Preview",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      description: "See file size and quality changes before downloading"
    },
    {
      title: "Instant Download",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      description: "Download individual files or a ZIP archive of all converted images"
    },
    {
      title: "Mobile Friendly",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      description: "Optimized for mobile devices with touch-friendly interface"
    }
  ];

  return (
    <main className="w-full flex flex-col items-center px-2 relative overflow-hidden">

      <FloatingBackground />
      
      <section className="w-full max-w-4xl text-center mt-16 mb-12 relative z-10 scroll-animate opacity-0 translate-y-8">
        <div className="relative">
          {/* Animated underline effect */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 animate-expand-line"></div>
          
          <h1 className="text-5xl sm:text-7xl font-black mb-6 tracking-tight bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Free Unlimited
            <br />
            <span className="block mt-2 animate-pulse-slow">Image Converter</span>
          </h1>
        </div>
        
        <p className="text-xl sm:text-2xl text-gray-300 mb-8 leading-relaxed">
          Convert and compress images instantly. Bulk upload, format conversion, and compression.
          <br />
          <span className="text-blue-400 font-semibold animate-glow">100% free, unlimited and without registration.</span>
        </p>
        
        <div>
          <a 
            href="#converter" 
            className="group inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 transform relative overflow-hidden"
          >
            <span className="relative z-10">Start Converting Now ↓</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
        </div>

        {/* Stats section */}
        <div className="mt-12 grid grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 animate-count-up">∞</div>
            <div className="text-sm text-gray-400">Unlimited Conversions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 animate-count-up">5</div>
            <div className="text-sm text-gray-400">Supported Formats</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-400 animate-count-up">100%</div>
            <div className="text-sm text-gray-400">Client-Side</div>
          </div>
        </div>
      </section>

      <section id="converter" className="w-full max-w-3xl bg-zinc-900 rounded-2xl shadow-2xl p-8 mb-16 border border-zinc-700 relative z-20 scroll-animate opacity-0 translate-y-8">
        <ImageConverter />
      </section>

      <section id="features" className="w-full max-w-6xl mb-20 relative z-10 scroll-animate opacity-0 translate-y-8">
        <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Powerful Features
        </h2>
        
        <FeaturesGrid features={features} />
      </section>

      {/* NEW SEO SECTION */}
      <section className="w-full max-w-4xl mx-auto mb-20 relative z-10 scroll-animate opacity-0 translate-y-8 px-4 md:px-0">
        <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-700/50 rounded-2xl p-8 md:p-10 shadow-xl text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-6">
            The Best Free Online Image Converter
          </h2>
          
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p>
              Welcome to <strong>Convertino</strong>, your ultimate destination for fast, secure, and limitless image conversion. 
              Whether you need to convert high-resolution photos, optimize web assets, or simply change an image format, 
              our completely free tool has you covered. Built for developers, designers, and everyday users.
            </p>

            <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-4">
              No Registration or Email Required
            </h3>
            <p>
              We believe in frictionless tools. With Convertino, you can start converting your images instantly <strong>without signing up, creating an account, or providing your email address</strong>. 
              There are no hidden paywalls, no annoying newsletters, and no login barriers—just drag and drop your files to get started right away.
            </p>

            <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-4">
              Convert WebP, PNG, JPEG, AVIF, and SVG effortlessly
            </h3>
            <p>
              Modern web development and digital design require modern image formats. Convertino allows you to seamlessly transition between 
              standard formats like <strong>JPEG</strong> and <strong>PNG</strong>, to next-generation formats like <strong>WebP</strong> and <strong>AVIF</strong>. 
              By utilizing our advanced compression algorithms, you can significantly reduce file sizes without sacrificing visual quality—boosting your website's SEO and performance.
            </p>

            <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-4">
              100% Secure & Private Client-Side Processing
            </h3>
            <p>
              Unlike traditional image converters that force you to upload your sensitive files to a remote cloud server, 
              Convertino processes everything directly inside your web browser. This means your files <strong>never leave your device</strong>. 
              Enjoy lightning-fast conversions with absolute peace of mind knowing your privacy is fully protected and there are no file-size limits holding you back.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}