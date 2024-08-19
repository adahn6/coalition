import { $, getState, prepareData, setState } from './utils.js';
import { rules } from './templates.js';
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
    1. Choose a Coalition leader
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

    2. Choose a Coalition type
    <div class='formgroup inline'>
      <div id='affiliation_select'></div>
      <input type='button' value='remove affiliation' id='unset_affiliation' />
    </div>

    <hr>
    <div id='leader_card'></div>
    <ul class="column__list">
      <li class="column__item">
        <details open>
          <summary>Creature</summary>
          <div id='creatures'></div>
        </details>
      </li>
      <li class="column__item">
        <details open>
          <summary>Artifacts</summary>
          <div id='artifacts'></div>
        </details>
      </li>
      <li class="column__item">
        <details open>
          <summary>Enchantments</summary>
          <div id='enchantments'></div>
        </details>
      </li>
      <li class="column__item">
        <details open>
          <summary>Instants</summary>
          <div id='instants'></div>
        </details>
      </li>
      <li class="column__item">
        <details open>
          <summary>Sorceries</summary>
          <div id='sorceries'></div>
        </details>
      </li>
      <li class="column__item">
        <details open>
          <summary>Lands</summary>
          <div id='lands'></div>
        </details>
      </li>
      <li class="column__item">
        <details open>
          <summary>Battles</summary>
          <div id='battles'></div>
        </details>
      </li>
    </ul>
    `
    $("#leader").addEventListener("input", () => handleLeader());
}
const displayValidate = () => {
    console.log("eventually display validate")
}

function getAffiliatedCreatures() {
    const selectedAffiliation = getState("selectedAffiliation");
    const cards = getState("cards");
   
}

const handleLeader = () => {
    setState("leaderSetManually", true);
    setLeader($("#leader").value);
  }
  