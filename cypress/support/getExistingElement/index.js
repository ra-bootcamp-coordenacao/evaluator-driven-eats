import xpath2 from 'xpath2.js';

function searchElement(descriptor) {
  return cy.document().then(doc => {
    let element = [];

    const isText = !!descriptor.text;
    const isXpath = !!descriptor.xpath;
    const isSelector = !!descriptor.selector;

    if (isText) {
      if(xpath2.evaluate(`//*[fn:matches(., "${descriptor.text}", "i")]`, doc, null, null).length > 0) {
        element = xpath2.evaluate(`//*[fn:matches(., "${descriptor.text}", "i")]`, doc, null, null);
        if (element === doc || (element.length === 1 && element[0] === doc)) element = null;
      }
    } else if(isXpath) {
      if (xpath2.evaluate(`${descriptor.xpath}`, doc, null, null).length > 0) {
        element = xpath2.evaluate(`${descriptor.xpath}`, doc, null, null);
        if (element === doc || (element.length === 1 && element[0] === doc)) element = null;
      }
    } else if(isSelector) {
      element = doc.querySelector(descriptor.selector);
    }

    if(isText && element.length > 0) {
      return element[element.length - 1];
    } else if (isXpath || isSelector) {
      return element;
    }
  });
}

/** Explicação pros monstros abaixo
 * 
 * A gente precisa iterar num array de descritores pra procurar o elemento
 * Pra cada elemento a gente precisa usar o cy.get que é assíncrono de forma especial
 * Sem usar callback nem promessas reais
 * Então a função abaixo recebe um array e uma função como parâmetro
 * Quando chama a função, passa o valor atual e um callback next
 * 
 * Se temos um código assim:
 * 
 * return wrapIteration([{text: "banana"}, {text: "bananinha"}], (value, next) => {
 *   // na primeira vez que essa função é chamada o value é {text: "banana"}
 *   // na segunda {text: "bananinha"}
 *   // somente se chamar a função next que será chamada com o próximo valor
 *   return next(); // precisa retornar next();
 * });
 */

function wrapIteration(array, fn) {
  if (array.length === 0) throw Error(`Não foi possível encontrar o elemento desejado!`);

  const next = () => {
    return wrapIteration(array.slice(1), fn);
  };

  return fn(array[0], next);
}

Cypress.Commands.add("getExistingElement", function (descriptors) {
  return wrapIteration(descriptors, (value, next) => {
    return searchElement(value).then(element => {
      return cy.get(element).then(element => {
        if (element.is(":visible")) return element;
        return next();
      });
    });
  });
});
