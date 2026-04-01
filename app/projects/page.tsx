'use client'

import { useState, useMemo } from 'react'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { Breadcrumb } from '@/components/Breadcrumb'
import projectsData from '@/data/projects.json'

type DifficultyFilter = 'all' | 'beginner' | 'intermediate' | 'advanced'

export default function ProjectsPage() {
  const [difficulty, setDifficulty] = useState<DifficultyFilter>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProjects = useMemo(() => {
    let result = projectsData.projects

    if (difficulty !== 'all') {
      result = result.filter((p) => p.difficulty === difficulty)
    }

    if (searchTerm) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return result
  }, [difficulty, searchTerm])

  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: 'Projects' }]} />
      <main className="min-h-screen bg-background">
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-foreground">10 Practice Projects</h1>
            <p className="mt-1 text-sm text-muted-foreground">Learn by building. Apply your chosen SDD method to real-world projects with varying scales and complexity.</p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 sm:justify-between">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-md border border-border bg-background px-3 py-1 text-sm text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
              />
              <div className="flex gap-1.5 flex-wrap">
                <Button
                  variant={difficulty === 'all' ? 'default' : 'outline'}
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setDifficulty('all')}
                >
                  All
                </Button>
                <Button
                  variant={difficulty === 'beginner' ? 'default' : 'outline'}
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setDifficulty('beginner')}
                >
                  Beginner
                </Button>
                <Button
                  variant={difficulty === 'intermediate' ? 'default' : 'outline'}
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setDifficulty('intermediate')}
                >
                  Intermediate
                </Button>
                <Button
                  variant={difficulty === 'advanced' ? 'default' : 'outline'}
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setDifficulty('advanced')}
                >
                  Advanced
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Projects List */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {filteredProjects.map((project) => (
              <Link key={project.id} href={`/projects/${project.slug}`}>
                <Card className="group h-full cursor-pointer border-border bg-card p-6 hover:border-primary/50 hover:bg-card/80 transition-all hover:shadow-lg">
                  <div className="flex flex-col gap-4 h-full">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors flex-1">
                          {project.name}
                        </h3>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full flex-shrink-0 ${
                          project.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                          project.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {project.difficulty}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {project.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-border text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Database:</span>
                        <span className="text-foreground font-medium">{project.database}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Scale:</span>
                        <span className="text-foreground font-medium text-xs">{project.scale}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Time:</span>
                        <span className="text-foreground font-medium">{project.estimatedHours}h</span>
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="w-full mt-auto">
                      Start Project
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-4 py-16">
              <p className="text-muted-foreground">No projects found matching your filters.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('')
                  setDifficulty('all')
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </section>
      </main>
    </>
  )
}
