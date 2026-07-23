import { NextResponse } from "next/server";
import { loadAllUnits } from "@/lib/content-loader";

export async function GET() {
  try {
    const units = loadAllUnits();
    return NextResponse.json(units);
  } catch {
    return NextResponse.json({ error: "Failed to load content" }, { status: 500 });
  }
}
