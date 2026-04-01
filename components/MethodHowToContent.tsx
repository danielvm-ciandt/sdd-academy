'use client'

import { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { MermaidDiagram } from '@/components/MermaidDiagram'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  CheckCircle2,
  Terminal,
  BookOpen,
  GitFork,
  ExternalLink,
} from 'lucide-react'
import Link from 'next/link'

interface GuideSection {
  id: string
  heading: string
  content: string
  subHeadingCount: number
}

interface ParsedHowTo {
  source?: string
  docsUrl?: string
  philosophy?: string
  prerequisites: string[]
  setupContent: string
  guideSections: GuideSection[]
  sequenceDiagram?: string
  processDiagram?: string
}

function parseHowToMarkdown(markdown: string): ParsedHowTo {
  const lines = markdown.split('\n')
  const firstHr = lines.findIndex((l) => l.trim() === '---')
  const headerText = firstHr > 0 ? lines.slice(0, firstHr).join('\n') : ''

  const source = headerText.match(/\*\*Source:\*\*\s*(https?:\/\/\S+)/)?.[1]
  const docsUrl = headerText.match(/\*\*Docs:\*\*\s*(https?:\/\/\S+)/)?.[1]
  const philosophy = headerText.match(/\*\*Philosophy:\*\*\s*(.+)/)?.[1]

  const rawSections: { heading: string; body: string }[] = []
  let curHeading = ''
  let curLines: string[] = []
  let inCodeFence = false
  const bodyStart = firstHr > 0 ? firstHr + 1 : 0

  for (let i = bodyStart; i < lines.length; i++) {
    const line = lines[i]
    if (line.trimStart().startsWith('```')) inCodeFence = !inCodeFence

    if (!inCodeFence && line.startsWith('## ')) {
      if (curHeading)
        rawSections.push({ heading: curHeading, body: curLines.join('\n').trim() })
      curHeading = line.slice(3)
      curLines = []
    } else {
      curLines.push(line)
    }
  }
  if (curHeading)
    rawSections.push({ heading: curHeading, body: curLines.join('\n').trim() })

  const prerequisites: string[] = []
  let setupContent = ''
  const guideSections: GuideSection[] = []
  let sequenceDiagram: string | undefined
  let processDiagram: string | undefined

  for (const { heading, body } of rawSections) {
    const h = heading.toLowerCase().trim()
    if (h === 'prerequisites') {
      ;(body.match(/^-\s+.+$/gm) || []).forEach((m) => prerequisites.push(m.slice(2)))
    } else if (h === 'project setup' || h === 'setup') {
      setupContent = body
    } else if (h === 'sequence diagram') {
      sequenceDiagram = body.match(/```mermaid\n([\s\S]*?)```/)?.[1]?.trim()
    } else if (h === 'process diagram') {
      processDiagram = body.match(/```mermaid\n([\s\S]*?)```/)?.[1]?.trim()
    } else {
      guideSections.push({
        id: heading
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, ''),
        heading,
        content: body,
        subHeadingCount: (body.match(/^###\s+/gm) || []).length,
      })
    }
  }

  return {
    source,
    docsUrl,
    philosophy,
    prerequisites,
    setupContent,
    guideSections,
    sequenceDiagram,
    processDiagram,
  }
}

const PROSE =
  'prose prose-sm dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-code:text-primary prose-code:bg-primary/10 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none prose-pre:bg-background prose-pre:border prose-pre:border-border prose-a:text-primary prose-th:text-muted-foreground prose-td:text-muted-foreground prose-hr:border-border'

const mdComponents = {
  a: ({ href, children, ...p }: any) => (
    <a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...p}
    >
      {children}
    </a>
  ),
  code: ({ className, children, ...p }: any) => {
    const lang = /language-(\w+)/.exec(className || '')?.[1]
    if (lang === 'mermaid')
      return (
        <span data-mermaid="">
          <MermaidDiagram chart={String(children).trim()} />
        </span>
      )
    return (
      <code className={className} {...p}>
        {children}
      </code>
    )
  },
  pre: ({ children, ...p }: any) => {
    const child = Array.isArray(children) ? children[0] : children
    if (child?.props?.['data-mermaid'] !== undefined) return <>{child.props.children}</>
    return <pre {...p}>{children}</pre>
  },
}

function Md({ children: content }: { children: string }) {
  return (
    <div className={PROSE}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
        {content}
      </ReactMarkdown>
    </div>
  )
}

