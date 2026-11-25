import { PROJECTS } from '../data/projects'

type Props = {
  progress: number
  focused: number | null
  onNav: (target: number) => void
  onClear: () => void
}

const fade = (value: number) => Math.max(0, Math.min(1, value))

export default function Overlay({ progress, focused, onNav, onClear }: Props) {
  const heroOpacity = fade(1 - progress * 5)
  const contactOpacity = fade((progress - 0.72) * 4)

  return (
    <div className="pointer-events-none fixed inset-0 z-10 text-white">
      <nav className="pointer-events-auto absolute inset-x-0 top-0 flex items-center justify-between px-6 py-6 md:px-14">
        <button
          onClick={() => onNav(0)}
          className="bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-xl font-black tracking-[0.32em] text-transparent"
        >
          SST
        </button>
        <div className="flex items-center gap-5 text-[13px] font-medium tracking-wide text-slate-300 md:gap-9 md:text-sm">
          <button className="transition hover:text-sky-300" onClick={() => onNav(0)}>
            About
          </button>
          <button className="transition hover:text-sky-300" onClick={() => onNav(0.42)}>
            Work
          </button>
          <button className="transition hover:text-sky-300" onClick={() => onNav(0.92)}>
            Contact
          </button>
        </div>
      </nav>

      <section
        className="absolute inset-0 flex flex-col items-center justify-center text-center"
        style={{ opacity: heroOpacity, transform: `translateY(${-progress * 90}px)` }}
      >
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.45em] text-sky-300/80">
          Full-Stack Developer · AI Automation Engineer
        </p>
        <h1 className="bg-gradient-to-r from-sky-300 via-indigo-300 to-violet-300 bg-clip-text text-4xl font-black tracking-tight text-transparent md:text-7xl">
          Sachin Singh Tanwar
        </h1>
        <p className="mt-6 max-w-xl text-sm text-slate-300/80 md:text-base">
          I build automation that ships. APIs, scrapers and agentic workflows —
          production-grade, with zero fluff.
        </p>
        <div className="pointer-events-auto mt-9 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onNav(0.4)}
            className="rounded-full bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_35px_rgba(14,165,233,0.35)] transition hover:bg-sky-300"
          >
            Explore work
          </button>
          <button
            onClick={() => onNav(0.95)}
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:border-sky-300/60 hover:text-sky-200"
          >
            Get in touch
          </button>
        </div>
      </section>

      {PROJECTS.map((project, index) => {
        const start = index / PROJECTS.length
        const end = (index + 1) / PROJECTS.length
        const opacity =
          fade((progress - start + 0.04) * 12) * fade((end - progress + 0.02) * 12)
        return (
          <div
            key={project.id}
            className="absolute left-6 top-1/2 max-w-xs -translate-y-1/2 md:left-14"
            style={{ opacity }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-sky-300/70">
              0{index + 1} / 03
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
              {project.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300/70">{project.desc}</p>
            <p className="mt-3 text-xs font-medium tracking-wide text-violet-300/80">
              {project.stack}
            </p>
          </div>
        )
      })}

      <div
        className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-14 text-center"
        style={{ opacity: contactOpacity }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-violet-300/80">
          Contact
        </p>
        <h2 className="mt-3 bg-gradient-to-r from-sky-300 to-violet-300 bg-clip-text text-3xl font-black text-transparent md:text-5xl">
          Let&apos;s build something.
        </h2>
        <div className="pointer-events-auto mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-sky-200"
            href="mailto:arjunrajput2523@gmail.com"
          >
            Email
          </a>
          <a
            className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold backdrop-blur transition hover:border-sky-300/60"
            href="https://github.com/Sachin-Singh-Tanwar"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold backdrop-blur transition hover:border-sky-300/60"
            href="https://www.linkedin.com/in/sachin-singh-tanwar-5582582b4"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>

      {focused !== null && (
        <button
          onClick={onClear}
          className="pointer-events-auto absolute bottom-8 right-8 rounded-full border border-white/20 bg-black/40 px-5 py-2.5 text-xs font-semibold text-white/80 backdrop-blur transition hover:border-sky-300/60"
        >
          Back to path
        </button>
      )}

      <div className="absolute bottom-6 left-6 text-[10px] uppercase tracking-[0.3em] text-white/30">
        Scroll to fly · {Math.round(progress * 100)}%
      </div>
    </div>
  )
}
