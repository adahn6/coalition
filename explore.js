import { $, setHTML, getState, setState } from "./utils.js";
import { getCard, getCreatureTypeFromId, isCardType, isAffiliated, isNonLeader, isLeader} from "./data.js";
import { cardTemplate } from './templates.js';

const displayDeckbuilder = () => {
    document.querySelectorAll('.choice').forEach(node => {
        if (node["id"] === "deckbuilder") {
            node.classList.add("selected")
        }
        else {
            node.classList.remove("selected")
        }
    })
    $("#content").innerHTML = `
    <div id="deckbuilder">
        <ul class="column__list">
            <li class="column__item">
                <div id='leader_input'>
                    <input
                        name="leader"
                        type='text'
                        id="leader"
                        placeholder="enter leader's name"
                        list="leaders"
                    />
                    <datalist id="leaders"></datalist>
                </div>
                <div class="choice">
                    <label>Coalition Type:</label>
                    <div id='affiliation_select'></div>
                </div>
                <div class="choice">
                    <label>Card Type:</label>
                    <div id='card_type_select'></div>
                </div>
                <div class="choice">
                    <label>Sort Type:</label>
                    <div id='sort_type_select'></div>
                </div>
                <div class="choice">
                    <label>Sort Direction:</label>
                    <div id='sort_direction_select'></div>
                </div>
                <div class="choice">
                    <label>Filters:</label>
                    <div id='color_filter'></div>
                    <div id='show_changelings'></div>
                </div>
            </li>
            <li class="column__item">
                <div id='leader_card'></div>
            </li>
        </ul>
    </div>
    <hr>
    <ul class="column__list" id='cards_display'>
    </ul>
    `
    $("#leader").addEventListener("input", () => setLeader());
    const card_types = ["Creature", "Artifact", "Enchantment", "Instant", "Sorcery", "Battle", "Land"]
    card_types.forEach(card_type => {
        let button = document.createElement('input');

        button.setAttribute('type', 'button');
        button.setAttribute('class', 'card_type_selection')
        button.setAttribute('name', "selected_card_type");
        button.setAttribute('value', card_type);

        $("#card_type_select").appendChild(button);

        button.addEventListener('click', () => {
            setSelectedCardType(card_type);
        });
    })
    setSelectedCardType("Creature")
    const sort_types = ["Mana Value", "Name"]
    sort_types.forEach(sortType => {
        let button = document.createElement('input');

        button.setAttribute('type', 'button');
        button.setAttribute('class', 'sort_type_selection')
        button.setAttribute('name', "selected_sort_type");
        button.setAttribute('value', sortType);

        $("#sort_type_select").appendChild(button);

        button.addEventListener('click', () => {
            setSelectedSortType(sortType);
        });
    })
    setSelectedSortType("Mana Value")

    const sort_directions = ["Ascending", "Descending"]
    sort_directions.forEach(direction => {
        let button = document.createElement('input');

        button.setAttribute('type', 'button');
        button.setAttribute('class', 'sort_direction_selection')
        button.setAttribute('name', "selected_sort_direction");
        button.setAttribute('value', direction);

        $("#sort_direction_select").appendChild(button);

        button.addEventListener('click', () => {
            setSelectedSortDirection(direction);
        });
    })
    setSelectedSortDirection("Ascending")

    const colors = ["W", "U", "B", "R", "G"]
    setState("colors", colors)
    colors.forEach(color => {
        let button = document.createElement('input');

        button.setAttribute('type', 'button');
        button.setAttribute('class', 'color_filter selected')
        button.setAttribute('name', "select_color_filter");
        button.setAttribute('value', color);

        $("#color_filter").appendChild(button);

        button.addEventListener('click', () => {
            setColorFilter(color);
        });
    })
    setState("showChangelings", true)
    let button = document.createElement('input');
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'show_changeling selected')
    button.setAttribute('name', "show_changeling_filter");
    button.setAttribute('value', "Show Changelings");
    $("#show_changelings").appendChild(button);
    button.addEventListener('click', () => {
        setChangelingFilter();
    });

}

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

