/// <reference types='cypress-xpath' />
import xpath from 'cypress-xpath';
import findInMatrix from '../helpers/findInMatrix';
import findSimilarity from '../helpers/findSimilarity';

before(() => {
  cy.visit(Cypress.env('url'));
});

describe('Lógica: Habilitar botão de enviar pedido', () => {
  it('Botão de enviar pedido fica desabilitado até selecionar todos os pedidos', () => {
    cy.contains('Selecione os 3 itens').as('button');
    cy.analyseElement('@button').as('buttonBeforeAll');
    cy.wait(0);

    cy.contains('Selecione os 3 itens').should('be.visible');
    cy.xpath(
      "//*[@data-identifier='dishes']//*[@data-identifier='food-option']"
    )
      .first()
      .click();
    cy.analyseElement('@button').as('buttonAfterOne');
    cy.wait(0);

    cy.contains('Selecione os 3 itens').should('be.visible');
    cy.xpath(
      "//*[@data-identifier='drinks']//*[@data-identifier='food-option']"
    )
      .first()
      .click();
    cy.analyseElement('@button').as('buttonAfterTwo');
    cy.wait(0);

    cy.contains('Selecione os 3 itens').should('be.visible');
    cy.xpath(
      "//*[@data-identifier='desserts']//*[@data-identifier='food-option']"
    )
      .first()
      .click();
    cy.contains('Fechar pedido').as('button');
    cy.analyseElement('@button').as('buttonAfterThree');
    cy.wait(0).then(function () {
      cy.contains('Fechar pedido').should('be.visible');
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
