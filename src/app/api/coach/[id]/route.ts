import { NextResponse, NextRequest } from "next/server";
import { db } from "@vercel/postgres";

const client = await db.connect();

// post request for notes & ratings
// make a key for post
//current one can be 'slots'
//this one can be 'notes'
//if slots, run request below
//if notes, run request created tomorrow - probably should save ratings at same time

//notes should also render with scores

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const body = await req.json();
    const { user_id, start_time, end_time } = body;

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
  const timezone = searchParams.get("timezone");

  if (!userId) {
    return NextResponse.json({ error: "user ID is required" }, { status: 400 });
  }

  try {
    const result = await client.sql`
    SELECT
    id,
    coach_id,
    start_time AT TIME ZONE 'UTC' AT TIME ZONE ${timezone} AS start_time,
    end_time AT TIME ZONE 'UTC' AT TIME ZONE ${timezone} AS end_time,
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
