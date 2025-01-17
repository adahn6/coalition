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
      <div class='column cardinfo box'>
        <img src='https://cards.scryfall.io/large/front/${card['image']}' />
        <div class='name'>
          <a href='https://scryfall.com/cards/${card["uri"]}' target='_blank'>${card["name"]}</a>
        </div>
        <div class='affiliations'>
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