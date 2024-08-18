import { $, prepareData } from './utils.js';
document.addEventListener("DOMContentLoaded", async function() {
    document.state = {};
    $("#rules").addEventListener("click", () => displayRules());
    $("#check").addEventListener("click", () => displayCheck());
    $("#validate").addEventListener("click", () => displayValidate());
    $("#explore").addEventListener("click", () => displayExplore());
    await prepareData();
    // await setDebugDecklist();
  });


const displayRules = () => {
    console.log("eventually display rules")
}
const displayCheck = () => {
    console.log("eventually display check")
}
const displayExplore = () => {
    console.log("eventually display explore")
}
const displayValidate = () => {
    console.log("eventually display validate")
}