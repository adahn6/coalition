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

function populateDatalist() {
  const datalist = $('#leaders');

  const cards = getState("cards");
  const leaders = cards.filter(leader => leader["isLeader"]);

  leaders.forEach((card) => {
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

  populateDatalist();
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