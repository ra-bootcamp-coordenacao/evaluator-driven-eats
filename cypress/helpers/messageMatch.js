export default function messageMatch(url, data, checkFormat) {
  let match = 0;
  let messageRegex = /Olá%2Cgostariadefazeropedido%3A\sPrato%3A(([A-zÀ-ÿ])+?)\sBebida%3A(([A-zÀ-ÿ])+?)\sSobremesa%3A(([A-zÀ-ÿ])+?)\sTotal%3AR%24[0-9]*\.[0-9]+/;
  let decodedURL = decodeURI(url);

  let dish = data.dishTitle.replace(/\s/g, '');
  let drink = data.drinkTitle.replace(/\s/g, '');
  let dessert = data.dessertTitle.replace(/\s/g, '');

  while(decodedURL.includes('+')) {
    decodedURL = decodedURL.replace('+', '');
  }
  while (decodedURL.includes('-')) {
    decodedURL = decodedURL.replace('-', '');
  }
  console.log(decodedURL, dish, drink, dessert, data.totalPrice);
  if (!!checkFormat) {
    if (messageRegex.test(decodedURL)) return 2;
  }

  if (
    decodedURL.includes(dish) &&
    decodedURL.includes(drink) &&
    decodedURL.includes(dessert) &&
    decodedURL.includes(data.totalPrice.toFixed(2))
  ) {
    match = 1;
  }

  return match;
}
