class LoginPage {
  accessLoginPage() {
    cy.visit("/login");
  }
  accessHomePage(user) {
    cy.loginViaUser(user.email, user.password);
  }
  getPasswordError() {
    return cy.get('[data-cy="error-password-message"]');
  }
  geEmailError() {
    return cy.get(".error-email-message");
  }
  enterEmail(email) {
    cy.get("[data-cy=email]").type(email);
  }
  enterPassword(password) {
    cy.get("[data-cy=password]").type(password);
  }
  submit() {
    cy.get("[data-cy=login-btn]").click();
  }
  verifyLoginSuccess() {
    cy.get(".login-toast-success").should("be.visible");
  }
  verifyDashboard() {
    cy.url().should("include", "/dashboard");
  }
  verifyPasswordError(errorMessage) {
    this.getPasswordError().should("be.visible");
    this.getPasswordError().should("contain", errorMessage);
  }
  verifyEmailError(errorMessage) {
    this.geEmailError().should("be.visible");
    this.geEmailError().should("contain", errorMessage);
  }
}
const login = new LoginPage();
export default login;
