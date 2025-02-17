export {};
declare global {
  namespace Cypress {
    interface Chainable {
      loginViaUser(email: string, password: string): Chainable<void>;
      generateFixture(): Chainable<void>;
    }
  }
}
