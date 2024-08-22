import { $, getState } from './utils.js';
import { prepareDocs, prepareData } from './data.js'
import { displayDeckbuilder } from './explore.js';
import { displayValidate } from './validator.js';

document.addEventListener("DOMContentLoaded", async function() {
    document.state = {};
    await prepareDocs();
    displayHome();
    $("#home").addEventListener("click", () => displayHome());
    $("#banlist").addEventListener("click", () => displayBanlist());
    $("#rules").addEventListener("click", () => displayRules());
    $("#deckbuilder").addEventListener("click", () => displayDeckbuilder());
    $("#validator").addEventListener("click", () => displayValidate());
    await prepareData();
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
    let rules = getState("welcome").split("\n")
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

const displayBanlist = () => {
    document.querySelectorAll('.choice').forEach(node => {
        if(node["id"] === "banlist") {
            node.classList.add("selected")
        }
        else {
            node.classList.remove("selected")
        }
    })
    let banlist = getState("banlist").split("\n")
    // remove header and first images
    banlist = banlist.filter((rule) => !rule.includes("-light]"))
    banlist.shift()
    banlist = "\n" + banlist.join("\n")

    let faq = getState("faq").split("\n")
    // remove header and first images
    //faq.shift()
    faq = faq.filter((rule) => !rule.includes("-light]"))

    faq = "\n" + faq.join("\n")

    const rules = banlist + " " + faq


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

const displayRules = () => {
    document.querySelectorAll('.choice').forEach(node => {
        if(node["id"] === "rules") {
            node.classList.add("selected")
        }
        else {
            node.classList.remove("selected")
        }
    })
    let rules = getState("rules").split("\n")
    // remove header and first images
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