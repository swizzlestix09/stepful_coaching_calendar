import { db } from "@vercel/postgres";

const client = await db.connect();

const data = [
  {
    name: `Annie Annieblum`,
    email: `annie@annie.com`,
    phone_number: "2127183479",
  },
];

async function seed() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`ALTER TABLE coaches DROP CONSTRAINT coaches_user_id_fkey;`;
  await client.sql`ALTER TABLE students DROP CONSTRAINT students_user_id_fkey;`;

  await client.sql`DROP TABLE IF EXISTS users;`;

  await client.sql`DROP TABLE IF EXISTS coaches;`;
  await client.sql`DROP TABLE IF EXISTS students;`;

  await client.sql`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(12) NOT NULL
  );
  `;

  await client.sql`
  CREATE TABLE coaches (
    user_id INT REFERENCES users(id),
    PRIMARY KEY (user_id)
  );
`;

  await client.sql`
  CREATE TABLE students (
    user_id INT REFERENCES users(id),
    PRIMARY KEY (user_id)
);
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
