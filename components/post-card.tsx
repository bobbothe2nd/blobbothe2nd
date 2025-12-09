import Link from "next/link"
import type { Post } from "@/lib/hygraph"
import { formatDate } from "@/lib/utils"

interface PostCardProps {
  post: Post
  featured?: boolean
}

export function PostCard({ post, featured = false }: PostCardProps) {
  if (featured) {
    return (
      <Link href={`/post/${post.slug}`} className="group block">
        <article className="grid md:grid-cols-2 gap-8 items-center">
          {post.coverImage && (
            <div className="aspect-[16/10] overflow-hidden rounded-xl bg-muted order-2 md:order-1">
              <img
                src={post.coverImage.url || "/placeholder.svg"}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}
          <div className="space-y-4 order-1 md:order-2">
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold text-balance tracking-tight group-hover:text-secondary transition-colors">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="text-lg text-muted-foreground leading-relaxed line-clamp-3">{post.excerpt}</p>
              )}
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              {post.author && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">{post.author.name}</span>
                </div>
              )}
              {post.author && <span>·</span>}
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link href={`/post/${post.slug}`} className="group block h-full">
      <article className="flex flex-col h-full space-y-4">
        {post.coverImage && (
          <div className="aspect-[16/10] overflow-hidden rounded-lg bg-muted">
            <img
              src={post.coverImage.url || "/placeholder.svg"}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex-1 space-y-3">
          <h2 className="text-xl md:text-2xl font-semibold text-balance tracking-tight group-hover:text-secondary transition-colors">
            {post.title}
          </h2>
          {post.excerpt && <p className="text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t border-border">
          {post.author && <span className="font-medium">{post.author.name}</span>}
          {post.author && <span>·</span>}
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </div>
      </article>
    </Link>
  )
}
