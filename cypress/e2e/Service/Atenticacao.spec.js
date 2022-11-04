/// <reference types="cypress" />

import auth from '../../fixtures/auth.json'

it('[POST] - Teste de autenticação',() => {
   cy.request({
      method: 'POST',
      url:'/api/auth',
      body: auth
   }).then((response) => {
       expect(response.status).to.eq(200)
       expect(response.body).to.be.not.empty
       expect(response.body).to.have.property("jwt")
       cy.getCookies('https://conexaoqa.herokuapp.com/').should('exist')
       console.log(response.body)//printar na tela para aparecer a resposta do log
   })
      
   });

it('Teste de autenticação com usuário inválido',() => {
    cy.request({
       method: 'POST',
       url:'api/auth',
       failOnStatusCode: false,//Para passar no teste, pois deu erro
       body: {
         "email":"lucia01@teste.com",
         "password": "12345"
       }
    }).then((response) => {
        expect(response.status).to.eq(401)
    })
})
