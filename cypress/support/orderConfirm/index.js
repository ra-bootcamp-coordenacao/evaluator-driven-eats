function orderConfirm() {
  cy.window().then((win) => {
    cy.stub(win, 'prompt').returns('test').as('prompt');
    cy.stub(win, 'open').callsFake(url => {
      setTimeout(() => win.location.href = url, 0);
      return win;
    });
    cy.getExistingElement([{text: 'fechar pedido'}, {text: 'fechar o pedido'}, {text: 'fazer pedido'}, {text: 'fazer o pedido'}, { text: 'confirme' }, { text: 'finalizar' }, { text: 'finalize'}]).click();
    cy.wait(0);

    cy.runIfElementExists(
      { xpath: "//*[@data-identifier='confirmation-dialog']" },
      () => {
        cy.removeUnwantedAttribute('a', 'target');
        cy.getExistingElement([{text: 'tudo certo'}, {text: 'pode pedir'}]).click();
      }
    );
  });
}

Cypress.Commands.add('orderConfirm', function () {
  return orderConfirm();
});
