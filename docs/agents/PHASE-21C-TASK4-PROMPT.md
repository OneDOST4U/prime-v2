# Phase 21C — Task 4 Execution Prompt

**Paste this whole file as the prompt to a Claude Code session.** It seeds FORM-002 through FORM-020 as `FormTemplate` rows and links each to all three proposal types via `ProposalTypeForm`.

---

## Context

PRIME v2 has 3 proposal types: `GIA-PROPOSAL`, `CEST-PROPOSAL`, `SSCP-PROPOSAL` (codes defined in `apps/backend/prisma/seed.ts`, `formDefs` array around line 156). Each already has its own `FormTemplate` for FORM-001 (`GIA-FORM-001`, `CEST-FORM-001`, `SSCP-FORM-001`) with full sections/fields, wired via `ProposalType.defaultFormTemplateId`.

Per `docs/forms/FORM-INVENTORY.md`, forms FORM-002 through FORM-020 are confirmed by the supervisor to apply to all three proposal types generally ("GIA, CEST, and SSCP generally use the same forms — exact per-program mapping to be verified with Process Owner"). Because of that caveat, treat each of these 19 forms as **shared** (one `FormTemplate` row per form, not one per program) and link them to all 3 proposal types via the `ProposalTypeForm` join model (`apps/backend/prisma/schema.prisma`).

`ProposalTypeForm` already exists in the schema:

```prisma
model ProposalTypeForm {
  id             String   @id @default(uuid()) @db.Uuid
  proposalTypeId String   @map("proposal_type_id") @db.Uuid
  formTemplateId String   @map("form_template_id") @db.Uuid
  displayOrder   Int      @default(0) @map("display_order")
  isRequired     Boolean  @default(true) @map("is_required")
  createdAt      DateTime @default(now()) @map("created_at") @db.Timestamptz()

  proposalType ProposalType @relation(fields: [proposalTypeId], references: [id])
  formTemplate FormTemplate @relation(fields: [formTemplateId], references: [id])

  @@unique([proposalTypeId, formTemplateId])
  @@index([proposalTypeId])
  @@map("proposal_type_forms")
}
```

There's already a `GET /api/proposal-types/:id/required-forms` endpoint (`apps/backend/src/routes/proposalTypes.ts`) and a frontend panel in `ProposalFormPage.tsx` that lists whatever `ProposalTypeForm` rows exist for the selected type, ordered by `displayOrder`. Once you seed the data below, that panel will populate with no frontend changes needed.

