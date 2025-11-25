// Intercepting the networks - mocking the API response

describe("registration  tests", () => {
    beforeEach(() => {
        cy.visit('/register');
    });

    it('should register a user', () => {
        cy.getDataTest('todo-registration-header').contains("Account Registration")

        // Mock the signup API call with a successful response
        cy.intercept('POST', '/users', {
            statusCode: 201,
            body: {
                message: 'User registered successfully',
                user: {
                    id: 123,
                    first_name: 'TestUser',
                    last_name: 'AdminTester',
                    email: 'kemboi.brian@teach2give.com',
                    phone_number: "070011111",
                    role: 'user',
                }
            }
        }).as('signup')


        // Fill the form using data-test attributes
        cy.getDataTest('signup-firstname').as('firstNameInput')
        cy.get('@firstNameInput').type('TestUser')

        cy.getDataTest('signup-lastname').as('lastNameInput')
        cy.get('@lastNameInput').type('AdminTester')

        cy.getDataTest('signup-email').as('emailInput')
        cy.get('@emailInput')
            .should('have.attr', 'type', 'email')
            .type('kemboi.brian@teach2give.com')

        cy.getDataTest('signup-phone').as('PhoneInput')
        cy.get('@PhoneInput').type('070011111')


        cy.getDataTest('signup-password').as('passwordInput')
        cy.get('@passwordInput')
            .should('have.attr', 'type', 'password')
            .type('mypass123');

        cy.getDataTest('signup-confirmpassword').as('confirmPasswordInput')
        cy.get('@confirmPasswordInput')
            .should('have.attr', 'type', 'password')
            .type('mypass123');

        // Submit the form
        cy.getDataTest('signup-submitbtn').as('submitButton')
        cy.get('@submitButton')
            .should('contain.text', 'Register')
            .should('not.be.disabled')
            .click()
            .pause()

    })

    // it()
})