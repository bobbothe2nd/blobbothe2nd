import { notFound } from "next/navigation"
import { getAllPosts, getPostBySlug } from "@/lib/hygraph"
import { BlogHeader } from "@/components/blog-header"
import { TableOfContents } from "@/components/table-of-contents"
import { formatDate } from "@/lib/utils"

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <BlogHeader />
      <main className="container mx-auto px-4 py-12 md:py-20">
        <article className="mx-auto max-w-2xl">
          <header className="mb-16 space-y-8">
            {post.coverImage && (
              <div className="aspect-[2/1] overflow-hidden rounded-xl bg-muted shadow-lg -mx-4 md:mx-0">
                <img
                  src={post.coverImage.url || "/placeholder.svg"}
                  alt={post.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-tight">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">{post.excerpt}</p>
              )}
              <div className="flex items-center gap-3 pt-2 text-sm text-muted-foreground border-t border-border/50">
                {post.author && <span className="font-medium text-foreground">{post.author.name}</span>}
                {post.author && <span className="text-border">·</span>}
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </div>
            </div>
          </header>

          <div className="prose-content text-lg" dangerouslySetInnerHTML={{ __html: post.content.html }} />
        </article>
      </main>
    </div>
  )
}
