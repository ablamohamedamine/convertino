import { conversionPages } from '@/app/constants';

export async function GET() {
  const baseUrl = 'https://convertino.xyz'; //[cite: 1, 2, 3]

  // 1. Dynamically generate conversion tool definitions from constants
  const toolRoutes = conversionPages
    .map((page) => {
      const toolName = page.slug.replace(/-/g, ' ').toUpperCase();
      return `- [${toolName} Tool](${baseUrl}/convert/${page.slug}): Dynamic web utility to execute ${toolName} optimization.`; //[cite: 2]
    })
    .join('\n');

  // 2. Build markdown optimized for LLM reading context
  const content = `# Convertino | Free Unlimited Image Converter

> Fast, secure, and 100% free online image converter. Convert WebP, PNG, JPEG, AVIF, and SVG instantly with no registration, no email, and no limits.

## Core Capabilities & Features
- **Supported Formats:** Comprehensive optimization and switching across WebP, PNG, JPEG, AVIF, and SVG.
- **Bulk Compression:** Multi-file and bulk image compression support directly inside the client interface.
- **Frictionless UX:** Zero system barriers—no user accounts, no email collections, and no operational usage limits.

## Main Navigation
- [Homepage](${baseUrl}): Main utility page featuring the converter interface dropzone.
- [About Page](${baseUrl}/about): Information regarding application performance, architecture, and structural optimization.
- [Contact Page](${baseUrl}/contact): Outreach form for support issues, bugs, and general platform inquiries.

## Automatically Discovered Tools
${toolRoutes}

## Platform Context & Project Info
- **Project Creators:** Built by [Billal Chami](https://www.linkedin.com/in/billal-chami/) & [Mohamed Amine Abla](https://ablamohamedamine.com/).
- **Funding & Support:** Users can tip or support the platform via the integrated Ko-fi overlay widget configuration ('ablamohamedamine').
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  });
}