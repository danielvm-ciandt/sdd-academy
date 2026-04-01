'use client'

import { useState, useMemo } from 'react'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { Breadcrumb } from '@/components/Breadcrumb'
import methodsData from '@/data/methods.json'

type FilterType = 'all' | 'team-size' | 'speed' | 'complexity'

const complexityStyles: Record<string, string> = {
  High: 'bg-orange-500/15 text-orange-400 border border-orange-500/25',
  Medium: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25',
  Low: 'bg-sky-500/15 text-sky-400 border border-sky-500/25',
}

export default function MethodsPage() {
  const [filter, setFilter] = useState<FilterType>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredMethods = useMemo(() => {
    let result = [...methodsData.methods].sort((a, b) =>
      a.name.localeCompare(b.name)
    )

    if (searchTerm) {
      result = result.filter((method) =>
        method.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        method.philosophy.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return result
  }, [searchTerm])

  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: 'Methods' }]} />
      <main className="min-h-screen bg-background">
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-foreground">Specification-Driven Methods</h1>
            <p className="mt-1 text-sm text-muted-foreground">Discover structured approaches to building robust specifications and systems. From pragmatic to enterprise.</p>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 sm:justify-between">
              <input
                type="text"
                placeholder="Search methods..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-md border border-border bg-background px-3 py-1 text-sm text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
              />
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                className="h-7 text-xs"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
            </div>
          </div>
        </section>

        {/* Methods Grid */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMethods.map((method) => (
              <Link key={method.id} href={`/methods/${method.slug}`}>
                <Card className="group flex h-full cursor-pointer flex-col border-border bg-card p-6 hover:border-primary/50 hover:bg-card transition-all hover:shadow-lg">
                  <div className="flex flex-1 flex-col gap-4">
                    <div>
                      <Badge
                        className={`${complexityStyles[method.complexity] || complexityStyles.Medium} rounded-sm px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider mb-3`}
                      >
                        {method.complexity} Complexity
                      </Badge>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {method.name}
                        </h3>
                        {'version' in method && method.version ? (
                          <Badge className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 rounded-sm px-1.5 py-0 text-[11px] font-medium">
                            v{method.version}
                          </Badge>
                        ) : (
                          <Badge className="bg-primary/15 text-primary border border-primary/25 rounded-sm px-1.5 py-0 text-[11px] font-medium">
                            Latest
                          </Badge>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {method.philosophy}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {method.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
                      <div>
                        <p className="text-xs text-muted-foreground">Team Size</p>
                        <p className="text-sm font-medium text-foreground">{method.teamSize}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Speed</p>
                        <p className="text-sm font-medium text-foreground">{method.speed}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Complexity</p>
                        <p className="text-sm font-medium text-foreground">{method.complexity}</p>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full mt-4">
                    Learn More
                  </Button>
                </Card>
              </Link>
            ))}
          </div>

          {filteredMethods.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-4 py-16">
              <p className="text-muted-foreground">No methods found matching your search.</p>
              <Button
                variant="outline"
                onClick={() => setSearchTerm('')}
              >
                Clear Search
              </Button>
            </div>
          )}
        </section>
      </main>
    </>
  )
}
