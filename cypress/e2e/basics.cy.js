describe("Fundamentals", () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Containts Correct header text', () => {
        cy.get('h1').contains("Welcome to TodoPro!")
    })
})