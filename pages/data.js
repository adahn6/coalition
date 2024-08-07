import { getState } from './utils.js';

function getAttribute(attribute) {
  return getState("types")[attribute];
}

function mapAttributes(attributes) {
  return attributes.map(attr => getState("types")[attr]);
}

function getCard(cardName) {
  return getState("cards").find(el => (el["name"] === cardName));
}

function isCompatibleCard(cardData, selectedAffiliation) {
  return mapAttributes(cardData["affiliations"]).find(attr => attr === selectedAffiliation);
}

function createDecklistFromAllCards() {
  const filteredCards = getState("cards").filter((card) => {
    let isLegal = card["legal"] && !card["isLeader"];
    let matchesAttribute = isCompatibleCard(card, getState("selectedAffiliation"));

    return isLegal && matchesAttribute;
  })

  return filteredCards.map(card => card["name"]);
}

export { getAttribute, mapAttributes, getCard, isCompatibleCard, createDecklistFromAllCards };