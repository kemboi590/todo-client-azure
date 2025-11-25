describe("login tests", () => {

    beforeEach(() => {
        cy.visit('/login') //cypress is on the login page
    })

    it("should login with valid credentials", () => {
        cy.getDataTest('todo-login-header').contains("Login")

        cy.getDataTest('login-email-input').as('login-emailInput')

        cy.get('@login-emailInput')
            .should('be.visible')
            .should('have.attr', 'type', 'email')
            .type('bkemboi590@gmail.com')


        cy.getDataTest('login-password-input').as('login-passwordInput')

        cy.get('@login-passwordInput')
            .should('be.visible')
            .should('have.attr', 'type', 'password')
            .type('123456')


        cy.getDataTest('login-submit-button').as('login-submitButton')
        cy.get('@login-submitButton')
            .should('contain.text', 'Login')
            .should('not.be.disabled')
            .click()


        cy.contains(/Success/i).should('be.visible')
        cy.url().should('include', '/admin/dashboard/todos')
        cy.contains(/Welcome to your Admin dashboard/i).should('be.visible')

    })

    it("should not login with invalid credentials", () => {

        // Get the email input
        cy.getDataTest('login-email-input').as('login-emailInput')
        cy.get('@login-emailInput')
            .type('bkemboi590@gmail.com')

        // Get the password input
        cy.getDataTest('login-password-input').as('login-passwordInput')
        cy.get('@login-passwordInput')
            .type('wrongpassword123')

        // Submit the form
        cy.getDataTest('login-submit-button').as('login-submitButton')
        cy.get('@login-submitButton')
            .should('contain.text', 'Login')
            .click()

        cy.contains(/Invalid Credentials/i).should('be.visible')

    })
})