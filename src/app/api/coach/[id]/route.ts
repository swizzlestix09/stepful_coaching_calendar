import { NextResponse, NextRequest } from "next/server";
import { db, QueryResult, QueryResultRow } from "@vercel/postgres";

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  const client = await db.connect();

  try {
    const body = await req.json();
    const { user_id, start_time, end_time } = body;
    //console.log("BODY: ", body);

    const slotResult = await client.sql`
    INSERT INTO slots (coach_id, start_time, end_time)
    VALUES (${user_id}, ${start_time}, ${end_time})
    ON CONFLICT (coach_id, start_time, end_time)
    RETURNING *;`;

    //console.log("Slot Result: ", slotResult);
    return NextResponse.json(
      { message: "Slot Addition Successful" },
      { status: 201 }
    );
  } catch {
    console.error("there was a whoopsie");
    return NextResponse.json(
      { message: "Error with credentials, or this slot is already saved." },
      { status: 500 }
    );
  }
  //attempt to write to database
  //connect to database

  //if there is an error send error message
}
