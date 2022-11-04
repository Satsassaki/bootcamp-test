/// <reference types="cypress" />

import profile from '../../fixtures/profile.json'
describe('Teste de Criação de Profile', () => {

    let token
    beforeEach(() => {
        cy.tokenJwt().then((auth) => {
            token = auth
        })
    })

    it('[POST] - Criar uma profile',() => {
        cy.request({
            method: 'POST',
            url:'/api/profile',
            headers: {
               Cookies: token
            },
            body: profile
            }).then((response) => {
               expect(response.status).to.eq(200)
        })
    })
})  

    describe('Teste de consulta', () => {
        let token
        beforeEach(() => {
           cy.tokenJwt().then((auth) => {
              token = auth
           })
        })

        it('[GET] - Consultar um profile', () => {
            cy.request({
               method: 'GET',
               url: '/api/profile',
               headers: {
                    Cookie: token
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })
    })

    describe('Teste de criação de uma experiencia', () => {
        let token 
        beforeEach(() => {
            cy.tokenJwt().then((auth) => {
                token = auth
            })
        })
        it('[PUT] - Criar uma experiencia',() => {
           
            cy.request({
               method: 'PUT',
               url:'/api/profile/experience',
               headers: {
                  Cookies: token
               },
               body:{ 
                  "title": "Estagiário",
                  "company": "Solucion business",
                  "location": "José dos Campos-SP",
                  "from": "2018-10-11",
                  "to": "2020-07-14",
                  "current": false,
                  "description": "Estagiário na área de negócios"
            }
            }).then((response) => {
              expect(response.status).to.eq(200)
            })
        })
    })
      
    
    describe ('Excluir conta de usuário',() => {
        let token1
        beforeEach(() => {
          cy.criarUsuario().then((auth1) => {
            token1 = auth1
          })
        })
        
        it('[DELETE] Excluir uma conta de usuário',() => {
           cy.request({
             method:'DELETE',
             url:'/api/profile',
             headers:{
                Cookies: token1
             }
           }).then((response) => {
            expect(response.status).to.eq(200)
            
           })   
        })
    });
