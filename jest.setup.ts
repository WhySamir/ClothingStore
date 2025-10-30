// jest.setup.ts
// Test setup: polyfills + env + prisma migrations + cleanup
// IMPORTANT: polyfills must run BEFORE anything that might use them (e.g. Prisma)

//////////
// 1) Polyfills (run first)
//////////

// setImmediate polyfill — Prisma's internals can call this.
if (typeof (global as any).setImmediate === "undefined") {
  (global as any).setImmediate = (
    fn: (...args: any[]) => void,
    ...args: any[]
  ) => setTimeout(fn, 0, ...args);
}

// Minimal Response polyfill for tests that use `new Response(...)`
// (Next/Edge code sometimes returns/constructs Response)
if (typeof (global as any).Response === "undefined") {
  (global as any).Response = class {
    body: any;
    status: number;
    headers: Record<string, string>;
    constructor(
      body?: any,
      init?: { status?: number; headers?: Record<string, string> } | undefined
    ) {
      this.body = body;
      this.status = init?.status ?? 200;
      this.headers = init?.headers ?? {};
    }
    async json() {
      if (typeof this.body === "string") {
        try {
          return JSON.parse(this.body);
        } catch {
          return this.body;
        }
      }
      return this.body;
    }
    async text() {
      if (typeof this.body === "string") return this.body;
      return JSON.stringify(this.body);
    }
  } as any;
}

// File.prototype.arrayBuffer polyfill for jsdom File objects that lack it
if (
  typeof (global as any).File !== "undefined" &&
  typeof (File.prototype as any).arrayBuffer !== "function"
) {
  (File.prototype as any).arrayBuffer = function () {
    // Default to empty buffer. If tests need actual bytes, create a mock File with .arrayBuffer returning desired data.
    return Promise.resolve(new Uint8Array(0).buffer);
  };
}

// Provide fetch/FormData/Request polyfills if available
// whatwg-fetch is optional but recommended. Install with: npm i -D whatwg-fetch
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("whatwg-fetch");
} catch (e) {
  // Not fatal. If you need fetch in tests, install whatwg-fetch.
  // console.warn("whatwg-fetch not installed — some fetch-related behaviors may be missing in tests");
}

//////////
// 2) Load environment variables (you already did this)
//////////
import { config } from "dotenv";
import { join } from "path";

config({ path: join(__dirname, "./.env.test") });

//////////
// 3) Now import Prisma and run DB setup
//////////
import { prisma } from "./src/app/lib/prisma";

jest.setTimeout(30000);

beforeAll(async () => {
  // Ensure prisma uses the test DB if provided
  process.env.DATABASE_URL =
    process.env.DATABASE_URL_TEST || process.env.DATABASE_URL;

  await prisma.$connect();

  // const { execSync } = require("child_process");

  // execSync("npx prisma migrate deploy", {
  //   stdio: "inherit",
  //   env: {
  //     ...process.env,
  //     DATABASE_URL: process.env.DATABASE_URL_TEST || process.env.DATABASE_URL,
  //   },
  // });
});

afterEach(async () => {
  // const tables = [
  //   "Admin",
  //   "Category",
  //   "Customer",
  //   "Product",
  //   "Tag",
  //   "ProductImage",
  //   "ProductSize",
  //   "ProductColor",
  //   "ProductFeature",
  //   "Review",
  //   "Cart",
  //   "WishlistItem",
  //   "OrderItem",
  //   "Order",
  // ];
  // for (const table of tables) {
  //   // Keep this raw to ensure proper cleanup between tests
  //   await prisma.$executeRawUnsafe(
  //     `TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE;`
  //   );
  // }
});

afterAll(async () => {
  await prisma.$disconnect();
});
