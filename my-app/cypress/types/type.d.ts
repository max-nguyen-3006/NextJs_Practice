export {};
declare global {
  namespace Cypress {
    interface Chainable {
      loginViaUser(email: string, password: string): Chainable<void>;
      loginToApplication(): Chainable<void>;
      generateFixture(): Chainable<void>;
    }
  }
}
