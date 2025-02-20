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
    login.enterEmail(user.email);
    login.enterPassword(user.password);
    login.submit();
  });
});

When("I enter email {string} and password {string}", (email, password) => {
  login.enterEmail(email);
  login.enterPassword(password);
  login.submit();
});

When("I enter an empty email and password {string}", (password) => {
  login.enterPassword(password);
  login.submit();
});

Then("I should be redirected to the dashboard", () => {
  login.verifyLoginSuccess();
  login.verifyDashboard();
});

Then("I should see a password error message {string}", (errorMessage) => {
  cy.get('[data-cy="error-password-message"]')
    .should("be.visible")
    .and("contain", errorMessage)
    .debug();
});
Then("I should see an email error message {string}", (errorMessage) => {
  cy.get(".error-email-message")
    .should("be.visible")
    .and("contain", errorMessage);
});

Then("I should remain on the login page", () => {
  cy.url().should("include", "/login"); // Kiểm tra rằng URL không thay đổi
});
