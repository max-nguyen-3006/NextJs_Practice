import { Then } from "@badeball/cypress-cucumber-preprocessor";

Then(`I see {string} in the title`, (title) => {
  cy.title().should("include", title);
});

Then("Error message {string} will show", (errorMessage: string) => {
  cy.get("p").contains(errorMessage).should("be.visible");
});
