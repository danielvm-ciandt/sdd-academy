import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section with Gradient */}
        <section className="border-b border-border bg-gradient-to-b from-primary/5 to-transparent">
          <div className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-border bg-card">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-sm text-muted-foreground font-medium">Master SDD Methods in 2026</span>
              </div>
              
              <h1 className="text-6xl sm:text-7xl font-bold text-foreground leading-tight mb-6">
                Master <span className="text-primary">Spec-Driven</span> Development
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                Learn 9 proven specification-driven development methods through interactive courses, real-world projects, and strategic team playbooks. Build with confidence using systematic approaches.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Link href="/methods" className="flex">
                  <Button size="lg" className="w-full sm:w-auto text-base">
                    Explore 9 Methods
                  </Button>
                </Link>
                <Link href="/find-your-method" className="flex">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-base">
                    Find Your Method
                  </Button>
                </Link>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-8 justify-center text-center">
                <div>
                  <p className="text-xs uppercase text-muted-foreground tracking-wider mb-1">Practice Projects</p>
                  <p className="text-3xl font-bold text-foreground">10</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-muted-foreground tracking-wider mb-1">AI Tools</p>
                  <p className="text-3xl font-bold text-foreground">9</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-muted-foreground tracking-wider mb-1">Team Members</p>
                  <p className="text-3xl font-bold text-foreground">∞</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="mb-16">
              <div className="text-xs uppercase text-primary font-semibold tracking-wider mb-2">How it Works</div>
              <h2 className="text-4xl font-bold text-foreground">Three Steps to Mastery</h2>
            </div>
            
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Step 1 */}
              <div className="rounded-lg border border-border bg-background p-8 hover:border-primary/50 transition-all">
                <div className="text-4xl font-bold text-primary/30 mb-4">01</div>
                <h3 className="text-xl font-bold text-foreground mb-3">Learn Methods</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Understand 9 spec-driven approaches, from pragmatic GSD to enterprise BMAD. Each with philosophy, phases, tools, and workflows.
                </p>
                <Link href="/methods" className="inline-block mt-6">
                  <span className="text-primary font-semibold text-sm hover:opacity-80 transition">View Methods →</span>
                </Link>
              </div>

              {/* Step 2 */}
              <div className="rounded-lg border border-border bg-background p-8 hover:border-primary/50 transition-all">
                <div className="text-4xl font-bold text-primary/30 mb-4">02</div>
                <h3 className="text-xl font-bold text-foreground mb-3">Practice Projects</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Build 10 real-world projects from Element Explorer to Banking Systems. Apply methods immediately with guided briefs.
                </p>
                <Link href="/projects" className="inline-block mt-6">
                  <span className="text-primary font-semibold text-sm hover:opacity-80 transition">View Projects →</span>
                </Link>
              </div>

              {/* Step 3 */}
              <div className="rounded-lg border border-border bg-background p-8 hover:border-primary/50 transition-all">
                <div className="text-4xl font-bold text-primary/30 mb-4">03</div>
                <h3 className="text-xl font-bold text-foreground mb-3">Team Leadership</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Lead team adoption with proven strategies, gamification ideas, and month-long deep dives for enterprise success.
                </p>
                <Link href="/playbook" className="inline-block mt-6">
                  <span className="text-primary font-semibold text-sm hover:opacity-80 transition">View Playbook →</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="mb-16">
              <div className="text-xs uppercase text-primary font-semibold tracking-wider mb-2">Platform Features</div>
              <h2 className="text-4xl font-bold text-foreground">Everything You Need</h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {/* Feature 1 */}
              <Card className="border-border bg-card p-8">
                <h3 className="text-lg font-bold text-foreground mb-3">Interactive Method Selector</h3>
                <p className="text-muted-foreground">
                  Answer 4 questions about your project and get personalized method recommendations based on team size, complexity, and goals.
                </p>
              </Card>

              {/* Feature 2 */}
              <Card className="border-border bg-card p-8">
                <h3 className="text-lg font-bold text-foreground mb-3">CSV Workflow Agents</h3>
                <p className="text-muted-foreground">
                  See exact agents, commands, and workflows for each method. Understand the process from setup through implementation.
                </p>
              </Card>

              {/* Feature 3 */}
              <Card className="border-border bg-card p-8">
                <h3 className="text-lg font-bold text-foreground mb-3">Project Sample Data</h3>
                <p className="text-muted-foreground">
                  Every project includes sample data from Neon. Download project briefs with full instructions for immediate practice.
                </p>
              </Card>

              {/* Feature 4 */}
              <Card className="border-border bg-card p-8">
                <h3 className="text-lg font-bold text-foreground mb-3">Tool Compatibility Matrix</h3>
                <p className="text-muted-foreground">
                  Check native support across 9 AI tools. Understand which tools work best with each method for your workflow.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-b border-border bg-card/50">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-4 text-center">
              <div>
                <p className="text-4xl font-bold text-primary mb-2">9</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">SDD Methods</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary mb-2">10</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Practice Projects</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary mb-2">9</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">AI Tools</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary mb-2">∞</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Learning Potential</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-foreground mb-6">Ready to Master SDD?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start with the method selector to find your perfect fit, or explore all 9 methods and pick your learning path.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/find-your-method">
                <Button size="lg">
                  Start Method Selector
                </Button>
              </Link>
              <Link href="/methods">
                <Button size="lg" variant="outline">
                  Browse All Methods
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-12 sm:grid-cols-2 mb-12">
              <div>
                <p className="font-bold text-foreground mb-2">SDD Academy</p>
                <p className="text-sm text-muted-foreground">
                  Learn, practice, and master specification-driven development with 9 proven methods and real-world projects.
                </p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-4">Quick Links</p>
                <div className="flex flex-col gap-2 text-sm">
                  <Link href="/methods" className="text-muted-foreground hover:text-primary transition">Methods</Link>
                  <Link href="/projects" className="text-muted-foreground hover:text-primary transition">Projects</Link>
                  <Link href="/tools" className="text-muted-foreground hover:text-primary transition">Tools</Link>
                  <Link href="/playbook" className="text-muted-foreground hover:text-primary transition">Playbook</Link>
                </div>
              </div>
            </div>
            <div className="border-t border-border pt-8 text-center">
              <p className="text-sm text-muted-foreground">
                SDD Academy © 2026. All rights reserved. <span className="text-primary">•</span> <a href="https://neon.com/docs/import/import-sample-data" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Sample Data by Neon</a>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
