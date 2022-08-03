/// <reference types='cypress-xpath' />
import xpath from 'cypress-xpath';

beforeEach(() => {
  cy.visit(Cypress.env('url'));
});

describe('Testing solutions', () => {
	it('Retrieving using contains and RegExp', () => {
		let element;
		cy.selectOptions();

		cy.getExistingElement([{text: 'fechar o pedido'}, {text: 'fazer pedido'}, {text: 'fazer o pedido'}, {text: 'fechar pedido'}]).then(e => {
			console.log(e);
		});
  });
});