function setLeader() {
    const leaderName = $("#leader").value
    const leaderCardData = getCard(leaderName);

    if (!leaderCardData) {
        setState("leader");
        setHTML($("#leader_card"));
        const datalist = $('#leaders');

        const cards = getState("cards")
            .filter(card => isLeader(card))
            .filter(card => card["name"].toUpperCase().startsWith(leaderName.toUpperCase()));
        const limited = cards.slice(0, 10)
        datalist.innerHTML = '';
        limited.forEach((card) => {
            let option = document.createElement("option");
            option.setAttribute('value', card["name"]);
            datalist.appendChild(option);
        });

        return;
    }

    if (getState("selectedAffiliation")) {
        setSelectedAffiliation(undefined);
    }

    setState("leader", leaderCardData);

    leaderCardData["status"] = "leader";
    setHTML($("#leader_card"), cardTemplate(leaderCardData));

    setSelectableAffiliations();
    setExploreResults();
};

function setSelectableAffiliations() {
    setHTML($("#affiliation_select"));

    if (!getState("leader")) {
        return;
    }

    const affiliations = getState("leader")["affiliations"]
        .map(attr => getCreatureTypeFromId(attr))
        .filter(affiliation => affiliation != "Human");

    affiliations.forEach((attribute) => {
        let button = document.createElement('input');

        button.setAttribute('type', 'button');
        button.setAttribute('name', 'selected_affiliation');
        if(affiliations.length == 1) {
            setState("selectedAffiliation", attribute);
            button.setAttribute('class', 'affiliation_selection selected')
        } else {
            button.setAttribute('class', 'affiliation_selection')
        }
        
        button.setAttribute('value', attribute);

        $("#affiliation_select").appendChild(button);

        button.addEventListener('click', () => {
            setSelectedAffiliation(attribute);
        });
    });
};

function setSelectedCardType(attribute) {
    setState("selectedCardType", attribute);
    document.querySelectorAll('.card_type_selection').forEach(node => {
        if (node["value"] === attribute) {
            node.classList.add("selected")
        }
        else {
            node.classList.remove("selected")
        }
    })
    setExploreResults();
}

function setSelectedSortType(sortType) {
    setState("sortType", sortType);
    document.querySelectorAll('.sort_type_selection').forEach(node => {
        if (node["value"] === sortType) {
            node.classList.add("selected")
        }
        else {
            node.classList.remove("selected")
        }
    })
    setExploreResults();
}

function setSelectedSortDirection(sortDirection) {
    setState("sortDirection", sortDirection);
    document.querySelectorAll('.sort_direction_selection').forEach(node => {
        if (node["value"] === sortDirection) {
            node.classList.add("selected")
        }
        else {
            node.classList.remove("selected")
        }
    })
    setExploreResults();
}

function setSelectedAffiliation(attribute) {
    setState("selectedAffiliation", attribute);
    document.querySelectorAll('.affiliation_selection').forEach(node => {
        if (node["value"] === attribute) {
            node.classList.add("selected")
        }
        else {
            node.classList.remove("selected")
        }
    })
    setExploreResults();
}

function setExploreResults() {
    if (getState("selectedCardType") == null || getState("selectedAffiliation") == null) {
        setHTML($("#cards_display"), "");
        return;
    }
    const card_type = getState("selectedCardType")
    const affiliation = getState("selectedAffiliation")
    const filterChangelings = getState("showChangelings")
    const cards = getState("cards").filter(card => isNonLeader(card))
        .filter(card => isAffiliated(card, affiliation))
        .filter(card => isCardType(card, card_type))
        .filter(card => filterChangelings
             || card["affiliations"].length < 20
        )
        .filter(card => {
            if(getState("colors").length == 5) {
                return true
            }
            return getState("colors").some(color => card["colors"].includes(color))
        })
        .sort((card1, card2) => {
            if (getState("sortType") === "Mana Value") {
                if (getState("sortDirection") === "Ascending") {
                    return card1["manaValue"] > card2["manaValue"]
                }
                else {
                    return card1["manaValue"] < card2["manaValue"]
                }
            }
            else {
                if (getState("sortDirection") === "Ascending") {
                    return card1["name"] > card2["name"]
                }
                else {
                    return card1["name"] < card2["name"]
                }
            }
        })
        .map(card => cardTemplate(card)).join('')
    setHTML($("#cards_display"), cards);
}

export { displayDeckbuilder }