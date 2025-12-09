// Hygraph client configuration and queries
const HYGRAPH_URL = process.env.HYGRAPH_ENDPOINT || ""
const HYGRAPH_TOKEN = process.env.HYGRAPH_TOKEN || ""

export interface Post {
  id: string
  slug: string
  title: string
  excerpt: string
  content: {
    html: string
  }
  publishedAt: string
  author?: {
    name: string
  }
  coverImage?: {
    url: string
  }
}

async function fetchGraphQL(query: string, variables = {}) {
  if (!HYGRAPH_URL || !HYGRAPH_TOKEN) {
    console.log("[v0] Hygraph environment variables not configured")
    return null
  }

  try {
    const response = await fetch(HYGRAPH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_TOKEN}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    })

    if (!response.ok) {
      console.error("[v0] Hygraph API error:", response.status, response.statusText)
      return null
    }

    const text = await response.text()
    if (!text) {
      console.error("[v0] Empty response from Hygraph")
      return null
    }

    const json = JSON.parse(text)

    if (json.errors) {
      console.error("[v0] GraphQL errors:", json.errors)
      return null
    }

    return json.data
  } catch (error) {
    console.error("[v0] Error fetching from Hygraph:", error)
    return null
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const query = `
    query GetAllPosts {
      posts(orderBy: publishedAt_DESC) {
        id
        slug
        title
        excerpt
        publishedAt
        author {
          name
        }
        coverImage {
          url
        }
      }
    }
  `

  const data = await fetchGraphQL(query)
  if (!data || !data.posts) {
    return []
  }

  return data.posts
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const query = `
    query GetPostBySlug($slug: String!) {
      post(where: { slug: $slug }) {
        id
        slug
        title
        excerpt
        content {
          html
        }
        publishedAt
        author {
          name
        }
        coverImage {
          url
        }
      }
    }
  `

  const data = await fetchGraphQL(query, { slug })
  if (!data) {
    return null
  }

  return data.post || null
}
