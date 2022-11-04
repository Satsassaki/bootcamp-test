/// <reference types="cypress" />
const experienciaPage = require('../../support/Experiencia/experiencia.pages')

describe('Funcionalidade: Adicionar experiência', () =>{

    beforeEach(() =>{
    /*    cy.fixture("usuarios").then((user) => {
            cy.login(user[1].email, user[1].senha)
        })*/
        cy.loginApp()
        cy.visit('adicionar-experiencia')
    });

    it.only('Acessar experiência', () =>{
        cy.log(2+2)
    });
    it('Deve adicionar uma experiência com sucesso', () => {
        experienciaPage.addExperiencia('QA', 'Via Varejo', 'SBC', '01/01/2019', '01/10/2029', 'ViaHUb é top')
        cy.get('[data-test="experience-delete"]').should('exist')
        });

    it('Deve adicionar uma experiência Atual com sucesso', () => {
        experienciaPage.addExperienciaAtual('QA', 'Via Varejo', 'SBC', '01/01/2019', 'ViaHUb é top')
        cy.get('[data-test="experience-delete"]').should('exist')
        });

    it('Deve excluir uma experiência com sucesso', () => {
        experienciaPage.addExperiencia('QA', 'Via Varejo', 'SBC', '01/01/2019', '01/10/2029', 'ViaHUb é top')
        cy.get('[data-test="experience-delete"]').first().click(),
        cy.get('[data-test="alert"]').should('contain', 'Experiência Removida')
});
})