function orderConfirm() {
  cy.window().then((win) => {
    cy.stub(win, 'prompt').returns('Test');
    cy.stub(win, 'open').callsFake(url => win.location.href = url)
    cy.get('body').contains(/^fechar pedido$/i).first().click();
    cy.wait(0);

    cy.runIfElementExists(
      { xpath: "//*[@data-identifier='confirmation-dialog']" },
      () => {
        cy.get('body').contains(/^tudo certo$/i).first().click();
      }
    );
  });
}

Cypress.Commands.add('orderConfirm', function () {
  return orderConfirm();
});
