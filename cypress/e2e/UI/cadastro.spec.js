/// <reference types="cypress" />
const faker = require('faker-br')

describe('US0002 - Funcionalidade: Cadastrar', ()=> {

beforeEach(() => {
     cy.visit('cadastrar')
});

   it('Deve fazer cadastro com sucesso', ()=> {
     cy.cadastrar ('Lucia SS', 'teste012', 'teste012')
     cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.internet.email())
     cy.get('[data-test="register-submit"]').click()
     cy.get('.large').should('contain', 'Dashboard')
     cy.get('[data-test="dashboard-createProfile"]').should('exist')

   });
   it('Deve validar o cadastro incorreto', ()=> {
    cy.cadastrar ('Lucia SS', 'teste123', 'teste123')
    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type('lucia@bootcamp.com')
    cy.get('[data-test="register-submit"]').click()
    cy.get('[data-test="alert"]').should('contain', 'Usuário já registrado')

});
})
 /*
 antes de tudo
 before

 antes de cada cenário
 beforeEach

 depois de tudo
 after

 depois de cada cenário
 afterEach
*/

   