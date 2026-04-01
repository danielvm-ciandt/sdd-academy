'use client'

import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { Breadcrumb } from '@/components/Breadcrumb'
import toolsData from '@/data/tools.json'
import methodsData from '@/data/methods.json'

const supportLevels = {
  'native': { label: 'Native Support', className: 'bg-green-500/20 text-green-400' },
  'cli': { label: 'Works with CLI', className: 'bg-blue-500/20 text-blue-400' },
  'not-supported': { label: 'Not Supported', className: 'bg-gray-500/20 text-gray-400' },
}

export default function ToolsPage() {
  const methods = methodsData.methods

  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: 'Tools' }]} />
      <main className="min-h-screen bg-background">
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-foreground">AI Tools Compatibility Matrix</h1>
            <p className="mt-1 text-sm text-muted-foreground">Discover which AI development tools work best with each SDD method. Find your perfect pairing.</p>
          </div>
        </section>

        {/* Matrix Section */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full">
              <thead>
                <tr className="bg-card border-b border-border">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground sticky left-0 bg-card">
                    Method / Tool
                  </th>
                  {toolsData.tools.map((tool) => (
                    <th
                      key={tool.slug}
                      className="px-6 py-4 text-center text-sm font-semibold text-foreground whitespace-nowrap"
                    >
                      <Link href={tool.setupUrl} target="_blank" rel="noopener noreferrer">
                        <div className="hover:text-primary transition-colors cursor-pointer">
                          {tool.name}
                        </div>
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {methods.map((method, idx) => (
                  <tr
                    key={method.id}
                    className={idx % 2 === 0 ? 'bg-background' : 'bg-card/50'}
                  >
                    <td className="px-6 py-4 font-medium text-foreground sticky left-0 bg-inherit">
                      <Link href={`/methods/${method.slug}`} className="hover:text-primary transition-colors">
                        {method.name}
                      </Link>
                    </td>
                    {toolsData.tools.map((tool) => {
                      const support = method.toolCompatibility[tool.slug as keyof typeof method.toolCompatibility] as string
                      const level = supportLevels[support as keyof typeof supportLevels] || supportLevels['not-supported']

                      return (
                        <td key={`${method.id}-${tool.slug}`} className="px-6 py-4 text-center">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${level.className}`}>
                            {support === 'native' ? '✓' :
                             support === 'cli' ? '○' :
                             '✗'}
                          </span>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="mt-8 rounded-lg border border-border bg-card p-6">
            <h3 className="font-semibold text-foreground mb-4">Support Levels</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex gap-2 items-center">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                  ✓
                </span>
                <span className="text-sm text-muted-foreground">Native Support - Direct integration</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                  ○
                </span>
                <span className="text-sm text-muted-foreground">Works with CLI - Command line setup</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-400">
                  ✗
                </span>
                <span className="text-sm text-muted-foreground">Not Supported - Limited compatibility</span>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Overview */}
        <section className="border-t border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-8">Tools Overview</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {toolsData.tools.map((tool) => (
                <Card key={tool.slug} className="border-border bg-background p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                  <Link href={tool.setupUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      View Setup Guide
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8">Choose a method and explore which tools work best for your workflow.</p>
            <Link href="/methods">
              <Button size="lg">
                Explore Methods
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
