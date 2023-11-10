# Heroic format
A new multiplayer format intended to be faster and more aggressive than Commander. Build a deck around a legendary hero creature, fill the deck with cards of one creature type. But no other legendaries allowed! As your hero deals player damage, it will level up, giving you card draw or a Treasure token. The goal of the format is make fast, aggressive decks where dealing combat damage to players is a first-class win condition. 

## Why Play This Format?
* Fast paced multi-player games
* Decks feature flavorful creature type themes
* Eternal format
* Inspired primarily by the original companion implementation, with the Typal restriction being the generic equivalent of the companion restriction

## Play Rules/Modifiers
This format is for 3-5 players per game and deck sizes are 60 cards + 8 sideboard cards. Players start with 25 life.

## Typal identity
A card's typal identity comes from any part of that card that references a creature type, including its creature type or any creature type in its text. Every card in your Heroic deck must share a single typal identity, or have no typal identity.

## Hero Damage Victory
As you play, you'll keep track of the combat damage your creatures deal other players, as well as any additional player damage dealt by your hero creature. If this total reaches 21, you win the game!

## Hero Levels
The first time each turn your hero creature deals player damage, you choose to Flourish or Prosper.

Flourish-- Put the top card of your library into hand
Prosper-- Scry 1, then make a Treasure token

## Deck format:
* 60 cards
* 8 card sideboard
	* Must include one legendary creature referred to as your hero creature
* Up to 4x of creatures
* Up to 4x of any nonbasic lands, unlimited basics
* Singleton non-creature, non-land cards

For help with deckbuilding, see the [deckbuilding assistance page](DECKBUILDING.MD)

### Deck Restrictions: 
* No cards from the [banned cards list](BANLIST.MD)
* No legendary cards other than your hero in your 68 total cards
	* No companion or partner
* All cards in your deck share a single typal identity with your hero creature, or have no typal identity. This type may not be Human.
	* Typal identity is defined as “All creature types printed on the card, with the exception of ‘non-‘ type clauses”
		* Example: You can choose [Kaalia of the Vast](https://scryfall.com/card/2x2/235/kaalia-of-the-vast) and choose the Dragon type printed in her ability
		* Example: You can run [Portal to Phyrexia](https://scryfall.com/card/bro/240/portal-to-phyrexia) only if you are choosing Phyrexian creature type
		* Example: You can run [Swan Song](https://scryfall.com/card/c16/98/swan-song) only if you are choosing Bird creature type
		* Example: You can run [Bestial Menace](https://scryfall.com/card/mic/134/bestial-menace) if you are choosing any of Snake, Wolf, or Elephant types
		* Example: You can run [Aether Chaser](https://scryfall.com/card/aer/76/aether-chaser) if you are choosing either Artificer or Servo types
	* Note: “Non-[Creature Type]” clauses do not count as a creature type for this purpose
		* Example: All decks can run [Embiggen](https://scryfall.com/card/unf/137/embiggen) as its text “target non-Brushwagg creature” does not count as referencing the Brushwagg creature type
	* Cards with changeling may be chosen for the legendary creature and may be included in any deck, however a singular shared type must be used for all cards that do not have changeling.
		* Example: [Morophon the Boundless](https://scryfall.com/card/cmm/3/morophon-the-boundless) can be chosen as the legendary, but that doesn’t mean you can include Dragons AND Dwarves AND Spirits etc, just a singular type

## Hero mechanics:
Your hero starts outside the game. Once on your turn, anytime you could cast your hero, you may put it into your hand from outside the game. This is a special action and does not use the stack.
* If it fails to resolve, it is treated like any other card
	* While putting the hero into hand is a special action that doesn't use the stack, it is cast normally and can be countered like normal spells
	* If it's put into the graveyard or exile because of this, you can use the state-based action after zone transition to remove it from the game again
* As a state-based action, it can be removed from the game after it has transitioned zones
	* “If a hero creature is in a graveyard or in exile and that object was put into that zone since the last time state-based actions were checked, its owner may remove it from the game.”
* If you remove it from the game this way, then each opponent that targeted your hero with a spell or ability, or controlled a source that dealt combat damage to your hero chooses to Prosper or Flourish
