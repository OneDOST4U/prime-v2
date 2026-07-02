# Phase 8 — Dynamic Forms and Drafts: Tasks

## Task 6: Attachments Routes (Backend)
- [x] 6.1 Create `apps/backend/src/routes/attachments.ts` with POST upload, GET list, and GET download endpoints
- [x] 6.2 Implement security checks in order: extension block, MIME magic byte, size limit (all before any MinIO write)
- [x] 6.3 Generate server-side MinIO object key using MIME-detected extension (not user filename)
- [x] 6.4 Insert ProposalAttachment record and audit_log entries for upload and download
- [x] 6.5 Create `apps/backend/src/routes/attachments.test.ts` with TC-FILE-01 through TC-FILE-06 (mock MinIO)

## Task 7: Seed Updates + Route Registration
- [x] 7.1 Extend `apps/backend/prisma/seed.ts` with Office, Programs (GIA/CEST/SSCP), FormTemplates, and ProposalTypes using upsert
- [x] 7.2 Register `@fastify/multipart` plugin in `apps/backend/src/app.ts` (50MB limit, before route registrations)
- [x] 7.3 Register `proposalTypesRoutes` and `attachmentsRoutes` in `apps/backend/src/app.ts`
- [x] 7.4 Run `npm run test -- --run` in `apps/backend` — all existing + new tests must pass

## Task 8: Frontend API Client
- [x] 8.1 Create `apps/frontend/src/lib/api.ts` with typed fetch wrapper (get, post, patch, delete, uploadFile)
- [x] 8.2 Export all API response interfaces (ProposalTypeSummary, FormField, FormSection, FormTemplateVersionResponse, ProposalSummary, ProposalDetail, AttachmentMeta)
- [x] 8.3 Run `npx tsc --noEmit` in `apps/frontend` — must exit 0

## Task 9: Frontend Pages
- [x] 9.1 Create `apps/frontend/src/pages/proposals/ProposalListPage.tsx` with fetch, loading/error/empty states, status badges, and "Create New Proposal" button
- [x] 9.2 Create `apps/frontend/src/pages/proposals/ProposalTypePage.tsx` with proposal type cards filtered by isActive
- [x] 9.3 Create `apps/frontend/src/pages/proposals/ProposalFormPage.tsx` with dynamic field rendering, 1500ms debounce autosave, and file upload support
- [x] 9.4 Create `apps/frontend/src/pages/proposals/ProposalDetailPage.tsx` with read-only field values, attachment list with download, and "Edit Draft" button
- [x] 9.5 Add new routes to `apps/frontend/src/App.tsx` for /proposals, /proposals/new, /proposals/new/:typeId, /proposals/:id
- [x] 9.6 Run `npx tsc --noEmit` in `apps/frontend` — must exit 0
