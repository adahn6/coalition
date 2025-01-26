import { $, setHTML, getState, setState } from "./utils.js";
import { getCreatureTypes, prepareData, getCard, getCreatureTypeFromId, isCardType, isAffiliated, isNonLeader, isLeader} from "./data.js";
import { cardTemplate } from './templates.js';

document.addEventListener("DOMContentLoaded", async function () {
    document.state = {};
    await prepareData();
    $("#coalitiontype").addEventListener("input", () => setCoalitionType());
    setSelectedCardType("Leader")
    setSelectedSortType("mana_value")
    setSelectedSortDirection("ascending")

    const colors = ["W", "U", "B", "R", "G"]
    setState("colors", colors)
    setState("showChangelings", true)

    document.querySelectorAll('.card_type_selection').forEach(button => {
        button.addEventListener('change', () => {
            setSelectedCardType(button.value);
        });
    });

    document.querySelectorAll('.sort_type_selection').forEach(button => {
        button.addEventListener('change', () => {
            setSelectedSortType(button.value);
        });
    });

    document.querySelectorAll('.sort_direction_selection').forEach(button => {
        button.addEventListener('change', () => {
            setSelectedSortDirection(button.value);
        });
    });

    document.querySelectorAll('.color_filter').forEach(button => {
        button.addEventListener('click', () => {
            setColorFilter(button.value);
        });
    });

    document.querySelectorAll('.show_changeling').forEach(button => {
        button.addEventListener('click', () => {
            setChangelingFilter(button.value);
        });
    });
});

function setColorFilter(color) {
    let newColorArray = Array()
    document.querySelectorAll('.color_filter').forEach(node => {
        if (node["value"] === color) {
            node.classList.toggle("selected")
        }

        if(node.classList.contains("selected")) {
            newColorArray.push(node["value"])
        }
    })
    setState("colors", newColorArray);
    setExploreResults();
}

function setChangelingFilter() {
    document.querySelectorAll('.show_changeling').forEach(node => {
        node.classList.toggle("selected")
        setState("showChangelings", node.classList.contains("selected"))
    })
    setExploreResults();
}

function setCoalitionType() {
    const coalitionType = $("#coalitiontype").value
    const creatureTypeMatch = getCreatureTypes()
    .filter(creatureType => creatureType.toUpperCase() === coalitionType.toUpperCase())

    if (!creatureTypeMatch.length == 1) {
        const datalist = $('#creature_types');
        const creatureTypesFiltered = getCreatureTypes()
            .filter(creatureType => creatureType.toUpperCase().startsWith(coalitionType.toUpperCase()));
        const limited = creatureTypesFiltered.slice(0, 30)
        datalist.innerHTML = '';
        limited.forEach((creaturetype) => {
            let option = document.createElement("option");
            option.setAttribute('value', creaturetype);
            datalist.appendChild(option);
        });
        return;
    } 
    setState("affiliation", coalitionType);
    setExploreResults();
}

function setSelectedCardType(attribute) {
    setState("selectedCardType", attribute);
    setExploreResults();
}

function setSelectedSortType(sortType) {
    setState("sortType", sortType);
    setExploreResults();
}

function setSelectedSortDirection(sortDirection) {
    setState("sortDirection", sortDirection);
    setExploreResults();
}

function setExploreResults() {
    if (getState("selectedCardType") == null || getState("affiliation") == null) {
        setHTML($("#cards_display"), "");
        return;
    }
    const cardType = getState("selectedCardType")
    const affiliation = getState("affiliation")
    const filterChangelings = getState("showChangelings")
    const cards = getState("cards")
        .filter(card => isAffiliated(card, affiliation))
        .filter(card => isCardType(card, cardType))
        .filter(card => filterChangelings
             || card["affiliations"].length < 20
        )
        .filter(card => {
            if(getState("colors").length == 5) {
                return true
            }
            if(card["colors"].length > getState("colors".length)) {
                return false;
            }
            var matched = true;
            card["colors"].forEach(color => {
                matched = matched && getState("colors").includes(color)
            })
            return matched
        })
        .sort((card1, card2) => {
            if (getState("sortType") === "mana_value") {
                if (getState("sortDirection") === "ascending") {
                    if(card1["manaValue"] > card2["manaValue"]) {
                        return 1
                    } else if (card1["manaValue"] < card2["manaValue"]) {
                        return -1
                    } else {
                        return 0
                    }
                    if(card1["manaValue"] > card2["manaValue"]) {
                        return 1
                    } else if (card1["manaValue"] < card2["manaValue"]) {
                        return -1
                    } else {
                        return 0
                    }
                }
                else {
                    if(card1["manaValue"] < card2["manaValue"]) {
                        return 1
                    } else if (card1["manaValue"] > card2["manaValue"]) {
                        return -1
                    } else {
                        return 0
                    }
                    if(card1["manaValue"] < card2["manaValue"]) {
                        return 1
                    } else if (card1["manaValue"] > card2["manaValue"]) {
                        return -1
                    } else {
                        return 0
                    }
                }
            }
            else {
                if (getState("sortDirection") === "ascending") {
                    if(card1["name"] > card2["name"]) {
                        return 1
                    } else if (card1["name"] < card2["name"]) {
                        return -1
                    } else {
                        return 0
                    }
                    if(card1["name"] > card2["name"]) {
                        return 1
                    } else if (card1["name"] < card2["name"]) {
                        return -1
                    } else {
                        return 0
                    }
                }
                else {
                    if(card1["name"] < card2["name"]) {
                        return 1
                    } else if (card1["name"] > card2["name"]) {
                        return -1
                    } else {
                        return 0
                    }
                }
            }
        })
        .map(card => cardTemplate(card))
    setHTML($("#cards_display"), cards.join(' '));
}
