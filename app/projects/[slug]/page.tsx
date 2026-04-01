'use client'

import { use } from 'react'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumb } from '@/components/Breadcrumb'
import projectsData from '@/data/projects.json'
import methodsData from '@/data/methods.json'

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = use(params)
  const project: any = projectsData.projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  const relatedMethods = methodsData.methods.filter((m) =>
    project.relatedMethods.includes(m.id)
  )

  const difficultyColor = {
    beginner: 'bg-green-500/20 text-green-400',
    intermediate: 'bg-yellow-500/20 text-yellow-400',
    advanced: 'bg-red-500/20 text-red-400',
  }

  const handleDownloadProjectBrief = () => {
    try {
      // Show download notification
      const notification = document.createElement('div')
      notification.className = 'fixed bottom-6 right-6 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg text-sm font-medium z-50 animate-in fade-in slide-in-from-bottom-4 duration-300'
      notification.textContent = 'Downloading project brief...'
      document.body.appendChild(notification)
      
      setTimeout(() => {
        notification.classList.add('animate-out', 'fade-out', 'slide-out-to-bottom-4')
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification)
          }
        }, 300)
      }, 2000)
      
      const methodsForProject = relatedMethods
      
      const briefContent = `
PROJECT BRIEF: ${project.name}
${'='.repeat(60)}

DIFFICULTY: ${project.difficulty.toUpperCase()}
DATABASE: ${project.database}
SCALE: ${project.scale}
ESTIMATED TIME: ${project.estimatedHours} hours

DESCRIPTION:
${project.description}

WHAT YOU'LL BUILD:
${project.whatYouBuild}

KEY SKILLS:
${project.keywords.map((k: string) => `• ${k}`).join('\n')}

DATABASE SCHEMA:
${project.schema.map((table: any) => {
  let schema = `\nTable: ${table.table}\n${table.description ? `Description: ${table.description}\n` : ''}`;
  if (table.columns) {
    schema += 'Columns:\n';
    schema += table.columns.map((col: any) => `  - ${col.name}: ${col.type} - ${col.description}`).join('\n');
  }
  return schema;
}).join('\n\n')}

GETTING STARTED:
${project.gettingStarted}

RECOMMENDED METHODS:
${methodsForProject.length > 0 
  ? methodsForProject.map((m: any) => `
Method: ${m.name}
Philosophy: ${m.philosophy}
Best For: ${m.bestFor.join(', ')}
Team Size: ${m.teamSize}
Speed: ${m.speed}
Complexity: ${m.complexity}

Phases:
${m.phases.map((p: any) => `  • ${p.name}: ${p.description}`).join('\n')}

Setup Commands:
${m.setupCommands.map((cmd: any) => `  $ ${cmd}`).join('\n')}
`).join('\n---\n')
  : 'No specific methods recommended. Check the Methods section to find the best approach for this project.'}

HOW TO FOLLOW A METHOD:
1. Start by reading through the method's philosophy and phases
2. Follow the setup commands to initialize your project
3. Work through each phase in order
4. Use the method's tools to validate your work at each stage
5. Refer to the Getting Started guide above as you build

NOTE: This project brief should be used alongside the detailed method guides available on the SDD Academy platform.
`

      const element = document.createElement('a')
      const file = new Blob([briefContent], { type: 'text/plain;charset=utf-8' })
      const objectUrl = URL.createObjectURL(file)
      element.href = objectUrl
      element.download = `${project.slug}-brief.txt`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      URL.revokeObjectURL(objectUrl)
    } catch (error) {
      console.error('Error downloading project brief:', error)
    }
  }

  const handleDownloadSQL = async () => {
    try {
      const response = await fetch(`/data/sql/${project.slug}.sql`)
      if (!response.ok) return
      const text = await response.text()
      const blob = new Blob([text], { type: 'application/sql;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${project.slug}.sql`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading SQL:', error)
    }
  }

  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: 'Projects', href: '/projects' }, { label: project.name }]} />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-4">
                  <h1 className="text-4xl font-bold text-foreground">{project.name}</h1>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full flex-shrink-0 ${difficultyColor[project.difficulty as keyof typeof difficultyColor]}`}>
                    {project.difficulty}
                  </span>
                </div>
                <p className="text-lg text-muted-foreground">
                  {project.description}
                </p>
              </div>

              <div className="rounded-lg border border-border bg-background p-6 sm:w-80 flex-shrink-0">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Database</p>
                    <p className="text-lg font-semibold text-foreground">{project.database}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Scale</p>
                    <p className="text-sm font-medium text-foreground">{project.scale}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Estimated Time</p>
                    <p className="text-lg font-semibold text-foreground">{project.estimatedHours} hours</p>
                  </div>
                  <Button size="lg" className="w-full mt-4" onClick={handleDownloadProjectBrief}>
                    Start Project
                  </Button>
                  <Button variant="outline" size="sm" className="w-full" onClick={handleDownloadSQL}>
                    Download SQL Schema
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Tabs */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="schema">Schema</TabsTrigger>
              <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-8">
              <Card className="border-border bg-card p-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">What You'll Build</h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {project.whatYouBuild}
                </p>

                <h3 className="text-xl font-semibold text-foreground mb-4">Key Skills</h3>
                <ul className="space-y-2">
                  {project.keywords.map((keyword: string, idx: number) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-muted-foreground capitalize">{keyword}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </TabsContent>

            {/* Schema Tab */}
            <TabsContent value="schema" className="mt-8">
              <div className="space-y-6">
                {project.schema.map((table: any, idx: number) => (
                  <Card key={idx} className="border-border bg-card p-8">
                    <h4 className="text-lg font-semibold text-foreground mb-2 capitalize">
                      {table.table}
                    </h4>
                    {table.description && (
                      <p className="text-sm text-muted-foreground mb-4">{table.description}</p>
                    )}
                    {table.columns && (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left py-2 text-muted-foreground font-medium">Name</th>
                              <th className="text-left py-2 text-muted-foreground font-medium">Type</th>
                              <th className="text-left py-2 text-muted-foreground font-medium">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {table.columns.map((col: any, colIdx: number) => (
                              <tr key={colIdx} className="border-b border-border/50">
                                <td className="py-2 text-foreground font-mono">{col.name}</td>
                                <td className="py-2 text-foreground font-mono text-primary">{col.type}</td>
                                <td className="py-2 text-muted-foreground">{col.description}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Getting Started Tab */}
            <TabsContent value="getting-started" className="mt-8">
              <Card className="border-border bg-card p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">Getting Started</h3>
                <div className="space-y-4">
                  {project.gettingStarted.split('\\n').map((step: string, idx: number) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary font-semibold text-sm flex-shrink-0">
                        {idx + 1}
                      </div>
                      <p className="text-muted-foreground leading-relaxed pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Recommended Methods */}
        {relatedMethods.length > 0 && (
          <section className="border-t border-border bg-card">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-foreground mb-8">Recommended Methods</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedMethods.map((method) => (
                  <Link key={method.id} href={`/methods/${method.slug}`}>
                    <Card className="group h-full cursor-pointer border-border bg-background p-6 hover:border-primary/50 transition-all hover:shadow-lg">
                      <div className="flex flex-col gap-3">
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {method.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{method.philosophy}</p>
                        <div className="flex gap-1 flex-wrap pt-2">
                          {method.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                              {tag}
                            </span>
                          ))}
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
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Build?</h2>
              <p className="text-muted-foreground mb-8">Choose a method above and start combining it with this project.</p>
              <Link href="/find-your-method">
                <Button size="lg">
                  Find Your Method
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
