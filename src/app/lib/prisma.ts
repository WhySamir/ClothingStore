import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  // In test environment, ensure we're using test database
  if (process.env.NODE_ENV === "test") {
    const { config } = require("dotenv");
    const { join } = require("path");

    // Reload env vars for test
    config({ path: join(process.cwd(), ".env.test") });
  }

  return new PrismaClient();
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
