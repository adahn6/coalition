import { mapAttributes } from './data.js';

const cardTemplate = (card) => {
  let affiliations;

  if (card["affiliations"].length) {
    affiliations = `(${mapAttributes(card["affiliations"]).join(', ')})`;
  } else {
    affiliations = "(unaffiliated)";
  }

  if (card["affiliations"].length >= 200) {
    affiliations = "(all)";
  }

  return `
    <details class='card ${card["status"]}'>
      <summary>
        <div class='card--name'>
          <div>
            <a href='https://scryfall.com/cards/${card["uri"]}' target='_blank'>
              ${card["name"]}
            </a>
          </div>
        </div>

        <div class='card--affiliations'>
          ${affiliations}
        </div>

        <div class='card--status'>
          ${card["status"]}
        </div>
      </summary>

      <div class='details'>
        <div class='image'>
          <img src='https://cards.scryfall.io/normal/front/${card["image"]}' />
        </div>

        <div class='info'>
          <div class='mana_cost'>
            Mana Cost: ${card["manaCost"]}
          </div>

          <div class='oracleText'>
            ${card["oracleText"]}
          </div>
        </div>
      </div>
    </details>
  `
};

const attributeTemplate = (attribute) => (
  `
    <div class='attribute'>
      ${attribute}
    </div>
  `
);

export { cardTemplate, attributeTemplate };