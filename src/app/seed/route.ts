import { db } from "@vercel/postgres";

const client = await db.connect();

async function seed() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  // Drop constraints first if they exist
  await client.sql`ALTER TABLE IF EXISTS coaches DROP CONSTRAINT IF EXISTS coaches_user_id_fkey;`;
  await client.sql`ALTER TABLE IF EXISTS students DROP CONSTRAINT IF EXISTS students_user_id_fkey;`;

  // Drop tables in the correct order
  await client.sql`DROP TABLE IF EXISTS notes CASCADE;`;
  await client.sql`DROP TABLE IF EXISTS bookings CASCADE;`;
  await client.sql`DROP TABLE IF EXISTS slots CASCADE;`;
  await client.sql`DROP TABLE IF EXISTS coaches CASCADE;`;
  await client.sql`DROP TABLE IF EXISTS students CASCADE;`;
  await client.sql`DROP TABLE IF EXISTS users CASCADE;`;

  await client.sql`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    telephone VARCHAR(10) NOT NULL,
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

  await client.sql`
CREATE TABLE slots (
  id SERIAL PRIMARY KEY,
  coach_id INT REFERENCES users(id) ON DELETE CASCADE,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  is_booked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT unique_slot UNIQUE (coach_id, start_time, end_time)
  );
  `;

  await client.sql`
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  slot_id INT REFERENCES slots(id) ON DELETE CASCADE,
  student_id INT REFERENCES users(id),
  booking_time TIMESTAMP DEFAULT NOW(),
  UNIQUE (slot_id)
  );
  `;

  await client.sql`
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    booking_id INT REFERENCES bookings(id) ON DELETE CASCADE,
    satisfaction_score INT CHECK (satisfaction_score BETWEEN 1 AND 5),
    notes TEXT,
    call_time TIMESTAMP DEFAULT NOW()
);
`;

  await client.sql`
    INSERT INTO users (name, email, telephone, password)
   VALUES (${"John Doe"}, ${"john.doe@example.com"}, ${"2122222898"}, ${"password123"}),
     (${"Annie Ann"}, ${"annie.ann@example.com"}, ${"6461113232"}, ${"password123"}),
    (${"Will Willam"}, ${"will.willam@example.com"}, ${"909876777"}, ${"password123"}),
    (${"Simp Simperton"}, ${"simp.simperton@example.com"}, ${"0982341726"}, ${"password123"});
  `;

  await client.sql`
    INSERT INTO coaches (user_id) VALUES (${1}), (${2});
  `;

  await client.sql`
    INSERT INTO students (user_id) VALUES (${3}), (${4});
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
