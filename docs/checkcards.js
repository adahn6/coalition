import { $, prepareData } from './utils.js';
import { setCard } from './actions.js';

document.addEventListener("DOMContentLoaded", async function() {
  $("#card").addEventListener("input", () => handleCard());

  document.state = {};

  await prepareData();
  // await setDebugDecklist();
});


const handleCard = () => {
  setCard($("#card").value);
}