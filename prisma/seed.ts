import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 12);

  // Create admin user
  await prisma.user.upsert({
    where: { email: "admin@nextsecure.dev" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@nextsecure.dev",
      password: hashedPassword,
      role: "admin",
      emailVerified: new Date(),
    },
  });

  // Create regular user
  await prisma.user.upsert({
    where: { email: "user@nextsecure.dev" },
    update: {},
    create: {
      name: "User",
      email: "user@nextsecure.dev",
      password: hashedPassword,
      role: "user",
      emailVerified: new Date(),
    },
  });

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
