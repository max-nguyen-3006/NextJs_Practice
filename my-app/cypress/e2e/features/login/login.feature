Feature: User Login

  Scenario: Successful login with fixture data
    Given I visit the login page
    When I enter login credentials from "validUser"
    Then I should be redirected to the dashboard

  Scenario Outline: Unsuccessful login with invalid credentials
    Given I visit the login page
    When I enter email "<email>" and password "<password>"
    Then I should see a password error message "<errorMessage>"
    And I should remain on the login page

    Examples:
      | email          | password   | errorMessage              |
      | test@gmail.com | wrongPass1 | Invalid email or password |
      | test@gmail.com | wrongPass2 | Invalid email or password |


  Scenario: Unsuccessful login with only password
    Given I visit the login page
    When I enter an empty email and password "Test@123"
    Then I should see an email error message "Invalid email format"
    And I should remain on the login page