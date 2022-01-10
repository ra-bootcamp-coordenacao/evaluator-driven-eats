function orderConfirm() {
  cy.window().then((win) => {
    cy.stub(win, 'prompt').returns('Test');
    cy.contains('Fechar pedido').click();
    cy.wait(0);

    cy.runIfElementExists(
      { xpath: "//*[@data-identifier='confirmation-dialog']" },
      () => {
        cy.contains('Tudo certo, pode pedir!').click();
      }
    );
  });
}

Cypress.Commands.add('orderConfirm', function () {
  return orderConfirm();
});
