Feature: Order

  Scenario: Place an order
    Given the user has registered "<name>", "<surname>", "<gender>", "<email>", and "<password>"
    When the user navigates to Computers and then "Desktops" and the correct items are displayed

  Examples:
    | name  | surname | gender | email              | password |
    | First | Order   | Male   | order1@example.com | pass111  |
