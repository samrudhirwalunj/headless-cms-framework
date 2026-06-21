import { notFound } from 'next/navigation';

async function getSinglePortfolio(slug: string) {
  try {
    const res = await fetch(`https://lawngreen-rail-937797.hostingersite.com/graphql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query GetPortfolioBySlug($id: ID!) {
            portfolio(id: $id, idType: SLUG) {
              title
              content
            }
          }
        `,
        variables: { id: slug }
      })
    });
    const json = await res.json();
    return json?.data?.portfolio;
  } catch {
    return null;
  }
}

export default async function PortfolioSinglePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const portfolio = await getSinglePortfolio(resolvedParams.slug);

  if (!portfolio) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">{portfolio.title}</h1>
      <div 
        className="prose max-w-none text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: portfolio.content }} 
      />
    </article>
  );
}