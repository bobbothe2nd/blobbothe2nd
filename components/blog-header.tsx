import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"

export function BlogHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl md:text-3xl font-bold tracking-tight text-foreground hover:text-secondary transition-colors"
          >
            BlobboThe2nd
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Writing
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
