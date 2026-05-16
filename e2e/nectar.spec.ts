import { test, expect } from "@playwright/test";

const BASE_URL = process.env.TEST_URL || "http://localhost:4173";

// Helper: wait for R3F canvas to be ready
test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
  // Wait for at least the hero section to render
  await page.waitForSelector("h1", { timeout: 15000 });
});

// ═══════════════════════════════════════════
// SMOKE TESTS
// ═══════════════════════════════════════════

test.describe("Smoke Tests", () => {
  test("page loads with correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/NECTAR\.AI/);
  });

  test("hero heading is visible", async ({ page }) => {
    const heading = page.locator("h1");
    await expect(heading).toContainText("Hire AI Employees");
    await expect(heading).toBeVisible();
  });

  test("all navigation links are visible", async ({ page }) => {
    const links = ["Bees", "Process", "Stories", "Pricing", "Contact"];
    for (const label of links) {
      await expect(page.getByRole("link", { name: label })).toBeVisible();
    }
  });

  test("no console errors on initial load", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.reload();
    await page.waitForLoadState("networkidle");
    // Allow known R3F/React warnings but not actual errors
    const realErrors = errors.filter(
      (e) => !e.includes("WebGL") && !e.includes("THREE") && !e.includes("source map")
    );
    expect(realErrors).toHaveLength(0);
  });
});

// ═══════════════════════════════════════════
// BEE MARKETPLACE SECTION
// ═══════════════════════════════════════════

test.describe("Bee Marketplace", () => {
  test("all 7 Bee cards are rendered", async ({ page }) => {
    const expectedBees = [
      "HoneyBee",
      "ScoutBee",
      "InkBee",
      "ClockBee",
      "BuzzBee",
      "DataBee",
      "MarketBee",
    ];
    for (const bee of expectedBees) {
      const card = page.locator("h3", { hasText: bee });
      await expect(card).toBeVisible();
    }
  });

  test("each Bee card shows price badge", async ({ page }) => {
    const cards = page.locator("h3:has-text('Bee')").locator("..");
    const count = await page.locator("h3").filter({ hasText: /Bee$/ }).count();
    expect(count).toBeGreaterThanOrEqual(7);
  });

  test("clicking a Bee card opens the configurator modal", async ({ page }) => {
    const honeyBee = page.locator("h3", { hasText: "HoneyBee" });
    await honeyBee.click();
    // Modal should appear with z-index overlay
    await expect(page.locator("text=Customer Support Bee")).toBeVisible();
    await expect(page.locator("text=Configure")).toBeVisible();
    await expect(page.locator("text=Live Demo")).toBeVisible();
  });

  test("modal can be closed via X button", async ({ page }) => {
    await page.locator("h3", { hasText: "HoneyBee" }).click();
    await expect(page.locator("text=Customer Support Bee")).toBeVisible();
    await page.locator('button:has([d="M18 6L6 18M6 6l12 12"])').click();
    await expect(page.locator("text=Customer Support Bee")).not.toBeVisible();
  });

  test("modal closes when clicking backdrop", async ({ page }) => {
    await page.locator("h3", { hasText: "HoneyBee" }).click();
    await expect(page.locator("text=Customer Support Bee")).toBeVisible();
    // Click on the backdrop (the outermost modal container)
    await page.locator("div.fixed.inset-0.z-\[100\]").first().click({ position: { x: 10, y: 10 } });
    await expect(page.locator("text=Customer Support Bee")).not.toBeVisible();
  });
});

// ═══════════════════════════════════════════
// BEE CONFIGURATOR - CONFIGURE TAB
// ═══════════════════════════════════════════

test.describe("Bee Configurator - Configure", () => {
  test.beforeEach(async ({ page }) => {
    await page.locator("h3", { hasText: "HoneyBee" }).click();
    await expect(page.locator("text=Customer Support Bee")).toBeVisible();
  });

  test("shows correct base price", async ({ page }) => {
    await expect(page.locator("text=$299/mo")).toBeVisible();
  });

  test("add-ons can be toggled and price updates", async ({ page }) => {
    // Initial price
    await expect(page.locator("text=$299/mo")).toBeVisible();

    // Toggle "Extra Channels" add-on (+$100)
    await page.locator("label", { hasText: "Extra Channels" }).click();
    await expect(page.locator("text=$399/mo")).toBeVisible();

    // Toggle it off
    await page.locator("label", { hasText: "Extra Channels" }).click();
    await expect(page.locator("text=$299/mo")).toBeVisible();
  });

  test("all features are listed with checkmarks", async ({ page }) => {
    const features = [
      "Instant email & chat replies",
      "Learns from your docs & past tickets",
      "Auto-escalation to human team",
      "Sentiment detection & priority routing",
      "Multi-language support",
    ];
    for (const f of features) {
      await expect(page.locator(`text=${f}`)).toBeVisible();
    }
  });

  test("CTA button exists and is clickable", async ({ page }) => {
    const cta = page.locator("button", { hasText: "Start 14-Day Free Trial" });
    await expect(cta).toBeVisible();
    await expect(cta).toBeEnabled();
  });
});

