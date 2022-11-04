// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
//Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/// <reference types="Cypress" />

import auth from '../../cypress/fixtures/auth.json'

Cypress.Commands.add("navigate", (route) => {
  cy.intercept(route).as("loadpage");
  cy.visit(route, { timeout: 30000 });
  cy.wait("@loadpage");
});

Cypress.Commands.add("login", (email, senha) => {
  cy.visit("login");
  cy.get(
    '[data-test="login-email"] > .MuiInputBase-root > .MuiInputBase-input'
  ).type(email);
  cy.get(
    '[data-test="login-password"] > .MuiInputBase-root > .MuiInputBase-input'
  ).type(senha);
  cy.get('[data-test="login-submit"]').click();
});

Cypress.Commands.add("cadastrar", (nome, senha, senha2) => {
  cy.visit("cadastrar");
  cy.get(
    '[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input'
  ).type(nome);
  cy.get(
    '[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input'
  ).type(senha);
  cy.get(
    '[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input'
  ).type(senha2);
});

Cypress.Commands.add(
  "criarPerfil",
  (empresa, site, local, conhecimento, usuarioGit) => {
    cy.get(
      '[data-test="profile-company"] > .MuiInputBase-root > .MuiInputBase-input'
    ).type(empresa);
    cy.get(
      '[data-test="profile-webSite"] > .MuiInputBase-root > .MuiInputBase-input'
    ).type(site);
    cy.get(
      '[data-test="profile-location"] > .MuiInputBase-root > .MuiInputBase-input'
    ).type(local);
    cy.get(
      '[data-test="profile-skills"] > .MuiInputBase-root > .MuiInputBase-input'
    ).type(conhecimento);
    cy.get(
      '[data-test="profile-gitHub"] > .MuiInputBase-root > .MuiInputBase-input'
    ).type(usuarioGit);
    cy.get('[data-test="profile-submit"]').click();
  })

Cypress.Commands.add("tokenJwt", () => {
  cy.request({
    method: 'POST',
    url: '/api/auth',
    body: auth
  }).then((response) => {
    return response.body.jwt
  })
})
Cypress.Commands.add("criarPostagem",(token, value) => {
  cy.request({
    method:'POST',
    url:'api/posts',
    headers: {
      Cookie:token
    },
    body: {
      text:value
    }
  })
});

import profile from '../fixtures/profile.json'
Cypress.Commands.add("criarProfile", (token) => {
  cy.request({
    method: "POST",
    url:'api/profile',
    headers: {
      Cookie:token
    },
    body: profile

  })
})
 import experiencia from '../fixtures/experiencia.json'
Cypress.Commands.add("criarExperiencia", () => {
  cy.request({
    method: "POST",
    url:'api/auth',
    body: experiencia
  }).then((response) => {
    return response.body.jwt
  })
})

import user from '../fixtures/usuarios.json'
import faker from 'faker-br';
Cypress.Commands.add("loginApp", () => {
  cy.request({
    method: 'POST',
    url:'api/auth',
    body:
    {
       email: user[0].email,
       password: user[0].senha
    }
  }).then((response) => {
       cy.setCookie('region', 'BR-SP')
       window.localStorage.setItem('token',response.body.jwt)
  })
})
Cypress.Commands.add("criarUsuario",()=>{
  cy.request({
    method: "POST",
    url: '/api/users',
    body:
      {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      }
  }).then((response)=>{
      return response.body.jwt
  })
})