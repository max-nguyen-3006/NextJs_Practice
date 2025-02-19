Feature: User Registration
    As a user
    I want to register an account
    So that I can access the application

    Background:
        Given the user accesses the registration page

    Scenario: Successful registration
        Given the user provides registration details from "validUser"
        When the user submits the registration form
        Then the user should see a success toast
        And the user should be redirected to the login page

    Scenario: Registration fails due to short password
        Given the user provides registration details from "invalidUser_shortPassword"
        When the user submits the registration form
        Then the user should see a password error message "Password must be at least 6 characters"
        
    Scenario: Registration fails due to long password
        Given the user provides registration details from "invalidUser_longPassword"
        When the user submits the registration form
        Then the user should see a password error message "Password must be at most 20 characters"