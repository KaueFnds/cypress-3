/// <reference types="cypress" />

import { format, prepareLocalStorage } from '../support/utils'

context('Dev Finance Agilizei', () => {

beforeEach(() => {
  cy.visit('https://devfinances-bobnini.netlify.app/finance.html#',{
    onBeforeLoad: (win) => {
      prepareLocalStorage(win)
    }
  })

});
  it('Cadastrar entradas', () => {
      
    
    cy.visit('https://devfinances-bobnini.netlify.app/finance.html#', {

    })
      
    cy.get('.toggle-dark').click() //classe
    cy.get('#transaction .button').click() // id + classe
    cy.get('#empresa').type('familia') // id
    cy.get('#description').type('mesada')
    cy.get('#amount').type(50)
    cy.get('#date').type('2023-04-30')
    cy.get('button').contains('Salvar').click()

    cy.get('#data-table tbody tr').should('have.length', 3)

  });

  it('Cadastrar saidas', () => {

  cy.get('.toggle-dark').click()
  cy.get('#transaction .button').click()
  cy.get('#empresa').type('padaria dois irmãos')
  cy.get('#description').type('coca cola + salgado')
  cy.get('#amount').type(-10)
  cy.get('#date').type('2023-04-30')
  cy.get('button').contains('Salvar').click()

  cy.get('#data-table tbody tr').should('have.length', 3)

  });

  it('Remover entraddas e saidas', () => {

    // estrategia 1: voltar para o elemento pai, e avançar para um td img attr
    cy.get('td.description')
      .contains('mesada')
      .parent()
      .find('img[onclick*=remove]')
      .click()

      // estrategia 2: buscar todos os irmão, e buscar o que tem img + attr

    cy.get('td.description')
      .contains('coca cola + salgado')
      .siblings()
      .children('img[onclick*=remove]')
      .click()

    cy.get('#data-table tbody tr').should('have.length', 0)  
  });  
  it('Validar saldo com diversas transações', () => {   

    // capturar as linhas com as transações 
    // formatar os valores da linhas

    // capturar o texto do total
    // comparar o somatorio de entradas e despesas com o total

    let incomes = 0
    let expenses = 0

    cy.get('#data-table tbody tr')
      .each(($el, index, $list, ) => {
        
        cy.get($el).find('td.income, td.expense').invoke('text').then(text => {
          if(text.includes('-')){
            expenses = expenses + format(text)
          } else {
            incomes = incomes + format(text)
          }
          cy.log(`entradas`, incomes)
          cy.log(`saidas`, expenses)
          })

          

          })
          cy.get('#totalDisplay').invoke('text').then(text =>{
          
            let formattedTotalDisplay = format(text)
            let expectedTotal = incomes + expenses

            expect(formattedTotalDisplay).to.eq(expectedTotal)
        })

  });
});
