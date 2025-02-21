import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import register from "pages/RegisterPage";

Given("the user accesses the registration page", () => {
  cy.visit("/register");
});
Given("the user provides registration details from {string}", (userType) => {
  cy.fixture("register-data").then((users) => {
    const user = users[userType];
    const dynamicId = Math.random().toString(36);
    const dynamicEmail =
      user.email.split("@")[0] + dynamicId + "@" + user.email.split("@")[1];
    if (!user) throw new Error(`User type "${userType}" not found in fixture`);
    register.enterName(user.name + dynamicId);
    register.enterEmail(dynamicEmail);
    register.enterPassword(user.password);
    register.enterConfirmPassword(user.confirmPassword);
  });
});

When("the user submits the registration form", () => {
  register.clickRegisterButton();
});
Then("the user should see a success toast", () => {
  register.verifyRegisterSuccess();
});
Then("the user should be redirected to the login page", () => {
  register.verifyLoginPage();
});

