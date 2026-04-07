# Phase 2: Profiles & Company Management

## Goal
Implement a complete profile system for workers and a company setup for employers.

## Folder Structure Update
```text
src/app/api/
  /labourlink/
    /profile/
      route.ts
      update/route.ts
      upload-image/route.ts
      upload-aadhar/route.ts
      completion/route.ts
  /employer/
    /company/
      route.ts
      update/route.ts
      upload-logo/route.ts
```

## Database Schema Changes (Supabase)
- **Table: `companies`**
  - Columns: `id`, `owner_id` (fk profiles), `name`, `logo_url`, `location`, `created_at`.
- **Table: `documents`**
  - Columns: `id`, `user_id` (fk profiles), `type` (profile/aadhar), `url`, `verified`.

## Profile Implementation (Worker)
- `GET /api/labourlink/profile`: Fetch current worker's complete profile.
- `PUT /api/labourlink/profile/update`: Update worker details (name, phone, skills).
- `POST /api/labourlink/profile/upload-image`: Upload profile picture to Cloudinary.
- `POST /api/labourlink/profile/upload-aadhar`: Upload Aadhar card image to Cloudinary (for verification).
- `GET /api/labourlink/profile/completion`: Return % of profile completion.

## Company Implementation (Employer)
- `GET /api/employer/company`: Fetch current employer's company details.
- `PUT /api/employer/company/update`: Update company info (name, logo, location).
- `POST /api/employer/company/upload-logo`: Upload company logo to Cloudinary.

## Verification
- Confirm that worker document uploads are stored and linked correctly.
- Confirm company owner is correctly set to the employer profile.
