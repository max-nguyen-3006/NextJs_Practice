const marge = require("mochawesome-report-generator");
const { merge } = require("mochawesome-merge");

async function generateReport() {
  const jsonReport = await merge({
    files: ["cypress/reports/.jsons/*.json"], // Merge all JSON reports
  });

  await marge.create(jsonReport, {
    reportDir: "cypress/reports/html",
    reportFilename: "TestReport",
    inlineAssets: true,
    charts: true,
  });

  console.log("📄 Mochawesome HTML report generated in cypress/reports/html");
}

generateReport();