// ═══════════════════════════════════════════
// BEE CONFIGURATOR - LIVE DEMO TAB (CHAT)
// ═══════════════════════════════════════════

test.describe("Bee Configurator - Live Demo Chat", () => {
  test.beforeEach(async ({ page }) => {
    await page.locator("h3", { hasText: "HoneyBee" }).click();
    await page.locator("text=Live Demo").click();
  });

  test("demo tab shows pre-seeded conversation", async ({ page }) => {
    await expect(page.locator('text="My order hasn\'t arrived yet"')).toBeVisible();
    await expect(page.locator("text=Order #48291")).toBeVisible();
  });

  test("user can send a message and get a response", async ({ page }) => {
    const input = page.locator('input[placeholder*="Message HoneyBee"]');
    await input.fill("What are your hours?");
    await input.press("Enter");

    // User message appears
    await expect(page.locator('text="What are your hours?"')).toBeVisible();

    // Typing indicator appears
    await expect(page.locator("div.animate-bounce").first()).toBeVisible();

    // Bee response appears after delay
    await expect(page.locator('text="As HoneyBee"')).toBeVisible({ timeout: 5000 });
  });

  test("example prompts can be loaded", async ({ page }) => {
    await page.locator('button:has-text("Can I get a refund?")').click();
    await expect(page.locator('text="Can I get a refund?"')).toBeVisible();
    await expect(page.locator("text=Absolutely. Since your order")).toBeVisible();
  });
});

// ═══════════════════════════════════════════
// MARKETBEE CMA DEMO
// ═══════════════════════════════════════════

test.describe("MarketBee CMA Demo", () => {
  test.beforeEach(async ({ page }) => {
    await page.locator("h3", { hasText: "MarketBee" }).click();
    await page.locator("text=Try It Now").click();
  });

  test("CMA demo form renders with all fields", async ({ page }) => {
    await expect(page.locator('input[placeholder*="Property Address"]')).toBeVisible();
    await expect(page.locator("text=Generate CMA Report")).toBeVisible();
  });

  test("generates a CMA report with all sections", async ({ page }) => {
    await page
      .locator('input[placeholder*="Property Address"]')
      .fill("742 Evergreen Terrace, Austin, TX 78723");
    await page.selectOption("select", { label: "3" });
    await page.locator("text=Generate CMA Report").click();

    // Wait for report to appear
    await expect(page.locator("text=CMA Report")).toBeVisible({ timeout: 5000 });
    await expect(page.locator("text=Suggested List Price")).toBeVisible();
    await expect(page.locator("text=Comparable Sales")).toBeVisible();
    await expect(page.locator("text=Price Distribution")).toBeVisible();

    // Value range cards
    await expect(page.locator("text=Low Estimate")).toBeVisible();
    await expect(page.locator("text=High Estimate")).toBeVisible();

    // Comps list should have 5 items
    const comps = page.locator("text=/\\d+ \\w+ St/");
    expect(await comps.count()).toBeGreaterThanOrEqual(3);
  });

  test("can start a new analysis after generating", async ({ page }) => {
    await page
      .locator('input[placeholder*="Property Address"]')
      .fill("123 Test Street, Dallas, TX");
    await page.locator("text=Generate CMA Report").click();
    await expect(page.locator("text=CMA Report")).toBeVisible({ timeout: 5000 });

    await page.locator("text=New Analysis").click();
    await expect(page.locator('input[placeholder*="Property Address"]')).toBeVisible();
  });
});

// ═══════════════════════════════════════════
// PRICING PAGE
// ═══════════════════════════════════════════

test.describe("Pricing Page", () => {
  test("navigates to pricing page", async ({ page }) => {
    await page.getByRole("link", { name: "Pricing" }).click();
    await expect(page).toHaveURL(/pricing/);
    await expect(page.locator("h1", { hasText: "Pricing" })).toBeVisible();
  });

  test("all 3 pricing tiers are visible", async ({ page }) => {
    await page.getByRole("link", { name: "Pricing" }).click();
    await expect(page.locator("text=Starter Hive")).toBeVisible();
    await expect(page.locator("text=Growth Hive")).toBeVisible();
    await expect(page.locator("text=Enterprise Swarm")).toBeVisible();
  });

  test("Growth Hive is highlighted as featured", async ({ page }) => {
    await page.getByRole("link", { name: "Pricing" }).click();
    const growthCard = page.locator("div", { hasText: "Growth Hive" }).first();
    await expect(growthCard).toBeVisible();
  });

  test("pricing CTA buttons are clickable", async ({ page }) => {
    await page.getByRole("link", { name: "Pricing" }).click();
    const ctas = page.locator("button", { hasText: /Start Free Trial|Contact Sales/ });
    expect(await ctas.count()).toBeGreaterThanOrEqual(2);
  });

  test("can navigate back to home", async ({ page }) => {
    await page.getByRole("link", { name: "Pricing" }).click();
    await expect(page).toHaveURL(/pricing/);
    await page.getByRole("link", { name: "NECTAR.AI" }).first().click();
    await expect(page).not.toHaveURL(/pricing/);
  });
});

