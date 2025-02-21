export class RegisterPage {
  accessRegisterPage() {
    cy.visit("/register");
  }
  getName() {
    return cy.get('[placeholder="name"]');
  }
  getEmail() {
    return cy.get('[placeholder="email"]');
  }

  getPassword() {
    return cy.get('[placeholder="password"]');
  }
  getConfirmPassword() {
    return cy.get('[placeholder="confirmPassword"]');
  }
  // Enter values
  enterName(name) {
    this.getName().type(name);
  }
  enterEmail(email) {
    this.getEmail().type(email);
  }
  enterPassword(password) {
    this.getPassword().type(password);
  }
  getPasswordError() {
    return cy.get(".error-password-message");
  }
  enterConfirmPassword(confirmPassword) {
    this.getConfirmPassword().type(confirmPassword);
  }
  // Click
  clickRegisterButton() {
    return cy.get("#register-button").click();
  }
  verifyRegisterSuccess() {
    cy.get(".register-toast-success").should("be.visible");
  }
  verifyRegisterFail() {
    cy.get(".register-toast-failed").should("be.visible");
  }
  verifyLoginPage() {
    cy.url().should("include", "/login");
  }
  // Error
  verifyRegisterPasswordErrorWithMessage(message: string) {
    cy.get(".error-password-message").should("be.visible");
    this.getPasswordError().should("contain", message);
  }
}
const register = new RegisterPage();
export default register;
