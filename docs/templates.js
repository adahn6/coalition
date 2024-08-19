import { mapAttributes } from './data.js';

const cardTemplate = (card) => {
  let affiliations;

  if (card["affiliations"].length) {
    affiliations = `[${mapAttributes(card["affiliations"]).join(', ')}]`;
  } else {
    affiliations = "[unaffiliated]";
  }

  if (card["affiliations"].length >= 200) {
    affiliations = "[all]";
  }

  return `
      <div class='card compatible'>
        <div class='card--name'>
          <a href='https://scryfall.com/cards/${card["uri"]}' target='_blank'>${card["name"]}</a>${card["manaCost"]}
        </div>
        <div class='card--affiliations'>
        ${affiliations}
        </div>
      </div>
  `
};

const attributeTemplate = (attribute) => (
  `
    <div class='attribute'>
      ${attribute}
    </div>
  `
);

const rules = 
  `
    <div class='rules'>This is the Coalition rules explainer!
  `;

const check = 
  `
    <div class='check'>This is the check card affiliations tool!
  `; 
export { cardTemplate, attributeTemplate, rules, check };