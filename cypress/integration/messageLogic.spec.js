/// <reference types='cypress-xpath' />
import xpath from 'cypress-xpath';
import messageMatch from '../helpers/messageMatch';

beforeEach(() => {
  cy.intercept(/https:\/\/api.whatsapp.com\/.*/g, (req) => {
    req.headers['Content-Type'] = 'text/html';
    req.reply('<h1>Hello!</h1>');
  });

  cy.visit(Cypress.env('url'));
});

describe('Lógica: Envio por WhatsApp', () => {
  it('O pedido é encaminhado por WhatsApp após clicar em enviar o pedido', () => {
    cy.selectOptions();
    cy.orderConfirm();

    cy.url().should('contain', 'https://api.whatsapp.com/send/?phone');
  });
});

describe('Lógica: Conteúdo da mensagem de acordo com o combo', () => {
  it('A mensagem deve estar com pratos e preço de acordo com o que o usuário escolheu', () => {
    cy.selectOptions().then((data) => {
      cy.orderConfirm().then(() => {
        cy.window().then((win) => {
          expect(messageMatch(win.location.href, data)).to.equal(1);
        });
      });
    });
  });
});

describe("Lógica: Formatação de mensagem conforme requisito", () => {
  it('Formatação de mensagem de acordo com o formato proposto', () => {
    cy.selectOptions().then((data) => {
      cy.orderConfirm().then(() => {
        cy.window().then((win) => {
          expect(messageMatch(win.location.href, data, 'format')).to.equal(2);
        });
      });
    });
  });
})
