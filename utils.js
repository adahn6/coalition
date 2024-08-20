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

export {$, formData, getState, setState, setHTML, hideHTML, showHTML };