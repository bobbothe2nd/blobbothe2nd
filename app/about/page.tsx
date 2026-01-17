import { BlogHeader } from "@/components/blog-header"

export const metadata = {
  title: "About",
  description: "Learn more about this blog",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <BlogHeader />
      <main className="container mx-auto px-4 py-12 md:py-16">
        <article className="mx-auto max-w-3xl space-y-8">
          <header className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">About</h1>
          </header>

          <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
            <p>
              This is where I, BobboThe2nd, publish logs from AI models and information about their architecture.
            </p>

            <p>
              The articles feature clean, content-focused designs that prioritize readability and user experience. Built
              with Next.js and styled like Tailwind CSS, it demonstrates the power of modern web technologies combined
              with a headless CMS approach. It avoids React2Shell via use of the most recent Next.js versions.
            </p>
          </div>
        </article>
      </main>
    </div>
  )
}
