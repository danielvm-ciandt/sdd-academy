import { Header } from '@/components/Header'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function PlaybookPage() {
  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: 'Playbook' }]} />
      <main className="min-h-screen bg-background">
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-foreground">Team Leader Playbook</h1>
            <p className="mt-1 text-sm text-muted-foreground">Strategies for adopting SDD methods across your team. Build a culture of structured, specification-driven development.</p>
          </div>
        </section>

        {/* Playbook Tabs */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Tabs defaultValue="adoption" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="adoption">Adoption</TabsTrigger>
              <TabsTrigger value="gamification">Gamification</TabsTrigger>
              <TabsTrigger value="teaching">Teaching</TabsTrigger>
              <TabsTrigger value="application">Application</TabsTrigger>
            </TabsList>

            {/* Adoption Strategies */}
            <TabsContent value="adoption" className="mt-8 space-y-6">
              <Card className="border-border bg-card p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Adoption Strategies</h3>
                <p className="text-muted-foreground mb-8">
                  Build team buy-in and sustainable practice of SDD methods.
                </p>

                <div className="space-y-6">
                  <div className="border-l-4 border-primary pl-6">
                    <h4 className="text-lg font-semibold text-foreground mb-2">Competitive Formats</h4>
                    <p className="text-muted-foreground mb-4">
                      Create friendly competitions where teams apply different methods to the same project.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Organize weekly "Spec Olympics" where teams race to complete a project</li>
                      <li>• Track metrics like time-to-delivery, specification quality, and code clarity</li>
                      <li>• Award points for best specifications, cleanest code, and fastest iteration</li>
                      <li>• Monthly leaderboard showcasing top methods and team combinations</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-accent pl-6">
                    <h4 className="text-lg font-semibold text-foreground mb-2">Teach-Back Sessions</h4>
                    <p className="text-muted-foreground mb-4">
                      Have team members master a method and teach it to others.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Assign each team member to specialize in one SDD method</li>
                      <li>• Schedule monthly "Method Masters" sessions where experts teach</li>
                      <li>• Create bite-sized guides and video tutorials</li>
                      <li>• Recognize and reward best teaching moments</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h4 className="text-lg font-semibold text-foreground mb-2">Micro-Challenges</h4>
                    <p className="text-muted-foreground mb-4">
                      Start with small, low-stakes exercises to build confidence.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Weekly "Spec Sprint" - 30-minute challenges using new methods</li>
                      <li>• Pair experienced members with newcomers for co-learning</li>
                      <li>• Build up from Element Explorer to complex projects over months</li>
                      <li>• Celebrate small wins publicly to maintain momentum</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-accent pl-6">
                    <h4 className="text-lg font-semibold text-foreground mb-2">Real Project Application</h4>
                    <p className="text-muted-foreground mb-4">
                      Gradually integrate SDD into your actual development workflow.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Start with non-critical features or refactoring tasks</li>
                      <li>• Fully apply chosen method to real project in production</li>
                      <li>• Measure outcomes: bug reduction, development speed, maintainability</li>
                      <li>• Share results and learnings across the organization</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Gamification */}
            <TabsContent value="gamification" className="mt-8 space-y-6">
              <Card className="border-border bg-card p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Gamification Framework</h3>
                <p className="text-muted-foreground mb-8">
                  Make SDD learning engaging and rewarding through progression and recognition.
                </p>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-4">Progression Tiers</h4>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <Card className="border-border bg-background p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary mb-2">Apprentice</div>
                          <p className="text-xs text-muted-foreground mb-3">Complete starter projects</p>
                          <ul className="text-xs text-muted-foreground space-y-1 text-left">
                            <li>• Master Element Explorer</li>
                            <li>• Pass method quiz</li>
                            <li>• Create first specification</li>
                          </ul>
                        </div>
                      </Card>

                      <Card className="border-border bg-background p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary mb-2">Journeyman</div>
                          <p className="text-xs text-muted-foreground mb-3">Build intermediate projects</p>
                          <ul className="text-xs text-muted-foreground space-y-1 text-left">
                            <li>• Complete 3+ projects</li>
                            <li>• Teach method to peer</li>
                            <li>• Refine specifications</li>
                          </ul>
                        </div>
                      </Card>

                      <Card className="border-border bg-background p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary mb-2">Master</div>
                          <p className="text-xs text-muted-foreground mb-3">Expert in method</p>
                          <ul className="text-xs text-muted-foreground space-y-1 text-left">
                            <li>• Lead team projects</li>
                            <li>• Mentor other members</li>
                            <li>• Contribute to method</li>
                          </ul>
                        </div>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-4">Badge System</h4>
                    <p className="text-muted-foreground mb-4">
                      Award badges for milestones and achievements:
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>🏆 <strong>Spec Master</strong> - Complete all 9 methods</li>
                      <li>⚡ <strong>Speed Demon</strong> - Finish project 2x faster than estimate</li>
                      <li>🎯 <strong>Precision Engineer</strong> - Zero bugs in production with method</li>
                      <li>🤝 <strong>Team Builder</strong> - Teach 3+ team members</li>
                      <li>🚀 <strong>Method Pioneer</strong> - First to apply method to real project</li>
                      <li>💡 <strong>Innovation Champion</strong> - Suggest method improvements</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-4">Leaderboards</h4>
                    <p className="text-muted-foreground">
                      Maintain public leaderboards for motivation and friendly competition:
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground mt-4">
                      <li>• <strong>Method Mastery:</strong> Who knows the most methods</li>
                      <li>• <strong>Project Completion:</strong> Most projects built</li>
                      <li>• <strong>Teaching Impact:</strong> Most people mentored</li>
                      <li>• <strong>Quality Champion:</strong> Best specification scores</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Teaching Formats */}
            <TabsContent value="teaching" className="mt-8 space-y-6">
              <Card className="border-border bg-card p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Teaching & Learning Formats</h3>
                <p className="text-muted-foreground mb-8">
                  Multiple formats to accommodate different learning styles and team schedules.
                </p>

                <div className="space-y-6">
                  <div className="border-l-4 border-primary pl-6">
                    <h4 className="text-lg font-semibold text-foreground mb-2">Monthly Deep Dives (4 weeks)</h4>
                    <p className="text-muted-foreground mb-3">Focus on one method in depth each month.</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><strong>Week 1 - Theory:</strong> Learn method fundamentals and philosophy</li>
                      <li><strong>Week 2 - Practice:</strong> Complete practice project with method</li>
                      <li><strong>Week 3 - Application:</strong> Apply to real internal task</li>
                      <li><strong>Week 4 - Synthesis:</strong> Share learnings, iterate on method</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-accent pl-6">
                    <h4 className="text-lg font-semibold text-foreground mb-2">Paired Learning Sessions</h4>
                    <p className="text-muted-foreground mb-3">Pair experienced and new members for hands-on learning.</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• 1-hour sessions: 30 min teaching, 30 min hands-on practice</li>
                      <li>• Build specifications together using the chosen method</li>
                      <li>• Debug and refine approach as you go</li>
                      <li>• Create mini case studies from real work</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h4 className="text-lg font-semibold text-foreground mb-2">Lunch & Learn Sessions</h4>
                    <p className="text-muted-foreground mb-3">Short, high-impact sessions during lunch hours.</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• 30-45 minute sessions on specific method aspects</li>
                      <li>• Covers setup, common pitfalls, advanced techniques</li>
                      <li>• Include live demos and Q&A</li>
                      <li>• Record for async viewing by remote teams</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-accent pl-6">
                    <h4 className="text-lg font-semibold text-foreground mb-2">Self-Paced Learning</h4>
                    <p className="text-muted-foreground mb-3">For flexible learning at your own pace.</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Interactive guides on this platform</li>
                      <li>• Video tutorials and walkthroughs</li>
                      <li>• Curated resources and example projects</li>
                      <li>• Community discussion forums for questions</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Real-World Application */}
            <TabsContent value="application" className="mt-8 space-y-6">
              <Card className="border-border bg-card p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Real-World Application</h3>
                <p className="text-muted-foreground mb-8">
                  Guidelines for applying SDD methods to client projects and production work.
                </p>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-4">Phase 1: Foundation (Weeks 1-2)</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Identify pilot project (non-critical, bounded scope)</li>
                      <li>• Select and document chosen SDD method for the team</li>
                      <li>• Create project specification using the method</li>
                      <li>• Review and refine spec with stakeholders</li>
                      <li>• Set clear success metrics (delivery time, quality, maintainability)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-4">Phase 2: Execution (Weeks 3-6)</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Implement following specifications generated by the method</li>
                      <li>• Hold weekly method-specific checkpoint meetings</li>
                      <li>• Document learnings and adjustments to approach</li>
                      <li>• Maintain specification as source of truth throughout</li>
                      <li>• Conduct code reviews using method-defined quality standards</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-4">Phase 3: Validation (Week 7)</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Ship to production with confidence from detailed spec</li>
                      <li>• Monitor quality and performance metrics</li>
                      <li>• Collect user feedback and method effectiveness data</li>
                      <li>• Hold retrospective meeting with team</li>
                      <li>• Document case study for organizational knowledge base</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-4">Phase 4: Scaling (Ongoing)</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Share results and learnings across organization</li>
                      <li>• Apply method to next project with improvements</li>
                      <li>• Build organizational playbooks for the method</li>
                      <li>• Train new team members using proven approach</li>
                      <li>• Iterate on method based on real-world experience</li>
                    </ul>
                  </div>

                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mt-8">
                    <h4 className="text-lg font-semibold text-foreground mb-2">Key Success Factors</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>✓ Leadership commitment to the chosen method</li>
                      <li>✓ Clear communication of method benefits and expectations</li>
                      <li>✓ Dedicated time for learning and practice (not just "extra work")</li>
                      <li>✓ Early wins with pilot projects to build confidence</li>
                      <li>✓ Regular feedback loops and willingness to iterate</li>
                      <li>✓ Recognition and celebration of method mastery</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* CTA */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Lead Your Team?</h2>
              <p className="text-muted-foreground mb-8">Start with the method selector to find the perfect fit for your organization.</p>
              <Button size="lg">Find Your Method</Button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
