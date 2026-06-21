import { getWordPressPosts, getWordPressPortfolios } from '../../lib/wordpress';
import Link from 'next/link';

interface WordPressPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
}

interface WordPressPortfolio {
  id: string;
  title: string;
  slug: string;
}

export default async function Home() {
  const posts = await getWordPressPosts();
  const portfolios = await getWordPressPortfolios();

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Connected Headless Frontend</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">Custom Portfolios CPT</h2>
        <div className="grid gap-4">
          {Array.isArray(portfolios) && portfolios.map((item: WordPressPortfolio) => (
            <div key={item.id} className="p-4 border rounded bg-white shadow-sm hover:shadow transition">
              <h3 className="font-bold text-lg text-blue-600 hover:underline">
                <Link href={`/portfolio/${item.slug}`}>{item.title}</Link>
              </h3>
            </div>
          ))}
          {(!portfolios || portfolios.length === 0) && <p className="text-gray-500">No portfolios found.</p>}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-green-600">Standard Blog Posts</h2>
        <div className="grid gap-4">
          {Array.isArray(posts) && posts.map((post: WordPressPost) => (
            <div key={post.id} className="p-4 border rounded bg-white shadow-sm hover:shadow transition">
              <h3 className="font-bold text-lg text-green-600 hover:underline">
                <Link href={`/posts/${post.slug}`}>{post.title}</Link>
              </h3>
              <div dangerouslySetInnerHTML={{ __html: post.excerpt }} className="text-gray-600 mt-2" />
            </div>
          ))}
          {(!posts || posts.length === 0) && <p className="text-gray-500">No posts found.</p>}
        </div>
      </section>
    </main>
  );
}