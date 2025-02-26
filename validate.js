import { $, getState, setHTML, setState } from './utils.js';
import { prepareData, getCard, isUnaffiliated, isAffiliated, getCreatureTypeFromId, isCardType, isBanned, isLegendary, isBasicLand, isLeader, getCardHtmlLink, isReserved } from './data.js';

const cardsWithAnyNumberAllowed = ["Dragon's Approach", "Hare Apparent", "Nazgûl", 
    "Persistent Petitioners", "Rat Colony", "Relentless Rats", "Seven Dwarves", "Shadowborn Apostle", "Slime Against Humanity", "Templar Knight"]

document.addEventListener("DOMContentLoaded", async function () {
    document.state = {};
    await prepareData();
    $("#decklist").addEventListener('input', (event) => parseDecklist(event.target.value));
})

const parseDecklist = (decklist) => {
    const decklistLines = decklist.split("\n").filter(line => line != "")
    const mainboard = new Map()
    const sideboard = new Map()
    let messages = Array()
    let leader = ""
    const validCoalitionTypes = new Set()

    if (decklistLines.indexOf("SIDEBOARD:") == -1) {
        messages.push("<p>Deck must include a sideboard with at least a Coalition leader!<p>")
    } else {
        decklistLines.splice(0, decklistLines.indexOf("SIDEBOARD:")).forEach(lineItem => {
            const match = lineItem.match(/(\d+\s)(.*)(\(.*)/);
            const card = getCard(match[2].trim())
            if (card == null) {
                messages.push("<p>Could not find card \"" + match[2].trim() + "\"<p>")
                return
            }
            mainboard.set(card, parseInt(match[1]));
        });
        decklistLines.slice(1).forEach(lineItem => {
            const match = lineItem.match(/(\d+\s)(.*)(\(.*)/);
            const card = getCard(match[2].trim())
            if (card == null) {
                messages.push("<p>Could not find card \"" + match[2].trim() + "\"<p>")
                return
            }
            sideboard.set(card, parseInt(match[1]));
        })

        messages.push(checkMainboardCounts(mainboard))
        messages.push(checkSideboardCounts(sideboard))

        let mergedDeck = new Map(mainboard)
        sideboard.forEach((count, card) => {
            if (mergedDeck.get(card)) {
                mergedDeck.set(card, mergedDeck.get(card) + count)
            } else {
                mergedDeck.set(card, count)
            }
        })
        mergedDeck.forEach((count, card) => {
            messages.push(checkCardLegality(card))
            messages.push(checkCardCount(card, count))
        })

        const possibleLeaders = Array()
        sideboard.forEach((count, card) => {
            if (isLeader(card)) {
                possibleLeaders.push(card)
            }
        })
        if(possibleLeaders.length == 0) {
            messages.push("<p>Deck must have a legendary creature Coalition leader in the sideboard!</p>")
        } else if (possibleLeaders.length > 1) {
            const joined = possibleLeaders.map((card) => getCardHtmlLink(card)).join(", ")
            messages.push("<p>Deck cannot contain more than one Coalition leader! Found [" + joined + "]</p>")
        } else {
            leader = possibleLeaders[0]
            mergedDeck.forEach((count, card) => {
                messages.push(checkCardWithinLeaderAffiliations(card, leader))
            })

            leader["affiliations"].forEach(affiliation => validCoalitionTypes.add(affiliation))
            const invalidForCoalitionTypeMap = new Map()
            validCoalitionTypes.forEach(affiliation => {
                invalidForCoalitionTypeMap.set(affiliation, new Set())
            })
            leader["affiliations"].forEach(affiliation => {
                mergedDeck.forEach((count, card) => {
                    if (!checkCardHasAffiliation(card, affiliation)) {
                        validCoalitionTypes.delete(affiliation)
                        invalidForCoalitionTypeMap.get(affiliation).add(card)
                    }
                })
            })
        }
    }
    messages = messages.filter(message => message != null)
    if (messages.length == 0) {
        if(validCoalitionTypes.size < 1) {
            messages.push("<p>Deck does not have a valid Coalition type! Choose a type to highligh cards not affiliated:</p>");
            displayMessages(messages)
            let select = document.createElement('select');
            select.setAttribute('name', 'selected_affiliation');
            select.setAttribute('id', 'affiliation_selection');
            select.addEventListener('change', () => {
                setSelectedAffiliation(select.value, leader, mainboard, sideboard);
            })
            $("#message").appendChild(select)
            leader["affiliations"]
                .map(attr => getCreatureTypeFromId(attr))
                .filter(affiliation => affiliation != "Human")
                .forEach((attribute) => {
                    let option = document.createElement('option');
                    option.setAttribute('value', attribute);
                    option.innerText = attribute
                    $("#affiliation_selection").appendChild(option);
                });
            setSelectedAffiliation($("#affiliation_selection").firstChild.value, leader, mainboard, sideboard)
        } else {
            displayDeck(leader, mainboard, sideboard, validCoalitionTypes)
            displayMessages(messages)
        }   
    } else {
        displayMessages(messages)
    }
    makeVisible("#deckinfo")
}

function displayDeck(leader, maindeck, sideboard, coalitionType) {
    const creatureList = Array()
    const instantList = Array()
    const sorceryList = Array()
    const enchanmentList = Array()
    const artifactList = Array()
    const battleList = Array()
    const landList = Array()
    maindeck.forEach((count, card) => {
        if(isCardType(card, "Creature")) {
            creatureList.push(makeCardListItem(card, count))
        } else if(isCardType(card, "Instant")) {
            instantList.push(makeCardListItem(card, count))
        } else if(isCardType(card, "Sorcery")) {
            sorceryList.push(makeCardListItem(card, count))
        } else if(isCardType(card, "Enchantment")) {
            enchanmentList.push(makeCardListItem(card, count))
        } else if(isCardType(card, "Artifact")) {
            artifactList.push(makeCardListItem(card, count))
        } else if(isCardType(card, "Battle")) {
            battleList.push(makeCardListItem(card, count))
        } else if(isCardType(card, "Land")) {
            landList.push(makeCardListItem(card, count))
        }
    })
    const sideboardList = Array()
    sideboard.forEach((count, card) => {
        sideboardList.push(makeCardListItem(card, count))
    })
    setHTML($("#coalitionleader"), getCardHtmlLink(leader))
    let coalitionTypeStrings = Array.from(coalitionType).map(typeId => getCreatureTypeFromId(typeId))
    setHTML($("#coalitiontype"), coalitionTypeStrings.join(","))
    
    if(creatureList.length > 0) {
        setHTML($("#creaturelist"), creatureList.join(" ")); 
        if(creatureList.length > 9) {
            makeLargeColumn("#creatures")
        }
    } else {
        if($("#creatures") != null) {
            $("#creatures").remove()
        }
    }
    if(instantList.length > 0) {
        setHTML($("#instantlist"), instantList.join(" "));
        if(instantList.length > 9) {
            makeLargeColumn("#instants")
        }
    } else {
        if($("#instants") != null) {
            $("#instants").remove()
        }
    }
    if(sorceryList.length > 0) {
        setHTML($("#sorcerylist"), sorceryList.join(" "));
        if(sorceryList.length > 9) {
            makeLargeColumn("#soceries")
        }
    } else {
        if($("#sorceries") != null) {
            $("#sorceries").remove()
        }
    }
    if(enchanmentList.length > 0) {
        setHTML($("#enchantmentlist"), enchanmentList.join(" "));
        if(enchanmentList.length > 9) {
            makeLargeColumn("#enchantments")
        }
    } else {
        if($("#enchantments") != null) {
            $("#enchantments").remove()
        }
    }
    if(artifactList.length > 0) {
        setHTML($("#artifactlist"), artifactList.join(" "));
        if(artifactList.length > 9) {
            makeLargeColumn("#artifacts")
        }
    } else {
        if($("#artifacts") != null) {
            $("#artifacts").remove()
        }
    }
    if(battleList.length > 0) {
        setHTML($("#battlelist"), battleList.join(" "));
    } else {
        if($("#battles") != null) {
            $("#battles").remove()
        }
    }
    if(landList.length > 0) {
        setHTML($("#landlist"), landList.join(" "));
        if(landList.length > 9) {
            makeLargeColumn("#lands")
        }
    } else {
        if($("#lands") != null) {
            $("#lands").remove()
        }
    }
    setHTML($("#sideboardlist"), sideboardList.join(" "))
}

function setSelectedAffiliation(affiliation, leader, mainboard, sideboard) {
    document.querySelectorAll('.affiliation_selection').forEach(node => {
        if (node["value"] === affiliation) {
            node.classList.add("selected")
        }
        else {
            node.classList.remove("selected")
        }
    })
    setState("affiliation", affiliation);
    displayDeck(leader, mainboard, sideboard, affiliation)
}

function checkCardHasAffiliation(card, affiliation) {
    if (card["affiliations"].length == 0) {
        return true
    }
    return card["affiliations"].includes(affiliation)
}

function checkCardWithinLeaderAffiliations(card, leader) {
    if (card["affiliations"].length == 0) {
        return
    }
    const sharedAffiliations = card["affiliations"].filter(affiliation => leader["affiliations"].includes(affiliation))
    if (sharedAffiliations.length == 0) {
        return "<p>Card " + getCardHtmlLink(card) + " does not share any affiliations with Coalition leader and may not be included!</p>"
    }
}

function checkMainboardCounts(mainboard) {
    // stupid javascript not having reduce for maps
    let counts = 0
    for (const [a, b] of mainboard) {
        counts += b
    }
    if (counts != 60) {
        return "<p>Maindeck must have exactly 60 cards!</p>"
    }
}

function checkCardCount(card, count) {
    console.log("Checking " + card["name"].str)
    if(!cardsWithAnyNumberAllowed.includes(card["name"])) {
        if (isCardType(card, "Land")) {
            if (count > 4 && !isBasicLand(card)) {
                return "<p>Cannot include more than 4 copies of land card " + getCardHtmlLink(card) + "</p>"
            }
        } else if (isCardType(card, "Creature")) {
            if (isLeader(card) && count > 1) {
                return "<p>Cannot include more than 1 copy of leader card " + getCardHtmlLink(card) + "</p>"
            }
            if (count > 4) {
                return "<p>Cannot include more than 4 copies of creature card " + getCardHtmlLink(card) + "</p>"
            }
        } else if (count > 1) {
            return "<p>Cannot include more than 1 copy of non-land, non-creature card " + getCardHtmlLink(card) + "</p>"
        }
    }
}

function checkSideboardCounts(sideboard) {
    let counts = 0
    for (const [a, b] of sideboard) {
        counts += b
    }
    if (counts < 1) {
        return "<p>Sideboard must at least contain a Coalition leader!</p>"
    } else if (counts > 15) {
        return "<p>Sideboard size may not be larger than 15!</p>"
    }
}

function checkCardLegality(card) {
    if (isBanned(card)) {
        return "<p>The card " + getCardHtmlLink(card) + " is banned!</p>";
    } else if (isReserved(card)) {
        return "<p>The card " + getCardHtmlLink(card) + " is on the reserved list, which is banned!</p>";
    } if (isLegendary(card)) {
        return "<p>The card " + getCardHtmlLink(card) + " is legendary-- the only legendary card in the deck allowed is the Coalition leader!</p>";
    }
}

function displayMessages(messages) {
    if(messages.length == 0 || !messages) {
        setHTML($("#message"), "Deck is valid!");
        $("#message").setAttribute("class", "validdeck");
    } else {
        setHTML($("#message"), messages.join(''));
        $("#message").setAttribute("class", "invaliddeck");
    }
}

function makeVisible(selector) {
    $(selector).setAttribute("class", $(selector).getAttribute("class").replace("hidden", ""));
}

function makeLargeColumn(selector) {
    $(selector).setAttribute("class", $(selector).getAttribute("class") + " largecolumn");
}

function makeCardListItem(card, count) {
    if(getState("affiliation") != null && !isUnaffiliated(card) && !isAffiliated(card, getState("affiliation"))) {
        return `<li class='invalid'>${count} ${getCardHtmlLink(card)}</li>`
    } else {
        return `<li class='valid'>${count} ${getCardHtmlLink(card)}</li>`
    }
}