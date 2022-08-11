function removeAttribute(element, attribute) {
	cy.xpath(`//${element}`).then(results => {
		if(results.length > 1) {
			results.forEach(result => {
				cy.get(result).invoke('removeAttr', attribute)
			});
		} else if(results.length === 1) {
			cy.xpath(`//${element}`).invoke('removeAttr', attribute)
		} else {
			cy.log(`No ${element} element found`);
		}
	});
}

Cypress.Commands.add("removeUnwantedAttribute", function (element = 'div', attribute) {
  removeAttribute(element, attribute);
});
