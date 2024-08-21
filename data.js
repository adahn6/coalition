import { getState, setState } from './utils.js';

function mapAttributes(attributes) {
  return attributes.map(attr => getState("creature_types")[attr]);
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
    let isLegal = card["legal"] === "";
    let matchesAttribute = isCompatibleCard(card, getState("selectedAffiliation"));

    return isLegal && matchesAttribute;
  })

  return filteredCards.map(card => card["name"]);
}

function isLegal(card) {
  return (card["legal"] === "" ||  card["legal"] == "leader")
}

function isNonLeader(card) {
  return card["legal"] === ""
}

function isLeader(card) {
  return card["legal"] == "leader"
}

function isCardType(card, cardType) {
  return card["types"].includes(getCardTypeId(cardType))
}

function isAffiliated(card, creatureType) {
  return card["affiliations"].includes(getCreatureTypeId(creatureType))
}

async function prepareHome() {
  const welcome = await fetch('./README.MD').then(response => response.text());
  setState("welcome", welcome)
}

async function prepareData() {
  const cards = await fetch('data.json').then(response => response.json());
  const creatureTypes = await fetch('creature_types.json').then(response => response.json());
  const cardTypes = await fetch('card_types.json').then(response => response.json());
  setState("cards", cards);
  setState("creature_types", creatureTypes);
  setState("card_types", cardTypes)
};

export { prepareHome, getCreatureTypeId, getCreatureTypeFromId, mapAttributes, getCard, isCompatibleCard, isLegal, isNonLeader, isLeader, isCardType, isAffiliated, createDecklistFromAllCards, prepareData, getCardTypeId };