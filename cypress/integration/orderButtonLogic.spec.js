/// <reference types='cypress-xpath' />
import xpath from 'cypress-xpath';
import findInMatrix from '../helpers/findInMatrix';
import findSimilarity from '../helpers/findSimilarity';

beforeEach(() => {
  cy.intercept(/https:\/\/api.whatsapp.com\/.*/g, (req) => {
    req.headers['Content-Type'] = 'text/html';
    req.reply('<h1>Hello!</h1>');
  });
  
  cy.intercept(/https:\/\/wa.me\/.*/g, (req) => {
    req.headers['Content-Type'] = 'text/html';
    req.reply('<h1>Hello!</h1>');
  });

  cy.visit(Cypress.env('url'), {
    onBeforeLoad(win) {
      cy.stub(win, 'prompt').returns('p').as('prompt');
      cy.stub(win, 'open').callsFake(url => win.location.href = url)
    }
  });
});

describe('Lógica: Habilitar botão de enviar pedido', () => {
  it('Botão de enviar pedido fica desabilitado até selecionar todos os pedidos', () => {
    cy.on('url:changed', () => {
      throw new Error(`Botão não está desabilitado corretamente`);
    });

    cy.removeUnwantedAttribute('a', 'target');

    cy.getExistingElement([{text: '3 itens'}, {text: 'três itens'}, {text: 'tres itens'}]).as('button');
    cy.get('@button').should('be.visible');
    cy.get('@button').click({force: true});
    cy.get('@prompt').should('not.be.called');
    cy.shouldNotExistOrShouldNotBeVisible({xpath: "//*[@data-identifier='confirmation-dialog']"}, 'O modal de confirmação não deveria estar visível');

    cy.reload();
    cy.getExistingElement([{text: '3 itens'}, {text: 'três itens'}, {text: 'tres itens'}]).as('button');
    cy.analyseElement('@button').as('buttonBeforeAll');

    cy.xpath("//*[@data-identifier='dishes']//*[@data-identifier='food-option']").eq(0).click();
    cy.getExistingElement([{text: '3 itens'}, {text: 'três itens'}, {text: 'tres itens'}]).as('button');
    cy.analyseElement('@button').as('buttonAfterOne');
    cy.xpath("//*[@data-identifier='dishes']//*[@data-identifier='food-option']").eq(1).click();
    cy.xpath("//*[@data-identifier='dishes']//*[@data-identifier='food-option']").eq(0).click();
    cy.shouldNotExistOrShouldNotBeVisible({text: "Fechar pedido"}, 'O botão de confirmação deveria estar desabilitado');

    cy.getExistingElement([{text: '3 itens'}, {text: 'três itens'}, {text: 'tres itens'}]).should('be.visible');
    cy.xpath("//*[@data-identifier='drinks']//*[@data-identifier='food-option']").first().click();
    cy.getExistingElement([{text: '3 itens'}, {text: 'três itens'}, {text: 'tres itens'}]).as('button');
    cy.analyseElement('@button').as('buttonAfterTwo');

    cy.getExistingElement([{text: '3 itens'}, {text: 'três itens'}, {text: 'tres itens'}]).should('be.visible');
    cy.xpath("//*[@data-identifier='desserts']//*[@data-identifier='food-option']").first().click();
    cy.shouldNotExistOrShouldNotBeVisible({ text: 'Selecione os 3 itens' });
    cy.getExistingElement([{text: 'fechar pedido'}, {text: 'fechar o pedido'}, {text: 'fazer pedido'}, {text: 'fazer o pedido'}, { text: 'confirme' }, { text: 'finalizar' }, { text: 'finalize'}]).as('button');
    cy.analyseElement('@button').as('buttonAfterThree');

    cy.wait(0).then(function () {
      cy.getExistingElement([{text: 'fechar pedido'}, {text: 'fechar o pedido'}, {text: 'fazer pedido'}, {text: 'fazer o pedido'}, { text: 'confirme' }, { text: 'finalizar' }, { text: 'finalize'}]).should('be.visible');
      expect(findSimilarity(this.buttonBeforeAll.asHexMatrix.flat(), this.buttonAfterOne.asHexMatrix.flat())).to.equal(1);

      expect(findSimilarity(this.buttonAfterOne.asHexMatrix.flat(), this.buttonAfterTwo.asHexMatrix.flat())).to.equal(1);

      expect(findSimilarity(this.buttonAfterTwo.asHexMatrix.flat(), this.buttonAfterThree.asHexMatrix.flat())).to.equal(0);

      expect(findInMatrix(this.buttonAfterThree.asHexMatrix, '#32b72f')).to.equal('#32b72f');
    });
  });

  it('Botão é habilitado ao selecionar os três', () => {
    cy.removeUnwantedAttribute('a', 'target');

    cy.xpath("//*[@data-identifier='dishes']//*[@data-identifier='food-option']").eq(0).click();
    cy.xpath("//*[@data-identifier='drinks']//*[@data-identifier='food-option']").eq(0).click();
    cy.xpath("//*[@data-identifier='desserts']//*[@data-identifier='food-option']").eq(0).click();
    cy.getExistingElement([{text: 'fechar pedido'}, {text: 'fechar o pedido'}, {text: 'fazer pedido'}, {text: 'fazer o pedido'}, { text: 'confirme' }, { text: 'finalizar' }, { text: 'finalize'}]).as('orderConfirmButton').should('be.visible');
    cy.get('@orderConfirmButton').click();

    cy.runIfElementExists({xpath: "//*[@data-identifier='confirmation-dialog']"}, () => {}, () => {
      cy.url().then((url) => {
        const matchers = [
          /api.whatsapp.com\/.*/g,
          /wa.me\/.*/g
        ];

        const matches = matchers.reduce((acc, val) => val.test(url) || acc, false);

        expect(matches).to.equal(true, 'Esperava que o link aberto tivesse "https://api.whatsapp.com/" e "https://wa.me/"');
      });
    })
  });
});
