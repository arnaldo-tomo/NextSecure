#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const command = args[0];

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  dim: "\x1b[2m",
};

function log(msg) {
  console.log(`${colors.blue}[NextSecure]${colors.reset} ${msg}`);
}

function success(msg) {
  console.log(`${colors.green}✓${colors.reset} ${msg}`);
}

function warn(msg) {
  console.log(`${colors.yellow}⚠${colors.reset} ${msg}`);
}

function error(msg) {
  console.log(`${colors.red}✗${colors.reset} ${msg}`);
}

function banner() {
  console.log(`
${colors.blue}${colors.bright}
   ╔═══════════════════════════════════════╗
   ║         🔐 NextSecure v1.0.0         ║
   ║   Plug-and-play auth for Next.js     ║
   ╚═══════════════════════════════════════╝
${colors.reset}`);
}

function help() {
  banner();
  console.log(`
${colors.bright}Usage:${colors.reset}
  npx nextsecure <command>

${colors.bright}Commands:${colors.reset}
  ${colors.cyan}init${colors.reset}        Initialize NextSecure in your project
  ${colors.cyan}db:setup${colors.reset}    Set up the database with Prisma
  ${colors.cyan}db:seed${colors.reset}     Seed the database with demo users
  ${colors.cyan}help${colors.reset}        Show this help message

${colors.bright}Examples:${colors.reset}
  ${colors.dim}npx nextsecure init${colors.reset}
  ${colors.dim}npx nextsecure db:setup${colors.reset}
  ${colors.dim}npx nextsecure db:seed${colors.reset}
`);
}

function init() {
  banner();
  log("Initializing NextSecure...\n");

  // Check if .env exists
  if (!fs.existsSync(".env")) {
    if (fs.existsSync(".env.example")) {
      fs.copyFileSync(".env.example", ".env");
      success("Created .env from .env.example");
    } else {
      warn(".env.example not found — create .env manually");
    }
  } else {
    success(".env already exists");
  }

  // Generate NEXTAUTH_SECRET if not set
  const envContent = fs.readFileSync(".env", "utf8");
  if (envContent.includes("your-super-secret-key-change-in-production")) {
    const crypto = require("crypto");
    const secret = crypto.randomBytes(32).toString("hex");
    const updated = envContent.replace(
      "your-super-secret-key-change-in-production",
      secret
    );
    fs.writeFileSync(".env", updated);
    success("Generated NEXTAUTH_SECRET");
  }

  // Install dependencies
  log("Installing dependencies...");
  try {
    execSync("npm install", { stdio: "inherit" });
    success("Dependencies installed");
  } catch {
    error("Failed to install dependencies");
    process.exit(1);
  }

  // Setup database
  log("Setting up database...");
  try {
    execSync("npx prisma generate", { stdio: "inherit" });
    execSync("npx prisma db push", { stdio: "inherit" });
    success("Database ready");
  } catch {
    warn("Database setup skipped — configure DATABASE_URL in .env and run: npx nextsecure db:setup");
  }

  console.log(`
${colors.green}${colors.bright}
  ✅ NextSecure is ready!
${colors.reset}
  ${colors.dim}Run your dev server:${colors.reset}
  ${colors.cyan}npm run dev${colors.reset}

  ${colors.dim}Then open:${colors.reset}
  ${colors.cyan}http://localhost:3000${colors.reset}

  ${colors.dim}Demo accounts (after seeding):${colors.reset}
  ${colors.dim}Admin: admin@nextsecure.dev / password123${colors.reset}
  ${colors.dim}User:  user@nextsecure.dev / password123${colors.reset}

  ${colors.dim}Seed the database:${colors.reset}
  ${colors.cyan}npx nextsecure db:seed${colors.reset}
`);
}

function dbSetup() {
  banner();
  log("Setting up database...\n");

  try {
    execSync("npx prisma generate", { stdio: "inherit" });
    execSync("npx prisma db push", { stdio: "inherit" });
    success("Database schema pushed successfully!");
  } catch {
    error("Failed to setup database. Check your DATABASE_URL in .env");
    process.exit(1);
  }
}

function dbSeed() {
  banner();
  log("Seeding database...\n");

  try {
    execSync("npx prisma db seed", { stdio: "inherit" });
    success("Database seeded successfully!");
    console.log(`
  ${colors.dim}Demo accounts:${colors.reset}
  ${colors.cyan}Admin: admin@nextsecure.dev / password123${colors.reset}
  ${colors.cyan}User:  user@nextsecure.dev / password123${colors.reset}
`);
  } catch {
    error("Failed to seed database. Make sure the database is set up first.");
    process.exit(1);
  }
}

// Route commands
switch (command) {
  case "init":
    init();
    break;
  case "db:setup":
    dbSetup();
    break;
  case "db:seed":
    dbSeed();
    break;
  case "help":
  case "--help":
  case "-h":
  case undefined:
    help();
    break;
  default:
    error(`Unknown command: ${command}`);
    help();
    process.exit(1);
}
