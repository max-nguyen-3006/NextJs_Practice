/// <reference types="cypress" />

describe("first test", () => {
  it("first test", () => {
    cy.visit("/register");
    cy.get('[placeholder="name"]').type("test-name");
    cy.get('[placeholder="email"]').type("test@gmail.com");
    cy.get('[placeholder="password"]').type("123456");
    cy.get('[placeholder="confirmPassword"]').type("123456");
    cy.get("#register-button").click();
  });
});
