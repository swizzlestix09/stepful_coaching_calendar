import { NextResponse, NextRequest } from "next/server";
import { db, QueryResult, QueryResultRow } from "@vercel/postgres";

const client = await db.connect();

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const body = await req.json();
    const { user_id, start_time, end_time } = body;
    console.log("BODY: ", body);

    const slotResult = await client.sql`
    INSERT INTO slots (coach_id, start_time, end_time)
    VALUES (${user_id}, ${start_time}, ${end_time})
    ON CONFLICT (coach_id, start_time, end_time)
    DO NOTHING
    RETURNING *;`;

    console.log("Slot Result: ", slotResult.rowCount);
    if (slotResult.rowCount === 0) {
      console.log("triggered?");
      return NextResponse.json(
        { message: "Slot already saved" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Slot Addition Successful" },
      { status: 201 }
    );
  } catch {
    console.error("there was a whoopsie");
    return NextResponse.json(
      { message: "Error with submission." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "user ID is required" }, { status: 400 });
  }

  try {
    const result = await client.sql`
    SELECT
    id,
    coach_id,
    start_time AT TIME ZONE 'UTC' AT TIME ZONE 'America/New_York' AS start_time,
    end_time AT TIME ZONE 'UTC' AT TIME ZONE 'America/New_York' AS end_time,
    is_booked,
    created_at
  FROM slots
  WHERE coach_id = ${userId};
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
