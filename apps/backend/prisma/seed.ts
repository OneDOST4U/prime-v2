import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const ROLES: Array<{ code: string; name: string; description: string }> = [
  { code: "APPLICANT", name: "Applicant", description: "External grant applicant" },
  { code: "ADMIN", name: "System Administrator", description: "Manages users, roles, and system configuration" },
  { code: "PROJECT_FOCAL", name: "Project Focal", description: "First-line internal reviewer for assigned proposals" },
  { code: "RTEC_MEMBER", name: "RTEC Member", description: "Reviews assigned proposals for a committee" },
  { code: "RTEC_HEAD", name: "RTEC Head", description: "Consolidates RTEC member reviews" },
  { code: "BUDGET_OFFICER", name: "Budget Officer", description: "Reviews budget line items" },
  { code: "ACCOUNTANT", name: "Accountant", description: "Reviews accounting classifications" },
  { code: "REGIONAL_DIRECTOR", name: "Regional Director", description: "Issues final approval decisions" },
];

// Dev-only known credentials. NEVER use these accounts or passwords outside a
// local development database.
const DEV_PASSWORD = "DevTestPassw0rd!123";
const DEV_ADMIN_EMAIL = "admin@dev.local";
const DEV_ADMIN_PASSWORD = "DevAdminPassw0rd!123";

const DEV_USERS: Array<{
  email: string;
  firstName: string;
  lastName: string;
  roleCode: string;
  kind: "staff" | "applicant";
}> = [
  { email: DEV_ADMIN_EMAIL, firstName: "Dev", lastName: "Admin", roleCode: "ADMIN", kind: "staff" },
  { email: "applicant@dev.local", firstName: "Dev", lastName: "Applicant", roleCode: "APPLICANT", kind: "applicant" },
  { email: "focal@dev.local", firstName: "Dev", lastName: "Focal", roleCode: "PROJECT_FOCAL", kind: "staff" },
  { email: "rtec.member@dev.local", firstName: "Dev", lastName: "RtecMember", roleCode: "RTEC_MEMBER", kind: "staff" },
  { email: "rtec.head@dev.local", firstName: "Dev", lastName: "RtecHead", roleCode: "RTEC_HEAD", kind: "staff" },
  { email: "budget@dev.local", firstName: "Dev", lastName: "Budget", roleCode: "BUDGET_OFFICER", kind: "staff" },
  { email: "accountant@dev.local", firstName: "Dev", lastName: "Accountant", roleCode: "ACCOUNTANT", kind: "staff" },
  { email: "rd@dev.local", firstName: "Dev", lastName: "Director", roleCode: "REGIONAL_DIRECTOR", kind: "staff" },
];

async function seedDevUser(
  def: (typeof DEV_USERS)[number],
  password: string,
) {
  const role = await prisma.role.findUniqueOrThrow({ where: { code: def.roleCode } });
  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email: def.email },
    update: {
      firstName: def.firstName,
      lastName: def.lastName,
      isActive: true,
      mustChangePassword: false,
    },
    create: {
      email: def.email,
      passwordHash,
      firstName: def.firstName,
      lastName: def.lastName,
      isActive: true,
      mustChangePassword: false,
    },
  });

  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: user.id, roleId: role.id } },
    update: {},
    create: { userId: user.id, roleId: role.id },
  });

  if (def.kind === "applicant") {
    await prisma.applicantProfile.upsert({
      where: { userId: user.id },
      update: {
        institution: "Dev Test University",
        positionTitle: "Researcher",
        contactNumber: "+63-900-000-0001",
        privacyConsentGiven: true,
        privacyConsentAt: new Date(),
      },
      create: {
        userId: user.id,
        institution: "Dev Test University",
        positionTitle: "Researcher",
        contactNumber: "+63-900-000-0001",
        privacyConsentGiven: true,
        privacyConsentAt: new Date(),
      },
    });
  } else {
    await prisma.staffProfile.upsert({
      where: { userId: user.id },
      update: { positionTitle: `${def.roleCode.replaceAll("_", " ")} (Dev)` },
      create: { userId: user.id, positionTitle: `${def.roleCode.replaceAll("_", " ")} (Dev)` },
    });
  }

  return user;
}

