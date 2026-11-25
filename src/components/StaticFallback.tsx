import { PROJECTS } from '../data/projects'

export default function StaticFallback() {
  return (
    <main className="min-h-screen bg-[#050505] px-6 py-10 text-white md:px-16">
      <nav className="flex items-center justify-between text-sm">
        <span className="font-black tracking-[0.3em] text-sky-300">SST</span>
        <span className="text-slate-400">About · Work · Contact</span>
      </nav>

      <section className="mt-24 max-w-4xl">
        <p className="text-xs uppercase tracking-[0.4em] text-sky-300/80">
          Full-Stack Developer · AI Automation Engineer
        </p>
        <h1 className="mt-5 bg-gradient-to-r from-sky-300 to-violet-300 bg-clip-text text-5xl font-black text-transparent md:text-7xl">
          Sachin Singh Tanwar
        </h1>
        <p className="mt-6 max-w-2xl text-slate-300">
          I build automation that ships. APIs, scrapers and agentic workflows —
          production-grade, with zero fluff.
        </p>
      </section>

      <section className="mt-20 grid gap-5 md:grid-cols-3">
        {PROJECTS.map((project) => (
          <article
            key={project.id}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur"
          >
            <h2 className="text-lg font-bold" style={{ color: project.color }}>
              {project.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{project.desc}</p>
            <p className="mt-4 text-xs text-slate-400">{project.stack}</p>
          </article>
        ))}
      </section>

      <section className="mt-24 pb-16">
        <h2 className="text-3xl font-black text-white">Let&apos;s build something.</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            className="rounded-full bg-sky-400 px-5 py-2.5 text-sm font-semibold text-slate-950"
            href="mailto:arjunrajput2523@gmail.com"
          >
            Email
          </a>
          <a
            className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold"
            href="https://github.com/Sachin-Singh-Tanwar"
          >
            GitHub
          </a>
          <a
            className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold"
            href="https://www.linkedin.com/in/sachin-singh-tanwar-5582582b4"
          >
            LinkedIn
          </a>
        </div>
      </section>
    </main>
  )
}
