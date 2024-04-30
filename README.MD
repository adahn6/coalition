# Coalition format
Coalition is a fast-paced and chaotic multiplayer format about leading creature coalitions into battle. It's a fusion of many existing formats of Magic but with a few unique twists. In this format, you'll build a sixty-card deck, plus sideboard, around a legendary "hero" creature. You'll choose a creature type printed anywhere on the hero creature; then, all other cards in the deck must have that printed on them as well (unless they have no creature types printed at all), forming a "coalition" of that type and its allies. 

As you play, you'll track the combat damage your creatures deal, as well as any other player damage dealt by your hero; reach 21 of these victory points and you win the game. The goal of the format is to prioritize synergistic creature type decks with combat damage contributing to a first-class win condition. But Coalition doesn't stop there-- it's intended to be played as best of 3. At the end of all three rounds, the overall winner is the player with the most combined victory points from all three matches.

Coalition plays a little differently than most other formats. It's aggressive and fast, like high power sixty card formats can be, but power limited by its Typal identities. Heroes are superficially similar to commanders, but the subtle differences open up very different playstyles. Best of three matches add sideboard opportunities like in 1v1 formats, but also add a fun layer of archenemy metagame strategy. Give it a try-- we think you'll have a blast. 

## Why Play This Format?
* Fast, aggressive multi-player games
* Creature typal decks are flavorful and fun to build
* Eternal format allows for a large deckbuilding pool
* Hybridizes 60 card playstyles with multiplayer magic

## Play Rules/Modifiers
This format is for 3-5 players per game and deck sizes are 60 cards + 10 sideboard cards. Players start with 25 life. Games are played in sets of three, and you'll sideboard in-between matches.  

## Win condition
As you play, you'll keep track of the combat damage your creatures deal other players, as well as any additional player damage dealt by your legendary creature. If this total reaches 21, you win the match! But it's not over there; Coalition is intended to be played as best of three games. You'll keep a total of your victory points across all three matched, whether you won or not, and the player at the end of three matches with the highest victory point total wins. 

As of writing, winning a game also confers a 5 point victory point reward. This is subject to further playtesting.

## Typal identity
A card's typal identity comes from any part of that card that references a creature type, including its creature type or any creature type in its text. The only exception to this is that a negation of a type does not count (i.e. "non-Humans" does not contribute to typal identity). Every card in your deck must share a single typal identity, or have no typal identity.

## Deck format:
* 60 cards
* 10 card sideboard
	* Must include one legendary creature referred to as your hero creature
* Up to 4x of creatures
* Up to 4x of any nonbasic lands, unlimited basics
* Singleton non-creature, non-land cards

For help with deckbuilding, see the [deckbuilding assistance page](DECKBUILDING.MD)

### Deck Restrictions: 
* No cards from the [banned cards list](BANLIST.MD)
* No legendary cards other than your hero in your 70 total cards
	* No companion or partner
* All cards in your deck share a single typal identity with your hero creature, or have no typal identity. *This type may not be Human*.
	* Typal identity is defined as “All creature types printed on the card, with the exception of ‘non-‘ type clauses”
		* Example: You can choose [Kaalia of the Vast](https://scryfall.com/card/2x2/235/kaalia-of-the-vast) and choose the Dragon type printed in her ability
		* Example: You can run [Portal to Phyrexia](https://scryfall.com/card/bro/240/portal-to-phyrexia) only if you are choosing Phyrexian creature type
		* Example: You can run [Swan Song](https://scryfall.com/card/c16/98/swan-song) only if you are choosing Bird creature type
		* Example: You can run [Bestial Menace](https://scryfall.com/card/mic/134/bestial-menace) if you are choosing any of Snake, Wolf, or Elephant types
		* Example: You can run [Aether Chaser](https://scryfall.com/card/aer/76/aether-chaser) if you are choosing either Artificer or Servo types
	* Note: “Non-[Creature Type]” clauses do not count as a creature type for this purpose
		* Example: All decks can run [Embiggen](https://scryfall.com/card/unf/137/embiggen) as its text “target non-Brushwagg creature” does not count as referencing the Brushwagg creature type
	* Cards with changeling may be chosen for the legendary creature and may be included in any deck, however a singular shared type must be used for all cards that do not have changeling.
		* Example: [Morophon the Boundless](https://scryfall.com/card/cmm/3/morophon-the-boundless) can be chosen as the legendary, but that doesn’t mean you can include Dragons AND Dwarves AND Spirits etc, just a singular choice of those types
* Legendary creature must be a legendary creature on the front side of the card
	* Yes, [Grist, the Hunger Tide](https://scryfall.com/card/mh2/202/grist-the-hunger-tide) is allowed as a Hero, as her card text defines her as a Legendary Creature on the front side when not on the battlefield.

## Hero mechanics:
Your hero starts outside the game. Once on your turn, anytime you could cast your hero, you may put it into your hand from outside the game. This is a special action and does not use the stack.
* If it fails to resolve, it is treated like any other card
	* While putting the hero into hand is a special action that doesn't use the stack, it is cast normally and can be countered like normal spells
	* If it's put into the graveyard or exile because of this, you can use the state-based action after zone transition to remove it from the game again
* As a state-based action, it can be removed from the game after it has transitioned zones
	* “If a hero creature is in a graveyard or in exile and that object was put into that zone since the last time state-based actions were checked, its owner may remove it from the game.”
* As a replacement effect, if the hero creature would enter your library or hand, you may instead choose to remove it from the game

## Other rules modifications
Because of the unique nature of the Coalition win conditions, there are special rules for how to manage conceding. While a player may still concede at instant speed, conceding automatically invalidates their victory points for that match, as if they had not played at all; they may then not play further matches. Without this rule, players could weaponize conceding at instant speed before an opponent deals combat damage to them in an attempt to gain an advantage; with this rule in place, doing so will disadvantage them far more than any advantage it could ever infer.

```mermaid
block-beta
  columns 4
  "Main Deck":4
  block:group1:4
    columns 1
    Creature 
    Creature
    Creature
    Creature
  end
  g
  block:group2:3
    %% columns auto (default)
    l m n o p q r
  end
```
