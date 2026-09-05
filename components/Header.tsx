import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-zinc-900 bg-black">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-white"
        >
          AI Orbit
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/"
            className="text-zinc-500 transition hover:text-white"
          >
            Home
          </Link>

          <Link
            href="/companies"
            className="text-zinc-300 transition hover:text-white"
          >
            Companies
          </Link>
        </nav>
      </div>
    </header>
  );
}