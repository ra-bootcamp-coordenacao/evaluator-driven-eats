function orderConfirm() {
  cy.window().then((win) => {
    cy.stub(win, 'prompt').returns('Test');
    cy.xpath("//*[contains(text(), 'Fechar pedido')]").click();
    cy.wait(0);

    cy.runIfElementExists(
      { xpath: "//*[@data-identifier='confirmation-dialog']" },
      () => {
        cy.xpath("//*[contains(text(), 'Tudo certo, pode pedir!')]").click();
      }
    );
  });
}

Cypress.Commands.add('orderConfirm', function () {
  return orderConfirm();
});
