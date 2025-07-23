// src/lib/serverInit.ts
import { prisma } from "@/app/lib/prisma";
import { googleAvatartoCloud } from "@/app/lib/googleAvatar";
let hasRun = false;
export async function runServerStartupTasks() {
    if (hasRun) return;
  
  const customers = await prisma.customer.findMany({
    where: {
      userAvatarUrl: {
        contains: "googleusercontent", // or any logic to detect Google avatars
      },
    },
  });

  for (const customer of customers) {
    await googleAvatartoCloud(customer); // Only if needed
  }

  console.log("✅ Server startup task completed.");
  hasRun = true;
}
