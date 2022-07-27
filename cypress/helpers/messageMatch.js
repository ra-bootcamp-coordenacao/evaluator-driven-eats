export default function messageMatch(url, data, checkFormat) {
  let match = 0;
  let messageRegex = /Olá,gostariadefazeropedido:-Prato:((?s).*)-Bebida:((?s).*)-Sobremesa:((?s).*)Total:R\$[0-9]*\,[0-9]+/;
  let decodedURL = decodeURIComponent(url);
  decodedURL = decodedURL.replace(/\s/g, '');

  let dish = data.dishTitle.replace(/\s/g, '');
  let drink = data.drinkTitle.replace(/\s/g, '');
  let dessert = data.dessertTitle.replace(/\s/g, '');
  let total = data.totalPrice.toFixed(2);

  if (!!checkFormat) {
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
