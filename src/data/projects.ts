export type Project = {
  id: string
  title: string
  desc: string
  stack: string
  position: [number, number, number]
  color: string
}

export const PROJECTS: Project[] = [
  {
    id: 'revenue',
    title: 'Autonomous Revenue Engine',
    desc: 'Self-healing 24/7 agent infrastructure. Bounty hunting, orchestration, Telegram control.',
    stack: 'Python · Ollama · systemd',
    position: [0, 0, 6],
    color: '#0ea5e9',
  },
  {
    id: 'apify',
    title: 'Apify Actor',
    desc: 'Production scraper with cost guards, clean output schema and buyer-safe payloads.',
    stack: 'Apify SDK · TypeScript',
    position: [-3.4, 0.2, 0],
    color: '#8b5cf6',
  },
  {
    id: 'opencode',
    title: 'OpenCode Worker',
    desc: 'Headless coding agent server with autonomous task queue and remote management.',
    stack: 'OpenCode · FastAPI · Cloudflare',
    position: [2.8, 1, -6],
    color: '#22d3ee',
  },
]
