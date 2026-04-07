# Phase 3: Job Management & Feed

## Goal
Enable employers to manage job postings and workers to explore opportunities.

## Folder Structure Update
```text
src/app/api/
  /labourlink/
    /work/
      route.ts
      [id]/route.ts
      filter/route.ts
      recommended/route.ts
  /employer/
    /jobs/
      create/route.ts
      route.ts
      [id]/route.ts
      update/[id]/route.ts
      delete/[id]/route.ts
      status/[id]/route.ts
```

## Database Schema Changes (Supabase)
- **Table: `works` (Jobs)**
  - Columns: `id`, `company_id` (fk companies), `title`, `description`, `location`, `pay` integer, `duration`, `type` text (shift/fulltime), `status` text (open/closed).

## Job Management (Employer)
- `POST /api/employer/jobs/create`: Post a new job.
- `GET /api/employer/jobs`: List all jobs posted by the current employer.
- `GET /api/employer/jobs/[id]`: Fetch detailed job info.
- `PUT /api/employer/jobs/update/[id]`: Modify an existing job.
- `DELETE /api/employer/jobs/delete/[id]`: Remove a job listing.
- `PATCH /api/employer/jobs/status/[id]`: Update job status (open/closed).

## Work Feed (Worker)
- `GET /api/labourlink/work`: Fetch open job listings.
- `GET /api/labourlink/work/[id]`: Detailed view for worker.
- `GET /api/labourlink/work/filter`: Apply sorting/filtering (e.g., higher pay first).
- `GET /api/labourlink/work/recommended`: Jobs based on worker's skill set.

## Verification
- Confirm employer only lists their own jobs.
- Confirm worker only sees 'open' jobs.
