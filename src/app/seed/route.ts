import { db } from "@vercel/postgres";

const client = await db.connect();

const tables = [
  {
    table: "COACH",
    variables: `coach_id SERIAL PRIMARY KEY,
                name VARCHAR(100) UNIQUE,
                email VARCHAR(100) UNIQUE,
                phone_number VARCHAR(15)`,
    data: [
      {
        name: "Bob Bobberson",
        email: "bob@bobby.com",
        phone_number: "2122221212",
      },
    ],
  },
];

export async function seed() {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
    CREATE TABLE IF NOT EXISTS ${tables[0].table} (
      ${tables[0].variables}
    );
    `;
    await client.sql`
    INSERT INTO ${tables[0].table} (name, email, phone_number)
    VALUES(${tables[0].data[0].name}, ${tables[0].data[0].email}, ${tables[0].data[0].phone_number})
    ON CONFLICT (id) DO NOTHING;
    `;

    console.log("Table created successfully");
  } catch (error) {
    console.error("Error during table creation:", error);
  }
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
