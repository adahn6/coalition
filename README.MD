# Coalition Format
Coalition is a fast, high-power multiplayer format about leading creature coalitions into battle. Choose a legendary creature as a coalition [leader](#leaders), then build a 60-card deck plus sideboard around one of its creature type [affiliations](#affiliation).

Coalition is played as a match of three games in which players compete for the most [victory points](#victory-points). Players earn victory points equal to the combat damage they deal to opponents-- reaching 21 victory points immediately wins the game. At the end of each game, each player adds all victory points they earned during the game to their ranking; the winner of the match is the player with the highest ranking at the end of the third game. 

Coalition remixes a lot of elements from other formats into its own unique spin on Magic. It's fast and consistent, like high power sixty card formats, but balanced by deckbuilding and affiliation restrictions. Coalition leaders seem similar to commanders, but the mechanical differences open up very different playstyles. The three-game structure adds sideboard opportunities, and also adds a fun archenemy dynamic. Give it a try-- we think you'll have a blast. 

## Why Play This Format?
* Fast three-game multiplayer matches 
* Flavorful decks built around creature affiliations
* Eternal format with large card pool
* Hybrid of 60 card formats and multiplayer

## Play Rules/Modifiers
![players-light](images/players_light.png#gh-light-mode-only "3-5 Players") ![deck-light](images/deck_light.png#gh-light-mode-only "60 Card Deck") ![life-light](images/life_light.png#gh-light-mode-only "25 Life") ![games-light](images/games_light.png#gh-light-mode-only "90 Minutes")
![players-dark](images/players_dark.png#gh-dark-mode-only "3-5 Players") ![deck-dark](images/deck_dark.png#gh-dark-mode-only "60 Card Deck") ![life-dark](images/life_dark.png#gh-dark-mode-only "25 Life") ![games-dark](images/games_dark.png#gh-dark-mode-only "90 Minutes")

This format is intended for four players playing a match of three games. Deck sizes are 60 cards + 15 sideboard cards. Players start with 25 life, and sideboard after each game.

There is no free mulligan, however like other multiplayer Magic formats the first player does draw a card. For the first game, decide the first player randomly; for games two and three, play order should be determined by the current rankings, starting with the player with the least points and and ending with the player with the most points.

## Affiliation
Affiliation describes what creature types a card is associated with. A card is affiliated with all creature types it is, as well as all creature types referenced in its Oracle text. As an exception, "non-[type]" negations do not count as a reference to a creature type. A card that is not affiliated with any creature types is unaffiliated.

A card's **affiliations** is shorthand for the set of creature types it is affiliated with.

## Victory points
Every player starts each game at zero victory points and can earn up to 21 per game for combat damage dealt to opponents. Any player who reaches 21 victory points immediately wins the game; and [winning through any other means](https://scryfall.com/card/tsb/91/coalition-victory) grants the winner a final count of 21 victory points.

**At the end of each game, each player adds all victory points they acquired to their overall ranking**. Players are ranked from most to least in order, and the rankings at the end of game three are the final results used to determine placement. In the rare case of a tie, the player with the highest life total at the end of the third game wins. 

> [!TIP] 
> The ranking system here is very important, your victory points matter even if the game doesn't go your way! A deck that loses all three games but consistently racks up victory points may win the overall match, so don't get discouraged if you lose but still got a few good plays in.

## Leaders
Your coalition's leader starts outside the game. Once on each of your turns, you may put it into your hand from outside the game as a sorcery. This is a special action and does not use the stack. Leaders also have similar state-based actions and replacement effects to commanders. As a state-based action, a leader can be removed from the game after it has transitioned to graveyard or exile. As a replacement effect, if a leader would enter your library or hand, you may instead choose to remove it from the game. For formal definitions of actions and effects for leaders, please check the [comprehensive rules modification](https://github.com/adahn6/coalition/blob/main/RULES.MD)
> [!TIP] 
> Coalition leaders may seem similar to commanders, but they act closer to a repeatable companion. After placing your coalition's leader into hand, you could cast it (and you'll never pay a tax for it!), or you could discard it and use a [reanimate effect](https://scryfall.com/search?q=otag%3Areanimate+-is%3Areserved+game%3Apaper&unique=cards&as=grid&order=name), or use it to pay for [pitch spell](https://scryfall.com/search?q=otag%3Apitch-spell&unique=cards&utm_source=tagger). It's up to you! 

## Deckbuilding

![maindeck-light](images/maindeck_light.png#gh-light-mode-only "60 card main deck") 
![sideboard-light](images/sideboard_light.png#gh-light-mode-only "15 card sideboard")
![maindeck-dark](images/maindeck_dark.png#gh-dark-mode-only "60 card main deck") 
![sideboard-dark](images/sideboard_dark.png#gh-dark-mode-only "15 card sideboard")

### Format
The format for Coalition decks is decks of 60 cards with a 15 card sideboard. Creatures and non-basic land cards may be included up to four times, counted by their English card title equivalent. There are no limits on basic lands. All other cards may be included only once, counted by their English card title equivalent.

> [!NOTE] 
> Cards that explicitly override deckbuilding restrictions, such as [Relentless Rats](https://scryfall.com/card/a25/105/relentless-rats) or [Slime Against Humanity](https://scryfall.com/card/mkm/177/slime-against-humanity) may override these restrictions

### Restrictions
* No cards from the [banned cards list](https://github.com/adahn6/coalition/blob/main/BANLIST.MD)
* One legendary creature is chosen as the deck's **coalition leader**
    * No legendary cards other than your coalition's leader. **This restriction applies to both sides of any double-faced cards, e.g. [Westvale Abbey](https://scryfall.com/card/soi/281/westvale-abbey-ormendahl-profane-prince) may not be run in any deck**
    * The legendary creature must be a legendary creature on the front side of the card
* A single creature type is chosen as the **coalition type**
    * This type must be chosen from the legendary creature's affiliations
    * All cards in the deck must be [affiliated with the chosen coalition type or be unaffiliated](#affiliation)
    * [Human may not be chosen as the coalition type](https://github.com/adahn6/coalition/blob/main/FAQ.md#why-cant-i-choose-human-affiliation-for-my-deck)
* No companion

### Example decks:

The following are example decklists for starter level decks:
<dl>
<dt><a href="https://www.moxfield.com/decks/honsOyMYiU62t-JhNI8mWg">Balmor, Battlemage Captain -- Wizards</a></dt>
<dd>Use Balmor and cantrips to grow the power of your army of Wizards and overrun your opponents!</dd>

<dt><a href="https://www.moxfield.com/decks/OwI7a86YBUGikbSRoYDSVA">Light-Paws, Emperor's Voice -- Foxes</a></dt>
<dd>Light-Paws uses her powerful Aura tutor ability to dominate the field alone-- or with the help of backup Foxes in the sideboard if needed!</dd>

<dt><a href="https://www.moxfield.com/decks/IR8PKe7QkEmCovY9-pnysA">Neheb, the Worthy -- Minotaurs</a></dt>
<dd>Neheb presses the advantage by making everyone discard cards!</dd>

<dt><a href="https://www.moxfield.com/decks/IsqdnM7LwE-Ih1yFi2_Xrw">Kaseto, Orochi Archmage -- Snakes</a></dt>
<dd>Kaseto grows an increasingly powerful band of Snakes using powerful battlefield tutors pieces like Birthing Pod!</dd>
</dl>

### Example card affiliations:
The following section lists some example deckbuilding restrictions for cards

<dl>
<dt><a href="https://scryfall.com/card/mh2/224/dermotaxi">Dermotaxi</a></dt>
	<dd>Dermotaxi is unaffiliated and may be run in any deck</dd>
<dt><a href="https://scryfall.com/card/2x2/235/kaalia-of-the-vast">Kaalia of the Vast</a></dt>
	<dd>Kaalia of the Vast can be chosen as a coalition's leader, and is affiliated with Human, Cleric, Angel, Demon, and Dragon; any of these may be chosen for the deck's coalition type <b><a href="https://github.com/adahn6/coalition/blob/main/FAQ.md#why-cant-i-choose-human-affiliation-for-my-deck">except Human</a></b></dd>
<dt><a href="https://scryfall.com/card/bro/240/portal-to-phyrexia">Portal to Phyrexia</a></dt>
	<dd>Portal to Phyrexia is affiliated with Phyrexians and can only be run in a Phyrexian coalition deck</dd>
<dt><a href="https://scryfall.com/card/c16/98/swan-song">Swan Song</a></dt>
	<dd>Swan Song is affiliated with Birds and can only be run in a Bird coalition deck</dd>
<dt><a href="https://scryfall.com/card/mic/134/bestial-menace">Bestial Menace</a></dt>
	<dd>Bestial Menace is affiliated with Snakes, Wolves, and Elephants, and can only be run in a deck of one of those coalition types</dd>
<dt><a href="https://scryfall.com/card/aer/76/aether-chaser">Aether Chaser</a></dt>
	<dd>Aether Chaser is affiliated with Humans, Artificers, and Servos, and can only be run in an Artificer or Servo coalition deck (<b><a href="https://github.com/adahn6/coalition/blob/main/FAQ.md#why-cant-i-choose-human-affiliation-for-my-deck">Human cannot be chosen as a coalition type</a></b>)</dd>
<dt><a href="https://scryfall.com/card/uma/238/celestial-colonnade">Celestial Colonnade</a></dt>
	<dd>Celestial Colonnade is affiliated with Elementals, and can only be run in an Elemental coalition deck</dd>
<dt><a href="https://scryfall.com/card/neo/187/go-shintai-of-boundless-vigor">Go-Shintai of Boundless Vigor</a></dt> 
	<dd>Go-Shintai of Boundless Vigor cannot be chosen as a coalition's leader as it is not affiliated with any creature types (Shrine is not a creature type!)</dd>
<dt><a href="https://scryfall.com/card/cmm/3/morophon-the-boundless">Morophon the Boundless</a></dt>
	<dd>Changeling is an characteristic defining ability that grants Morophon the Boundless all creature types, so it can be chosen as a coalion leader for any non-Human type
<dt><a href="https://scryfall.com/card/mh2/202/grist-the-hunger-tide">Grist, the Hunger Tide</a></dt>
	<dd>Grist, the Hunger Tide has an ability that specifies it's an Insect creature card when not on the battlefield. Accordingly, it can be chosen as a coalition's leader, but is only affilated with Insect</dd>
<dt><a href="https://scryfall.com/card/unf/137/embiggen">Embiggen</a></dt>
	<dd>“Non-[Creature Type]” clauses do not count as a creature type for affiliation, so Embiggen is considered unaffiliated, as its text “target non-Brushwagg creature” does not make it affiliated with Brushwagg and it references no other creature types</dd>
</dl>

## Conceding
While a player may still concede at any time for any reason, conceding automatically invalidates their victory points for that match. The player's ranking is set to 0, and they are removed from any remaining games in the match. This rule is designed to prevent players from conceding advantageously. **As an exception to this rule**, if all opponents of a player wish to concede a game simultaneously, this rule does not apply and it is simply as if the player being conceded to had won through any other method. 

> [!IMPORTANT]
> In rare situations, games may be forcibly ended in a draw by the rules via certain game states. If this happens, or if the game is a draw for any other reason, or if a game has no winner for any reason, players simply add their existing victory points at the end of the game to their ranking. 

## Community
Join the [Discord](https://discord.gg/NwQm5m4eBT)!

## Disclaimer
Coalition format is *unaffiliated* with Wizards of the Coast.

**Unofficial content:** Coalition format is unofficial Fan Content permitted under the Fan Content Policy. Not approved/endorsed by Wizards. Portions of the materials used are property of Wizards of the Coast. ©Wizards of the Coast LLC.
