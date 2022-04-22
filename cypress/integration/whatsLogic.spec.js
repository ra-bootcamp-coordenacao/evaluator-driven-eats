/// <reference types='cypress-xpath' />

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