/// <reference types="cypress" />
const faker = require('faker-br')

describe('Funcionalidade: criar-perfil', () => {

  before(() => {
    cy.visit('cadastrar')
    cy.cadastrar ('Lucia SS', 'teste012', 'teste012')
    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.internet.email())
    cy.get('[data-test="register-submit"]').click()
    cy.get('.large').should('contain', 'Dashboard')
    cy.get('[data-test="dashboard-createProfile"]').click()
    
  })
     it('Deve criar perfil com sucesso', () => {
        cy.get('#mui-component-select-status').click()
        //Seleção de status random
      cy.get('.MuiMenu-list li').then(($li) => {
        const items = $li.toArray()
        return Cypress._.sample(items) 
       }).click()
      cy.criarPerfil ('Via', 'https://conexaoqa.herokuapp.com', 'Mauá-SP','Testes Manuais, Jira, UnixBásico', 'Lucia Sassaki')
      cy.get('[data-test="alert"]').should('contain','Perfil Criado')
  });
});
