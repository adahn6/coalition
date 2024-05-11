# Deckbuilding

# Example Decks:
* [Ranar, Warrior affiliation](https://www.moxfield.com/decks/QjFCq-UC_kWgDC2buD2wyg)
  * Use Ranar to generate lots of value from foretelling, all while accruing power on the board with Hero of Bretgard, and controlling your top deck to miracle Triumph of Saint Katherine!
* [Sarkhan, Dragon affiliation](https://www.moxfield.com/decks/IgZO0RQaSE6P_Y-13ZpBVA)
  * Use Sprite Dragons and Sarkhan to get +1+1 creatures on the field, while looting with Dragonborn Looter to help get out Murktide Regent!
* [Emrakul, Eldrazi affiliation](https://www.moxfield.com/decks/gkTCyhX1VUijCaKwSelXRw)
  * Sneak the powerful Emrakul out on to the field to overpower your foes!
* [Arden, Kor affiliation](https://www.moxfield.com/decks/CFkIOWHfNUiO3dMrNYzDXQ)
  * Bring out the big guns with Stoneforge Mystic and equip them for free on Arden!


## Valid creature types
As of posting, the current creature types listed in the comprehensive rules are:
```
Advisor, Aetherborn, Alien, Ally, Angel, Antelope, Ape, Archer,
Archon, Armadillo, Army, Artificer, Assassin, Assembly-Worker, Astartes, Atog, Aurochs,
Avatar, Azra, Badger, Balloon, Barbarian, Bard, Basilisk, Bat, Bear, Beast, Beaver, Beeble,
Beholder, Berserker, Bird, Blinkmoth, Boar, Bringer, Brushwagg, Camarid, Camel, Capybara,
Caribou, Carrier, Cat, Centaur, Cephalid, Child, Chimera, Citizen, Cleric, Clown, Cockatrice,
Construct, Coward, Coyote, Crab, Crocodile, C’tan, Custodes, Cyberman, Cyclops, Dalek,
Dauthi, Demigod, Demon, Deserter, Detective, Devil, Dinosaur, Djinn, Doctor, Dog, Dragon,
Drake, Dreadnought, Drone, Druid, Dryad, Dwarf, Efreet, Egg, Elder, Eldrazi, Elemental,
Elephant, Elf, Elk, Employee, Eye, Faerie, Ferret, Fish, Flagbearer, Fox, Fractal, Frog, Fungus,
Gamer, Gargoyle, Germ, Giant, Gith, Gnoll, Gnome, Goat, Goblin, God, Golem, Gorgon,
Graveborn, Gremlin, Griffin, Guest, Hag, Halfling, Hamster, Harpy, Hellion, Hippo, Hippogriff,
Homarid, Homunculus, Horror, Horse, Human, Hydra, Hyena, Illusion, Imp, Incarnation,
Inkling, Inquisitor, Insect, Jackal, Jellyfish, Juggernaut, Kavu, Kirin, Kithkin, Knight, Kobold,
Kor, Kraken, Llama, Lamia, Lammasu, Leech, Leviathan, Lhurgoyf, Licid, Lizard, Manticore,
Masticore, Mercenary, Merfolk, Metathran, Minion, Minotaur, Mite, Mole, Monger, Mongoose,
Monk, Monkey, Moonfolk, Mount, Mouse, Mutant, Myr, Mystic, Naga, Nautilus, Necron,
Nephilim, Nightmare, Nightstalker, Ninja, Noble, Noggle, Nomad, Nymph, Octopus, Ogre,
Ooze, Orb, Orc, Orgg, Otter, Ouphe, Ox, Oyster, Pangolin, Peasant, Pegasus, Pentavite,
Performer, Pest, Phelddagrif, Phoenix, Phyrexian, Pilot, Pincher, Pirate, Plant, Porcupine,
Possum, Praetor, Primarch, Prism, Processor, Rabbit, Raccoon, Ranger, Rat, Rebel, Reflection,
Rhino, Rigger, Robot, Rogue, Sable, Salamander, Samurai, Sand, Saproling, Satyr, Scarecrow,
Scientist, Scion, Scorpion, Scout, Sculpture, Serf, Serpent, Servo, Shade, Shaman, Shapeshifter,
Shark, Sheep, Siren, Skeleton, Slith, Sliver, Sloth, Slug, Snail, Snake, Soldier, Soltari, Spawn,
Specter, Spellshaper, Sphinx, Spider, Spike, Spirit, Splinter, Sponge, Squid, Squirrel, Starfish,
Surrakar, Survivor, Synth, Tentacle, Tetravite, Thalakos, Thopter, Thrull, Tiefling, Time Lord,
Treefolk, Trilobite, Triskelavite, Troll, Turtle, Tyranid, Unicorn, Vampire, Varmint, Vedalken,
Viashino, Volver, Wall, Walrus, Warlock, Warrior, Weird, Werewolf, Whale, Wizard, Wolf,
Wolverine, Wombat, Worm, Wraith, Wurm, Yeti, Zombie, and Zubera
```

## Helpful Scryfall queries
The following Scryfall queries are provided as-is for assistance with deckbuilding. Note that there may be false positive inclusions if a card's title contains the creature type, and false negatives for unusual plurals (e.g. Wolves) unless the queries are modified for those cases.

For finding all legendary creatures that could be a hero for a type, use the following query:
```
(game:paper) -is:reserved t:legendary t:creature f:legacy (t:TYPE OR o:/ TYPE[s]?[^a-zA-Z]+/) 
```
For finding all non-legendary creatures valid for a type, use the following query:
```
(game:paper) -is:reserved -t:legendary t:creature f:legacy (t:TYPE OR o:/ TYPE[s]?[^a-zA-Z]+/)
```
For finding all typal noncreature spells valid for a type, use the following query:
```
(game:paper) -is:reserved f:legacy -t:legendary -t:creature (o:/ TYPE[s]?[^a-zA-Z]+/)
```

## Sheets
For aggregate data and quick links for typals, check out [this Google Sheets](https://docs.google.com/spreadsheets/d/1hEwRFH8E75JU7Sw15vyOXkVpo1Ly5rEP0Z_qgkT4T50/edit#gid=0)
