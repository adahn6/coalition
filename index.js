import { $, getState, setHTML, setState } from './utils.js';
import { prepareData, getRandomLeader } from './data.js';

document.addEventListener("DOMContentLoaded", async function () {
    document.state = {};
    await prepareData();
    var randomLeader = getRandomLeader()
    $("#leaderexample1").src="https://cards.scryfall.io/large/front/"+randomLeader
    $("#leaderexample2").src="https://cards.scryfall.io/large/front/"+randomLeader
})
