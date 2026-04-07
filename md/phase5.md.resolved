# Phase 5: Dashboards, Analytics & Events

## Goal
Finalize the UI experience and add analytical layers to both sides of the marketplace.

## Folder Structure Update
```text
src/app/api/
  /labourlink/
    /dashboard/
      stats/route.ts
      activity/route.ts
    /events/
      route.ts
      [id]/route.ts
  /employer/
    /dashboard/
      stats/route.ts
      analytics/route.ts
```

## Database Schema Changes (Supabase)
- **Table: `events`**
  - Columns: `id`, `title`, `datetime` timestamp, `location`, `type`.

## Dashboard Stats (Worker)
- `GET /api/labourlink/dashboard/stats`: Total applications, accepted jobs, earned (estimated).
- `GET /api/labourlink/dashboard/activity`: Recent activity (applications, status changes).

## Dashboard Stats (Employer)
- `GET /api/employer/dashboard/stats`: Active jobs, total applications, pending hires.
- `GET /api/employer/dashboard/analytics`: Application trends, average bid amount for jobs.

## Events Implementation (Worker)
- `GET /api/labourlink/events`: Fetch list of upcoming training/events.
- `GET /api/labourlink/events/[id]`: Detailed view for worker.

## Verification
- Confirm that stats correctly reflect the state of the database.
- Confirm analytics are accurate for the employer.
- End-to-end walkthrough of the entire product.
