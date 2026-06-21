import { getHomepageData } from "../../lib/wordpress";

export default async function HomePage() {
  const page = await getHomepageData();

  // Fallback if the administrator has not selected a static homepage in WordPress yet
  if (!page) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Your Headless Site</h1>
        <p className="text-gray-600">Please go to WordPress Settings &gt; Reading and select a static homepage.</p>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-12">
      {/* Dynamic Title from the selected page */}
      <h1 className="text-4xl font-extrabold tracking-tight mb-8 text-[var(--color-primary)]">
        {page.title}
      </h1>
      
      {/* Dynamic Content processed directly from the block editor */}
      <div 
        className="prose max-w-none text-gray-800 space-y-6"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </article>
  );
}