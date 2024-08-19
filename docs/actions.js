import { getAttribute, mapAttributes, getCard, isCompatibleCard, createDecklistFromAllCards } from './data.js';
import { $, setHTML, hideHTML, showHTML, getState, setState } from './utils.js';
import { cardTemplate } from './templates.js';
import { parseDecklist } from './parser.js';

function setLeaderFromDecklist(leaderName) {
  //$("input#leader").setAttribute('value', leaderName);
  //setLeader(leaderName);
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

function setLeader(leaderName) {
  const leaderCardData = getCard(leaderName);

  if (!leaderCardData) {
    setState("leader");
    setHTML($("#leader_card"));
    const datalist = $('#leaders');

    const cards = getState("cards")
      .filter(leader => leader["legal"] === "leader")
      .filter(card => card["name"].startsWith(leaderName));
    const limited = cards.slice(0,500)
    datalist.innerHTML = '';
    limited.forEach((card) => {
      let option = document.createElement("option");
      option.setAttribute('value', card["name"]);
      datalist.appendChild(option);
    });

    return;
  }

  if (getState("selectedAffiliation")) {
    setSelectedAffiliation(undefined);
  }

  setState("leader", leaderCardData);

  leaderCardData["status"] = "leader";
  setHTML($("#leader_card"), cardTemplate(leaderCardData));

  setSelectableAffiliations();
};

function setSelectedAffiliation(attribute) {
  setState("selectedAffiliation", attribute);

  let decklist = getState("decklist");

  if (decklist) {
    parseDecklist(decklist);
  } else {
    parseDecklist(createDecklistFromAllCards());
  }
}

function setSelectableAffiliations() {
  setHTML($("#affiliation_select"));

  if (!getState("leader")) {
    return;
  }

  const affiliations = getState("leader")["affiliations"].map(attr => getAttribute(attr));
  
  affiliations.forEach((attribute) => {
    let button = document.createElement('input');

    button.setAttribute('type', 'button');
    button.setAttribute('name', "selected_affiliation");
    button.setAttribute('value', attribute);

    $("#affiliation_select").appendChild(button);

    button.addEventListener('click', () => {
      setSelectedAffiliation(attribute);
    });
  });

};

function setDeckResults(parsedDecklist) {
  const combinedCards = [
    parsedDecklist["pending"].map(card => cardTemplate(card)).join(''),
    parsedDecklist["compatible"].map(card => cardTemplate(card)).join(''),
    parsedDecklist["incompatible"].map(card => cardTemplate(card)).join(''),
    parsedDecklist["illegal"].map(card => cardTemplate(card)).join(''),
    parsedDecklist["invalid"].map(card => cardTemplate(card)).join(''),
  ].join('');

  //console.log(parsedDecklist)
  //parsedDecklist["compatible"].foreach(card => console.log(card["types"]))

  const filteredCreatures = parsedDecklist["compatible"].filter(card => card["types"].includes(1))
  .sort((card1, card2) => card1["manaValue"] > card2["manaValue"])
  .map(card => cardTemplate(card)).join('')
  setHTML($("#creatures"), filteredCreatures); 
  
  const filteredArtifacts = parsedDecklist["compatible"].filter(card => card["types"].includes(2))
  .sort((card1, card2) => card1["manaValue"] > card2["manaValue"])
  .map(card => cardTemplate(card)).join('')
  setHTML($("#artifacts"), filteredArtifacts); 

  const filteredEnchantments = parsedDecklist["compatible"].filter(card => card["types"].includes(3))
  .sort((card1, card2) => card1["manaValue"] > card2["manaValue"])
  .map(card => cardTemplate(card)).join('')
  setHTML($("#enchantments"), filteredEnchantments); 

  const filteredInstants = parsedDecklist["compatible"].filter(card => card["types"].includes(6))
  .sort((card1, card2) => card1["manaValue"] > card2["manaValue"])
  .map(card => cardTemplate(card)).join('')
  setHTML($("#instants"), filteredInstants); 

  const filteredSorceries = parsedDecklist["compatible"].filter(card => card["types"].includes(7))
  .sort((card1, card2) => card1["manaValue"] > card2["manaValue"])
  .map(card => cardTemplate(card)).join('')
  setHTML($("#sorceries"), filteredSorceries); 

  const filteredLands = parsedDecklist["compatible"].filter(card => card["types"].includes(0))
  .sort((card1, card2) => card1["manaValue"] > card2["manaValue"])
  .map(card => cardTemplate(card)).join('')
  setHTML($("#lands"), filteredLands); 

  const filteredBattles = parsedDecklist["compatible"].filter(card => card["types"].includes(5))
  .sort((card1, card2) => card1["manaValue"] > card2["manaValue"])
  .map(card => cardTemplate(card)).join('')
  setHTML($("#battles"), filteredBattles); 

  //setHTML($("#parsed_cards"), combinedCards);
}

export { setLeaderFromDecklist, setLeader, setSelectedAffiliation, setDeckResults, setCard };