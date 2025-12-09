import Link from "next/link"
import { BlogHeader } from "@/components/blog-header"

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <BlogHeader />
      <main className="container mx-auto px-4 py-12 md:py-16">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <h1 className="text-6xl font-bold">404</h1>
          <h2 className="text-2xl font-semibold text-muted-foreground">Page not found</h2>
          <p className="text-muted-foreground">{"The page you're looking for doesn't exist."}</p>
          <Link
            href="/"
            className="inline-block mt-4 px-6 py-3 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
          >
            Back to home
          </Link>
        </div>
      </main>
    </div>
  )
}
