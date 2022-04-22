/// <reference types='cypress-xpath' />
import xpath from 'cypress-xpath';
import findInMatrix from '../helpers/findInMatrix';
import findSimilarity from '../helpers/findSimilarity';

before(() => {
  cy.visit(Cypress.env('url'));
});

describe('Lógica: Habilitar botão de enviar pedido', () => {
  it('Botão de enviar pedido fica desabilitado até selecionar todos os pedidos', () => {
    cy.xpath("//*[contains(text(),'Selecione os 3 itens')]").first().as('button');
    cy.analyseElement('@button').as('buttonBeforeAll');

    cy.xpath("//*[contains(text(),'Selecione os 3 itens')]").should('be.visible');
    cy.xpath(
        "//*[@data-identifier='dishes']//*[@data-identifier='food-option']"
      )
      .first()
      .click();
    cy.analyseElement('@button').as('buttonAfterOne');

    cy.xpath("//*[contains(text(),'Selecione os 3 itens')]").should('be.visible');
    cy.xpath(
        "//*[@data-identifier='drinks']//*[@data-identifier='food-option']"
      )
      .first()
      .click();
    cy.analyseElement('@button').as('buttonAfterTwo');

    cy.xpath("//*[contains(text(),'Selecione os 3 itens')]").should('be.visible');
    cy.xpath(
        "//*[@data-identifier='desserts']//*[@data-identifier='food-option']"
      )
      .first()
      .click();
    cy.xpath("//*[contains(text(),'Fechar pedido')]").as('button');
    cy.analyseElement('@button').as('buttonAfterThree');
    cy.wait(0).then(function () {
      cy.xpath("//*[contains(text(),'Fechar pedido')]").should('be.visible');
      expect(
        findSimilarity(
          this.buttonBeforeAll.asHexMatrix.flat(),
          this.buttonAfterOne.asHexMatrix.flat()
        )
      ).to.equal(1);

      expect(
        findSimilarity(
          this.buttonAfterOne.asHexMatrix.flat(),
          this.buttonAfterTwo.asHexMatrix.flat()
        )
      ).to.equal(1);

      expect(
        findSimilarity(
          this.buttonAfterTwo.asHexMatrix.flat(),
          this.buttonAfterThree.asHexMatrix.flat()
        )
      ).to.equal(0);

      expect(
        findInMatrix(this.buttonAfterThree.asHexMatrix, '#32b72f')
      ).to.equal('#32b72f');
    });
  });
});