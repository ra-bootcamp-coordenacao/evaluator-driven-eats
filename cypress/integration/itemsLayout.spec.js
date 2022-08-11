/// <reference types='cypress-xpath' />
import xpath from 'cypress-xpath';
import findInMatrix from '../helpers/findInMatrix';
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

    cy.get('@dish').click();
    cy.analyseElement('@dish').as('afterColors');
    cy.wait(0).then(function () {
      expect(
        findSimilarity(
          this.beforeColors.asHexMatrix.flat(),
          this.afterColors.asHexMatrix.flat()
        )
      ).to.equal(0);

      expect(findInMatrix(this.afterColors.asHexMatrix, '#32b72f')).to.be.true;
    });
  });

  it('Mudança de texto e cor no botão flutuante', () => {
    cy.getExistingElement([{text: '3 itens'}, {text: 'três itens'}, {text: 'tres itens'}]).as('button');
    cy.get('@button').should('be.visible');
    cy.analyseElement('@button').as('buttonBefore');
    cy.shouldNotExistOrShouldNotBeVisible({
      text: 'Fechar pedido'
    });

    cy.selectOptions({ ignoreOptionData: true });
    cy.shouldNotExistOrShouldNotBeVisible({
      text: 'Selecione os 3 itens'
    });

    cy.getExistingElement([{text: 'fechar pedido'}, {text: 'fechar o pedido'}, {text: 'fazer pedido'}, {text: 'fazer o pedido'}]).as('button');
    cy.get('@button').should('be.visible');
    cy.analyseElement('@button').as('buttonAfter');
    cy.wait(0).then(function () {
      expect(
        findSimilarity(
          this.buttonBefore.asHexMatrix.flat(),
          this.buttonAfter.asHexMatrix.flat()
        )
      ).to.equal(0);
    });
  });
});