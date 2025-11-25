

describe('Todos CRUD E2E Test', () => {

    beforeEach(() => {


        // adminlogin - cypress command
        cy.loginAsAdmin();
    })

    it('should create a todo via the UI', () => {
        cy.contains(/Welcome to your Admin dashboard/i).should('be.visible')
        const todoName = `Cypress E2E Test Todo ${Date.now()}`

        cy.getDataTest('create-todo-button').click()
        cy.getDataTest('todo-name-input').type(todoName)
        cy.getDataTest('todo-description-input').type("Cypress Description")
        cy.getDataTest('todo-userid-input').type("2")
        cy.getDataTest('todo-date-input').type("2025-07-09")
        cy.getDataTest('todo-status-pending').check()
        cy.getDataTest('createtodo-submit-button').click()
        cy.contains('Todo created successfully').should('be.visible');
        cy.contains(todoName).should('be.visible')

        cy.contains('tr', todoName).within(() => {
            cy.getDataTest('delete-todo-button').click()
        })
        cy.getDataTest('delete-todo-confirm-button').click()

    })


})