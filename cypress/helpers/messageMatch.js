export default function messageMatch(url, data, checkFormat) {
  let match = 0;
  let regex =
    /Ol%C3%A1%2C\+gostaria\+de\+fazer\+o\+pedido%3A%0A\+\+-\+Prato%3A\+([a-zA-Z]+(\+?[a-zA-Z]+)+?)%0A\+\+-\+Bebida%3A\+([a-zA-Z]+(\+?[a-zA-Z]+)+?)%0A\+\+-\+Sobremesa%3A\+([a-zA-Z]+(\+?[a-zA-Z]+)+?)%0A\+\+Total%3A\+R%24\+[0-9]*\.[0-9]+/;
  let decodedURL = decodeURI(url)
    .replace(/\+/g, '')
    .replace(',', '.')
    .toLowerCase();
  let dish = data.dishTitle.replace(' ', '').replace(' ', '').toLowerCase();
  let drink = data.drinkTitle.replace(' ', '').replace(' ', '').toLowerCase();
  let dessert = data.dessertTitle
    .replace(' ', '')
    .replace(' ', '')
    .toLowerCase();

  if (!!checkFormat) {
    if (regex.test(url)) return 2;
  }

  if (
    decodedURL.includes(dish) &&
    decodedURL.includes(drink) &&
    decodedURL.includes(dessert) &&
    decodedURL.includes(data.totalPrice)
  )
    match = 1;

  return match;
}
