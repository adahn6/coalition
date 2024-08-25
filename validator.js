import { $, setHTML } from './utils.js';
import { getCard, isAffiliated, getCreatureTypeFromId, isCardType, isBasicLand, isLeader, getCardHtmlLink } from './data.js';
import { cardTemplate } from './templates.js';

const displayValidator = () => {
    document.querySelectorAll('.choice').forEach(node => {
        if (node["id"] === "validator") {
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

const parseDecklist = (decklist) => {
    const decklistLines = decklist.split("\n").filter(line => line != "")
    const mainboard = new Map()
    const sideboard = new Map()
    let messages = Array()
    let leader = ""
    const validCoalitionTypes = new Set()

    if (decklistLines.indexOf("SIDEBOARD:") == -1) {
        messages.push(errorDiv("Deck must include a sideboard with at least a Coalition leader!"))
    } else {
        decklistLines.splice(0, decklistLines.indexOf("SIDEBOARD:")).forEach(lineItem => {
            const match = lineItem.match(/(\d+\s)(.*)(\(.*)/);
            const card = getCard(match[2].trim())
            if (card == null) {
                messages.push(errorDiv("Could not find card \"" + match[2].trim() + "\""))
                return
            }
            mainboard.set(card, parseInt(match[1]));
        });
        decklistLines.slice(1).forEach(lineItem => {
            const match = lineItem.match(/(\d+\s)(.*)(\(.*)/);
            const card = getCard(match[2].trim())
            if (card == null) {
                messages.push(errorDiv("Could not find card \"" + match[2].trim() + "\""))
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
        if (possibleLeaders.length > 1) {
            const joined = possibleLeaders.map((card) => getCardHtmlLink(card)).join(", ")
            messages.push(errorDiv("Deck cannot contain more than one Coalition leader! Found [" + joined + "]"))
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
        if (validCoalitionTypes.size > 0) {
            displayValidDeck(leader, validCoalitionTypes, mainboard, sideboard)
        } else {
            displayInvalidDeck(leader, mainboard, sideboard)
        }
    } else {
        setHTML($("#parsed_cards"), messages.join(''));
    }
}

function displayValidDeck(leader, validCoalitionTypes, maindeck, sideboard) {
    const affiliations = Array.from(validCoalitionTypes)
        .map(attr => getCreatureTypeFromId(attr))
        .filter(affiliation => affiliation != "Human");

    const mainboardList = Array()
    maindeck.forEach((count, card) => {
        mainboardList.push(`
            <div class='card valid'>${count} ${getCardHtmlLink(card)}</div>
        `)
    })

    const sideboardList = Array()
    sideboard.forEach((count, card) => {
        sideboardList.push(`
            <div class='card valid'>${count} ${getCardHtmlLink(card)}</a></div>
        `)
    })
    const html = `
    ${validDiv()}
        <div id="deckbuilder">
            <ul class="column__list">
                <li class="column__item">
                    <div id='leader_card'>
                    <label>Coalition Leader:</label>
                        ${cardTemplate(leader)}
                    </div>
                    <div class="choice">
                        <label>Coalition Type:</label>
                        <div id='affiliation_select'>
                            [${affiliations[0]}]
                        </div>
                    </div>
                </li>
                <li class="column__item" id="maindeck">
                    <label>Maindeck:</label>
                        ${mainboardList.join(" ")}
                </li>
                <li class="column__item" id="sideboard">
                    <label>Sideboard:</label>
                        ${sideboardList.join(" ")}
                </li>
            </ul>
        </div>
    `
    setHTML($("#parsed_cards"), html);
}

function displayInvalidDeck(leader, maindeck, sideboard) {
    const affiliations = leader["affiliations"]
        .map(attr => getCreatureTypeFromId(attr))
        .filter(affiliation => affiliation != "Human");

    const mainboardList = Array()
    maindeck.forEach((count, card) => {
        mainboardList.push(`
            <div class='card valid'>${count} ${getCardHtmlLink(card)}</div>
        `)
    })

    const sideboardList = Array()
    sideboard.forEach((count, card) => {
        sideboardList.push(`
            <div class='card valid'>${count} ${getCardHtmlLink(card)}</div>
        `)
    })
    const html = `
        ${errorDiv("Deck does not have a valid Coalition type! Choose one below to see more information:")}
        <div id="deckbuilder">
            <ul class="column__list">
                <li class="column__item">
                    <div id='leader_card'>
                    <label>Coalition Leader:</label>
                        ${cardTemplate(leader)}
                    </div>
                    <div class="choice">
                        <label>Coalition Type:</label>
                        <div id='affiliation_select'>
                        </div>
                    </div>
                </li>
                <li class="column__item" id="maindeck">
                    <label>Maindeck:</label>
                        ${mainboardList.join(" ")}
                </li>
                <li class="column__item" id="sideboard">
                    <label>Sideboard:</label>
                        ${sideboardList.join(" ")}
                </li>
            </ul>
        </div>
    `
    setHTML($("#parsed_cards"), html);
    affiliations.forEach((attribute) => {
        let button = document.createElement('input');

        button.setAttribute('type', 'button');
        button.setAttribute('name', 'selected_affiliation');
        button.setAttribute('class', 'affiliation_selection')
        button.setAttribute('value', attribute);

        $("#affiliation_select").appendChild(button);

        button.addEventListener('click', () => {
            setSelectedAffiliation(attribute, maindeck, sideboard);
        });
    });
}

function setSelectedAffiliation(affiliation, maindeck, sideboard) {
    document.querySelectorAll('.affiliation_selection').forEach(node => {
        if (node["value"] === affiliation) {
            node.classList.add("selected")
        }
        else {
            node.classList.remove("selected")
        }
    })
    const mainboardList = Array()
    maindeck.forEach((count, card) => {
        if (card["affiliations"].length == 0 || isAffiliated(card, affiliation)) {
            mainboardList.push(`
                <div class='card'>${count} ${getCardHtmlLink(card)}</div>
            `)
        } else {
            mainboardList.push(`
                <div class='card badaffiliation'>${count} ${getCardHtmlLink(card)}
                [${card["affiliations"].map(attr => getCreatureTypeFromId(attr)).join(", ")}]</div>
            `)
        }
    })
    setHTML($("#maindeck"), mainboardList.join(" "))
    const sideboardList = Array()
    sideboard.forEach((count, card) => {
        if (card["affiliations"].length == 0 || isAffiliated(card, affiliation)) {
            sideboardList.push(`
                <div class='card'>${count} ${getCardHtmlLink(card)}</div>
            `)
        } else {
            sideboardList.push(`
                <div class='card badaffiliation'>${count} ${getCardHtmlLink(card)}
            [${card["affiliations"].map(attr => getCreatureTypeFromId(attr)).join(", ")}]</div>
            `)
        }
    })
    setHTML($("#sideboard"), sideboardList.join(" "))
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
        return errorDiv("Card " + getCardHtmlLink(card) + " does not share any affiliations with Coalition leader and may not be included!")
    }
}

function checkMainboardCounts(mainboard) {
    // stupid javascript not having reduce for maps
    let counts = 0
    for (const [a, b] of mainboard) {
        counts += b
    }
    if (counts != 60) {
        return errorDiv("Maindeck must have exactly 60 cards!")
    }
}

function checkCardCount(card, count) {
    if (isCardType(card, "Land")) {
        if (count > 4 && !isBasicLand(card)) {
            return errorDiv("Cannot include more than 4 copies of land card " + getCardHtmlLink(card))
        }
    } else if (isCardType(card, "Creature")) {
        if (isLeader(card) && count > 1) {
            return errorDiv("Cannot include more than 1 copy of leader card " + getCardHtmlLink(card))
        }
        if (count > 4) {
            return errorDiv("Cannot include more than 4 copies of creature card " + getCardHtmlLink(card))
        }
    } else if (count > 1) {
        return errorDiv("Cannot include more than 1 copy of non-land, non-creature card " + getCardHtmlLink(card))
    }
}

function checkSideboardCounts(sideboard) {
    let counts = 0
    for (const [a, b] of sideboard) {
        counts += b
    }
    if (counts < 1) {
        return errorDiv("Sideboard must at least contain a Coalition leader!")
    } else if (counts > 15) {
        return errorDiv("Sideboard size may not be larger than 15!")
    }
}

function checkCardLegality(card) {
    if (card["legal"] === "banned") {
        return errorDiv("The card " + getCardHtmlLink(card) + " is banned!");
    } else if (card["legal"] === "reserved") {
        return errorDiv("The card " + getCardHtmlLink(card) + " is on the reserved list, which is banned!");
    } if (card["legal"] === "legendary") {
        return errorDiv("The card " + getCardHtmlLink(card) + " is legendary-- the only legendary card in the deck allowed is the Coalition leader!");
    }
}

function errorDiv(message) {
    return `
    <div class='card invalid'>
       Deck construction error: ${message}
    </div>
    `
}

function validDiv() {
    return `
    <div class='card deckvalid'>
       Deck is valid!
    </div>
    `
}

export { displayValidator }