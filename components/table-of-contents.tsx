"use client"

import { useEffect, useState } from "react"

interface TocItem {
  id: string
  text: string
  level: number
}

export function TableOfContents({ contentHtml }: { contentHtml: string }) {
  const [headings, setHeadings] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>("")

  // Parse headings from the HTML content and inject IDs into the DOM
  useEffect(() => {
    const container = document.querySelector(".prose-content")
    if (!container) return

    const elements = container.querySelectorAll("h1, h2, h3, h4")
    const items: TocItem[] = []

    elements.forEach((el, index) => {
      const id =
        el.id ||
        el.textContent
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") ||
        `heading-${index}`

      el.id = id

      items.push({
        id,
        text: el.textContent || "",
        level: parseInt(el.tagName[1]),
      })
    })

    setHeadings(items)
  }, [contentHtml])

  // Track active heading with IntersectionObserver
  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first heading that is intersecting
        const visibleEntries = entries.filter((e) => e.isIntersecting)
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id)
        }
      },
      {
        rootMargin: "-80px 0px -70% 0px",
        threshold: 0,
      }
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  const minLevel = Math.min(...headings.map((h) => h.level))

  return (
    <nav className="hidden xl:block" aria-label="Table of contents">
      <div className="sticky top-28">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          On this page
        </p>
        <ul className="flex flex-col gap-0.5 border-l border-border">
          {headings.map((heading) => {
            const indent = heading.level - minLevel
            const isActive = activeId === heading.id

            return (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    const el = document.getElementById(heading.id)
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" })
                      setActiveId(heading.id)
                    }
                  }}
                  className={`block text-[13px] leading-snug py-1.5 transition-colors duration-150 border-l-2 -ml-px ${
                    isActive
                      ? "border-primary text-foreground font-medium"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
                  style={{ paddingLeft: `${indent * 12 + 16}px` }}
                >
                  {heading.text}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
