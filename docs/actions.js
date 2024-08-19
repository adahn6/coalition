import { getCard, isCompatibleCard, createDecklistFromAllCards } from './data.js';
import { $, setHTML, hideHTML, showHTML, getState, setState } from './utils.js';
import { cardTemplate } from './templates.js';
import { parseDecklist } from './parser.js';


function setCard(cardName) {
  const cardData = getCard(cardName);
  if (!cardData) {
    const datalist = $('#cards');

    const cards = getState("cards").filter(card => 
      card["name"].startsWith(cardName));
    const limited = cards.slice(0,500)
    datalist.innerHTML = '';
    limited.forEach((card) => {
      let option = document.createElement("option");
      option.setAttribute('value', card["name"]);
      datalist.appendChild(option);
    });
    return;
  }

  setState("cardDetails", cardData);
  setHTML($("#card_details"), cardTemplate(cardData));
};




export { setCard };