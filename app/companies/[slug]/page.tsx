"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  website: string | null;
};

type Model = {
  id: number;
  name: string;
  description: string | null;
};

type RelatedCompany = {
  id: number;
  name: string;
  slug: string;
  logo: string | null;
  description: string | null;
  location: string | null;
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
  category: {
    id: number;
    name: string;
    slug: string;
  };
  products: Product[];
  models: Model[];
  relatedCompanies: RelatedCompany[];
};

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default function CompanyDetailPage({ params }: Props) {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCompany() {
      try {
        const { slug } = await params;

        setLoading(true);
        setError("");
        setNotFound(false);

        const response = await fetch(`/api/companies/${slug}`);

        if (response.status === 404) {
          setNotFound(true);
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch company");
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error("Failed to fetch company");
        }

        setCompany(result.data);
      } catch {
        setError("Unable to load company. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchCompany();
  }, [params]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
          <div className="h-5 w-32 animate-pulse rounded bg-zinc-900" />

          <div className="mt-10 h-40 animate-pulse rounded-xl border border-zinc-900 bg-zinc-950" />

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <div className="h-32 animate-pulse rounded-xl border border-zinc-900 bg-zinc-950" />
            <div className="h-32 animate-pulse rounded-xl border border-zinc-900 bg-zinc-950" />
            <div className="h-32 animate-pulse rounded-xl border border-zinc-900 bg-zinc-950" />
          </div>
        </div>
      </main>
    );
  }

  if (notFound) {
    return (
      <main className="min-h-screen bg-black text-white">
        <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-8">
          <p className="text-5xl font-semibold">404</p>

          <h1 className="mt-4 text-2xl font-semibold">
            Company not found
          </h1>

          <p className="mt-2 text-zinc-500">
            The company you're looking for doesn't exist.
          </p>

          <Link
            href="/companies"
            className="mt-6 inline-flex rounded-lg border border-zinc-800 px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-900"
          >
            Back to companies
          </Link>
        </div>
      </main>
    );
  }

  if (error || !company) {
    return (
      <main className="min-h-screen bg-black text-white">
        <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-8">
          <h1 className="text-xl font-semibold">
            Something went wrong
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            {error || "Unable to load this company."}
          </p>

          <Link
            href="/companies"
            className="mt-6 inline-flex rounded-lg border border-zinc-800 px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-900"
          >
            Back to companies
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:py-12">
        {/* Back */}
        <Link
          href="/companies"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
        >
          <span>←</span>
          Back to companies
        </Link>

        {/* Company header */}
        <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 text-2xl font-semibold text-zinc-400">
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

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  {company.name}
                </h1>

                <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-400">
                  {company.category.name}
                </span>
              </div>

              <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-400">
                {company.description || "No description available."}
              </p>

              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex text-sm text-zinc-300 underline decoration-zinc-700 underline-offset-4 transition hover:text-white"
                >
                  Visit website ↗
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Company information */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <InfoCard
            label="Location"
            value={company.location || "Not available"}
          />

          <InfoCard
            label="Founded"
            value={company.foundedYear?.toString() || "Not available"}
          />

          <InfoCard
            label="Employees"
            value={company.employeeRange || "Not available"}
          />
        </section>

        {/* Products */}
        <section className="mt-12">
          <SectionHeading
            title="Products"
            count={company.products.length}
          />

          {company.products.length === 0 ? (
            <EmptySection text="No products listed." />
          ) : (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {company.products.map((product) => (
                <div
                  key={product.id}
                  className="rounded-xl border border-zinc-800 bg-zinc-950 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-medium">{product.name}</h3>

                    {product.website && (
                      <a
                        href={product.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-zinc-500 hover:text-white"
                      >
                        Website ↗
                      </a>
                    )}
                  </div>

                  <p className="mt-2 text-sm leading-6 text-zinc-500">
                    {product.description || "No description available."}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Models */}
        <section className="mt-12">
          <SectionHeading title="Models" count={company.models.length} />

          {company.models.length === 0 ? (
            <EmptySection text="No models listed." />
          ) : (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {company.models.map((model) => (
                <div
                  key={model.id}
                  className="rounded-xl border border-zinc-800 bg-zinc-950 p-5"
                >
                  <h3 className="font-medium">{model.name}</h3>

                  <p className="mt-2 text-sm leading-6 text-zinc-500">
                    {model.description || "No description available."}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Related companies */}
        {company.relatedCompanies.length > 0 && (
          <section className="mt-12">
            <SectionHeading
              title="Related companies"
              count={company.relatedCompanies.length}
            />

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {company.relatedCompanies.map((related) => (
                <Link
                  key={related.id}
                  href={`/companies/${related.slug}`}
                  className="group rounded-xl border border-zinc-800 bg-zinc-950 p-5 transition hover:border-zinc-700 hover:bg-zinc-900"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 text-sm font-semibold text-zinc-400">
                      {related.logo ? (
                        <img
                          src={related.logo}
                          alt={`${related.name} logo`}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        related.name.charAt(0).toUpperCase()
                      )}
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate font-medium group-hover:text-zinc-200">
                        {related.name}
                      </h3>

                      {related.location && (
                        <p className="mt-1 text-xs text-zinc-600">
                          {related.location}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="mt-4 line-clamp-2 text-sm leading-6 text-zinc-500">
                    {related.description || "No description available."}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
      <p className="text-xs uppercase tracking-wider text-zinc-600">
        {label}
      </p>

      <p className="mt-2 text-sm text-zinc-300">{value}</p>
    </div>
  );
}

function SectionHeading({
  title,
  count,
}: {
  title: string;
  count: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <h2 className="text-xl font-semibold">{title}</h2>

      <span className="rounded-full bg-zinc-900 px-2.5 py-1 text-xs text-zinc-500">
        {count}
      </span>
    </div>
  );
}

function EmptySection({ text }: { text: string }) {
  return (
    <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-sm text-zinc-600">
      {text}
    </div>
  );
}