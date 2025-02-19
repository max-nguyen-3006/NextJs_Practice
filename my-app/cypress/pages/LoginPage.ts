class LoginPage {
  accessLoginPage() {
    cy.visit("/login");
  }
  accessHomePage(user) {
    cy.loginViaUser(user.email, user.password);
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
}
const login = new LoginPage();
export default login;
