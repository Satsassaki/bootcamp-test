/// <reference types="cypress" />
const formacaoPage = require('../../support/FormaçãoAcademica/formacao.pages')

describe('Funcionalidade: Adicionar Formação Acadêmica', () =>{

    beforeEach(() =>{
        cy.fixture("usuarios").then((user) => {
            cy.login(user[0].email, user[0].senha)
        })
        cy.visit('adicionar-formacao')
    });
    it('Deve adicionar uma formação Acadêmica com sucesso', () => {
        formacaoPage.addFormacaoAcademica('Fundação Santo André', '3º Grau', 'Bacharelado em Ciências da Computação', '20/02/2010', '20/12/2014', 'Analista de sistema')
        cy.get('[data-test="education-delete"]').should('exist')
        });

    it('Deve adicionar uma formação Acadêmica cursando com sucesso', () => {
        formacaoPage.addFormacaoCursando('Fundação Santo André', '3º Grau', 'Bacharelado em Ciências da Computação', '20/02/2010', 'Analista de sistema')
        cy.get('.jss10'),click()
        cy.get('[data-test="education-delete"]').should('exist')
        });

    it('Deve excluir uma fomação Acadêmica com sucesso', () => {
        formacaoPage.addFormacaoAcademica('Fundação Santo André', '3º Grau', 'Bacharelado em Ciências da Computação', '20/02/2010', '20/12/2014', 'Analista de sistema')
        cy.get('[data-test="education-delete"]').first().click(),
        cy.get('[data-test="alert"]').should('contain', 'Formação Acadêmica Removida')
});
})