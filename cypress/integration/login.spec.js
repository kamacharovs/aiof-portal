describe('Login', () => {
    beforeEach(() => {
        cy.visit('/login')
    })

    var email = Cypress.env('email')
    var password = Cypress.env('password')

    it('login is successful', () => {
        cy.get('#login-email')
            .type(email)
            .should('have.value' , email)

        cy.get('#login-password')
            .type(password)
            .should('have.value' , password)

        cy.get('#login-button')
            .click()
            .should('be.disabled')
    })

    it('login fails invalid email', () => {
        var invalidEmail = `${email}-invalid`

        cy.get('#login-email')
            .type(invalidEmail)
            .should('have.value' , invalidEmail)

        cy.get('#login-password')
            .type(password)
            .should('have.value' , password)

        cy.get('#login-button')
            .click()

        cy.get('#login-error-message')
            .contains('Invalid')
            .contains('email')
    })

    it('login fails invalid password', () => {
        var invalidPassword = `${password}-123`

        cy.get('#login-email')
            .type(email)
            .should('have.value' , email)

        cy.get('#login-password')
            .type(invalidPassword)
            .should('have.value' , invalidPassword)

        cy.get('#login-button')
            .click()

        cy.get('#login-error-message')
            .contains('Invalid')
            .contains('password')
    })

    it('navigate to registration is successful', () => {
        cy.get('#login-link-register')
            .click()

        cy.location().should((location) => {
            expect(location.pathname).to.eq('/register')
        })
    })

    it('navigate to terms and conditions is successful', () => {
        cy.get('#login-link-terms-and-conditions')
            .click()

        cy.location().should((location) => {
            expect(location.pathname).to.eq('/terms-and-conditions')
        })
    })

    it('navigate to privacy policy is successful', () => {
        cy.get("#login-link-privacy-policy")
            .click()

        cy.location().should((location) => {
            expect(location.pathname).to.eq('/privacy-policy')
        })
    })
})