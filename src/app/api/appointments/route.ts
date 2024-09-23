import { NextResponse, NextRequest } from "next/server";
import { db } from "@vercel/postgres";

const client = await db.connect();

export async function GET(req: NextRequest, res: NextResponse) {
  if (req.method !== "GET") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "user ID is required" }, { status: 400 });
  }

  try {
    const userTypeResult = await client.sql`
  SELECT
    CASE
      WHEN EXISTS (SELECT 1 FROM coaches WHERE user_id = ${userId}) THEN 'coach'
      WHEN EXISTS (SELECT 1 FROM students WHERE user_id = ${userId}) THEN 'student'
      ELSE NULL
    END AS user_type;
`;

    const userType = userTypeResult.rows[0]?.user_type;

    let result;

    if (userType === "student") {
      result = await client.sql`
    SELECT
      b.id AS booking_id,
      b.slot_id,
      b.student_id,
      b.booking_time,
      s.start_time,
      s.end_time,
      u.telephone AS coach_telephone
    FROM
      bookings b
    JOIN
      slots s ON b.slot_id = s.id
    JOIN
      users u ON s.coach_id = u.id
    WHERE
      b.student_id = ${userId}
    ORDER BY
      b.booking_time DESC;
  `;
    } else if (userType === "coach") {
      result = await client.sql`
    SELECT
      b.id AS booking_id,
      b.slot_id,
      b.student_id,
      b.booking_time,
      s.start_time,
      s.end_time,
      u_student.telephone AS student_telephone,
      u_student.name AS student_name
    FROM
      bookings b
    JOIN
      slots s ON b.slot_id = s.id
    JOIN
      users u_coach ON s.coach_id = u_coach.id
    JOIN
      users u_student ON b.student_id = u_student.id
    WHERE
      s.coach_id = ${userId}
    ORDER BY
      b.booking_time DESC;
  `;
    } else {
      return NextResponse.json(
        { error: "User type not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch slots" },
      { status: 500 }
    );
  }
}
