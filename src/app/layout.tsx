import Header from "../../components/Header";         // 🛠️ Fixed path
import Footer from "../../components/Footer";         // 🛠️ Fixed path
import { getDynamicBranding } from "../../lib/wordpress"; // 🛠️ Fixed path
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
      <body className="flex flex-col min-h-screen" style={{ color: 'var(--color-text)' }}>
        <Header logo={branding.logo} />
        <main className="flex-grow bg-[var(--color-bg-alt)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}