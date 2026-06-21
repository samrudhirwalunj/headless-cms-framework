import { notFound } from 'next/navigation';

async function getSinglePost(slug: string) {
  try {
    const res = await fetch(`https://lawngreen-rail-937797.hostingersite.com/graphql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query GetPostBySlug($id: ID!) {
            post(id: $id, idType: SLUG) {
              title
              content
              date
            }
          }
        `,
        variables: { id: slug }
      })
    });
    const json = await res.json();
    return json?.data?.post;
  } catch {
    return null;
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getSinglePost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-400 text-sm mb-8">{new Date(post.date).toLocaleDateString()}</p>
      <div 
        className="prose max-w-none text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
    </article>
  );
}