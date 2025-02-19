import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import login from "pages/LoginPage";
//access the chorus dashboard
Given("I visit the login page", () => {
  login.accessLoginPage();
});
When("I enter login credentials from {string}", (userType) => {
  cy.fixture("login").then((users) => {
    const user = users[userType];
    if (!user) throw new Error(`User type "${userType}" not found in fixture`);
    cy.log(user);
    login.enterEmail(user.email);
    login.enterPassword(user.password);
    login.submit();
  });
});

Then("I should be redirected to the dashboard", () => {
  login.verifyLoginSuccess();
  login.verifyDashboard();
});
