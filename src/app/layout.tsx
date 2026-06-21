import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getDynamicBranding } from "../../lib/wordpress";
import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const branding = await getDynamicBranding();

  return (
    <html lang="en">
      <head>
        {/* Inject the live customizer values straight into CSS property definitions */}
        <style>{`
          :root {
            --color-primary: ${branding.primaryColor};
            --color-secondary: ${branding.secondaryColor};
            --color-tertiary: ${branding.tertiaryColor};
            --color-text: ${branding.textColor};
            --color-bg-alt: ${branding.alternateColor};
          }
        `}</style>
      </head>
      <body 
        className="flex flex-col min-h-screen transition-colors duration-300" 
        style={{ color: 'var(--color-text)' }}
      >
        <Header logo={branding.logo} />
        <main className="flex-grow bg-[var(--color-bg-alt)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}