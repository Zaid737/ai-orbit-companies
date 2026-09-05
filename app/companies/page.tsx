"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
  slug: string;
  companyCount: number;
};

type Company = {
  id: number;
  name: string;
  slug: string;
  logo: string | null;
  description: string | null;
  website: string | null;
  location: string | null;
  foundedYear: number | null;
  employeeRange: string | null;
  category: Category;
  _count: {
    products: number;
    models: number;
  };
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState<"name" | "newest">("name");

  const [page, setPage] = useState(1);
  const [retryKey, setRetryKey] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories");

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error("Failed to fetch categories");
        }

        setCategories(result.data);
      } catch {
        setCategories([]);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams();

        if (search.trim()) {
          params.set("search", search.trim());
        }

        if (category) {
          params.set("category", category);
        }

        params.set("sort", sort);
        params.set("page", page.toString());
        params.set("limit", "12");

        const response = await fetch(`/api/companies?${params.toString()}`);

        if (!response.ok) {
          throw new Error("Failed to fetch companies");
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error("Failed to fetch companies");
        }

        setCompanies(result.data);
        setPagination(result.pagination);
      } catch {
        setCompanies([]);
        setPagination(null);
        setError("Unable to load companies. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchCompanies();
  }, [search, category, sort, page, retryKey]);

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleCategoryChange(value: string) {
    setCategory(value);
    setPage(1);
  }

  function handleSortChange(value: "name" | "newest") {
    setSort(value);
    setPage(1);
  }

  function handleRetry() {
    setRetryKey((current) => current + 1);
  }

  function clearFilters() {
    setSearch("");
    setCategory("");
    setSort("name");
    setPage(1);
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        {/* Header */}
        <section>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-600">
            AI Ecosystem
          </p>

          <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                AI Companies
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-500 sm:text-base">
                Explore companies building the technologies shaping the
                artificial intelligence ecosystem.
              </p>
            </div>

            {pagination && !loading && (
              <p className="text-sm text-zinc-600">
                {pagination.total}{" "}
                {pagination.total === 1 ? "company" : "companies"}
              </p>
            )}
          </div>
        </section>

        {/* Filters */}
        <section className="mt-10 rounded-xl border border-zinc-900 bg-zinc-950 p-3">
          <div className="flex flex-col gap-3 lg:flex-row">
            {/* Search */}
            <div className="flex-1">
              <input
                type="search"
                value={search}
                onChange={(event) => handleSearchChange(event.target.value)}
                placeholder="Search companies..."
                className="h-11 w-full rounded-lg border border-zinc-800 bg-black px-4 text-sm text-white outline-none placeholder:text-zinc-600 transition focus:border-zinc-600"
              />
            </div>

            {/* Category */}
            <div className="relative lg:w-56">
              <select
                value={category}
                onChange={(event) =>
                  handleCategoryChange(event.target.value)
                }
                className="h-11 w-full appearance-none rounded-lg border border-zinc-800 bg-black px-4 pr-10 text-sm text-zinc-300 outline-none transition focus:border-zinc-600"
              >
                <option value="">All categories</option>

                {categories.map((item) => (
                  <option key={item.id} value={item.slug}>
                    {item.name} ({item.companyCount})
                  </option>
                ))}
              </select>

              <span className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center text-zinc-400">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </div>

            {/* Sort */}
            <div className="relative lg:w-32">
              <select
                value={sort}
                onChange={(event) =>
                  handleSortChange(
                    event.target.value as "name" | "newest"
                  )
                }
                className="h-11 w-full appearance-none rounded-lg border border-zinc-800 bg-black px-4 pr-10 text-sm text-zinc-300 outline-none transition focus:border-zinc-600"
              >
                <option value="name">Name</option>
                <option value="newest">Newest</option>
              </select>

              <span className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center text-zinc-400">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </div>
          </div>
        </section>

        {/* Loading */}
        {loading && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-56 animate-pulse rounded-xl border border-zinc-900 bg-zinc-950"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950 px-6 py-12 text-center">
            <h2 className="font-medium">Something went wrong</h2>

            <p className="mt-2 text-sm text-zinc-600">{error}</p>

            <button
              onClick={handleRetry}
              className="mt-5 rounded-lg border border-zinc-800 px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-900"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && companies.length === 0 && (
          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950 px-6 py-16 text-center">
            <h2 className="font-medium">No companies found</h2>

            <p className="mt-2 text-sm text-zinc-600">
              Try changing your search or category filter.
            </p>

            {(search || category || sort !== "name") && (
              <button
                onClick={clearFilters}
                className="mt-5 text-sm text-zinc-300 underline underline-offset-4 transition hover:text-white"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Companies */}
        {!loading && !error && companies.length > 0 && (
          <>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {companies.map((company) => (
                <Link
                  key={company.id}
                  href={`/companies/${company.slug}`}
                  className="group flex min-h-56 flex-col rounded-xl border border-zinc-900 bg-zinc-950 p-5 transition hover:border-zinc-700 hover:bg-zinc-900/70"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-zinc-800 bg-black text-lg font-semibold text-zinc-500">
                      {company.logo ? (
                        <img
                          src={company.logo}
                          alt={`${company.name} logo`}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        company.name.charAt(0).toUpperCase()
                      )}
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate font-medium text-zinc-100">
                        {company.name}
                      </h2>

                      <p className="mt-1 text-xs text-zinc-600">
                        {company.category.name}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-zinc-500">
                    {company.description || "No description available."}
                  </p>

                  <div className="mt-auto flex items-center gap-4 border-t border-zinc-900 pt-4 text-xs text-zinc-600">
                    <span>
                      {company._count.products}{" "}
                      {company._count.products === 1
                        ? "product"
                        : "products"}
                    </span>

                    <span>
                      {company._count.models}{" "}
                      {company._count.models === 1 ? "model" : "models"}
                    </span>

                    {company.location && (
                      <span className="ml-auto truncate">
                        {company.location}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <nav className="mt-8 flex items-center justify-between border-t border-zinc-900 pt-6">
                <p className="text-sm text-zinc-600">
                  Page {pagination.page} of {pagination.totalPages}
                </p>

                <div className="flex gap-2">
                  <button
                    disabled={!pagination.hasPreviousPage}
                    onClick={() => setPage((current) => current - 1)}
                    className="rounded-lg border border-zinc-800 px-4 py-2 text-sm text-zinc-400 transition hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Previous
                  </button>

                  <button
                    disabled={!pagination.hasNextPage}
                    onClick={() => setPage((current) => current + 1)}
                    className="rounded-lg border border-zinc-800 px-4 py-2 text-sm text-zinc-400 transition hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Next
                  </button>
                </div>
              </nav>
            )}
          </>
        )}
      </div>
    </main>
  );
}