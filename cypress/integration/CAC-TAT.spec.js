/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {   
      cy.visit('./src/index.html')
    })
    
  it('verifica o título da aplicação', function() {
      cy.visit('./src/index.html')

      cy.title().should('be.equal','Central de Atendimento ao Cliente TAT' )
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
      const TRES_SEGUNDOS = 3000
      const longText = 'Teste teste teste Teste teste teste Teste teste teste Teste teste teste Teste teste teste'

      cy.clock()
      
      cy.get('#firstName').type('Vinicius')
      cy.get('#lastName').type('Caldato')
      cy.get('#email').type('viniciusCaldato@example.com')
      cy.get('#open-text-area').type(longText, {delay: 0})
      cy.contains('button', 'Enviar').click()

      cy.get('.success').should('be.visible')
      cy.tick(TRES_SEGUNDOS)

      cy.get('.success').should('not.be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function  () {
      const TRES_SEGUNDOS = 3000
      cy.clock()

      cy.get('#firstName').type('Vinicius')
      cy.get('#lastName').type('Caldato')
      cy.get('#email').type('vinicius.caldato')
      cy.get('#open-text-area').type('Teste de escrita', {delay: 0})
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')

      cy.tick(TRES_SEGUNDOS)

      cy.get('.error').should('not.be.visible')
    })
    
    Cypress._.times(3), function () {
      it('campo telefone contínua vazio quando preenchido com valor não numérico', function  () {
        cy.get('#phone')
          .type('teste')
          .should('have.value', '')
      })
    }
  
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function  () {
     const TRES_SEGUNDOS = 3000
      cy.clock()
      
      cy.get('#firstName').type('Vinicius')
      cy.get('#lastName').type('Caldato')
      cy.get('#email').type('viniciuscaldato@gmail.com')
      cy.get('#phone-checkbox').check()
      cy.get('#open-text-area').type('Teste de escrita')
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')

      cy.tick(TRES_SEGUNDOS)

      cy.get('.error').should('not.be.visible')
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function  () {
      cy.get('#firstName')
      .type('Vinicius')
        .should('have.value', 'Vinicius')
        .clear()
        .should('have.value', '')

      cy.get('#lastName')
        .type('Caldato')
        .should('have.value', 'Caldato')
        .clear()
        .should('have.value', '')

      cy.get('#email')
        .type('viniciuscaldato@gmailcom')
        .should('have.value', 'viniciuscaldato@gmailcom')
        .clear()
        .should('have.value', '')

      cy.get('#phone')
        .type('123456789')
        .should('have.value', '123456789')
        .clear()
        .should('have.value', '')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function  () {
      const TRES_SEGUNDOS = 3000
      cy.clock()
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')
      cy.tick(TRES_SEGUNDOS)

      cy.get('.error').should('not.be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function  () {
      cy.fillMandatoryFieldsAndSubmit()
      cy.get('.success').should('be.visible')
    })
    it('seleciona um produto (YouTube) por seu texto', function  () {
      cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })
    it('seleciona um produto (Mentoria) por seu valor (value)', function  () {
      cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })
    it('seleciona um produto (Blog) por seu índice', function  () {
      cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })
    it('marca o tipo de atendimento "Feedback"', function  () {
      cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback') 
    })
    it('marca cada tipo de atendimento', function (){
      cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
    })
    it('marca ambos checkboxes, depois desmarca o último', function  () {
      cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })
    it('Seleciona um arquivo da pasta fixtures', function  () {
      cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input) {
          expect($input[0].files[0].name).to.eq('example.json')
        })
    })
    it('seleciona um arquivo simulando um drag-and-drop', function  () {
      cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
        .should(function($input) {
        expect($input[0].files[0].name).to.eq('example.json')
      })
  })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function  () {
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('@sampleFile')
        .should(function($input) {
        expect($input[0].files[0].name).to.eq('example.json')
      })
})
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique' , function  () {
      cy.get('#privacy a')
        .should('have.attr', 'target', '_blank')
    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function  () {
      cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()

      cy.contains('Talking About Testing').should('be.visible')
    })
    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
      cy.get('.success')
        .should('not.be.visible')
        .invoke('show') // mostra o elemento
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')  // esconde o elemento
        .should('not.be.visible')
      cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
    })
    it('preenche a area de texto usando o comando invoke'), () => {
      const longText = Cypress._.repeat('0123456789', 20)
      
      cy.get('textarea')
        .invoke('val', longText)
        .should('have.value', longText)
    }

    it('faz uma requisição em http'), () => {
      cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response) {
         const { status, statusText, body } = response

         expect(status).to.eq(200)
         expect(statusText).to.eq('OK')
         expect(body).to.include('CAC TAT')
        })
    }
    it.only('Encontra o gato escondido', () => {
      cy.get('#cat')
      .invoke('show') 
      .should('be.visible')
      .invoke('hide')
      .should('not.be.visible')
      cy.get('#title')
      .invoke('text', 'CAT TAT')
      cy.get('#subtitle')
      .invoke('text', 'Gato escondido')
    })
        
})
    
   
    
       

        
    
  

