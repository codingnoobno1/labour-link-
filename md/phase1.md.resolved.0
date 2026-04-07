# Phase 1: Authentication & Shared Infrastructure

## Goal
Establish a strict separation between Worker and Employer authentication and prepare the database for role-based access.

## Folder Structure Update
```text
src/app/api/
  /labourlink/
    /auth/
      register/route.ts
      login/route.ts
      logout/route.ts
      me/route.ts
  /employer/
    /auth/
      register/route.ts
      login/route.ts
      logout/route.ts
      me/route.ts
```

## Database Schema Changes (Supabase)
- **Table: `profiles`**
  - Add column `role` text.
  - Constraint: `role IN ('labour', 'employer')`.
  - Update `handle_new_user` function to accept `role` from `raw_user_meta_data`.

## API Implementation
- `POST /api/labourlink/auth/register`: Signup with role 'labour'.
- `POST /api/employer/auth/register`: Signup with role 'employer'.
- `POST /api/labourlink/auth/login`: Verify if the user's role is 'labour' before issuing token (if applicable) or redirecting.
- `GET /api/[role]/auth/me`: Fetch current user info and role.

## Verification
- Register a user with 'labour' role.
- Register a user with 'employer' role.
- Ensure 'labour' user cannot access employer-only metadata (if any).
