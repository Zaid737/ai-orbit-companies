import { prisma } from "@/lib/prisma";
import {
  ConflictError,
  NotFoundError,
} from "@/lib/errors";
import {
  CreateCompanyInput,
  UpdateCompanyInput,
} from "@/lib/validations/company";

type GetCompaniesParams = {
  search?: string;
  category?: string;
  sort: "name" | "newest";
  page: number;
  limit: number;
};

export async function getCompanies({
  search,
  category,
  sort,
  page,
  limit,
}: GetCompaniesParams) {
  const where = {
    ...(search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              description: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
          ],
        }
      : {}),

    ...(category
      ? {
          category: {
            slug: category,
          },
        }
      : {}),
  };

  const orderBy =
    sort === "newest"
      ? { createdAt: "desc" as const }
      : { name: "asc" as const };

  const skip = (page - 1) * limit;

  const [companies, total] = await Promise.all([
    prisma.company.findMany({
      where,
      orderBy,
      skip,
      take: limit,

      include: {
        category: true,

        _count: {
          select: {
            products: true,
            models: true,
          },
        },
      },
    }),

    prisma.company.count({ where }),
  ]);

  return {
    companies,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPreviousPage: page > 1,
    },
  };
}

export async function getCompanyBySlug(slug: string) {
  const company = await prisma.company.findUnique({
    where: {
      slug,
    },

    include: {
      category: true,

      products: {
        orderBy: {
          name: "asc",
        },
      },

      models: {
        orderBy: {
          name: "asc",
        },
      },
    },
  });

  if (!company) {
    return null;
  }

  const relatedCompanies = await prisma.company.findMany({
    where: {
      categoryId: company.categoryId,
      id: {
        not: company.id,
      },
    },

    select: {
      id: true,
      name: true,
      slug: true,
      logo: true,
      description: true,
      location: true,
    },

    orderBy: {
      name: "asc",
    },

    take: 6,
  });

  return {
    ...company,
    relatedCompanies,
  };
}

export async function createCompany(input: CreateCompanyInput) {
  const slug = input.name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const existingCompany = await prisma.company.findFirst({
    where: {
      OR: [
        {
          name: {
            equals: input.name,
            mode: "insensitive",
          },
        },
        {
          slug,
        },
      ],
    },
  });

  if (existingCompany) {
    throw new ConflictError("Company already exists");
  }

  const category = await prisma.category.findUnique({
    where: {
      id: input.categoryId,
    },
  });

  if (!category) {
    throw new NotFoundError("Category not found");
  }

  return prisma.company.create({
    data: {
      name: input.name,
      slug,
      description: input.description,
      website: input.website,
      logo: input.logo,
      location: input.location,
      foundedYear: input.foundedYear,
      employeeRange: input.employeeRange,
      categoryId: input.categoryId,
    },

    include: {
      category: true,
    },
  });
}

export async function updateCompany(
  slug: string,
  input: UpdateCompanyInput
) {
  const company = await prisma.company.findUnique({
    where: {
      slug,
    },
  });

  if (!company) {
    throw new NotFoundError("Company not found");
  }

  if (
    input.name &&
    input.name.toLowerCase() !== company.name.toLowerCase()
  ) {
    const newSlug = input.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const existingCompany = await prisma.company.findFirst({
      where: {
        OR: [
          {
            name: {
              equals: input.name,
              mode: "insensitive",
            },
          },
          {
            slug: newSlug,
          },
        ],
        id: {
          not: company.id,
        },
      },
    });

    if (existingCompany) {
      throw new ConflictError("Company already exists");
    }
  }

  if (input.categoryId !== undefined) {
    const category = await prisma.category.findUnique({
      where: {
        id: input.categoryId,
      },
    });

    if (!category) {
      throw new NotFoundError("Category not found");
    }
  }

  const data = {
    ...input,

    ...(input.name
      ? {
          slug: input.name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, ""),
        }
      : {}),
  };

  return prisma.company.update({
    where: {
      slug,
    },

    data,

    include: {
      category: true,
    },
  });
}

export async function deleteCompany(slug: string) {
  const company = await prisma.company.findUnique({
    where: {
      slug,
    },
  });

  if (!company) {
    throw new NotFoundError("Company not found");
  }

  await prisma.company.delete({
    where: {
      slug,
    },
  });
}