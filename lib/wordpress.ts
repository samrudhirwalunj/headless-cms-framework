const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

async function fetchFromWordPress(query: string, variables: any = {}) {
  if (!API_URL) {
    throw new Error("WordPress API URL is missing in .env.local");
  }

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 }, 
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("WordPress Connection Error:", error);
    return null;
  }
}

export async function getWordPressPosts() {
  const data = await fetchFromWordPress(`
    query GetPosts {
      posts(first: 10) {
        nodes {
          id
          title
          slug
          excerpt
        }
      }
    }
  `);
  return data?.posts?.nodes || [];
}

export async function getWordPressPortfolios() {
  const data = await fetchFromWordPress(`
    query GetPortfolios {
      portfolios(first: 10) {
        nodes {
          id
          title
          slug
        }
      }
    }
  `);
  return data?.portfolios?.nodes || [];
}

export async function getMenu(location: 'HEADER_MENU' | 'FOOTER_MENU') {
  const data = await fetchFromWordPress(`
    query GetMenu($location: MenuLocationEnum!) {
      menuItems(where: {location: $location}) {
        nodes {
          id
          label
          path
        }
      }
    }
  `, { location });
  
  return data?.menuItems?.nodes || [];
}