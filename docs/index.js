import { $, getState, setState } from './utils.js';
import { prepareData } from './data.js'
import { rules } from './templates.js';
import { parseDecklist } from './parser.js';
import { setCard } from './actions.js';
import { displayExplore } from './explore.js';

document.addEventListener("DOMContentLoaded", async function() {
    document.state = {};
    $("#home").addEventListener("click", () => displayHome());
    $("#check").addEventListener("click", () => displayCheck());
    $("#validate").addEventListener("click", () => displayValidate());
    $("#explore").addEventListener("click", () => displayExplore());
    await prepareData();
    displayHome();
  });

const displayHome = () => {
    document.querySelectorAll('.choice').forEach(node => {
        if(node["id"] === "home") {
            node.classList.add("selected")
        }
        else {
            node.classList.remove("selected")
        }
    })
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
    document.querySelectorAll('.choice').forEach(node => {
        if(node["id"] === "check") {
            node.classList.add("selected")
        }
        else {
            node.classList.remove("selected")
        }
    })
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
    `
    $("#decklist").addEventListener('input', (event) => handleDecklist(event.target.value));

}

function getAffiliatedCreatures() {
    const selectedAffiliation = getState("selectedAffiliation");
    const cards = getState("cards");
   
}
  

const handleDecklist = (rawData) => {
    const decklist = rawData.split("\n");

    setState("decklist", decklist);

    parseDecklist(decklist); 
}