**Scope boundary — read this first:** Only FORM-001 currently renders real fillable sections/fields in the UI (`ProposalFormPage.tsx` only loads `defaultFormTemplateId`'s schema). This task does **not** build fillable UI for FORM-002–020 — that's a separate, larger task (parsing 19 spec files into `FormSection`/`FormField` rows, then extending the frontend to let applicants switch between multiple forms per proposal). This task only makes the 19 forms **visible** in the "forms required for this proposal" list, each as a `FormTemplate` with a minimal placeholder `FormTemplateVersion` (no sections/fields needed since nothing renders them yet).

## Task

In `apps/backend/prisma/seed.ts`, after the existing `formDefs` loop (ends around line 412, right before `console.log("Phase 8 seed: ...")`), add a new seeding block:

1. **Define the 19 forms** as a list, sourced from `docs/forms/FORM-INVENTORY.md` rows for FORM-002 through FORM-020 (columns: Form ID, Form Name, Source Type). Example entries:

   ```ts
   const sharedFormDefs = [
     { formCode: "FORM-002", title: "DOST-GIA Form 2 — Project Concept Proposal", sourceType: "Word" },
     { formCode: "FORM-003", title: "DOST-GIA Form 3 — Detailed R&D Program Proposal", sourceType: "Word" },
     // ... FORM-004 through FORM-020, exact titles/sourceType from FORM-INVENTORY.md
   ];
   ```

2. **Upsert each as a `FormTemplate`** (no sections/fields — this is a placeholder until the fillable-UI task):

   ```ts
   const sharedFormTemplates: Record<string, { id: string }> = {};
   for (const def of sharedFormDefs) {
     const formTemplate = await prisma.formTemplate.upsert({
       where: { formCode: def.formCode },
       update: {},
       create: {
         formCode: def.formCode,
         title: def.title,
         sourceType: def.sourceType,
         isActive: true,
       },
     });
     sharedFormTemplates[def.formCode] = formTemplate;
   }
   ```

3. **Link each to all 3 proposal types** via `ProposalTypeForm`, ordered to match FORM-002 (displayOrder 2) through FORM-020 (displayOrder 20) — reuse the FORM number as displayOrder so the panel lists them in document order, after FORM-001 (which is `defaultFormTemplateId`, not in this join table, so it's shown separately/first by the frontend already):

   ```ts
   const proposalTypeCodes = ["GIA-PROPOSAL", "CEST-PROPOSAL", "SSCP-PROPOSAL"];
   for (const ptCode of proposalTypeCodes) {
     const proposalType = await prisma.proposalType.findUniqueOrThrow({ where: { code: ptCode } });
     for (const [i, def] of sharedFormDefs.entries()) {
       await prisma.proposalTypeForm.upsert({
         where: {
           proposalTypeId_formTemplateId: {
             proposalTypeId: proposalType.id,
             formTemplateId: sharedFormTemplates[def.formCode].id,
           },
         },
         update: {},
         create: {
           proposalTypeId: proposalType.id,
           formTemplateId: sharedFormTemplates[def.formCode].id,
           displayOrder: i + 2, // FORM-002 => 2, FORM-003 => 3, ...
           isRequired: true,
         },
       });
     }
   }

   console.log("Phase 21C Task 4 seed: FORM-002–020 linked to GIA/CEST/SSCP proposal types.");
   ```

   Use `upsert` (not `create`) throughout — the seed script must stay idempotent (it's re-run in CI and by developers via `npx prisma db seed`).

4. **Update `docs/forms/FORM-INVENTORY.md`**: change FORM-002 through FORM-020's **Status** column from `Specification Draft` to `Implemented`, with a note like the FORM-001 row has: `Linked to GIA/CEST/SSCP proposal types via ProposalTypeForm (Phase 21C Task 4) — placeholder FormTemplate only, fillable sections/fields not yet built.`

## Verification

1. Run `docker exec -w /app prime-backend npx prisma db seed` (or from host against the dev DB directly) and confirm no errors, and that re-running it a second time produces no duplicate rows (idempotency check).
2. Add/extend a backend test in `apps/backend/src/routes/proposalTypes.test.ts` or a new `seed.test.ts`-style check confirming `GET /api/proposal-types/:id/required-forms` for `GIA-PROPOSAL` returns 19 entries (FORM-002–020) in ascending `displayOrder`.
3. Run `cd apps/backend && npx vitest run --no-file-parallelism` — must stay green (133+ tests).
4. Manually verify in the browser: log in as `applicant@dev.local`, go to `/proposals/new`, pick GIA — the "Forms required for this proposal" panel (already built) should now list 19 form titles.
5. Do not touch `apps/frontend/src/pages/proposals/ProposalFormPage.tsx` or the `/api/proposal-types/:id/required-forms` route — both already exist and read from `ProposalTypeForm`; this task is data-only.

## Out of scope (do not attempt)

- Building fillable sections/fields for FORM-002–020 (separate task).
- Changing `ProposalVersion` to support multiple forms per proposal (already decided against — see schema comment on `ProposalTypeForm`).
- Verifying per-program form applicability with the Process Owner (pending, per FORM-INVENTORY.md "Confirmed Rules"). If real per-program divergence is discovered later, only the `ProposalTypeForm` rows need to change — the schema already supports different forms per type.
