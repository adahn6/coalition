import { $, getState, setState } from './utils.js';
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
        Deck validator coming soon!
    `
    //$("#decklist").addEventListener('input', (event) => handleDecklist(event.target.value));
}

function handleDecklist (decklist) {
    console.log(decklist)
}

export { displayValidate }