Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Vinicius')
    cy.get('#lastName').type('Caldato')
    cy.get('#email').type('viniciuscaldato@gmail.com')
    cy.get('#open-text-area').type('Teste de escrita')
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
})