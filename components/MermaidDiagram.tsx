'use client'

import { useEffect, useRef, useState } from 'react'

let mermaidModule: typeof import('mermaid') | null = null
let lastTheme: string | undefined

function resolveHsl(varName: string): string {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim()
  return raw ? `hsl(${raw})` : '#888'
}

async function getMermaid() {
  const isDark = document.documentElement.classList.contains('dark')
  const currentTheme = isDark ? 'dark' : 'default'

  if (!mermaidModule) {
    mermaidModule = await import('mermaid')
  }

  if (lastTheme !== currentTheme) {
    lastTheme = currentTheme
    mermaidModule.default.initialize({
      startOnLoad: false,
      theme: currentTheme,
      themeVariables: {
        darkMode: isDark,
        background: 'transparent',
        primaryColor: resolveHsl('--primary'),
        primaryTextColor: resolveHsl('--foreground'),
        lineColor: resolveHsl('--border'),
        secondaryColor: resolveHsl('--muted'),
        tertiaryColor: resolveHsl('--card'),
      },
      flowchart: { htmlLabels: true, curve: 'basis' },
      sequence: { useMaxWidth: true },
    })
  }

  return mermaidModule.default
}

let renderCounter = 0

export function MermaidDiagram({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    const id = `mermaid-${++renderCounter}`
    setError(false)

    async function render() {
      try {
        const mermaid = await getMermaid()
        const { svg } = await mermaid.render(id, chart)
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg
        }
      } catch (err) {
        console.warn('Mermaid render failed:', err)
        if (!cancelled) setError(true)
      }
    }

    render()
    return () => { cancelled = true }
  }, [chart])

  if (error) {
    return (
      <pre className="overflow-x-auto rounded-lg bg-background border border-border p-4 text-sm text-muted-foreground">
        <code>{chart}</code>
      </pre>
    )
  }

  return (
    <div
      ref={containerRef}
      className="my-4 flex justify-center overflow-x-auto [&_svg]:max-w-full"
    />
  )
}
