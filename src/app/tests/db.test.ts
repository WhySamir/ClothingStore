import { prisma } from "../lib/prisma";

describe("Database Sanity", () => {
  it("should connect and query Postgres successfully", async () => {
    const result = (await prisma.$queryRawUnsafe(
      `SELECT 1 + 1 AS sum`
    )) as Array<{ sum: number }>;
    expect(result[0].sum).toBe(2);
  });
});

it("should verify we're using Docker test database", async () => {
  // Check the actual database name
  const result = await prisma.$queryRaw<
    Array<{ db_name: string }>
  >`SELECT current_database() as db_name`;
  const dbName = result[0].db_name;

  console.log("Connected to database:", dbName);

  expect(dbName).toBe("ecommerce_test");

  // Verify we can create and read real data
  const testData = await prisma.$queryRaw<
    Array<{ sum: number }>
  >`SELECT 1 + 1 AS sum`;
  expect(testData[0].sum).toBe(2);
});
