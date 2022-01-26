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
    cy.wait(0);

    cy.get('@dish').click();
    cy.analyseElement('@dish').as('afterColors');
    cy.wait(0).then(function () {
      expect(
        findSimilarity(
          this.beforeColors.asHexMatrix.flat(),
          this.afterColors.asHexMatrix.flat()
        )
      ).to.equal(0);

      expect(findInMatrix(this.afterColors.asHexMatrix, '#32b72f')).to.equal(
        '#32b72f'
      );
    });
  });

  it('Mudança de texto e cor no botão flutuante', () => {
    cy.xpath("//*[contains(text(), 'Selecione os 3 itens')]").as('button');
    cy.get('@button').should('be.visible');
    cy.shouldNotExistOrShouldNotBeVisible({ text: 'Fechar pedido' });
    cy.analyseElement('@button').as('buttonBefore');
    cy.wait(0);

    cy.selectOptions();
    cy.shouldNotExistOrShouldNotBeVisible({ text: 'Selecione os 3 itens' });
    cy.xpath("//*[contains(text(), 'Fechar pedido')]").should('be.visible');
    cy.xpath("//*[contains(text(), 'Fechar pedido')]").as('button');
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

describe('Lógica: Seleção do combo', () => {
  it('Desmarcando ao selecionar outro item', () => {
    cy.xpath(
      "//*[@data-identifier='dishes']//*[@data-identifier='food-option']"
    )
      .first()
      .as('firstDish');
    cy.analyseElement('@firstDish').as('firstBeforeClick');
    cy.wait(0);

    cy.get('@firstDish').click();
    cy.analyseElement('@firstDish').as('firstAfterClick');
    cy.wait(0);

    cy.xpath(
      "//*[@data-identifier='dishes']//*[@data-identifier='food-option']"
    )
      .eq(1)
      .as('secondDish');
    cy.analyseElement('@secondDish').as('secondBeforeClick');
    cy.wait(0);

    cy.get('@secondDish').click();
    cy.analyseElement('@secondDish').as('secondAfterClick');
    cy.wait(0);

    cy.analyseElement('@firstDish').as('firstAfterChange');
    cy.wait(0).then(function () {
      expect(
        findSimilarity(
          this.firstBeforeClick.asHexMatrix.flat(),
          this.firstAfterClick.asHexMatrix.flat()
        )
      ).to.equal(0);

      expect(
        findSimilarity(
          this.secondBeforeClick.asHexMatrix.flat(),
          this.secondAfterClick.asHexMatrix.flat()
        )
      ).to.equal(0);

      expect(
        findSimilarity(
          this.firstAfterChange.asHexMatrix.flat(),
          this.firstAfterClick.asHexMatrix.flat()
        )
      ).to.equal(0);
    });
  });
});
