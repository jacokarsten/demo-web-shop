@mode:serial
Feature: Account

  Scenario: Register new user
    Given the user is on the registration page
    When the user completes the registration form with "<name>", "<surname>", "<gender>", "<email>", "<password>", "<result>", "<emailError>", and "<pageError>"
    Then the user should be registered with "<name>", "<surname>", "<gender>", "<email>", "<result>", and "<resultMsg>"

    Examples:
      | name   | surname | gender | email             | password | result  | resultMsg                   | emailError | pageError |
      | First  | User    | Male   | user1@example.com | pass111  | Success | Your registration completed |            |           |
      | Second | User    | Female | user2@example.com | pass222  | Success | Your registration completed |            |           |
      | Third  | User    | Male   | user3@example.com | pass333  | Success | Your registration completed |            |           |

  Scenario: Register dublicate user
    Given the user is on the registration page
    When the user completes the registration form with "<name>", "<surname>", "<gender>", "<email>", "<password>", "<result>", "<emailError>", and "<pageError>"
    Then the user should fail to be registered

    Examples:
      | name   | surname | gender | email             | password | result  | resultMsg | emailError | pageError                          |
      | Fourth | User    | Male   | user1@example.com | pass111  | Failure |           |            | The specified email already exists |
