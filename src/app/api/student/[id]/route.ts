import { NextRequest, NextResponse } from "next/server";
import { db } from "@vercel/postgres";

const client = await db.connect();

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const timezone = searchParams.get("timezone");

  if (!userId) {
    return NextResponse.json({ error: "user ID is required" }, { status: 400 });
  }

  try {
    const result = await client.sql`
    SELECT
  s.id,
  s.coach_id,
  u.name AS coach_name,
  s.start_time AT TIME ZONE 'UTC' AT TIME ZONE ${timezone} AS start_time,
  s.end_time AT TIME ZONE 'UTC' AT TIME ZONE ${timezone} AS end_time,
  s.is_booked,
  s.created_at
FROM slots s
JOIN users u ON s.coach_id = u.id;
    `;

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching slots:", error);
    return NextResponse.json(
      { error: "Failed to fetch slots" },
      { status: 500 }
    );
  }
}
