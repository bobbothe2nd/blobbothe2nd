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
              This is a simple blog I, as BobboThe2nd, decided to create for two primary purposes: for functionality
              like a journal, talking about my experiences and considering actions, and to talk about what I believe
              is coming in technological areas like AI, hardware, and programming.
            </p>

            <p>
              The blog features a clean, content-focused design that prioritizes readability and user experience. Built
              with Next.js and styled with Tailwind CSS, it demonstrates the power of modern web technologies combined
              with a headless CMS approach. It avoids React2Shell via use of the most recent Next.js versions.
            </p>
          </div>
        </article>
      </main>
    </div>
  )
}
