import { $, getState, setState } from './utils.js';
import { prepareData } from './data.js'
import { displayCheck } from './check.js'
import { parseDecklist } from './parser.js';
import { displayExplore } from './explore.js';
import { displayValidate } from './validator.js';

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

function getAffiliatedCreatures() {
    const selectedAffiliation = getState("selectedAffiliation");
    const cards = getState("cards");
   
}
  
const handleDecklist = (rawData) => {
    const decklist = rawData.split("\n");

    setState("decklist", decklist);

    parseDecklist(decklist); 
}