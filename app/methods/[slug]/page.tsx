'use client'

import { useState, useEffect } from 'react'
import { use } from 'react'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MethodHowToContent } from '@/components/MethodHowToContent'
import { Breadcrumb } from '@/components/Breadcrumb'
import methodsData from '@/data/methods.json'
import projectsData from '@/data/projects.json'

interface MethodDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

interface CSVRow {
  [key: string]: string
}

function parseCSVRecords(text: string): string[][] {
  const records: string[][] = []
  const src = text.replace(/\r\n?/g, '\n').trim()
  if (!src) return records

  let fields: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < src.length; i++) {
    const char = src[i]
    if (inQuotes) {
      if (char === '"') {
        if (i + 1 < src.length && src[i + 1] === '"') {
          current += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        current += char
      }
    } else if (char === '"') {
      inQuotes = true
    } else if (char === ',') {
      fields.push(current.trim())
      current = ''
    } else if (char === '\n') {
      fields.push(current.trim())
      records.push(fields)
      fields = []
      current = ''
    } else {
      current += char
    }
  }
  fields.push(current.trim())
  if (fields.some((f) => f !== '')) {
    records.push(fields)
  }

  return records
}

export default function MethodDetailPage({ params }: MethodDetailPageProps) {
  const { slug } = use(params)
  const method: any = methodsData.methods.find((m: any) => m.slug === slug)
  const [csvData, setCsvData] = useState<CSVRow[]>([])
  const [csvHeaders, setCsvHeaders] = useState<string[]>([])
  const [howtoMarkdown, setHowtoMarkdown] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    setHowtoMarkdown(null)

    const loadHowto = async () => {
      try {
        const response = await fetch(`/data/howto/${slug}.md`, { signal: controller.signal })
        if (!response.ok) {
          console.warn(`Howto fetch failed for "${slug}": ${response.status}`)
          return
        }
        const text = await response.text()
        if (text.trim()) setHowtoMarkdown(text)
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.warn('Howto load error:', error)
        }
      }
    }
    loadHowto()

    return () => controller.abort()
  }, [slug])

  useEffect(() => {
    const loadCSV = async () => {
      try {
        const response = await fetch(`/data/csv/${slug}.csv`)
        if (!response.ok) {
          console.warn(`CSV fetch failed for "${slug}": ${response.status}`)
          setCsvHeaders([])
          setCsvData([])
          return
        }
        const text = await response.text()
        const records = parseCSVRecords(text)
        if (records.length > 0) {
          const headers = records[0]
          setCsvHeaders(headers)
          const rows: CSVRow[] = records.slice(1).map((values) => {
            const row: CSVRow = {}
            headers.forEach((header, i) => {
              row[header] = values[i] || ''
            })
            return row
          })
          setCsvData(rows)
        } else {
          setCsvHeaders([])
          setCsvData([])
        }
      } catch (error) {
        console.warn('CSV load error:', error)
        setCsvHeaders([])
        setCsvData([])
      }
    }
    loadCSV()
  }, [slug])

  if (!method) {
    notFound()
  }

  const relatedProjects = projectsData.projects.filter((p: any) =>
    method.relatedProjects?.includes(p.id)
  )

  const formatDate = (dateString: string) => {
    // Parse date string in UTC to avoid hydration mismatch from timezone differences
    const [year, month, day] = dateString.split('-').map(Number)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${months[month - 1]} ${day}, ${year}`
  }

  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: 'Methods', href: '/methods' }, { label: method.name }]} />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h1 className="text-4xl font-bold text-foreground">{method.name}</h1>
                  {method.version && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      v{method.version}
                    </Badge>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {method.releaseDate && `Released ${formatDate(method.releaseDate)}`}
                </p>
                <p className="mt-4 text-lg text-muted-foreground">
                  {method.shortDescription}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {method.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-border bg-background p-6 sm:w-80">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Team Size</p>
                    <p className="text-lg font-semibold text-foreground">{method.teamSize}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Speed</p>
                    <p className="text-lg font-semibold text-foreground">{method.speed}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Complexity</p>
                    <p className="text-lg font-semibold text-foreground">{method.complexity}</p>
                  </div>
                  {method.source && (
                    <div className="pt-4 border-t border-border">
                      <Link href={method.source} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm" className="w-full">
                          View Source
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Tabs */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="phases">Phases</TabsTrigger>
              <TabsTrigger value="howto">How-to</TabsTrigger>
              <TabsTrigger value="agents">Agents</TabsTrigger>
              <TabsTrigger value="setup">Setup</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-8">
              <Card className="border-border bg-card p-8">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Philosophy</h3>
                    <p className="text-muted-foreground leading-relaxed">{method.philosophy}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Best For</h3>
                    <ul className="space-y-2">
                      {method.bestFor?.map((item: string, idx: number) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Key Features</h3>
                    <ul className="space-y-2">
                      {method.keyFeatures?.map((feature: string, idx: number) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-primary">✓</span>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Phases Tab */}
            <TabsContent value="phases" className="mt-8">
              <div className="space-y-4">
                {method.phases?.map((phase: any, idx: number) => (
                  <Card key={idx} className="border-border bg-card p-6">
                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary font-semibold text-sm flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-foreground">{phase.name}</h4>
                        <p className="mt-2 text-muted-foreground">{phase.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* How-to Tab */}
            <TabsContent value="howto" className="mt-8">
              {howtoMarkdown ? (
                <MethodHowToContent markdown={howtoMarkdown} methodName={method.name} />
              ) : (
                <Card className="border-border bg-card p-8">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-6">How to Follow {method.name}</h3>
                      <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                        {method.howto || 'Step-by-step guide coming soon.'}
                      </div>
                    </div>

                    <div className="border-t border-border pt-8">
                      <h4 className="text-xl font-semibold text-foreground mb-6">Process Diagram</h4>
                      <div className="bg-background rounded-lg p-8 flex flex-col gap-4">
                        {method.phases?.map((phase: any, idx: number) => (
                          <div key={idx} className="flex items-center gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center text-sm">
                              {idx + 1}
                            </div>
                            <div className="flex-1">
                              <h5 className="font-semibold text-foreground">{phase.name}</h5>
                              <p className="text-sm text-muted-foreground mt-1">{phase.description}</p>
                            </div>
                            {idx < (method.phases?.length || 0) - 1 && (
                              <div className="hidden lg:block text-primary text-2xl">→</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </TabsContent>

            {/* Agents Tab (CSV Data) */}
            <TabsContent value="agents" className="mt-8">
              <Card className="border-border bg-card p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Workflow Agents & Commands</h3>
                {csvData.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          {csvHeaders.map((header) => (
                            <th
                              key={header}
                              className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {csvData.map((row, idx) => (
                          <tr key={idx} className="border-b border-border/50 hover:bg-background transition-colors">
                            {csvHeaders.map((header) => (
                              <td key={`${idx}-${header}`} className="p-3 text-foreground">
                                {row[header]}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No workflow data available</p>
                  </div>
                )}
              </Card>
            </TabsContent>

            {/* Setup Tab */}
            <TabsContent value="setup" className="mt-8">
              <Card className="border-border bg-card p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">Setup Commands</h3>
                <div className="space-y-3 bg-background rounded-lg p-4 font-mono text-sm text-foreground overflow-x-auto">
                  {method.setupCommands?.map((command: string, idx: number) => (
                    <div key={idx} className="text-muted-foreground">
                      <span className="text-primary">$</span> {command}
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Tools Tab */}
            <TabsContent value="tools" className="mt-8">
              <Card className="border-border bg-card p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">Tool Compatibility</h3>
                <div className="space-y-2">
                  {Object.entries(method.toolCompatibility || {}).map(([tool, support]) => (
                    <div key={tool} className="flex items-center justify-between p-3 rounded-lg bg-background">
                      <span className="text-foreground capitalize">
                        {tool.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </span>
                      <span className={`px-3 py-1 rounded text-sm font-medium ${
                        support === 'native' ? 'bg-primary/20 text-primary' :
                        support === 'cli' ? 'bg-accent/20 text-accent' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {support === 'native' ? 'Native Support' : 
                         support === 'cli' ? 'Works with CLI' :
                         'Not Supported'}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="border-t border-border bg-card">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-foreground mb-8">Practice Projects</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedProjects.map((project: any) => (
                  <Link key={project.id} href={`/projects/${project.slug}`}>
                    <Card className="group h-full cursor-pointer border-border bg-background p-6 hover:border-primary/50 transition-all hover:shadow-lg">
                      <div className="flex flex-col gap-3">
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <span className="text-xs text-muted-foreground">{project.difficulty}</span>
                          <span className="text-xs text-primary font-medium">{project.estimatedHours}h</span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Practice?</h2>
            <p className="text-muted-foreground mb-8">Choose a project and start applying {method.name}.</p>
            <Link href="/projects">
              <Button size="lg">
                View All Projects
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
