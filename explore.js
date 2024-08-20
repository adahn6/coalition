import { $, setHTML, getState, setState } from "./utils.js";
import { getCard, getCreatureTypeFromId, isCardType, isAffiliated, isNonLeader} from "./data.js";
import { cardTemplate } from './templates.js';

const displayExplore = () => {
    document.querySelectorAll('.choice').forEach(node => {
        if(node["id"] === "explore") {
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
        button.setAttribute('name', "selected_affiliation");
        button.setAttribute('value', card_type);
    
        $("#card_type_select").appendChild(button);
    
        button.addEventListener('click', () => {
            setSelectedCardType(card_type);
        });
    })
}

function setLeader() {
    const leaderName = $("#leader").value
    const leaderCardData = getCard(leaderName);
  
    if (!leaderCardData) {
      setState("leader");
      setHTML($("#leader_card"));
      const datalist = $('#leaders');
  
      const cards = getState("cards")
        .filter(leader => leader["legal"] === "leader")
        .filter(card => card["name"].startsWith(leaderName));
      const limited = cards.slice(0,500)
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
      button.setAttribute('class', 'affiliation_selection')
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
        if(node["value"] === attribute) {
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
        if(node["value"] === attribute) {
            node.classList.add("selected")
        }
        else {
            node.classList.remove("selected")
        }
    })
    setExploreResults();
}

function setExploreResults() {
    if(getState("selectedCardType") == null || getState("selectedAffiliation") == null) {
        return;
    }
    const card_type = getState("selectedCardType")
    const affiliation = getState("selectedAffiliation")

    const cards = getState("cards").filter(card => isNonLeader(card))
        .filter(card => isAffiliated(card, affiliation))
        .filter(card => isCardType(card, card_type))
        .sort((card1, card2) => card1["manaValue"] > card2["manaValue"])
        .map(card => cardTemplate(card)).join('')
    setHTML($("#cards_display"), cards);   
  }

export { displayExplore }