import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from './NavBar';
import HelloBar from './components/HelloBar';
import ToastProvider from './components/ToastProvider';
import Script from 'next/script';

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});


// UPGRADED SEO METADATA
export const metadata: Metadata = {
  title: 'Convertino | Free Unlimited Image Converter',
  description: 'Fast, secure, and 100% free online image converter. Convert WebP, PNG, JPEG, AVIF, and SVG instantly with no registration, no email, and no limits.',
  keywords: [
    'image converter',
    'free image converter',
    'free image conversion',
    'free online image converter',
    'convert webp to jpg',
    'convert webp to png',
    'convert avif to jpg',
    'convert avif to png',
    'bulk image compression',
    'no registration image converter',
    'webp', 'png', 'jpeg', 'avif', 'svg'
  ].join(', '),
  openGraph: {
    title: 'Convertino | Free Unlimited Image Converter',
    description: 'Convert WebP, PNG, JPEG, AVIF, and SVG instantly with no registration, no email, and no limits.',
    url: 'https://convertino.xyz', 
    siteName: 'Convertino',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Convertino | Free Unlimited Image Converter',
    description: 'Fast, secure, and 100% free online image converter. No registration required.',
  },
  verification: {
    google: '94wezaCKdI7AeRjZ7aVJT7x6UPfGQg5toFkbRHky3kY',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-zinc-900 text-gray-100 min-h-screen transition-colors antialiased flex flex-col"
            suppressHydrationWarning>
        

        {/* MICROSOFT CLARITY */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vnu65fynnt");
          `}
        </Script>


        {/* GOOGLE ANALYTICS */}
        <Script 
          strategy="afterInteractive" 
          src={`https://www.googletagmanager.com/gtag/js?id=G-MS3WQ12X24`} 
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MS3WQ12X24', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* KO-FI FLOATING WIDGET */}
        <Script 
          src="https://storage.ko-fi.com/cdn/scripts/overlay-widget.js" 
          strategy="lazyOnload" 
        />
        <Script id="kofi-widget" strategy="lazyOnload">
          {`
            // We use an interval to safely check when the Ko-fi external script finishes loading
            const kofiInterval = setInterval(() => {
              if (typeof kofiWidgetOverlay !== 'undefined') {
                clearInterval(kofiInterval);
                kofiWidgetOverlay.draw('ablamohamedamine', {
                  'type': 'floating-chat',
                  'floating-chat.donateButton.text': 'Support Us',
                  'floating-chat.donateButton.background-color': '#ff38b8',
                  'floating-chat.donateButton.text-color': '#fff'
                });
              }
            }, 500);
          `}
        </Script>

        {/* TOP ANNOUNCEMENT BAR */}
        <HelloBar />

        <header className="w-full border-b border-zinc-800 bg-zinc-900/80 backdrop-blur sticky top-0 z-30">
          <NavBar />
        </header>
        
        <main className="flex flex-col items-center flex-grow w-full bg-transparent">
          {children}
        </main>
        
        <footer className="w-full border-t border-zinc-800 bg-zinc-900/80 text-center py-4 text-xs text-gray-400 mt-8">
          Made with ❤️ by <a href="https://www.linkedin.com/in/billal-chami/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition">Billal Chami </a>
           &  <a href="https://ablamohamedamine.com/" target="_blank" rel="dofollow" className="text-purple-400 hover:text-purple-300 transition">Mohamed Amine Abla</a>
        </footer>
        
        <ToastProvider />
      </body>
    </html>
  );
}