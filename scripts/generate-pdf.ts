// PDF generation script using Playwright
// Run via: pnpm generate-pdf
// Requires Playwright browsers installed: pnpm exec playwright install chromium

import path from "path";
import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const OUTPUT_DIR = path.join(process.cwd(), "public", "downloads");

async function generatePdf() {
  console.log("Launching browser...");
  const browser = await chromium.launch();

  try {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
    });

    const page = await context.newPage();

    console.log(`Loading ${BASE_URL}/module/flipbook...`);
    await page.goto(`${BASE_URL}/module/flipbook`, {
      waitUntil: "networkidle",
      timeout: 30000,
    });

    await page.waitForTimeout(2000);

    const outputPath = path.join(OUTPUT_DIR, "module-latest.pdf");
    console.log(`Generating PDF: ${outputPath}`);

    await page.pdf({
      path: outputPath,
      format: "A4",
      margin: { top: "15mm", bottom: "15mm", left: "20mm", right: "20mm" },
      printBackground: true,
    });

    console.log("PDF generated successfully.");
  } catch (error) {
    console.error("Failed to generate PDF:", error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

generatePdf();
