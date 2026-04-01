'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import methodsData from '@/data/methods.json'

interface QuizAnswer {
  projectSize: string
  teamSize: string
  priority: string
  experience: string
}

export default function FindYourMethodPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer>({
    projectSize: '',
    teamSize: '',
    priority: '',
    experience: '',
  })
  const [recommendations, setRecommendations] = useState<string[]>([])

  const questions = [
    {
      id: 'projectSize',
      title: 'What size is your project?',
      options: [
        { value: 'small', label: 'Small (MVP, simple features)' },
        { value: 'medium', label: 'Medium (moderate complexity)' },
        { value: 'large', label: 'Large (complex, multi-phase)' },
      ],
    },
    {
      id: 'teamSize',
      title: 'How large is your team?',
      options: [
        { value: 'solo', label: 'Solo or very small (1-2)' },
        { value: 'small', label: 'Small team (3-5)' },
        { value: 'medium', label: 'Medium team (6-10)' },
        { value: 'large', label: 'Large team (10+)' },
      ],
    },
    {
      id: 'priority',
      title: 'What\'s your top priority?',
      options: [
        { value: 'speed', label: 'Speed - ship fast' },
        { value: 'balance', label: 'Balance - quality & speed' },
        { value: 'quality', label: 'Quality - robust specifications' },
      ],
    },
    {
      id: 'experience',
      title: 'Your experience with SDD?',
      options: [
        { value: 'beginner', label: 'New to specification-driven development' },
        { value: 'intermediate', label: 'Some experience with SDD' },
        { value: 'advanced', label: 'Well-versed in SDD practices' },
      ],
    },
  ]

  const calculateRecommendations = (finalAnswers: QuizAnswer) => {
    const scores: Record<string, number> = {}
    methodsData.methods.forEach((m) => {
      scores[m.slug] = 0
    })

    // Project size scoring
    if (finalAnswers.projectSize === 'small') {
      scores['gsd'] += 3
      scores['ai-sdd'] += 2
    } else if (finalAnswers.projectSize === 'medium') {
      scores['spec-kit'] += 2
      scores['openspec'] += 2
      scores['specpulse'] += 2
    } else {
      scores['bmad'] += 3
      scores['spec-workflow-mcp'] += 3
      scores['anws'] += 2
    }

    // Team size scoring
    if (finalAnswers.teamSize === 'solo') {
      scores['gsd'] += 3
      scores['ai-sdd'] += 2
    } else if (finalAnswers.teamSize === 'small') {
      scores['ai-sdd'] += 2
      scores['gsd'] += 2
    } else if (finalAnswers.teamSize === 'medium') {
      scores['bmad'] += 2
      scores['openspec'] += 2
    } else {
      scores['bmad'] += 3
      scores['spec-workflow-mcp'] += 3
      scores['anws'] += 3
    }

    // Priority scoring
    if (finalAnswers.priority === 'speed') {
      scores['gsd'] += 3
      scores['ai-sdd'] += 2
      scores['specpulse'] += 2
    } else if (finalAnswers.priority === 'balance') {
      scores['openspec'] += 2
      scores['specpulse'] += 2
      scores['taskmaster'] += 2
    } else {
      scores['spec-kit'] += 3
      scores['bmad'] += 2
      scores['spec-workflow-mcp'] += 2
    }

    // Experience scoring
    if (finalAnswers.experience === 'beginner') {
      scores['gsd'] += 2
      scores['ai-sdd'] += 2
      scores['taskmaster'] += 2
    } else if (finalAnswers.experience === 'intermediate') {
      scores['openspec'] += 2
      scores['specpulse'] += 2
    } else {
      scores['bmad'] += 2
      scores['spec-workflow-mcp'] += 3
      scores['spec-kit'] += 2
    }

    // Get top 3
    const sorted = Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([slug]) => slug)

    return sorted
  }

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      const recs = calculateRecommendations(answers)
      setRecommendations(recs)
      setStep(questions.length)
    }
  }

  const handleAnswer = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }))
  }

  const currentQuestion = questions[step]
  const recommendedMethods = methodsData.methods.filter((m) =>
    recommendations.includes(m.slug)
  )

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-foreground text-center">
              Find Your Method
            </h1>
            <p className="mt-4 text-center text-muted-foreground">
              Answer a few questions to discover which SDD method is best for you.
            </p>
          </div>
        </section>

        {/* Quiz */}
        <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
          {step < questions.length ? (
            <Card className="border-border bg-card p-8">
              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-muted-foreground">
                    Question {step + 1} of {questions.length}
                  </p>
                  <div className="text-sm text-muted-foreground">
                    {Math.round(((step + 1) / questions.length) * 100)}%
                  </div>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full">
                  <div
                    className="h-2 bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <h2 className="text-2xl font-bold text-foreground mb-8">
                {currentQuestion?.title}
              </h2>

              {/* Options */}
              <RadioGroup
                value={answers[currentQuestion?.id as keyof QuizAnswer] || ''}
                onValueChange={(value) =>
                  handleAnswer(currentQuestion?.id || '', value)
                }
              >
                <div className="space-y-3">
                  {currentQuestion?.options.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-card/50 transition-colors cursor-pointer"
                    >
                      <RadioGroupItem
                        value={option.value}
                        id={option.value}
                      />
                      <Label
                        htmlFor={option.value}
                        className="cursor-pointer flex-1 text-foreground"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>

              {/* Navigation */}
              <div className="flex gap-4 mt-8">
                {step > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  disabled={!answers[currentQuestion?.id as keyof QuizAnswer]}
                  className="ml-auto"
                >
                  {step === questions.length - 1 ? 'See Results' : 'Next'}
                </Button>
              </div>
            </Card>
          ) : (
            // Results
            <div className="space-y-8">
              <Card className="border-border bg-card p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Your Recommended Methods
                </h2>
                <p className="text-muted-foreground mb-8">
                  Based on your answers, these methods are the best fit for your situation.
                </p>
              </Card>

              <div className="space-y-6">
                {recommendedMethods.map((method, idx) => (
                  <Card key={method.id} className="border-border bg-card p-8">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-sm text-primary font-semibold">
                            #{idx + 1} Match
                          </span>
                          <h3 className="text-2xl font-bold text-foreground">
                            {method.name}
                          </h3>
                        </div>
                        <p className="text-muted-foreground">
                          {method.shortDescription}
                        </p>
                      </div>
                      <Link href={`/methods/${method.slug}`}>
                        <Button>Learn More</Button>
                      </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Team Size</p>
                        <p className="text-sm font-medium text-foreground">
                          {method.teamSize}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Speed</p>
                        <p className="text-sm font-medium text-foreground">
                          {method.speed}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Complexity</p>
                        <p className="text-sm font-medium text-foreground">
                          {method.complexity}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setStep(0)
                    setAnswers({
                      projectSize: '',
                      teamSize: '',
                      priority: '',
                      experience: '',
                    })
                    setRecommendations([])
                  }}
                  className="flex-1"
                >
                  Retake Quiz
                </Button>
                <Link href="/methods" className="flex-1">
                  <Button className="w-full">
                    Explore All Methods
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  )
}
