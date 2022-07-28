export default function messageMatch(url, data, checkFormat) {
  let match = 0;
  let messageRegex = /Olá,gostariadefazeropedido:-Prato:[\s\S]*-Bebida:[\s\S]*-Sobremesa:[\s\S]*Total:R\$[0-9]*\,[0-9]+.*/;
  let searchParams = new URLSearchParams(url.split("?")[1]);
  let text = searchParams.get("text");
  let decodedText = decodeURIComponent(text);
  decodedText = decodedText.replace(/\s/g, '');

  let dish = data.dishTitle.replace(/\s/g, '');
  let drink = data.drinkTitle.replace(/\s/g, '');
  let dessert = data.dessertTitle.replace(/\s/g, '');
  let total = data.totalPrice.toFixed(2);

  if (!!checkFormat) {
    if(!decodedText.match(/R\$[0-9]*\,[0-9]+/)) {
      decodedText = decodedText.replace('.', ',');
    }
    if (messageRegex.test(decodedText)) return 2;
  }

  if (
    decodedText.includes(dish) &&
    decodedText.includes(drink) &&
    decodedText.includes(dessert) &&
    decodedText.replace('.', ',').includes(total.replace('.', ','))
  ) {
    match = 1;
  }

  return match;
}
