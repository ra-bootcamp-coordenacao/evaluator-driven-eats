import xpath2 from 'xpath2.js';

function searchElement(descriptors) {
  return cy.document().then(doc => {
    let element = [];
    for(let i = 0; i < descriptors.length; i++) {
      if(element.length > 0) break;
      const isText = !!descriptors[i].text;
      const isXpath = !!descriptors[i].xpath;
      const isSelector = !!descriptors[i].selector;

      if (isText) {
        if(xpath2.evaluate(`//*[fn:matches(., "${descriptors[i].text}", "i")]`, doc, null, null).length > 0) {
          element = xpath2.evaluate(`//*[fn:matches(., "${descriptors[i].text}", "i")]`, doc, null, null);
          if (element === doc) element = null;
        }
      } else if(isXpath) {
        if (xpath2.evaluate(`${descriptors[i].xpath}`, doc, null, null).length > 0) {
          element = xpath2.evaluate(`${descriptors[i].xpath}`, doc, null, null);
          if (element === doc) element = null;
        }
      } else if(isSelector) {
        element = doc.querySelector(descriptors[i].selector);
      }

      if(isText && element.length > 0) {
        return element[element.length - 1];
      } else if (isXpath || isSelector) {
        return element;
      }
    }
  });
}

Cypress.Commands.add("getExistingElement", function (descriptors) {
  return searchElement(descriptors);
});
