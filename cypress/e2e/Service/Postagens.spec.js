/// <reference types="cypress" />

describe('Teste de Criação de Postagens', () => {
    let token
    beforeEach(() => {
        cy.tokenJwt().then((auth) => {
            token = auth
        })
    })
    
    it('[POST] - Criar uma postagem',() => {
        cy.request({
            method: 'POST',
            url:'/api/posts',
            headers: {
                Cookie: token
            },
            body:{
                "text": "Postagem pelo Cypress"
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
        })
    })
});
describe('Teste de Consulta', () => {
        let token
        beforeEach(() => {
            cy.tokenJwt().then((auth) => {
                token = auth
            })
        })
    it('[GET] - Consultar uma postagem', () => {
        cy.request({
            method: 'GET',
            url: '/api/posts',
            headers: {
                    Cookie: token
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })
    
    it('[GET] Consultar uma postagem por ID', () => {
        cy.criarPostagem(token,"PostagemID").then((response) => {
          //let id = response.body._id
          cy.request({
            method:'GET',
            url: `/api/posts/${response.body._id}`,
            headers: {
              Cookie: token
            },
          }).then((response) => {
              expect(response.status).to.eq(200)
          })
        })
    }) 
});      

describe('Teste de Exclusão', () => {
    let token
    beforeEach(() => {
        cy.tokenJwt().then((auth) => {
                token = auth
        })
    })
    it('[DELETE] Excluir uma postagem',() => {
        cy.criarPostagem(token, "PostagemID").then((response) => {
            let id = response.body._id
            cy.request({
               method: 'DELETE',
                url:`api/posts/${id}`,
                headers: {
                    Cookie: token
                },
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.msg).to.eq("Post removido")
            })   
        })
    })
});
describe('Teste de Alteração', () => {
    let token
    beforeEach(() =>{
        cy.tokenJwt().then((auth) =>{
            token = auth
        })
    })
          
    it('[PUT] Curtir uma postagem', () => {
    
        cy.criarPostagem(token, "PostagemID").then((response) =>{
            let id = response.body._id
            cy.request({
                method:'PUT',
                url:`api/posts/like/${id}`,
                headers: {
                    Cookie: token
                },
            }).then((response) =>{
                expect(response.status).to.eq(200)
            })
    
        })
    
    })

})