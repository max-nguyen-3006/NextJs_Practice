export class RegisterPage {
  visit() {
    cy.visit("/");
  }
  getRegisterName() {
    cy.get('[placeholder="name"]');
  }
}
