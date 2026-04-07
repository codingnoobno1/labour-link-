# Phase 4: Applications & Bid System

## Goal
Implement the core application logic with a flexible bidding system for workers.

## Folder Structure Update
```text
src/app/api/
  /labourlink/
    /apply/
      route.ts
      [id]/route.ts
      status/[id]/route.ts
  /employer/
    /applications/
      route.ts
      [jobId]/route.ts
      accept/route.ts
      reject/route.ts
      stats/route.ts
    /workers/
      route.ts
      [id]/route.ts
      invite/route.ts
```

## Database Schema Changes (Supabase)
- **Table: `applications`**
  - Columns: `id`, `user_id` (fk profiles), `work_id` (fk works), `status` (pending/accepted/rejected), `bid_amount` integer (new).

## Application Implementation (Worker)
- `POST /api/labourlink/apply`: Apply for job with custom bid amount.
- `GET /api/labourlink/apply`: List current worker's applications.
- `DELETE /api/labourlink/apply/[id]`: Cancel an application.
- `GET /api/labourlink/apply/status/[id]`: Get application status.

## Application Management (Employer)
- `GET /api/employer/applications`: List all applications received for employer's jobs.
- `GET /api/employer/applications/[jobId]`: All applications for a specific job.
- `PATCH /api/employer/applications/accept`: Accept a specific bid/application.
- `PATCH /api/employer/applications/reject`: Reject a specific bid/application.
- `GET /api/employer/applications/stats`: Aggregated application stats for employer.

## Worker Discovery (Employer)
- `GET /api/employer/workers`: Discover available workers.
- `GET /api/employer/workers/[id]`: View detailed worker profile.
- `POST /api/employer/workers/invite`: Invite worker to apply for a job.

## Verification
- Confirm that multiple workers can bid different amounts on the same job.
- Confirm employer can see the bid amount and choose the best fit.
