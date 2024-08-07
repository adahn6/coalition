import { $, prepareData, setState, getState } from './utils.js';
import { parseDecklist } from './parser.js';
import { setLeader, setSelectedAffiliation } from './actions.js';

async function setDebugDecklist() {
  const response = await fetch('decklist.txt');
  const debugDecklist = await response.text();

  $("#decklist").value = debugDecklist;
  handleDecklist(debugDecklist);
}

const handleDecklist = (rawData) => {
  const decklist = rawData.split("\n");

  setState("decklist", decklist);

  parseDecklist(decklist); 
}

const handleLeader = () => {
  setState("leaderSetManually", true);
  setLeader($("#leader").value);

  const decklist = getState("decklist");

  if (decklist) {
    parseDecklist(decklist);
  }
}

document.addEventListener("DOMContentLoaded", async function() {
  $("#unset_affiliation").addEventListener('click', () => (setSelectedAffiliation(undefined)));
  $("#decklist").addEventListener('input', (event) => handleDecklist(event.target.value));
  $("#leader").addEventListener("input", () => handleLeader());

  document.state = {};

  await prepareData();
  await setDebugDecklist();
});
