import { test, expect } from '@playwright/test'

test.describe('About Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about')
  })

  test('displays profile portrait image', async ({ page }) => {
    const profileImage = page.locator('img[alt="Tyler S. Callan"]')
    await expect(profileImage).toBeVisible()
    await expect(profileImage).toHaveAttribute('src', /profile/)
  })

  test('displays bio text about Software Architect experience', async ({ page }) => {
    const bioText = page.getByText(
      /Software Architect.*\d+ years.*experience.*distributed enterprise systems/i
    )
    await expect(bioText).toBeVisible()
  })

  test('displays bio text about street photography', async ({ page }) => {
    const photographyText = page.getByText(/street photographer.*North America.*Europe.*Asia/i)
    await expect(photographyText).toBeVisible()
  })

  test('displays current location', async ({ page }) => {
    const locationText = page.getByText(/Currently based out of/i)
    await expect(locationText).toBeVisible()
  })

  test('displays professional inquiries email', async ({ page }) => {
    const emailLink = page.locator('a[href="mailto:tylerscallan@outlook.com"]')
    await expect(emailLink).toBeVisible()
    await expect(emailLink).toHaveText('tylerscallan@outlook.com')
  })

  test('has footer with copyright for current year', async ({ page }) => {
    const currentYear = new Date().getFullYear()
    const copyright = page.getByText(
      new RegExp(`© ${currentYear} Tyler S\\. Callan\\. All rights reserved\\.`, 'i')
    )
    await expect(copyright).toBeVisible()
  })

  test('page layout has image visible alongside bio content', async ({ page }) => {
    const image = page.locator('img[alt="Tyler S. Callan"]')
    const imageBox = await image.boundingBox()

    const bio = page.getByText(/Software Architect/i).first()
    await expect(bio).toBeVisible()

    expect(imageBox).not.toBeNull()
  })

  test('email link has underline styling', async ({ page }) => {
    const emailLink = page.locator('a[href="mailto:tylerscallan@outlook.com"]')
    await expect(emailLink).toBeVisible()

    const textDecoration = await emailLink.evaluate((el) =>
      window.getComputedStyle(el).textDecoration
    )
    expect(textDecoration).toContain('underline')
  })

  test('profile image container has border radius styling', async ({ page }) => {
    const image = page.locator('img[alt="Tyler S. Callan"]')
    const parent = image.locator('..')
    const borderRadius = await parent.evaluate((el) => window.getComputedStyle(el).borderRadius)

    expect(borderRadius).not.toBe('0px')
  })
})
