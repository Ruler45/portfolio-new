import { NextResponse } from "next/server";
import { getVisitCount, incrementVisitCount } from "@/lib/visit-counter";

export async function GET() {
  const count = await getVisitCount();

  return NextResponse.json({ count });
}

export async function POST() {
  const count = await incrementVisitCount();

  return NextResponse.json({ count });
}