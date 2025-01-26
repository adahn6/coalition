import { getState, setState } from './utils.js';

function mapAttributes(attributes) {
  return attributes.map(attr => getState("creature_types")[attr]);
}

function getCreatureTypes() {
  return Object.values(getState("creature_types"))
}

function getCard(cardName) {
  return getState("cards").find(el => (el["name"] === cardName));
}

function getCreatureTypeFromId(creature_type_id) {
  return getState("creature_types")[creature_type_id]
}

function getCreatureTypeId(creature_type) {
  return parseInt(Object.keys(getState("creature_types")).find(key => getState("creature_types")[key] === creature_type))
}

function getCardTypeId(card_type) {
  return parseInt(Object.keys(getState("card_types")).find(key => getState("card_types")[key] === card_type))
}

function isCompatibleCard(cardData, selectedAffiliation) {
  return mapAttributes(cardData["affiliations"]).find(attr => attr === selectedAffiliation);
}

function createDecklistFromAllCards() {
  const filteredCards = getState("cards").filter((card) => {
    let isLegal = card["legal"] == 0;
    let matchesAttribute = isCompatibleCard(card, getState("selectedAffiliation"));

    return isLegal && matchesAttribute;
  })

  return filteredCards.map(card => card["name"]);
}

function isBasicLand(card) {
  return card["types"].includes(0) && (
    card["name"] === "Mountain" || card["name"] === "Snow-Covered Mountain"
    || card["name"] === "Swamp" || card["name"] === "Snow-Covered Swamp"
    || card["name"] === "Wastes" || card["name"] === "Snow-Covered Wastes"
    || card["name"] === "Island" || card["name"] === "Snow-Covered Island" 
    || card["name"] === "Plains" || card["name"] === "Snow-Covered Plains"
    || card["name"] === "Forest" || card["name"] === "Snow-Covered Forest")
}

function isLegal(card) {
  return (card["legal"] == 0 || card["legal"] == 2)
}

function isNonLeader(card) {
  return card["legal"] == 0
}

function isLeader(card) {
  return card["legal"] == 2
}

function isBanned(card) {
  return card["legal"] == 4
}

function isReserved(card) {
  return card["legal"] == 3
}

function isLegendary(card) {
  return card["legal"] == 1
}

function isCardType(card, cardType) {
  if(cardType === "Leader") {
    return isLeader(card)
  } else {
    if(isLeader(card)) {
      return false;
    }
    return card["types"].includes(getCardTypeId(cardType))
  }
}

function isAffiliated(card, creatureType) {
  if (typeof (creatureType) === "string") {
    return card["affiliations"].includes(getCreatureTypeId(creatureType))
  }
  return card["affiliations"].includes(creatureType)
}

function isUnaffiliated(card) {
  return card["affiliations"].length === 0
}

function getCardHtmlLink(card) {
  return "<a href='https://scryfall.com/cards/" + card["uri"] + "' target='_blank'>" + card["name"] + "</a>"
}

async function prepareData() {
  const cards = await fetch('data.json').then(response => response.json());
  const creatureTypes = await fetch('creature_types.json').then(response => response.json());
  const cardTypes = await fetch('card_types.json').then(response => response.json());
  const legalities = await fetch('legalities.json').then(response => response.json());
  setState("cards", cards);
  setState("creature_types", creatureTypes);
  setState("card_types", cardTypes)
  setState("legalities", legalities)
};

export { isUnaffiliated, getCreatureTypes, isBanned, isLegendary, isReserved, getCardHtmlLink, isBasicLand, getCreatureTypeId, getCreatureTypeFromId, mapAttributes, getCard, isCompatibleCard, isLegal, isNonLeader, isLeader, isCardType, isAffiliated, createDecklistFromAllCards, prepareData, getCardTypeId };