import { NextResponse } from "next/server";

import { getCompanyBySlug } from "@/lib/services/company.service";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const { slug } = await params;

    const company = await getCompanyBySlug(slug);

    if (!company) {
      return NextResponse.json(
        {
          success: false,
          error: "Company not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: company,
    });
  } catch (error) {
    console.error("GET /api/companies/[slug] failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch company",
      },
      { status: 500 }
    );
  }
}