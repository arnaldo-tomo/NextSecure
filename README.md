# 🔐 TomoAuth

**Plug-and-play authentication, dashboard & role-based access for Next.js 14+.**

Like Laravel Breeze, but for Next.js — modern, beautiful, and production-ready.

---

## ✨ Features

- **Authentication** — Login, register, password reset, email verification
- **Social Login** — Google & GitHub via NextAuth.js
- **Role-Based Access** — Admin/user roles with middleware protection
- **Modern Dashboard** — Responsive sidebar layout with TailwindCSS
- **Database Ready** — Prisma with PostgreSQL, MySQL, or SQLite support
- **Reusable Components** — Input, Button, Card, Badge, Avatar, Skeleton, Toast
- **Custom Hooks** — `useAuth()`, `useUser()`, `useRole()`
- **Email Templates** — Beautiful HTML emails for verification & password reset
- **Notifications** — Toast feedback + database-backed notification system
- **Type-Safe** — Full TypeScript with Zod validation

---

## 🚀 Quick Start

### 1. Clone / Install

```bash
git clone https://github.com/arnaldo-tomo/tomo-auth.git my-app
cd my-app
```

### 2. Initialize

```bash
npx tomo-auth init
```

This will:
- Create `.env` from `.env.example`
- Generate a secure `NEXTAUTH_SECRET`
- Install dependencies
- Set up the database

### 3. Seed Demo Users (optional)

```bash
npx tomo-auth db:seed
```

Demo accounts:
| Email | Password | Role |
|---|---|---|
| `admin@nextsecure.dev` | `password123` | admin |
| `user@nextsecure.dev` | `password123` | user |

### 4. Start Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
tomo-auth/
├── app/
│   ├── api/auth/
│   │   ├── [...nextauth]/route.ts   # NextAuth handler
│   │   ├── register/route.ts        # User registration
│   │   ├── forgot-password/route.ts # Password reset request
│   │   ├── reset-password/route.ts  # Password reset confirmation
│   │   └── verify-email/route.ts    # Email verification
│   ├── auth/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   ├── reset-password/page.tsx
│   │   └── verify-email/page.tsx
│   ├── dashboard/
│   │   ├── page.tsx                 # Main dashboard
│   │   ├── settings/page.tsx
│   │   ├── notifications/page.tsx
│   │   └── admin/page.tsx           # Admin-only panel
│   ├── layout.tsx
│   └── page.tsx                     # Landing page
├── components/
│   ├── ui/                          # Button, Input, Card, Badge, Avatar, Skeleton, Toast
│   ├── form/                        # AuthForm, SocialButtons
│   ├── layout/                      # Sidebar, Topbar, DashboardLayout
│   └── providers/                   # SessionProvider
├── hooks/
│   ├── useAuth.ts                   # login, register, forgotPassword, resetPassword, logout
│   ├── useUser.ts                   # user data, isAuthenticated, isLoading
│   └── useRole.ts                   # role, isAdmin, isUser, hasRole
├── lib/
│   ├── auth.ts                      # NextAuth config
│   ├── prisma.ts                    # Prisma client
│   ├── password.ts                  # bcrypt helpers
│   ├── email.ts                     # SMTP + HTML email templates
│   ├── middleware.ts                # Route protection logic
│   ├── validations.ts              # Zod schemas
│   └── utils.ts                     # cn(), generateToken(), etc.
├── prisma/
│   ├── schema.prisma               # Database schema
│   └── seed.ts                      # Demo data
├── styles/
│   └── globals.css                  # Tailwind + custom styles
├── middleware.ts                     # Next.js middleware entry
└── types/
    └── next-auth.d.ts               # Type extensions
```

---

## ⚙️ Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Database
DATABASE_URL="file:./dev.db"           # SQLite (default)
# DATABASE_URL="postgresql://..."      # PostgreSQL
# DATABASE_URL="mysql://..."           # MySQL

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="auto-generated"

# Social Login (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# Email (SMTP)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASSWORD=""
EMAIL_FROM="noreply@your-app.com"
```

### Database

Change the provider in `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // or "mysql" or "sqlite"
  url      = env("DATABASE_URL")
}
```

Then run:
```bash
npx prisma db push
```

---

## 🔑 Usage

### Hooks

```tsx
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import { useRole } from "@/hooks/useRole";

// Authentication actions
const { login, register, forgotPassword, resetPassword, logout } = useAuth();

// User data
const { user, isLoading, isAuthenticated } = useUser();

// Role checks
const { role, isAdmin, isUser, hasRole } = useRole();
```

### Protecting Pages

Routes under `/dashboard` are automatically protected by middleware. For custom protection:

```tsx
// In lib/middleware.ts, add routes:
const protectedRoutes = ["/dashboard", "/my-custom-route"];
const adminRoutes = ["/dashboard/admin", "/my-admin-route"];
```

### Custom Dashboard Layout

```tsx
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Package } from "lucide-react";

const customLinks = [
  { href: "/dashboard/products", label: "Products", icon: <Package size={20} /> },
];

export default function MyPage() {
  return (
    <DashboardLayout title="My Page" extraLinks={customLinks}>
      <p>Your content here</p>
    </DashboardLayout>
  );
}
```

### UI Components

```tsx
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Skeleton, CardSkeleton } from "@/components/ui/Skeleton";
```

---

## 📜 CLI Commands

| Command | Description |
|---|---|
| `npx tomo-auth init` | Full project initialization |
| `npx tomo-auth db:setup` | Push Prisma schema to database |
| `npx tomo-auth db:seed` | Seed demo users |
| `npx tomo-auth help` | Show help |

---

## 🛡️ Security

- Passwords hashed with **bcrypt** (12 rounds)
- CSRF protection via NextAuth.js
- JWT-based sessions (30-day expiry)
- Email enumeration prevention on forgot-password
- Input validation with **Zod** on client and server
- Middleware-based route protection

---

## 📦 Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14+ | Framework (App Router) |
| NextAuth.js | Authentication |
| Prisma | ORM / Database |
| TailwindCSS | Styling |
| Zod | Validation |
| bcryptjs | Password hashing |
| Nodemailer | Email sending |
| Lucide React | Icons |
| react-hot-toast | Toast notifications |

---

## 👤 Author

**Arnaldo Tomo**

- Website: [arnaldotomo.dev](https://arnaldotomo.dev/)
- npm: [@arnaldo-tomo](https://www.npmjs.com/~arnaldo-tomo)
- GitHub: [@arnaldo-tomo](https://github.com/arnaldo-tomo)

---

## 📄 License

MIT License — free for personal and commercial use.

---

Built with ❤️ by [Arnaldo Tomo](https://arnaldotomo.dev/).
