/// <reference types="cypress" />
import usuarios from "../../fixtures/usuarios.json"

describe('Us0001 - Funcionalidade: Login', () =>{

    beforeEach(() =>{
        cy.visit('login')
    });
    it('Deve fazer login com sucesso', () =>{
      cy.login ('lucia@bootcamp.com', 'teste123')
      cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
    });

    it('Validar mensagem de erro quando inserir usuário ou senha inválidos', () =>{
        cy.login ('lucia01@bootcamp.com', 'teste12378')
        cy.get('[data-test="alert"]').should('contain', 'Credenciais inválidas')

    });
    it('Deve fazer login com sucesso - usando importação', () => {
      cy.login(usuarios[0].email, usuarios[0].senha)
      cy.title().should('eq', 'ConexaoQA')
    });
    it('Deve fazer login com sucesso - usando fixture', () => {
      cy.fixture("usuarios").then((user) => {
        cy.login(user[1].email, user[1].senha)
      })
      cy.title().should('eq', 'ConexaoQA')
    })
   });
/*
  Funcionalidade: Login
  Eu como usuário das conexão QA
  Quero fazer o login com sucesso
  Para editar meu perfil

  Cenário: Login com sucesso
  Arrange - Dado - pré-requisito -> Dado que eu esteja na tela de Login
  Action - Quando - Ação do usuário -  Quando eu inserir usuário e senha
  Assert - Então - Resultado esperado - Então deve me direcionar para o Dashboard

  Esquema do cenário
  Quando eu inserir <usuario>
  E <senha>
  Então

  Exemplos: 
  |usuario | senha| 
  |"lucia@bootcamp.com" | "teste123" | 
  |"ana@via.com" |

  Cenário: Validar msg de error com

  Cenário: Recuperar senha

  Cenário: Deve fazer cadastro com sucesso

*/