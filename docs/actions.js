import { getAttribute, mapAttributes, getCard, isCompatibleCard, createDecklistFromAllCards } from './data.js';
import { $, setHTML, hideHTML, showHTML, getState, setState } from './utils.js';
import { cardTemplate } from './templates.js';
import { parseDecklist } from './parser.js';

function setLeaderFromDecklist(leaderName) {
  $("input#leader").setAttribute('value', leaderName);
  setLeader(leaderName);
}

function setLeader(leaderName) {
  const leaderCardData = getCard(leaderName);

  if (!leaderCardData) {
    setState("leader");
    setHTML($("#leader_card"));

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
  hideHTML($("#unset_affiliation"));

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

  showHTML($("#unset_affiliation"));
};

function setDeckResults(parsedDecklist) {
  const combinedCards = [
    parsedDecklist["pending"].map(card => cardTemplate(card)).join(''),
    parsedDecklist["compatible"].map(card => cardTemplate(card)).join(''),
    parsedDecklist["incompatible"].map(card => cardTemplate(card)).join(''),
    parsedDecklist["illegal"].map(card => cardTemplate(card)).join(''),
    parsedDecklist["invalid"].map(card => cardTemplate(card)).join(''),
  ].join('');

  setHTML($("#parsed_cards"), combinedCards);
}

export { setLeaderFromDecklist, setLeader, setSelectedAffiliation, setDeckResults };