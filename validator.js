import { $, getState, setState, setHTML } from './utils.js';
import { getCard, isCardType, isBasicLand } from './data.js';

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
        <div id="parsed_cards"></div>
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
        const match = lineItem.match(/(\d+\s)(.*)(\(.*)/);
        mainboard.set(getCard(match[2].trim()), parseInt(match[1]));
    });
    decklistLines.slice(1).forEach(lineItem => {
        const match = lineItem.match(/(\d+\s)(.*)(\(.*)/);
        sideboard.set(getCard(match[2].trim()), parseInt(match[1]));
    })

    let messages = Array()

    messages.push(checkMainboardCounts(mainboard))
    messages.push(checkSideboardCounts(mainboard))

    mainboard.forEach((count, card) => {
        messages.push(checkCardCount(card, count))
    })
    
    decklistLines.forEach(lineItem => {
      lineItem = parseLineItem(lineItem);
  
      if (lineItem === undefined) {
        return;
      }
  
      let cardData = getCard(lineItem);
    return;
    });
    setHTML($("#parsed_cards"), messages.join(''));
  }

function checkMainboardCounts(mainboard) {
    // stupid javascript not having reduce for maps
    let counts = 0
    for (const [a, b] of mainboard) {
        counts += b
    }
    if(counts != 60) {
       return errorDiv("Maindeck must have exactly 60 cards!")
    }
}

function checkCardCount(card, count) {
    console.log("Validating card " + card["name"] + " with types " + card["types"] + " count " + count)
    if(isCardType(card, "Land")) {
        if(count > 4 && !isBasicLand(card)) {
            return errorDiv("Cannot include more than 4 copies of land card <a href='https://scryfall.com/cards/" + card["uri"] + "' target='_blank'>" + card["name"] + "</a>")
        }
    } else if(isCardType(card, "Creature")) {
        if(count > 4) {
            return errorDiv("Cannot include more than 4 copies of creature card <a href='https://scryfall.com/cards/" + card["uri"] + "' target='_blank'>" + card["name"] + "</a>")
        }
    } else if(count > 1) {
        return errorDiv("Cannot include more than 1 copy of non-land, non-creature card <a href='https://scryfall.com/cards/" + card["uri"] + "' target='_blank'>" + card["name"] + "</a>")
    }
}

function checkSideboardCounts(sideboard) {
    let counts = 0
    for (const [a, b] of sideboard) {
        counts += b
    }
    if(counts < 1) {
        return errorDiv("Sideboard must at least contain a leader card!")
    } else if(counts < 15) {
        return errorDiv("Sideboard size may not be larger than 15!")
    }
}

function errorDiv(message) {
    return `
    <div class='card invalid'>
       Deck construction error: ${message}
    </div>
    `
}

function cardTemplate(card)  {
    return `

    <div class='card invalid'>
         Deck construction error: No legendary cards may be included in the deck other than the leader card!
    </div>
    <div class='card invalid'>
         Deck construction error: Sideboard must contain one leader card!
    </div>
    <div class='card invalid'>
         Deck construction error: The card "Not A Real Card" could not be found!
    </div>
    <div class='card invalid'>
         Deck construction error: The card "Null Rod" is banned for being on the reserved list!
    </div>
    <div class='card invalid'>
         Deck construction error: The card "Sol Ring" is banned!
    </div>
    <div class='card invalid'>
         Deck construction error: May not have more than four copies of creature card "Bloodghast"!
    </div>
    <div class='card invalid'>
         Deck construction error: May not have more than one copy of non-land, non-creature card "Entomb"!
    </div>
    <div class='card invalid'>
         Deck construction error: The card "Goblin Welder" is affiliated with [Goblin], but valid Coalition types from the leader "Kaalia of the Vast" are [Cleric, Angel, Demon, Dragon]
    </div>
    <div class='card invalid'>
         Deck construction error: No valid Coalition type choice for cards selected! Valid Coalition types from the leader "Kaalia of the Vast" are [Cleric, Angel, Demon, Dragon], ensure all cards share a chosen affiliation from these
    </div>
    `
}

export { displayValidate }