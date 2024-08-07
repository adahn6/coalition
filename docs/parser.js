import { getCard, isCompatibleCard } from './data.js';
import { cardTemplate } from './templates.js';
import { $, getState, setState } from './utils.js';
import { setLeaderFromDecklist, setLeader, setDeckResults } from './actions.js';

function parseLineItem(lineItem) {
  const match = lineItem.match(/(\d\s)(.*)(\(.*)/);

  if (match && match.length) {
    return match[2].trim();
  }
}

const handleLeader = (cards, card, cardData) => {
  const leaderDefined = getState("leader") !== undefined;
  const leaderSetManually = getState("leaderSetManually");
  const leaderDifferent = leaderDefined && getState("leader")["name"] !== cardData["name"];

  if (leaderDefined && leaderSetManually && leaderDifferent) {
    card["status"] = "invalid (legendary)";
    cards["invalid"].push(card); 
  } else {
    setLeaderFromDecklist(cardData["name"]);
    setState("leaderSetManually", false);
  }
}

const handleAffiliationCompatibility = (cards, card, cardData, selectedAffiliation) => {
  let compatibleCard = isCompatibleCard(cardData, selectedAffiliation);

  if (compatibleCard || cardData["affiliations"].length === 0) {
    card["status"] = "compatible";
    cards["compatible"].push(card);

    return;
  } else {
    card["status"] = "incompatible (affiliation)";
    cards["incompatible"].push(card);

    return;
  }
}

const parseDecklist = (decklist) => {
  const selectedAffiliation = getState("selectedAffiliation");

  const cards = {
    "compatible": [],
    "incompatible": [],
    "illegal": [],
    "invalid": [],
    "pending": [],
  };

  const fromDecklist = getState("decklist") !== undefined;

  decklist.forEach(lineItem => {
    if (fromDecklist) {
      lineItem = parseLineItem(lineItem);
    }

    if (lineItem === undefined) {
      return;
    }

    let cardData = getCard(lineItem) || false;

    let card = {
      "name": lineItem,
      "affiliations": cardData["affiliations"] || [],
      "uri": cardData["uri"],
      "manaCost": cardData["manaCost"],
      "manaValue": cardData["manaValue"],
      "image": cardData["image"],
      "oracleText": cardData["oracleText"],
    };

    if (!cardData) {
      card["status"] = "invalid";
      cards["invalid"].push(card);
      
      return;
    }


    if (cardData["legal"] === "leader") {
      handleLeader(cards, card, cardData);

      return;
    }

    if (!cardData["legal"] === "") {
      card["status"] = "illegal";
      cards["illegal"].push(card);

      return;
    }

    if (selectedAffiliation) {
      handleAffiliationCompatibility(cards, card, cardData, selectedAffiliation);
    } else {
      card["status"] = "";
      cards["pending"].push(card);

      return;
    }
  });

  setDeckResults(cards);
}

export { parseDecklist };