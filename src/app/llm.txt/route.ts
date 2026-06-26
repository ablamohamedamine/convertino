import { conversionPages } from '@/app/constants';

export async function GET() {
  const baseUrl = 'https://convertino.xyz';

  // Dynamically map conversion tools from your existing constants
  const toolRoutes = conversionPages
    .map((page) => {
      // Humanize the slug for the description if a dedicated title isn't available
      const toolName = page.slug.replace(/-/g, ' ').toUpperCase();
      return `- [${toolName} Tool](${baseUrl}/convert/${page.slug}): Web-based utility to convert and compress files using the ${toolName} format.`;
    })
    .join('\n');

  // Construct the llm.txt markdown content
  const content = `# Convertino

> Convertino is an online image conversion and compression tool designed for fast, clean, and efficient media optimization.

## Main Navigation
- [Homepage](${baseUrl}): Access the main conversion interface and core application dashboard.
- [About Page](${baseUrl}/about): Information regarding the architecture, performance focus, and privacy features of the platform.
- [Contact Page](${baseUrl}/contact): Get in touch for support, feedback, or inquiries.

## Available Conversion Tools
${toolRoutes}
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  });
}