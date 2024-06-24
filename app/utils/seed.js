require('dotenv').config()
console.log(process.env)
const { db } = require("@vercel/postgres");
// const bcrypt = require("bcrypt");

async function seedMydays(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS mydays (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    day INT NOT NULL,
    month INT NOT NULL,
    year INT NOT NULL,
    productive BOOLEAN,
    broke_rules BOOLEAN,
    dayPassed BOOLEAN DEFAULT TRUE
  );
`;
  } catch (error) {
    console.error("Error seeding invoices:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedMydays(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
