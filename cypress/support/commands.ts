/// <reference types="cypress" />

Cypress.Commands.add('getDataTest', (dataTestSelector) => {
    return cy.get(`[data-test="${dataTestSelector}"]`)
})

// command to login
Cypress.Commands.add('loginAsAdmin', (email = 'bkemboi590@gmail.com', password = '123456') => {
    cy.visit('/login')
    cy.getDataTest('login-email-input').type(email)
    cy.getDataTest('login-password-input').type(password)
    cy.getDataTest('login-submit-button').click()

    cy.contains(/Success/i).should('be.visible')
    cy.url().should('include', '/admin/dashboard/todos')
    cy.contains(/Welcome to your Admin dashboard/i).should('be.visible')
})

/* eslint-disable @typescript-eslint/no-namespace */
export { }
declare global {
    namespace Cypress {
        interface Chainable {
            getDataTest(value: string): Chainable<JQuery<HTMLElement>>;
            loginAsAdmin(email: string, password: string): Chainable<void>
        }
    }
}