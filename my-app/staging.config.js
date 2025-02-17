import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { defineConfig } from "cypress";
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";

export default defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      // implement node event listeners here
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        }),
      );
      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    },
    //replace with staging url
    specPattern: "**/*.feature",
    env: {
      omitFiltered: true,
      filterSpecs: true,
    },
    baseUrl: "https://chorus-dev.one-line.com/",
    viewportWidth: 1440,
    viewportHeight: 900,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 10000,
    video: false,
    chromeWebSecurity: true,
    screenshotOnRunFailure: true,

    retries: {
      runMode: 2,
      openMode: 0,
    },

    //Report config
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      reportDir: "cypress/reports",
      charts: true,
      reportPageTitle: "Test Report",
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
      saveJson: true,
    },
  },
});
