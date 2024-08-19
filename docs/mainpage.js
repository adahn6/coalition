import { $, getState, prepareData, setState } from './utils.js';
import { rules } from './templates.js';
import { parseDecklist } from './parser.js';
import { setCard, setLeader } from './actions.js';

document.addEventListener("DOMContentLoaded", async function() {
    document.state = {};
    $("#rules").addEventListener("click", () => displayRules());
    $("#check").addEventListener("click", () => displayCheck());
    $("#validate").addEventListener("click", () => displayValidate());
    $("#explore").addEventListener("click", () => displayExplore());
    await prepareData();
    displayRules();
  });

const displayRules = () => {
    let rules = getState("rules").split("\n")
    // remove header and first images
    rules.shift()
    rules = rules.filter((rule) => !rule.includes("-light]"))

    rules = "\n" + rules.join("\n")

    //rules = rules.replaceAll("images/", "../images/")
    $("#content").innerHTML = 
    `
        <zero-md no-shadow>
            <template>
                <style>
                </style>
                <link rel="stylesheet" media="(prefers-color-scheme:dark)" href="https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11/styles/github-dark.min.css" />
                 <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0/dist/katex.min.css" />
            </template>
            <script type="text/markdown">
                ${rules}
            </script
        </zero-md>
    `
}
const displayCheck = () => {
    $("#content").innerHTML = `
    <div id='card_input'>
      <input
        name="card"
        type='text'
        id="card"
        placeholder="enter card name"
        list="cards"
      />

      <datalist id="cards"></datalist>
    </div>

    <div id="card_details">
    </div>
    `;

    $("#card").addEventListener("input", () => handleCard());
}

const handleCard = () => {
    setCard($("#card").value);
  }

const displayExplore = () => {
    $("#content").innerHTML = `
    <div id="deckbuilder">
        <ul class="column__list">
            <li class="column__item">
            Choose a Coalition leader
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
                Choose a Coalition type
                <div id='affiliation_select'></div>
                Choose a card type
                <div id='card_type_select'></div>
            </li>
            <li class="column__item">
                <div id='leader_card'></div>
            </li>
        </ul>
    </div>
    <hr>
    <ul class="column__list" id='creatures'>
    </ul>
    `
    $("#leader").addEventListener("input", () => handleLeader());
}
const displayValidate = () => {
    $("#content").innerHTML = `
        <textarea id="decklist" placeholder="paste your decklist"></textarea>
    `
    $("#decklist").addEventListener('input', (event) => handleDecklist(event.target.value));

}

function getAffiliatedCreatures() {
    const selectedAffiliation = getState("selectedAffiliation");
    const cards = getState("cards");
   
}

const handleLeader = () => {
    setState("leaderSetManually", true);
    setLeader($("#leader").value);
  }
  

  const handleDecklist = (rawData) => {
    const decklist = rawData.split("\n");
  
    setState("decklist", decklist);
  
    parseDecklist(decklist); 
  }