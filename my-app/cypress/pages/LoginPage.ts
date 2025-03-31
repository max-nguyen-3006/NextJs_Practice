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
    cy.url().should("include", "/dashboard/123");


    // 1
    cy.url().then((url) => {
      const match = url.match(/\/dashboard\/(\d+)/);
      if (match) {
        const id = match[1];
        cy.log(id);
      }
    });

    // 2 
    cy.location('pathname').then((pathname) => {
      const parts = pathname.split('/'); 
      const id = parts[2]; 
      cy.log(id);
    });

    // 3 URLSearchParams : ?id=456&name=test
    cy.location('search').then((search) => {
      const params = new URLSearchParams(search);
      const id = params.get('id');  //456
      cy.log(id); 
    });

    
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
