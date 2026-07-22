import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs";

const BASE_URL = "http://localhost:5173";
const outDir = "/Users/ahronjanl.rafaelahron.0804icloudcom/projects/prime-v2/.claude/skills/run-prime-v2/screenshots";
fs.mkdirSync(outDir, { recursive: true });

async function staffLogin(page, email, password) {
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Staff Login" }).click();
  await page.locator("#staff-email").fill(email);
  await page.locator("#staff-password").fill(password);
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL(/\/dashboard/, { timeout: 15_000 });
}

async function shot(page, name) {
  const file = path.join(outDir, `${name}.png`);
  await page.screenshot({ path: file, fullPage: true });
  console.log("screenshot:", file);
}

const browser = await chromium.launch();

// applicant: proposal list + open first proposal detail
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  page.on("console", (m) => { if (m.type() === "error") console.error("[console]", m.text()); });
  await staffLogin(page, "applicant@dev.local", "DevTestPassw0rd!123");
  await page.goto(`${BASE_URL}/proposals`, { waitUntil: "networkidle" });
  await shot(page, "qa-proposal-list");

  const firstCard = page.locator('[role="button"]').first();
  if (await firstCard.count() > 0) {
    await firstCard.click();
    await page.waitForTimeout(1500);
    await shot(page, "qa-proposal-detail");
  } else {
    console.log("no proposals found for applicant");
  }
  await ctx.close();
}

// rtec member: review page
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  page.on("console", (m) => { if (m.type() === "error") console.error("[console]", m.text()); });
  await staffLogin(page, "rtec.member@dev.local", "DevTestPassw0rd!123");
  await page.goto(`${BASE_URL}/rtec/queue`, { waitUntil: "networkidle" });
  await shot(page, "qa-rtec-queue");
  await ctx.close();
}

await browser.close();
