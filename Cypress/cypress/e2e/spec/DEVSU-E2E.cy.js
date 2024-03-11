describe('DevSU - E2E Demon Blaze Automation', () => {
  it('Prueba flujo de compra', () => {
    cy.visit('https://demoblaze.com')

    cy.get(':nth-child(1) > .card > .card-block > .card-title > .hrefch').click()
    cy.get('.col-sm-12 > .btn').should('be.visible').click()
    
    cy.on('window:alert',(t)=>{
      expect(t).to.contains('Product added');
    })

    cy.get('.active > .nav-link').click();

    cy.get(':nth-child(2) > .card > .card-block > .card-title > .hrefch').click()
    cy.get('.col-sm-12 > .btn').should('be.visible').click()
    
    cy.on('window:alert',(t)=>{
      expect(t).to.contains('Product added');
    })

    cy.get(':nth-child(4) > .nav-link').click()
    cy.get('table tbody tr').should('have.length', 2)

    cy.get('.col-lg-1 > .btn').should('be.visible').click()
    
    cy.get('#name').should('be.visible').type('Manuel Pena')

    cy.get('#country').should('be.visible').type('United States')
    cy.get('#city').should('be.visible').type('New York')
    cy.get('#card').should('be.visible').type('000000000')
    cy.get('#month').should('be.visible').type('March')
    cy.get('#year').should('be.visible').type('2023')

    cy.get('#orderModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').should('be.visible').click()
    cy.get('.confirm').should('be.visible').click()
    cy.wait(1000)
    cy.get('#orderModal > .modal-dialog > .modal-content > .modal-footer > .btn-secondary').should('be.visible').click()
  })
})