import { compareTwoStrings } from "string-similarity";

export default function messageMatch(url, data, checkFormat) {
  let match = 0;
  const searchParams = new URLSearchParams(url.split("?")[1]);
  const text = searchParams.get("text");
  let decodedText = decodeURIComponent(text);
  decodedText = decodedText.replace(/\s/g, '').toLowerCase();

  let dish = data.dishTitle.replace(/\s/g, '').toLowerCase();
  let drink = data.drinkTitle.replace(/\s/g, '').toLowerCase();
  let dessert = data.dessertTitle.replace(/\s/g, '').toLowerCase();
  let total = data.totalPrice.toFixed(2).replace('.', ',');

  if (!!checkFormat) {
    const baseMessage = `olá,gostariadefazeropedidoprato${dish}bebida${drink}sobremesa${dessert}totalr$${total}`;

    decodedText = decodedText.replace(/\*/g, '');
    decodedText = decodedText.replace(/\:/g, '');
    decodedText = decodedText.replace(/\-/g, '');
    decodedText = decodedText.replace(/\_/g, '');

    const similarity = compareTwoStrings(baseMessage, decodedText);
    console.log(similarity);

    if (similarity > 0.8) {
      match = 2;
      return match;
    }
  }

  if (
    decodedText.includes(dish) &&
    decodedText.includes(drink) &&
    decodedText.includes(dessert) &&
    decodedText.replace('.', ',').includes(total.replace('.', ','))
  ) {
    match = 1;
  } else {
    if (!decodedText.includes(dish)) throw new Error(`O prato "${data.dishTitle}" não foi encontrado na mensagem a ser enviada via WhatsApp! Verifique se possui algum erro de digitação, espaçamento ou letras maiúsculas e minúsculas. Lembrando que o nome que aparece no elemento clicado deve ser exatamente igual ao nome enviado na mensagem.`);
    if (!decodedText.includes(drink)) throw new Error(`A bebida "${data.drinkTitle}" não foi encontrada na mensagem a ser enviada via WhatsApp! Verifique se possui algum erro de digitação, espaçamento ou letras maiúsculas e minúsculas. Lembrando que o nome que aparece no elemento clicado deve ser exatamente igual ao nome enviado na mensagem.`);
    if (!decodedText.includes(dessert)) throw new Error(`A sobremesa "${data.dessetTitle}" não foi encontrada na mensagem a ser enviada via WhatsApp! Verifique se possui algum erro de digitação, espaçamento ou letras maiúsculas e minúsculas. Lembrando que o nome que aparece no elemento clicado deve ser exatamente igual ao nome enviado na mensagem.`);
    if (!decodedText.replace('.', ',').includes(total.replace('.', ','))) throw new Error(`O preço correto não foi encontrado na mensagem a ser enviada via WhatsApp!`);
  }

  return match;
}
