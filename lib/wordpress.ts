const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

async function fetchFromWordPress(query: string, variables = {}) {
  const res = await fetch('https://lawngreen-rail-937797.hostingersite.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    // 🛠️ FIX CACHE: This forces Next.js to pull fresh data on every page refresh
    cache: 'no-store' 
  });

  const json = await res.json();
  return json.data;
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


export async function getDynamicBranding() {
  const data = await fetchFromWordPress(`
    query GetCustomizerStyles {
      appearanceCustomizerSettings {
        siteLogo
        primaryColor
        secondaryColor
        tertiaryColor
        textColor
        alternateColor
      }
    }
  `);

  const active = data?.appearanceCustomizerSettings;

  // Fallback defaults match the theme customizer pickers
  return {
    logo: active?.siteLogo || null,
    primaryColor: active?.primaryColor || '#2563eb',
    secondaryColor: active?.secondaryColor || '#16a34a',
    tertiaryColor: active?.tertiaryColor || '#dc2626',
    textColor: active?.textColor || '#1f2937',
    alternateColor: active?.alternate_color || '#f3f4f6'
  };
}

export async function getHomepageData() {
  const data = await fetchFromWordPress(`
    query GetTargetHomepage {
      homepageSettings {
        frontPageId
        frontPageSlug
      }
    }
  `);

  const slug = data?.homepageSettings?.frontPageSlug;

  // If no static page is selected in WP, fallback or return null
  if (!slug) return null;

  // Now pull the content for that specific resolved page slug
  const pageData = await fetchFromWordPress(`
    query GetPageContent($slug: ID!) {
      page(id: $slug, idType: URI) {
        title
        content
      }
    }
  `, { slug: `/${slug}/` });

  return pageData?.page || null;
}

