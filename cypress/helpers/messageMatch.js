export default function messageMatch(url, data, checkFormat) {
  let match = 0;
  let messageRegex = /Olá,gostariadefazeropedido:-Prato:(([A-zÀ-ÿ])+?)-Bebida:(([A-zÀ-ÿ])+?)-Sobremesa:(([A-zÀ-ÿ])+?)Total:R\$[0-9]*\,[0-9]+/;
  let decodedURL = decodeURIComponent(url);
  decodedURL = decodedURL.replace(/\s/g, ' ');
  decodedURL = decodedURL.replace(/\n/g, ' ');

  let dish = data.dishTitle;
  let drink = data.drinkTitle;
  let dessert = data.dessertTitle;
  let total = data.totalPrice.toFixed(2);

  if (!!checkFormat) {
    decodedURL = decodedURL.replace(/\s/g, '');
    decodedURL = decodedURL.replace(/\n/g, '');
    decodedURL = decodedURL.replace(' ', '');

    if (messageRegex.test(decodedURL)) return 2;
  }

  if (
    decodedURL.includes(dish) &&
    decodedURL.includes(drink) &&
    decodedURL.includes(dessert) &&
    decodedURL.includes(total.replace('.', ','))
  ) {
    match = 1;
  }

  return match;
}