async function main() {
  for (const role of ROLES) {
    await prisma.role.upsert({
      where: { code: role.code },
      update: { name: role.name, description: role.description, isActive: true },
      create: { ...role, isActive: true },
    });
  }

  for (const def of DEV_USERS) {
    const password =
      def.email === DEV_ADMIN_EMAIL ? DEV_ADMIN_PASSWORD : DEV_PASSWORD;
    await seedDevUser(def, password);
  }

  const adminUser = await prisma.user.findUniqueOrThrow({
    where: { email: DEV_ADMIN_EMAIL },
  });

  console.log("Seeded 8 role codes.");
  console.log(
    `Seeded ${DEV_USERS.length} dev test users (@dev.local) — see docs/deployment/DEV-TEST-ACCOUNTS.md`,
  );
  console.log(
    `  Admin: ${DEV_ADMIN_EMAIL} / ${DEV_ADMIN_PASSWORD}`,
  );
  console.log(`  Other roles: *@dev.local / ${DEV_PASSWORD}`);

  // ── Phase 8: Office, Programs, Form Templates, Proposal Types ────────────────

  // 1. Office
  const office = await prisma.office.upsert({
    where: { code: "DOST-RO2" },
    update: {},
    create: { name: "DOST Regional Office 02", code: "DOST-RO2", isActive: true },
  });

  // 2. Three programs
  const programDefs = [
    { code: "GIA", name: "Grants-in-Aid" },
    { code: "CEST", name: "Community Empowerment Through Science and Technology" },
    { code: "SSCP", name: "Small Scholarship and Capability Program" },
  ];

  const seededPrograms: Record<string, { id: string }> = {};
  for (const def of programDefs) {
    const program = await prisma.program.upsert({
      where: { code: def.code },
      update: {},
      create: { code: def.code, name: def.name, officeId: office.id, isActive: true },
    });
    seededPrograms[def.code] = program;
  }

  // 3. For each program: FormTemplate + FormTemplateVersion + 2 sections + 4 fields + ProposalType
  const formDefs = [
    {
      programCode: "GIA",
      formCode: "GIA-FORM-001",
      title: "GIA Proposal Form",
      ptCode: "GIA-PROPOSAL",
      ptName: "GIA Research Proposal",
    },
    {
      programCode: "CEST",
      formCode: "CEST-FORM-001",
      title: "CEST Proposal Form",
      ptCode: "CEST-PROPOSAL",
      ptName: "CEST Research Proposal",
    },
    {
      programCode: "SSCP",
      formCode: "SSCP-FORM-001",
      title: "SSCP Proposal Form",
      ptCode: "SSCP-PROPOSAL",
      ptName: "SSCP Research Proposal",
    },
  ];

  for (const def of formDefs) {
    const program = seededPrograms[def.programCode];

    // FormTemplate
    const formTemplate = await prisma.formTemplate.upsert({
      where: { formCode: def.formCode },
      update: {},
      create: { formCode: def.formCode, title: def.title, isActive: true },
    });

    // Check if a current version already exists
    const existingVersion = await prisma.formTemplateVersion.findFirst({
      where: { formTemplateId: formTemplate.id, isCurrent: true },
    });

    if (!existingVersion) {
      const formVersion = await prisma.formTemplateVersion.create({
        data: {
          formTemplateId: formTemplate.id,
          versionNumber: 1,
          schemaVersion: "1.0",
          isCurrent: true,
          publishedAt: new Date(),
        },
      });

      // Section 1: Project Information
      const section1 = await prisma.formSection.create({
        data: {
          formTemplateVersionId: formVersion.id,
          sectionCode: `${def.programCode}-S1`,
          title: "Project Information",
          displayOrder: 1,
          isRepeating: false,
          isRequired: true,
        },
      });
      await prisma.formField.createMany({
        data: [
          {
            formSectionId: section1.id,
            fieldCode: `${def.programCode}-F1`,
            label: "Project Title",
            inputType: "TEXT",
            isRequired: true,
            displayOrder: 1,
          },
          {
            formSectionId: section1.id,
            fieldCode: `${def.programCode}-F2`,
            label: "Project Description",
            inputType: "TEXTAREA",
            isRequired: true,
            displayOrder: 2,
          },
        ],
      });

      // Section 2: Budget
      const section2 = await prisma.formSection.create({
        data: {
          formTemplateVersionId: formVersion.id,
          sectionCode: `${def.programCode}-S2`,
          title: "Budget",
          displayOrder: 2,
          isRepeating: false,
          isRequired: true,
        },
      });
      await prisma.formField.createMany({
        data: [
          {
            formSectionId: section2.id,
            fieldCode: `${def.programCode}-F3`,
            label: "Total Budget Amount",
            inputType: "NUMBER",
            isRequired: true,
            displayOrder: 1,
          },
          {
            formSectionId: section2.id,
            fieldCode: `${def.programCode}-F4`,
            label: "Supporting Documents",
            inputType: "FILE",
            isRequired: true,
            displayOrder: 2,
          },
        ],
      });
    }

    // ProposalType — link to program and formTemplate
    await prisma.proposalType.upsert({
      where: { code: def.ptCode },
      update: {},
      create: {
        code: def.ptCode,
        name: def.ptName,
        programId: program.id,
        defaultFormTemplateId: formTemplate.id,
        isActive: true,
      },
    });
  }

  console.log("Phase 8 seed: Office, Programs, Form Templates, and Proposal Types upserted.");

  // ── Phase 10: Workflow definitions ────────────────────────────────────────────
  const proposalWorkflow = await prisma.workflowDefinition.upsert({
    where: { code: "PROPOSAL_LIFECYCLE" },
    update: {},
    create: {
      code: "PROPOSAL_LIFECYCLE",
      name: "Proposal Approval Lifecycle",
      isActive: true,
    },
  });

  const focalTransitions = [
    { fromStatus: "SUBMITTED_TO_FOCAL", toStatus: "UNDER_FOCAL_REVIEW", actionCode: "ACKNOWLEDGE", actorRole: "PROJECT_FOCAL" },
    { fromStatus: "RESUBMITTED_TO_FOCAL", toStatus: "UNDER_FOCAL_REVIEW", actionCode: "ACKNOWLEDGE", actorRole: "PROJECT_FOCAL" },
    { fromStatus: "UNDER_FOCAL_REVIEW", toStatus: "RETURNED_TO_APPLICANT", actionCode: "RETURN_TO_APPLICANT", actorRole: "PROJECT_FOCAL" },
    { fromStatus: "UNDER_FOCAL_REVIEW", toStatus: "ENDORSED_TO_RTEC", actionCode: "ENDORSE_TO_RTEC", actorRole: "PROJECT_FOCAL" },
    { fromStatus: "RETURNED_TO_FOCAL_BY_RTEC", toStatus: "ENDORSED_TO_RTEC", actionCode: "RETURN_TO_RTEC", actorRole: "PROJECT_FOCAL" },
    { fromStatus: "RETURNED_TO_FOCAL_BY_RTEC", toStatus: "ENDORSED_TO_BUDGET", actionCode: "ENDORSE_TO_BUDGET", actorRole: "PROJECT_FOCAL" },
  ];

  for (const t of focalTransitions) {
    const existing = await prisma.workflowTransition.findFirst({
      where: {
        actionCode: t.actionCode,
        actorRole: t.actorRole,
        fromStatus: t.fromStatus,
        workflowDefinitionId: proposalWorkflow.id,
      },
    });
    if (!existing) {
      await prisma.workflowTransition.create({
        data: {
          workflowDefinitionId: proposalWorkflow.id,
          fromStatus: t.fromStatus,
          toStatus: t.toStatus,
          actionCode: t.actionCode,
          actorRole: t.actorRole,
        },
      });
    }
  }
  console.log("✓ Phase 10: workflow_definitions and workflow_transitions seeded");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
