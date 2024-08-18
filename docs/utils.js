function $(selector) { 
  return document.querySelector(selector);
};

function setState(key, value = undefined) {
  document.state[key] = value;
  return value;
}

function getState(key) {
  return document.state[key];
}

function formData(target) {
  const formData = new FormData(event.target);
  const data = {};

  formData.forEach(value, key => (data[key] = value));

  return data;
};

function populateLeaderDatalist() {
  const datalist = $('#leaders');

  const cards = getState("cards");
  const leaders = cards.filter(leader => leader["legal"] === "leader");

  leaders.forEach((card) => {
    let option = document.createElement("option");

    option.setAttribute('value', card["name"]);

    datalist.appendChild(option);
  });
};

function populateCardDatalist() {
  const datalist = $('#cards');

  const cards = getState("cards");
  const limited = cards.slice(0,500);
  datalist.innerHTML = '';
  cards.forEach((card) => {
    let option = document.createElement("option");
    option.setAttribute('value', card["name"]);
    datalist.appendChild(option);
  });
};

async function prepareData() {
  const cards = await fetch('data.json').then(response => response.json());
  const creatureTypes = await fetch('creature_types.json').then(response => response.json());

  setState("cards", cards);
  setState("types", creatureTypes);

  //populateLeaderDatalist();
  //populateCardDatalist();
};

function setHTML(selector, HTML = '') {
  selector.innerHTML = HTML;
  return HTML;
}

function hideHTML(element) {
  element.style.display = 'none';
}

function showHTML(element) {
  element.style.display = 'block';
}

export {$, formData, prepareData, getState, setState, setHTML, hideHTML, showHTML };