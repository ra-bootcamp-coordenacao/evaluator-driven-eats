export default function messageMatch(url, data, checkFormat) {
  let match = 0;
  let messageRegex = /Olá%2Cgostariadefazeropedido%3A\sPrato%3A(([A-zÀ-ÿ])+?)\sBebida%3A(([A-zÀ-ÿ])+?)\sSobremesa%3A(([A-zÀ-ÿ])+?)\sTotal%3AR%24[0-9]*\.[0-9]+/;
  let decodedURL = decodeURIComponent(url);
  decodedURL = decodedURL.replace(/\s/g, ' ');
  decodedURL = decodedURL.replace(/\n/g, ' ');

  let dish = data.dishTitle;
  let drink = data.drinkTitle;
  let dessert = data.dessertTitle;
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