function InlineMd({ children: content }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => <>{children}</>,
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2"
          >
            {children}
          </a>
        ),
        code: ({ children }) => (
          <code className="text-primary bg-primary/10 rounded px-1 py-0.5 text-xs">
            {children}
          </code>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-foreground">{children}</strong>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

export function MethodHowToContent({
  markdown,
}: {
  markdown: string
  methodName: string
}) {
  const data = useMemo(() => parseHowToMarkdown(markdown), [markdown])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const nav = [
    ...(data.prerequisites.length > 0
      ? [{ id: 'howto-prereqs', label: 'Prerequisites', Icon: CheckCircle2 }]
      : []),
    ...(data.setupContent
      ? [{ id: 'howto-setup', label: 'Setup', Icon: Terminal }]
      : []),
    ...(data.guideSections.length > 0
      ? [{ id: 'howto-guide', label: 'Guide', Icon: BookOpen }]
      : []),
    ...(data.sequenceDiagram || data.processDiagram
      ? [{ id: 'howto-diagrams', label: 'Diagrams', Icon: GitFork }]
      : []),
  ]

  return (
    <div className="space-y-10">
      {/* Philosophy banner + external links */}
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        {data.philosophy && (
          <div className="flex-1 rounded-lg border-l-4 border-l-primary/40 bg-muted/40 px-5 py-4">
            <p className="text-sm text-muted-foreground leading-relaxed italic">
              {data.philosophy}
            </p>
          </div>
        )}
        {(data.source || data.docsUrl) && (
          <div className="flex gap-2 flex-shrink-0">
            {data.source && (
              <Link
                href={data.source}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                <ExternalLink className="size-3.5" />
                Source
              </Link>
            )}
            {data.docsUrl && (
              <Link
                href={data.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                <ExternalLink className="size-3.5" />
                Docs
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Section navigation pills */}
      {nav.length > 1 && (
        <nav className="flex flex-wrap items-center gap-1.5 rounded-lg border border-border bg-muted/30 p-1.5">
          {nav.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </nav>
      )}

      {/* Prerequisites */}
      {data.prerequisites.length > 0 && (
        <section id="howto-prereqs" className="scroll-mt-24">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="size-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Prerequisites</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.prerequisites.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-3.5"
              >
                <CheckCircle2 className="size-4 text-primary/70 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  <InlineMd>{item}</InlineMd>
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Project Setup */}
      {data.setupContent && (
        <section id="howto-setup" className="scroll-mt-24">
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="size-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Project Setup</h3>
          </div>
          <Card className="border-border bg-card p-6 overflow-hidden">
            <Md>{data.setupContent}</Md>
          </Card>
        </section>
      )}

      {/* Step-by-Step Guide */}
      {data.guideSections.length > 0 && (
        <section id="howto-guide" className="scroll-mt-24">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="size-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Step-by-Step Guide</h3>
          </div>
          <Card className="border-border bg-card overflow-hidden">
            <Accordion
              type="multiple"
              defaultValue={data.guideSections[0] ? [data.guideSections[0].id] : []}
            >
              {data.guideSections.map((s) => (
                <AccordionItem key={s.id} value={s.id}>
                  <AccordionTrigger className="px-6 hover:no-underline hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3 text-left">
                      <span className="text-[15px] font-medium text-foreground">
                        {s.heading}
                      </span>
                      {s.subHeadingCount > 0 && (
                        <Badge
                          variant="secondary"
                          className="text-xs font-normal flex-shrink-0"
                        >
                          {s.subHeadingCount}{' '}
                          {s.subHeadingCount === 1 ? 'section' : 'sections'}
                        </Badge>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <Md>{s.content}</Md>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </section>
      )}

      {/* Diagrams */}
      {(data.sequenceDiagram || data.processDiagram) && (
        <section id="howto-diagrams" className="scroll-mt-24">
          <div className="flex items-center gap-2 mb-4">
            <GitFork className="size-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Diagrams</h3>
          </div>
          <div className="space-y-6">
            {data.sequenceDiagram && (
              <Card className="border-border bg-card p-6">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Sequence Diagram
                </h4>
                <div className="overflow-x-auto">
                  <MermaidDiagram chart={data.sequenceDiagram} />
                </div>
              </Card>
            )}
            {data.processDiagram && (
              <Card className="border-border bg-card p-6">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Process Diagram
                </h4>
                <div className="overflow-x-auto">
                  <MermaidDiagram chart={data.processDiagram} />
                </div>
              </Card>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
