import { db } from "@vercel/postgres";

const client = await db.connect();

const tables = [
  {
    table: "coach",
    variables: `coach_id SERIAL PRIMARY KEY,
                name VARCHAR(100) UNIQUE,
                email VARCHAR(100) UNIQUE,
                phone_number VARCHAR(15)`,
    data: [
      {
        name: `Bob Bobberson`,
        email: `bob@bobby.com`,
        phone_number: "2122221212",
      },
    ],
  },
];

async function seed() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
  CREATE TABLE IF NOT EXISTS coach (
    coach_id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE,
    email VARCHAR(100) UNIQUE,
    phone_number VARCHAR(15)
  );
  `;

  await client.sql`
    INSERT INTO coach (name, email, phone_number)
    VALUES('Bob Bobberson', 'bob@bobby.com', '2122221212')
    `;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seed();
    console.log("seed me finished");
    await client.sql`COMMIT`;

    return Response.json({ message: "DB successfully seeded" });
  } catch (e) {
    await client.sql`ROLLBACK`;
    return Response.json({ e }, { status: 500 });
  }
}
