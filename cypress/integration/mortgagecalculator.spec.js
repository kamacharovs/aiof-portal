describe("Property mortgage calculator", () => {
    beforeEach(() => {
        cy.visit("/property/mortgage")
    })

    var defaultPropertyValue = 300000;
    var defaultDownPayment = 60000;
    var defaultInterestRate = 3.5;
    var defaultLoanTermYears = 30;
    var defaultStartDate = "06/30/2021";
    var defaultPmi = 0.5;
    var devaultPropertyInsurance = 1000;
    var defaultMonthlyHoa = 0;

    it("successful", () => {
        cy.get("#property-value")
            .clear()
            .type(defaultPropertyValue)
            .should("have.value", defaultPropertyValue)

        cy.get("#down-payment")
            .clear()
            .type(defaultDownPayment)
            .should("have.value", defaultDownPayment)

        cy.get("#interest-rate")
            .clear()
            .type(defaultInterestRate)
            .should("have.value", defaultInterestRate)

        cy.get("#loan-term-years")
            .clear()
            .type(defaultLoanTermYears)
            .should("have.value", defaultLoanTermYears)

        cy.get("#start-date")
            .clear()
            .type(defaultStartDate)
            .should("have.value", defaultStartDate)

        cy.get("#pmi")
            .clear()
            .type(defaultPmi)
            .should("have.value", defaultPmi)

        cy.get("#property-insurance")
            .clear()
            .type(devaultPropertyInsurance)
            .should("have.value", devaultPropertyInsurance)

        cy.get("#monthly-hoa")
            .clear()
            .type(defaultMonthlyHoa)
            .should("have.value", defaultMonthlyHoa)

        cy.get("#calculate-button")
            .should("be.enabled")
            .click()
    })

    it("property value negative", () => {
        cy.get("#property-value")
            .clear()
            .type(-1)

        cy.get("#calculate-button")
            .should("be.disabled")
    })

    it("down payment negative", () => {
        cy.get("#down-payment")
            .clear()
            .type(-1)

        cy.get("#calculate-button")
            .should("be.disabled")
    })

    it("interest rate negative", () => {
        cy.get("#interest-rate")
            .clear()
            .type(-1)

        cy.get("#calculate-button")
            .should("be.disabled")
    })
    it("interest rate too large", () => {
        cy.get("#interest-rate")
            .clear()
            .type(101)

        cy.get("#calculate-button")
            .should("be.disabled")
    })

    it("loan term years negative", () => {
        cy.get("#loan-term-years")
            .clear()
            .type(-1)

        cy.get("#calculate-button")
            .should("be.disabled")
    })
    it("loan term years bigger than max", () => {
        cy.get("#loan-term-years")
            .clear()
            .type(35)

        cy.get("#calculate-button")
            .should("be.disabled")
    })

    it("start date malformed", () => {
        cy.get("#start-date")
            .clear()
            .type("123/30/2021")

        cy.get("#calculate-button")
            .should("be.enabled")
    })

    it("pmi negative", () => {
        cy.get("#pmi")
            .clear()
            .type(-1)

        cy.get("#calculate-button")
            .should("be.disabled")
    })
    it("pmi too large", () => {
        cy.get("#loan-term-years")
            .clear()
            .type(101)

        cy.get("#calculate-button")
            .should("be.disabled")
    })

    it("property insurance negative", () => {
        cy.get("#property-insurance")
            .clear()
            .type(-1)

        cy.get("#calculate-button")
            .should("be.disabled")
    })

    it("monthly hoa negative", () => {
        cy.get("#monthly-hoa")
            .clear()
            .type(-1)

        cy.get("#calculate-button")
            .should("be.disabled")
    })
})