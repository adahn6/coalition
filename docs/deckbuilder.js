import { $, prepareData, setState, getState } from './utils.js';
import { setLeader, setSelectedAffiliation } from './actions.js';

const handleLeader = () => {
  setState("leaderSetManually", true);
  setLeader($("#leader").value);
}

document.addEventListener("DOMContentLoaded", async function() {
  $("#unset_affiliation").addEventListener('click', () => (setSelectedAffiliation(undefined)));
  $("#leader").addEventListener("input", () => handleLeader());

  document.state = {};

  await prepareData();
  // await setDebugDecklist();
});

function getAffiliatedCreatures() {
    const selectedAffiliation = getState("selectedAffiliation");
    const cards = getState("cards");
   
  }
