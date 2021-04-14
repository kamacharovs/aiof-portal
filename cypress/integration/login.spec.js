describe('Login', () => {
    beforeEach(() => {
        cy.visit('/login')
    })

    var email = Cypress.env('email')
    var password = Cypress.env('password')

    it('Successful', () => {
        cy.get('[id="login-email"]')
            .type(email)
            .should('have.value' , email)

        cy.get('[id="login-password"]')
            .type(password)
            .should('have.value' , password)

        cy.get('[id="login-button"]')
            .click()

        // Assert

    })
})