import { NextResponse, NextRequest } from "next/server";
import { db, QueryResult, QueryResultRow } from "@vercel/postgres";

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const body = await req.json();
    const { email, password } = body;

    const client = await db.connect();

    const userResult: QueryResult<QueryResultRow> = await client.sql`
    SELECT * FROM users WHERE email = ${email} AND password = ${password};
    `;
    console.log();
    if (userResult.rowCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = userResult.rows[0];

    const isPasswordValid = password === user.password;

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    const coachResult: QueryResult<QueryResultRow> = await client.sql`
      SELECT * FROM coaches WHERE user_id = ${user.id};
    `;
    const studentResult: QueryResult<QueryResultRow> = await client.sql`
      SELECT * FROM students WHERE user_id = ${user.id};
    `;

    const isCoach = Boolean(coachResult.rowCount);
    const isStudent = Boolean(studentResult.rowCount);

    if (isCoach) {
      return NextResponse.redirect(`http://localhost:3000/coach/${user.id}`);
    }
    if (isStudent) {
      return NextResponse.redirect(`http://localhost:3000/student/${user.id}`);
    }

    return NextResponse.json(
      {
        body: {
          message: "Sign-in successful",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in sign-in route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
