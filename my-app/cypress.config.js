/* eslint @typescript-eslint/no-var-requires: "off" */
import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";
export default defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      // Delete all JSON reports before running tests
      // Delete JSON reports before running tests
      // const reportsPath = path.join(__dirname, "cypress", "reports", "jsons", "*.json");
      // rimraf.sync(reportsPath);
      //rimraf.sync("cypress/reports/.jsons/*.json");
      // implement node event listeners here
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      require("cypress-mochawesome-reporter/plugin")(on);
      await addCucumberPreprocessorPlugin(on, config);
      return config;
    },
    env: {
      email: "cytest@test.com",
      password: "Welcome123",
      apiUrl: "https://conduit-api.bondaracademy.com",
      omitFiltered: true,
      filterSpecs: true,
    },
    retries : {
      runMode: 2,
      openMode: 0

    },
    //   authenticated_cookie:
    //     "__Host-next-auth.csrf-token=6a45557508c7878c2ca07b1cf1c98aae3bb844c75de1e77bf04b8542092070af%7C503010f65381d47b38935a317bede98401ae0a9e6da183f949955b0c5e8ff865; __Secure-next-auth.callback-url=https%3A%2F%2Fchorus-dev.one-line.com%2Fflm; user_id=chau.vu.tpv%40one-line.com; __Secure-next-auth.session-token=eyJhbGciOiJQUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiY2hhdS52dS50cHZAb25lLWxpbmUuY29tIiwiZW1haWwiOiJjaGF1LnZ1LnRwdkBvbmUtbGluZS5jb20iLCJzdWIiOiJjaGF1LnZ1LnRwdkBvbmUtbGluZS5jb20iLCJ1c2VyIjp7ImZpcnN0bmFtZSI6IkNob3UgKENoYXUpIiwibGFzdG5hbWUiOiJWdSBUUFYiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNoYXUudnUudHB2QG9uZS1saW5lLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImNoYXUudnUudHB2QG9uZS1saW5lLmNvbSJ9fQ.JH8K-BHPySZUsGcdnjI9wx0cilvXyxYkH5DNmgcueE1pwJ7Axuwoc07O6j4j6JEWedPaOtl4amOFQ6MQehA4fFpwZMzQ55pZvPy3bSEWM-zpoy2SEPgkJkxm4OjXOwH6h-5oPSZyU03Iy2R4ldz9fRaEL5W764vS4ZA6otXS8kIxM8enaQ2gT7g-NhYwcAK0SucyblZKLtv0zkquDRvxnUN7taMAE9TrOx-qkLjAaWex7MndngkfACD6rTNCZEQC-wpfDaqq5TGp1ccPtlAyVYxG78ly3riYVjgPCdrf6iZ0dRg93GMt5OQVY6yS-QkxJxJZbO-JbCNvfRzie9tM62RzCmJyqIWOUDaBznGlCF4d3ij43AntW2IczgbuoxUHVOJZL2SmbEXthVLL_DnxUPZJ1NQRgnnUZ8bwdoGedSOjLOZ2Ag3WxUfRXMliMu5AceLai4tqCliGwHQeYAJrh4rL7VAd_9mtPZ6qegPUJP9sVlRubWVFwQxyC_ggONxg; _dd_s=logs=1&id=9032b9a4-dfec-4756-9db9-a1d21725e23e&created=1734576998777&expire=1734579933178",
    // },
    baseUrl:"http://localhost:3000",
   // baseUrl: "http://conduit.bondaracademy.com",
    specPattern: "**/*.feature",
    //specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 10000,
    screenshotsFolder: "cypress/results/screenshots",
    video: true,
    chromeWebSecurity: true,
    retries: {
      runMode: 2,
      openMode: 0,
    },
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      configFile: 'reporter-config.json',
    },



    //Report config
    // reporter: "cypress-mochawesome-reporter",
    // reporterOptions: {
    //   reporterEnabled: 'cypress-mochawesome-reporter, mocha-junit-reporter',
    //   mochaJunitReporterReporterOptions: {
    //     mochaFile: 'cypress/reports/junit/results-[hash].xml',s
    //   },
    //   cypressMochawesomeReporterReporterOptions: {
    //     charts: true,
    //     reportPageTitle: 'custom-title',
    //   },
    //   reportDir: "cypress/reports/mochawesome",
    //   charts: true,
    //   reportPageTitle: "Test Report",
    //   embeddedScreenshots: true,
    //   inlineAssets: true,
    //   saveAllAttempts: false,
    //   json: true,
    //   overwrite: false,
    //   html: false
    // },
  },
});
