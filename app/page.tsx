import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-black text-white">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center px-5 py-16 sm:px-8 lg:px-10">
        <section className="w-full max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-zinc-600">
            AI Ecosystem
          </p>

          <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            Discover the companies shaping AI.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-500 sm:text-lg">
            Explore companies building the research, infrastructure,
            applications, robotics, and hardware powering the artificial
            intelligence ecosystem.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/companies"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-6 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              Explore Companies
              <span className="ml-2">→</span>
            </Link>

            <Link
              href="/companies"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-zinc-800 px-6 text-sm font-medium text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
            >
              Browse Directory
            </Link>
          </div>

          <div className="mt-16 grid max-w-3xl grid-cols-2 border-t border-zinc-900 pt-8 sm:grid-cols-4">
            <div>
              <p className="text-sm font-medium text-zinc-300">
                Companies
              </p>
              <p className="mt-1 text-xs text-zinc-600">
                AI ecosystem directory
              </p>
            </div>

            <div className="mt-6 sm:mt-0">
              <p className="text-sm font-medium text-zinc-300">
                Research
              </p>
              <p className="mt-1 text-xs text-zinc-600">
                AI research organizations
              </p>
            </div>

            <div className="mt-6 sm:mt-0">
              <p className="text-sm font-medium text-zinc-300">
                Infrastructure
              </p>
              <p className="mt-1 text-xs text-zinc-600">
                Platforms & tooling
              </p>
            </div>

            <div className="mt-6 sm:mt-0">
              <p className="text-sm font-medium text-zinc-300">
                Robotics
              </p>
              <p className="mt-1 text-xs text-zinc-600">
                AI-powered machines
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}