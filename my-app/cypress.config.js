/* eslint @typescript-eslint/no-var-requires: "off" */
import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";
export default defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
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
    retries: {
      runMode: 2,
      openMode: 0,
    },
    baseUrl: "http://localhost:3000",
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
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,
    reporter: "cypress-multi-reporters",
    reporterOptions: {
      configFile: "reporter-config.json",
    },
  },
});
