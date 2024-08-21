import { $, getState, setState } from './utils.js';
import { getCard } from './data.js';

const displayValidate = () => {
    document.querySelectorAll('.choice').forEach(node => {
        if(node["id"] === "validate") {
            node.classList.add("selected")
        }
        else {
            node.classList.remove("selected")
        }
    })
    $("#content").innerHTML = `
        <textarea id="decklist" placeholder="paste your decklist"></textarea>
        <div id="deck"></div>
    `
    $("#decklist").addEventListener('input', (event) => parseDecklist(event.target.value));
}

function parseLineItem(lineItem) {
    const match = lineItem.match(/(\d\s)(.*)(\(.*)/);
  
    if (match && match.length) {
      return (parseInt(match[1]), match[2].trim());
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
      setState("leaderSetManually", false);
    }
  }
  
  const handleAffiliationCompatibility = (cards, card, cardData, selectedAffiliation) => {
    let compatibleCard = true
  
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
    const cards = {
      "compatible": [],
      "incompatible": [],
      "illegal": [],
      "invalid": [],
      "pending": [],
    };

    const decklistLines = decklist.split("\n").filter(line => line != "")
    const mainboard = new Map()
    const sideboard = new Map()

    decklistLines.splice(0, decklistLines.indexOf("SIDEBOARD:")).forEach(lineItem => {
        const match = lineItem.match(/(\d\s)(.*)(\(.*)/);
        mainboard.set(getCard(match[2].trim()), parseInt(match[1]));
    });
    decklistLines.slice(1).forEach(lineItem => {
        const match = lineItem.match(/(\d\s)(.*)(\(.*)/);
        sideboard.set(getCard(match[2].trim()), parseInt(match[1]));
    })
    
    decklistLines.forEach(lineItem => {
      lineItem = parseLineItem(lineItem);
  
      if (lineItem === undefined) {
        return;
      }
  
      let cardData = getCard(lineItem);
  
      let card = {
        "name": lineItem,
        "affiliations": cardData["affiliations"] || [],
        "types": cardData["types"],
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
    card["status"] = "";
    cards["pending"].push(card);

    return;
      
    });
  
    console.log(cards);
  }

export { displayValidate }