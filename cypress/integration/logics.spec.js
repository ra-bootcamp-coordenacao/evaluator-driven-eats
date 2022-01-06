/// <reference types='cypress-xpath' />
import xpath from 'cypress-xpath';
import findSimilarity from '../helpers/findSimilarity';

beforeEach(() => {
  cy.visit(Cypress.env('url'));
});

describe('Layout: Itens e Botão habilitados', () => {
  it('Check e borda nos itens ao selecioná-los', () => {
    cy.xpath(
      "//*[@data-identifier='dishes']//*[@data-identifier='food-option']"
    )
      .first()
      .as('dish');
    cy.analyseElement('@dish').as('beforeColors');

    cy.wait(0).then(function () {
      cy.log(this.beforeColors);
    });

    cy.get('@dish').click();
    cy.analyseElement('@dish').as('afterColors');

    cy.wait(0).then(function () {
      cy.log(this.afterColors);
      expect(
        findSimilarity(
          this.beforeColors.asHexMatrix.flat(),
          this.afterColors.asHexMatrix.flat()
        )
      ).to.equal(0);
    });
  });

  it('Mudança de texto e cor no botão flutuante', () => {
    cy.contains('Selecione os 3 itens para fechar o pedido').as('before');
    cy.get('@before').should('be.visible');
    cy.shouldNotExistOrShouldNotBeVisible({ text: 'Fechar pedido' });
    cy.analyseElement('@before', 162, 0, 10, 10).as('beforeColors');

    cy.wait(0);

    cy.xpath(
      "//*[@data-identifier='dishes']//*[@data-identifier='food-option']"
    )
      .first()
      .click();
    cy.xpath(
      "//*[@data-identifier='drinks']//*[@data-identifier='food-option']"
    )
      .first()
      .click();
    cy.xpath(
      "//*[@data-identifier='desserts']//*[@data-identifier='food-option']"
    )
      .first()
      .click();
    cy.shouldNotExistOrShouldNotBeVisible({
      text: 'Selecione os 3 itens para fechar o pedido',
    });
    cy.contains('Fechar pedido').as('after');
    cy.get('@after').should('be.visible');
    cy.analyseElement('@after', 162, 0, 10, 10).as('afterColors');
    cy.wait(0).then(function () {
      expect(
        findSimilarity(
          this.beforeColors.asHexMatrix.flat(),
          this.afterColors.asHexMatrix.flat()
        )
      ).to.equal(0);
    });
  });
});
