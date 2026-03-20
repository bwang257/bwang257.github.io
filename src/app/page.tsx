import { projects } from '@/lib/projects'
import DynamicPortfolio from '@/components/DynamicPortfolio'

export default function HomePage() {
  const pick = (slug: string) => {
    const p = projects.find((x) => x.slug === slug)
    if (!p) return undefined
    return {
      slug: p.slug,
      title: p.title,
      summary: p.summary,
      tools: p.tools || [],
      github: p.evidenceLinks?.github ?? null,
    }
  }

  return (
    <DynamicPortfolio
      exchange={pick('exchange-simulator')}
      algo={pick('quantitative-trading-simulation')}
      tracker={pick('internship-tracker')}
      portfolio={pick('portfolio-optimization-engine')}
    />
  )
}
