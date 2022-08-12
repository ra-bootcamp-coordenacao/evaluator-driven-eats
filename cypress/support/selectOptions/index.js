function clickAndRetrieve({ ignoreOptionData = false } = {}) {
  cy.xpath("//*[@data-identifier='dishes']//*[@data-identifier='food-option']")
    .first()
    .click()
    .then(function (element) {
      if (!ignoreOptionData) {
        const elementHTML = element.get(0);
        this.dishTitle = elementHTML.querySelector(
          "*[data-identifier='food-title']"
        ).innerText;
        this.dishPrice = elementHTML.querySelector(
          "*[data-identifier='food-price']"
        ).innerText;
      }
    });
  cy.xpath("//*[@data-identifier='drinks']//*[@data-identifier='food-option']")
    .first()
    .click()
    .then(function (element) {
      if (!ignoreOptionData) {
        const elementHTML = element.get(0);
        this.drinkTitle = elementHTML.querySelector(
          "*[data-identifier='food-title']"
        ).innerText;
        this.drinkPrice = elementHTML.querySelector(
          "*[data-identifier='food-price']"
        ).innerText;
      }
    });
  cy.xpath(
    "//*[@data-identifier='desserts']//*[@data-identifier='food-option']"
  )
    .first()
    .click()
    .then(function (element) {
      cy.removeUnwantedAttribute('a', 'target');
      if (!ignoreOptionData) {
        const elementHTML = element.get(0);
        this.dessertTitle = elementHTML.querySelector(
          "*[data-identifier='food-title']"
        ).innerText;
        this.dessertPrice = elementHTML.querySelector(
          "*[data-identifier='food-price']"
        ).innerText;
      }

      let totalPrice = 0;

      if (!ignoreOptionData) {
        totalPrice = priceCalculation(
          this.dishPrice,
          this.drinkPrice,
          this.dessertPrice
        );
      }

      this.totalPrice = totalPrice;
    });

    return cy.wait(0).then(function() {
      console.log({
        dishTitle: this.dishTitle,
        drinkTitle: this.drinkTitle,
        dessertTitle: this.dessertTitle,
        totalPrice: this.totalPrice,
      });
      return cy.wrap({
        dishTitle: this.dishTitle,
        drinkTitle: this.drinkTitle,
        dessertTitle: this.dessertTitle,
        totalPrice: this.totalPrice,
      });

    });
}

function priceCalculation(dishPrice, drinkPrice, dessertPrice) {
  return (
    parseFloat(dishPrice.replace('R$', '').replace(',', '.').replace(/\s/g, '')) +
    parseFloat(drinkPrice.replace('R$', '').replace(',', '.').replace(/\s/g, '')) +
    parseFloat(dessertPrice.replace('R$', '').replace(',', '.').replace(/\s/g, ''))
  );
}

Cypress.Commands.add('selectOptions', function (options) {
  cy.wait(0);
  return clickAndRetrieve(options);
});
