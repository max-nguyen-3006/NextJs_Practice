@regression
Feature: User Login - ENV

    @dev
    Scenario Outline: Unsuccessful login with invalid credentials
        Given I visit the login page
        When I enter email "<email>" and password "<password>"
        Then I should see a password error message "<errorMessage>"
        And I should remain on the login page

        Examples:
            | email             | password   | errorMessage              |
            | devUser@gmail.com | wrongPass1 | Invalid email or password |
            | devUser@gmail.com | wrongPass2 | Invalid email or password |

    @staging
    Scenario Outline: Unsuccessful login with invalid credentials
        Given I visit the login page
        When I enter email "<email>" and password "<password>"
        Then I should see a password error message "<errorMessage>"
        And I should remain on the login page

        Examples:
            | email                 | password   | errorMessage              |
            | stagingUser@gmail.com | wrongPass1 | Invalid email or password |
            | stagingUser@gmail.com | wrongPass2 | Invalid email or password |
