context("Calculators", () => {
    // Retirement common investments
    var commonInvestmentsInterest = 7;
    var commonInvestmentsStartYear = 2021;
    var commonInvestmentsEndYear = 2040;
    var commonInvestmentsCompoundingPeriods = 12;
    var commonInvestments401kStartingAmount = 0;
    var commonInvestments401kMonthlyContribution = 1625;
    var commonInvestmentsRothIraStartingAmount = 0;
    var commonInvestmentsRothIraMonthlyContribution = 500;
    var commonInvestmentsBrokerageAccountStartingAmount = 0;
    var commonInvestmentsBrokerageAccountMonthlyContribution = 500;

    // FI Time
    var timeStartingAmount = 800000;
    var timeMonthlyInvestment = 5000;
    var timeYearsExpenses = 25;
    var timeAnnualSpending = 100000;

    // FI Added time
    var monthlyInvestment = 50000;
    var additionalExpense = 85000;

    // FI Compound interest
    var ciStartingAmount = 0;
    var ciMonthlyInvestment = 5000;
    var ciInterest = 7;
    var ciYears = 25
    var ciInvestmentFees = 0.5;
    var ciTaxDrag = 0.5;

    // FI BMI
    var bmiImperialWeight = 165;
    var bmiImperialFeet = 6;
    var bmiImperialInches = 0;
    var bmiMetricWeight = 75;
    var bmiMetricHeight = 183;

    // Mortgage calculator
    var defaultPropertyValue = 300000;
    var defaultDownPayment = 60000;
    var defaultInterestRate = 3.5;
    var defaultLoanTermYears = 30;
    var defaultStartDate = "06/30/2021";
    var defaultPmi = 0.5;
    var devaultPropertyInsurance = 1000;
    var defaultMonthlyHoa = 0;

    // Retirement
    context("Retirement", () => {
        // Common investments
        describe("Common investments", () => {
            beforeEach(() => {
                cy.visit("/retirement/common/investments")
            })

            it("successful", () => {
                cy.get("#interest")
                    .clear()
                    .type(commonInvestmentsInterest)
                    .should("have.value", commonInvestmentsInterest)

                cy.get("#start-year")
                    .clear()
                    .type(commonInvestmentsStartYear)
                    .should("have.value", commonInvestmentsStartYear)

                cy.get("#start-year")
                    .clear()
                    .type(commonInvestmentsStartYear)
                    .should("have.value", commonInvestmentsStartYear)

                cy.get("#end-year")
                    .clear()
                    .type(commonInvestmentsEndYear)
                    .should("have.value", commonInvestmentsEndYear)

                cy.get("#compounding-periods")
                    .clear()
                    .type(commonInvestmentsCompoundingPeriods)
                    .should("have.value", commonInvestmentsCompoundingPeriods)

                cy.get("#401k-starting-amount")
                    .clear()
                    .type(commonInvestments401kStartingAmount)
                    .should("have.value", commonInvestments401kStartingAmount)

                cy.get("#401k-monthly-contribution")
                    .clear()
                    .type(commonInvestments401kMonthlyContribution)
                    .should("have.value", commonInvestments401kMonthlyContribution)

                cy.get("#roth-ira-starting-amount")
                    .clear()
                    .type(commonInvestmentsRothIraStartingAmount)
                    .should("have.value", commonInvestmentsRothIraStartingAmount)

                cy.get("#roth-ira-monthly-contribution")
                    .clear()
                    .type(commonInvestmentsRothIraMonthlyContribution)
                    .should("have.value", commonInvestmentsRothIraMonthlyContribution)

                cy.get("#brokerage-account-starting-amount")
                    .clear()
                    .type(commonInvestmentsBrokerageAccountStartingAmount)
                    .should("have.value", commonInvestmentsBrokerageAccountStartingAmount)

                cy.get("#brokerage-account-monthly-contribution")
                    .clear()
                    .type(commonInvestmentsBrokerageAccountMonthlyContribution)
                    .should("have.value", commonInvestmentsBrokerageAccountMonthlyContribution)

                cy.get("#calculate-button")
                    .should("be.enabled")
                    .click()
            })
        })
    })

    // FI (Financial Independence)
    context("FI", () => {
        // Time
        describe("Time", () => {
            beforeEach(() => {
                cy.visit("/fi/time")
            })

            it("successful", () => {
                cy.get("#starting-amount")
                    .clear()
                    .type(timeStartingAmount)
                    .should("have.value", timeStartingAmount)

                cy.get("#monthly-investment")
                    .clear()
                    .type(timeMonthlyInvestment)
                    .should("have.value", timeMonthlyInvestment)

                cy.get("#years-expenses")
                    .clear()
                    .type(timeYearsExpenses)
                    .should("have.value", timeYearsExpenses)

                cy.get("#annual-spending")
                    .clear()
                    .type(timeAnnualSpending)
                    .should("have.value", timeAnnualSpending)

                cy.get("#calculate-button")
                    .should("be.enabled")
                    .click()
            })
        })

        // Added time
        describe("Added time", () => {
            beforeEach(() => {
                cy.visit("/fi/added/time")
            })

            it("successful", () => {
                cy.get("#monthly-investment")
                    .clear()
                    .type(monthlyInvestment)
                    .should("have.value", monthlyInvestment)

                cy.get("#additional-expense")
                    .clear()
                    .type(additionalExpense)
                    .should("have.value", additionalExpense)

                cy.get("#calculate-button")
                    .should("be.enabled")
                    .click()
            })
        })

        // Compound interest
        describe("Compound interest", () => {
            beforeEach(() => {
                cy.visit("/fi/compound/interest")
            })

            it("successful", () => {
                cy.get("#starting-amount")
                    .clear()
                    .type(ciStartingAmount)
                    .should("have.value", ciStartingAmount)

                cy.get("#monthly-investment")
                    .clear()
                    .type(ciMonthlyInvestment)
                    .should("have.value", ciMonthlyInvestment)

                cy.get("#interest")
                    .clear()
                    .type(ciInterest)
                    .should("have.value", ciInterest)

                cy.get("#years")
                    .clear()
                    .type(ciYears)
                    .should("have.value", ciYears)

                cy.get("#investment-fees")
                    .clear()
                    .type(ciInvestmentFees)
                    .should("have.value", ciInvestmentFees)

                cy.get("#tax-drag")
                    .clear()
                    .type(ciTaxDrag)
                    .should("have.value", ciTaxDrag)

                cy.get("#calculate-button")
                    .should("be.enabled")
                    .click()
            })
        })

        // BMI
        describe("BMI", () => {
            beforeEach(() => {
                cy.visit("/fi/bmi")
            })

            it("successful imperial", () => {
                cy.get("#imperial-weight")
                    .clear()
                    .type(bmiImperialWeight)
                    .should("have.value", bmiImperialWeight)

                cy.get("#imperial-feet")
                    .clear()
                    .type(bmiImperialFeet)
                    .should("have.value", bmiImperialFeet)

                cy.get("#imperial-inches")
                    .clear()
                    .type(bmiImperialInches)
                    .should("have.value", bmiImperialInches)

                cy.get("#imperial-calculate-button")
                    .should("be.enabled")
                    .click()
            })

            it("successful metric", () => {
                cy.get("#metric-weight")
                    .clear()
                    .type(bmiMetricWeight)
                    .should("have.value", bmiMetricWeight)

                cy.get("#metric-height")
                    .clear()
                    .type(bmiMetricHeight)
                    .should("have.value", bmiMetricHeight)

                cy.get("#metric-calculate-button")
                    .should("be.enabled")
                    .click()
            })
        })
    })

    // Property
    context("Property", () => {
        // Mortgage calculator
        describe("Mortgage calculator", () => {
            beforeEach(() => {
                cy.visit("/property/mortgage")
            })

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
    })
})