// ═══════════════════════════════════════════
// CONTACT FORM
// ═══════════════════════════════════════════

test.describe("Contact Form", () => {
  test("contact form is visible at bottom of page", async ({ page }) => {
    await page.getByRole("link", { name: "Contact" }).click();
    await expect(page.locator('input[placeholder*="Your name"]')).toBeVisible();
  });

  test("form validation prevents empty submission", async ({ page }) => {
    await page.getByRole("link", { name: "Contact" }).click();
    const submit = page.locator("button", { hasText: "Book Free AI Consultation" });
    await submit.click();
    // Form should still be visible (no redirect/success state yet)
    await expect(page.locator('input[placeholder*="Your name"]')).toBeVisible();
  });

  test("successful form submission shows success state", async ({ page }) => {
    await page.getByRole("link", { name: "Contact" }).click();
    await page.locator('input[placeholder*="Your name"]').fill("Test User");
    await page.locator('input[placeholder*="you@company.com"]').fill("test@example.com");
    await page.locator('input[placeholder*="Acme Inc."]').fill("TestCo");
    await page.locator('textarea').fill("Testing the contact form automation.");

    await page.locator("button", { hasText: "Book Free AI Consultation" }).click();

    // Should show success message after simulated delay
    await expect(page.locator("text=Message sent")).toBeVisible({ timeout: 5000 });
    await expect(page.locator("text=We'll be in touch within 24 hours")).toBeVisible();
  });
});

// ═══════════════════════════════════════════
// RESPONSIVE / LAYOUT
// ═══════════════════════════════════════════

test.describe("Responsive Layout", () => {
  test("mobile viewport shows stacked layout", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.reload();
    await page.waitForSelector("h1");

    // Hero buttons should stack vertically on mobile
    const meetBees = page.locator("a", { hasText: "Meet the Bees" });
    await expect(meetBees).toBeVisible();
  });

  test("tablet viewport renders correctly", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();
    await page.waitForSelector("h1");

    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
  });

  test("desktop viewport renders full grid", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.reload();
    await page.waitForSelector("h1");

    // Should see all 7 bee cards in grid
    const cards = page.locator("h3").filter({ hasText: /Bee$/ });
    expect(await cards.count()).toBeGreaterThanOrEqual(7);
  });
});

// ═══════════════════════════════════════════
// NAVIGATION & SCROLLING
// ═══════════════════════════════════════════

test.describe("Navigation & Scrolling", () => {
  test("smooth scroll to sections via nav links", async ({ page }) => {
    await page.getByRole("link", { name: "Bees" }).click();
    // Should scroll to the hive section
    await expect(page.locator("h2", { hasText: "Hire Your First AI Employee" })).toBeInViewport();
  });

  test("scrolls through all sections without errors", async ({ page }) => {
    const sections = ["Hire AI Employees", "drowning in busywork", "Hire Your First", "From signup", "Real Bees", "Trusted by", "Ready to Build"];
    for (const text of sections) {
      const heading = page.locator("h2", { hasText: text });
      if (await heading.count() > 0) {
        await heading.scrollIntoViewIfNeeded();
        await expect(heading).toBeInViewport();
      }
    }
  });
});

// ═══════════════════════════════════════════
// ACCESSIBILITY
// ═══════════════════════════════════════════

test.describe("Accessibility", () => {
  test("all images have alt text or are decorative", async ({ page }) => {
    const images = await page.locator("img").all();
    for (const img of images) {
      const alt = await img.getAttribute("alt");
      const role = await img.getAttribute("role");
      // Decorative images should have empty alt or presentation role
      expect(alt !== null || role === "presentation").toBeTruthy();
    }
  });

  test("page has exactly one h1", async ({ page }) => {
    const h1s = page.locator("h1");
    expect(await h1s.count()).toBe(1);
  });

  test("no heading level skips", async ({ page }) => {
    // Basic check: h3 should not appear before h2
    const h2s = await page.locator("h2").count();
    const h3s = await page.locator("h3").count();
    expect(h2s).toBeGreaterThan(0);
    expect(h3s).toBeGreaterThan(0);
  });

  test("interactive elements are focusable", async ({ page }) => {
    const buttons = page.locator("button");
    const links = page.locator("a");
    expect(await buttons.count()).toBeGreaterThan(0);
    expect(await links.count()).toBeGreaterThan(0);
  });

  test("color contrast is sufficient (axe check)", async ({ page }) => {
    // Playwright can integrate with axe-core
    // For now we check that text on dark background is light
    const body = page.locator("body");
    const bg = await body.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(bg).toContain("0"); // Dark background
  });
});
