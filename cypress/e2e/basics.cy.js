
describe('UI Navigation', () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
    })


    it("Should visit multimple pages", () => {
        cy.visit('/')

        cy.location("pathname").should("equal", "/")

        cy.getDataTest('todo-welcome-header').contains("Welcome to TodoPro!")

        cy.visit('/about')
        cy.location("pathname").should("equal", "/about")

        cy.getDataTest('todo-about-header').contains("About TodoPro")

        cy.visit('/register')

        cy.getDataTest('todo-registration-header').contains("Account Registration")

        cy.visit('/login')

        cy.getDataTest('todo-login-header').contains("Login")


    })
});

