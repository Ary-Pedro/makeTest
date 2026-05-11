import { defineConfig } from 'cypress'

export default defineConfig({
  allowCypressEnv: false,
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    downloadsFolder: 'cypress/downloads',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    video: false,
    viewportWidth: 1366,
    viewportHeight: 768,
    retries: {
      runMode: 1,
      openMode: 0
    }
  }
})
