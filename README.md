# 📌 Project Overview

## 🚀 Tech Stack

### Backend
- **NestJS** (modular architecture)
- **Prisma ORM** + **PostgreSQL** (UUID primary keys)
- **JWT** (access/refresh tokens)
- **SendGrid / Brevo** (email verification, password recovery)
- Guards & Decorators:
  - `AtGuard`, `RtGuard`, `RolesGuard`
  - `@Public()`, `@Roles()`, `@GetUserDecorator`
- Global `ExceptionFilter` for error handling

### Frontend (Mobile)
- **React Native (Expo)**
- **React Navigation** (enum `NAVIGATION_KEYS`)
- **React Hook Form** + **Zod** + `@hookform/resolvers`
- **Reusable Components**: `Input`, `InputError`
- **@expo/vector-icons** (icons, e.g., password visibility toggle)
- **SafeAreaProvider** for global background
- **IMAGE_MAP** — centralized asset management

---

## 📦 Backend Features

- 🔑 **Auth**
  - User registration
  - Login
  - Email verification (4-digit code)
  - Refresh tokens
  - Logout
  - Password recovery
- 👤 **User**
  - Get current user
  - Update profile
- 🛒 **Products**
  - CRUD with filtering, pagination, sorting
- 📦 **Orders**
  - Orders + OrderDetails
  - Visibility restricted to user’s own orders
- 💳 **Payments**
  - Payment model (status, transaction_id)
  - CRUD skeleton

---

## 📱 Frontend Features (Mobile)

- **Navigation**:  
  - `LOGIN`, `REGISTER`, `VERIFY` (enum `NAVIGATION_KEYS`)
- **Forms (React Hook Form + Zod)**:  
  - Validation for email, password, confirm password, shipping address, phone (digit-only regex)
- **UI**:  
  - Custom `Input` and `InputError` components
  - Password visibility toggle with icons
  - Centralized `IMAGE_MAP` for assets
- **Global background**: applied via `SafeAreaProvider` (`backgroundColor: #EDF1F7`)

---

## 📂 Project Structure

```bash
packages/
  backend/         # NestJS + Prisma backend
    src/
      auth/        # registration, login, JWT, email verification
      user/        # profile
      product/     # products
      order/       # orders and order details
      payment/     # payments
      common/      # guards, filters, decorators
      prisma/      # PrismaService + schema.prisma

  mobile/          # React Native (Expo)
    src/
      modules/
        auth/
          screens/ # Login, Register, Verify
          auth.schemas.ts
      navigation/
        components/root-navigator.tsx
        types/navigation.type.ts
      shared/
        components/
          input/
          input-error/
        constants/
          IMAGE_MAP.ts
```

---

## ⚙️ Getting Started

### Backend

```bash
cd packages/backend

# Install dependencies
yarn install

# Generate Prisma Client
yarn prisma generate

# Apply migrations
yarn prisma migrate dev --name init

# Run development server
yarn start:dev
```

### Mobile

```bash
cd packages/mobile

# Install dependencies
yarn install

# Start Expo project
yarn start
```

---

## ✅ Roadmap / TODO

- [ ] Add UI Kit (buttons, cards, icons)
- [ ] Implement email verification flow on frontend
- [ ] Integrate products/orders API into mobile app
- [ ] Add profile screen + edit functionality
- [ ] Implement payments integration (UI + backend logic)
