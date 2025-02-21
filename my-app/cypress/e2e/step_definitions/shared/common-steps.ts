import { Then } from "@badeball/cypress-cucumber-preprocessor";
import register from "pages/RegisterPage";


Then("the user should see a password error message {string}", (errorMessage) => {
  register.verifyRegisterPasswordErrorWithMessage(errorMessage);
});
