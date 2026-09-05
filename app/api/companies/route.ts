import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { AppError } from "@/lib/errors";
import {
  createCompany,
  getCompanies,
} from "@/lib/services/company.service";
import { createCompanySchema } from "@/lib/validations/company";

const querySchema = z.object({
  search: z.string().trim().optional(),
  category: z.string().trim().optional(),
  sort: z.enum(["name", "newest"]).default("name"),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

export async function GET(request: NextRequest) {
  try {
    const searchParams = Object.fromEntries(
      request.nextUrl.searchParams.entries()
    );

    const result = querySchema.safeParse(searchParams);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid query parameters",
          details: result.error.flatten(),
        },
        { status: 400 }
      );
    }

    const resultData = await getCompanies(result.data);

    return NextResponse.json({
      success: true,
      data: resultData.companies,
      pagination: resultData.pagination,
    });
  } catch (error) {
    console.error("GET /api/companies failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch companies",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = createCompanySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid company data",
          details: result.error.flatten(),
        },
        { status: 400 }
      );
    }

    const company = await createCompany(result.data);

    return NextResponse.json(
      {
        success: true,
        data: company,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: error.statusCode }
      );
    }

    console.error("POST /api/companies failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create company",
      },
      { status: 500 }
    );
  }
}