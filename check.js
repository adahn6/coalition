import { $, setHTML, getState, setState } from './utils.js';
import { getCard } from './data.js';
import { cardTemplate } from './templates.js';

const displayCheck = () => {
    document.querySelectorAll('.choice').forEach(node => {
        if(node["id"] === "check") {
            node.classList.add("selected")
        }
        else {
            node.classList.remove("selected")
        }
    })
    $("#content").innerHTML = `
    <div id='card_input'>
      <input
        name="card"
        type='text'
        id="card"
        placeholder="enter card name"
        list="cards"
      />

      <datalist id="cards"></datalist>
    </div>

    <div id="card_details">
    </div>
    `;

    $("#card").addEventListener("input", () => handleCard());
}

const handleCard = () => {
    setCard($("#card").value);
}

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

export { displayCheck }