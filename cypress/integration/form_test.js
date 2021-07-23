describe('Validate form', function (){
    Cypress.config('viewportWidth', 1200)
    Cypress.config('viewportHeight', 600)

    it('Fillout form and submit', function(){
        cy.visit('http://localhost:3000')
        // cy.visit('https://example.cypress.io')
        cy.get('#fusernameInput')
        .type('Johanna Rodriguez')
        .should('have.value','Johanna Rodriguez')

        cy.get('#femailInput')
        .type('Johannaitdeveloper@gmail.com')
        .should('have.value','Johannaitdeveloper@gmail.com')

        cy.get('#fpasswordInput')
        .type('holamundo')
        .should('have.value','holamundo')
        
        cy.get('#ftermsInput')
        .check()
        .should('be.checked')
        
        cy.intercept('POST', '*' ).as('post')
        cy.get('#fsubmitButton').click()
        cy.wait('@post').then((interception) => {
            assert.equal(interception.response.statusCode,201)
            assert.isNotNull(interception.response.body, '1st API call has data')
          })
    })
   
    it('Check if input is empty', function(){
        cy.visit('http://localhost:3000')
        // cy.visit('https://example.cypress.io')

        cy.get('#fusernameInput')
        .type('Johanna Rodriguez')
       
        cy.get('#femailInput')
        .type('Johannaitdeveloper@gmail.com')

        cy.get('#fpasswordInput')
        .type('holamundo')
        cy.get('#formId').within(() => {
            cy.get('input:invalid').should('have.length', 0)
            cy.get('input:valid').should('have.length', 4)
    })

        

    })

      


})