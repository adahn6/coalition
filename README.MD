# Coalition Format

![players-light](images/players_light.png#gh-light-mode-only "3-5 Players") ![deck-light](images/deck_light.png#gh-light-mode-only "60 Card Deck") ![life-light](images/life_light.png#gh-light-mode-only "25 Life") ![games-light](images/games_light.png#gh-light-mode-only "90 Minutes")
![players-dark](images/players_dark.png#gh-dark-mode-only "3-5 Players") ![deck-dark](images/deck_dark.png#gh-dark-mode-only "60 Card Deck") ![life-dark](images/life_dark.png#gh-dark-mode-only "25 Life") ![games-dark](images/games_dark.png#gh-dark-mode-only "90 Minutes")

Coalition is a fast and frenzied multiplayer format about leading creature coalitions into battle. You'll build a sixty-card deck plus sideboard around a legendary **hero** creature. Choose a creature type printed anywhere on your hero; all other cards in the deck must be **affiliated** with that type, forming your coalition.

As you play, you'll get victory points for all combat damage your creatures deal, as well as any other damage to opponents dealt by your hero; you win the game if you reach 21. But Coalition doesn't stop with game one-- it's intended to be played as best of 3. Win or lose, you'll add all victory points you get during the game to your standing, and the winner is the player with the most at the end of the third game.

Coalition remixes a lot of elements from other formats into its own unique spin on Magic. It's aggressive and fast, like high power sixty card formats can be, but power limited by affiliation restrictions. Heroes seem similar to commanders, but the mechanical differences open up very different playstyles. Best of three matches add sideboard opportunities like in 1v1 formats, but also add a fun layer of archenemy metagame strategy. Give it a try-- we think you'll have a blast. 

## Why Play This Format?
* Fast best-of-3 multiplayer games
* Flavorful and fun decks built around creature affiliations
* Eternal format
* Hybridizes 60 card formats with multiplayer magic

## Play Rules/Modifiers
This format is primarily intended for 3-5 players per game. Deck sizes are 60 cards + 10 sideboard cards. Players start with 25 life. Games are played in sets of three, and players sideboard after each game.

There is no free mulligan, however like other multiplayer Magic formats the first player does draw a card. For the first game, decide the first player randomly; for games two and three, the player in last place may choose the first player.

## Victory points
Each player starts the game at zero victory points, and earns victory points for all combat damage dealt to opponents, as well as any non-combat damage the hero deals to opponents. Any player who reaches 21 victory points immediately wins the game; and if you win through any other means, you'll receive the full 21 points. 

**At the end of each game, each player adds all victory points they acquired to their overall standing**. Players are ranked from most to least in order, and the rankings at the end of game three are the final results used to determine placement.

> [!NOTE] 
> The ranking system here is very important, your victory points matter even if the game doesn't go your way! A deck that loses all three games but consistently racks up victory points may win the overall match, so don't get discouraged if you lose but still got a few good plays in.


## Affiliation
A card's affiliation come from any part of that card that references a creature type, except for "non-[type]" negations, including its creature type or any creature type in its text; it is affiliated with all creature types referenced this way. A card that is not affiliated with any creature types is unaffiliated.
> [!NOTE] 
> “Non-[Creature Type]” clauses do not count as a creature type for affiliation, e.g. [Embiggen](https://scryfall.com/card/unf/137/embiggen) is considered unaffiliated, as its text “target non-Brushwagg creature” does not contribute a Brushwagg affiliation and it references no other creature types.

## Deckbuilding
### Format
![maindeck-light](images/maindeck_light.png#gh-light-mode-only "60 card main deck") ![sideboard-light](images/sideboard_light.png#gh-light-mode-only "10 card sideboard")
![maindeck-dark](images/maindeck_dark.png#gh-dark-mode-only "60 card main deck") ![sideboard-dark](images/sideboard_dark.png#gh-dark-mode-only "10 card sideboard")

* 60 card main deck, 10 card sideboard
	* Sideboard must include one legendary "Hero" creature
* Up to 4x of creatures and nonbasic lands
* 1x non-creature, non-land cards
* Unlimited basic lands

### Restrictions:
* No cards from the [banned cards list](BANLIST.MD)
* No legendary cards other than your hero in your 70 total cards. The legendary creature must be a legendary creature on the front side of the card.
* All cards are [unaffiliated or have the chosen affiliation](#Affiliation)
    * The chosen affiliation [**may not be Human**](FAQ.md#why-cant-i-choose-human-as-an-affiliation-for-my-deck)
* No companion

### Affiliation restriction examples:
* [Kaalia of the Vast](https://scryfall.com/card/2x2/235/kaalia-of-the-vast) can be chosen as a hero, and is Human, Cleric, Angel, Demon, and Dragon affiliated; any one of these may be chosen for the deck's coalition affiliation
* [Portal to Phyrexia](https://scryfall.com/card/bro/240/portal-to-phyrexia) is Phyrexian affiliated and can only be run in a Phyrexian coalition deck
* [Swan Song](https://scryfall.com/card/c16/98/swan-song) is Bird affiliated and can only be run in a Bird coalition deck
* [Bestial Menace](https://scryfall.com/card/mic/134/bestial-menace) is Snake, Wolf, and Elephant affiliated and can be run only in deck of those coalitions
* [Aether Chaser](https://scryfall.com/card/aer/76/aether-chaser) is Artificer and Servo affiliated and can be run only in deck of those coalitions
* [Celestial Colonnade](https://scryfall.com/card/uma/238/celestial-colonnade) is Elemental affiliated and can only be run in an Elemental coalition deck
* [Dermotaxi](https://scryfall.com/card/mh2/224/dermotaxi) is unaffiliated and may be run in any deck

> [!NOTE] 
> Creatures with changeling or other relevant characteristic defining abilities, e.g. [Morophon the Boundless](https://scryfall.com/card/cmm/3/morophon-the-boundless) or [Grist, the Hunger Tide](https://scryfall.com/card/mh2/202/grist-the-hunger-tide), follow rules for their characteristic defining abilities. In these examples, changeling is an ability not a creature type, so a deck running Morophon must still declare a chosen affiliation with a single creature type, and all creatures without changeling must be affiliated with that type. Grist can be chosen as a hero, but only has the option of choosing an Insect affiliation. 

## Hero mechanics:
Your hero starts outside the game. Once on your turn, you may put it into your hand from outside the game as a sorcery. This is a special action and does not use the stack. A hero also has similar state-based actions and replacement effects to commanders:
* As a state-based action, a hero can be removed from the game after it has transitioned to graveyard or exile
* As a replacement effect, if a hero would enter your library or hand, you may instead choose to remove it from the game

For formal defintions of these actions and effects, please check the [comprehensive rules modification](RULES.MD)
> [!TIP] 
> Heroes may seem similar to commanders, but they act closer to a repeatable companion. After placing your hero into hand, you could cast it (and you'll never pay a tax for it!), or you could discard it and use a [reanimate effect](https://scryfall.com/search?q=otag%3Areanimate+-is%3Areserved+game%3Apaper&unique=cards&as=grid&order=name), or you could exile it to pay for [Force of Will](https://scryfall.com/card/dmr/50/force-of-will). It's up to you! 


## Other rules modifications
Because Coalition has multiple players with multiple games played, there are special rules around conceding. While a player may still concede at any time for any reason, conceding automatically invalidates their victory points for that match, as if they had not played at all; they may then not play further matches. This rule is designed to prevent players from conceding advantageously. As an exception to this rule, if all opponents of a player wish to concede simultaneously, this rule does not apply and it is simply as if the player being conceded to had won through any other method. 

In rare situations, games may be forcibly ended in a draw by the rules via certain game states. If this happens, no penalties are given and players simply use their existing victory points at the end of the game.

## Quick rules

### Coming from Commander:
If you're familiar with Commander and just want a quick run down on what's different in this format, here's an itemized summary of what changes:
* **Heroes aren't in the command zone**, they're outside the game. **Once per turn**, you can **put your hero into hand**
  * **No command tax**!
* Players start at **25 life**
* There is **no free mulligan**
* **No color identity** restrictions; but instead, there is the new **affiliation** restrictions
* Decks are **sixty cards** and are **not highlander**
  * 4x lands, 4x creatures, 1x all other cards  
* **No commander damage** lose condition, but instead a new **victory point win condition**
  * Victory points are **all combat damage from all creatures**, plus **any other damage to opponents from your hero**
  * You win the game if you get to 21
  * If you win via any other means, you receive 21 victory points
* **Best of 3**
  * After each game, players may **sideboard**
  * Standings are updated after each game by adding the victory points every player had at the end of the game
  * For game 1, decide the first player randomly. For games 2 and 3, the player ranked last chooses the first player. In the case of a tie, decide randomly which player ranked last chooses.
