Feature: User Login

  Scenario: Successful login with fixture data
    Given I visit the login page
    When I enter login credentials from "validUser"
    Then I should be redirected to the dashboard