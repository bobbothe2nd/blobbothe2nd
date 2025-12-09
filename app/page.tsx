import { getAllPosts } from "@/lib/hygraph"
import { BlogHeader } from "@/components/blog-header"
import { PostCard } from "@/components/post-card"

export const metadata = {
  title: "BlobboThe2nd - Thoughts on Design and Development",
  description: "A collection of thoughts on design, development, and the web",
}

export default async function HomePage() {
  const posts = await getAllPosts()

  return (
    <div className="min-h-screen">
      <BlogHeader />
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-5xl space-y-16">
          <div className="space-y-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
              Writing on design, development, and digital experiences
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Exploring the intersection of code, creativity, and user experience
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="rounded-xl border border-border bg-card p-16 text-center">
              <p className="text-lg text-muted-foreground">No posts yet. Check back soon for new content.</p>
            </div>
          ) : (
            <div className="space-y-16">
              {/* Featured Post */}
              {posts[0] && (
                <div className="space-y-4">
                  <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">Featured Post</h2>
                  <PostCard post={posts[0]} featured />
                </div>
              )}

              {/* Recent Posts */}
              {posts.length > 1 && (
                <div className="space-y-8">
                  <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">Recent Posts</h2>
                  <div className="grid gap-8 md:grid-cols-2">
                    {posts.slice(1).map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
