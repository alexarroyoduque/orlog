function createPower(name, id, description, priority, use1, use2, use3) {
  return {
    name,
    id,
    description,
    priority, //beforeDamage 1 2 3 4 or afterDamage 5 6 7
    amount: 1,
    isSelected: false,
    uses: [
      {
        level: 1,
        cost: use1[0],
        isSelected: false,
        shorDescription: use1[1]
      },
      {
        level: 2,
        cost: use2[0],
        isSelected: false,
        shorDescription: use2[1]
      },
      {
        level: 3,
        cost: use3[0],
        isSelected: false,
        shorDescription: use3[1]
      }
    ]
  }
}

// https://www.pcinvasion.com/assassins-creed-valhalla-orlog-guide-god-favors/
let allPowers = [
  createPower(
    'Thor’s Strike',
    'thor',
    'Deals damage only after the resolution phase',
    6,
    [4, '2 damage'],
    [8, '5 damage'],
    [12, '8 damage']
  ),
  createPower(
    'Vidar’s Might',
    'vidar',
    'Remove helmets',
    4,
    [2, 'Remove 2'],
    [4, 'Remove 4'],
    [6, 'Remove 6']
  ),
  createPower(
    'Heimdall’s Watch',
    'heimdall',
    'Gives health per block (with helmet or shield)',
    4,
    [4, '+1 per block'],
    [7, '+2 per block'],
    [10, '+4 per block']
  ),
  createPower(
    'Ull’rs Aim',
    'ull',
    'Remove shields',
    4,
    [2, 'Remove 2'],
    [3, 'Remove 3'],
    [4, 'Remove 6']
  ),
  // createPower(
  //   'Baldr’s Invulnerability',
  //   'baldr',
  //   'Adds extra helmets or shields for each equivalent',
  //   4,
  //   [3, '+1 per equivalent'],
  //   [6, '+2 per equivalent'],
  //   [9, '+3 per equivalent']
  // ),
  createPower(
    'Freyr’s Gift',
    'freyr',
    'Adds to the total value of whichever die face is the majority',
    4,
    [4, 'Add 2'],
    [6, 'Add 3'],
    [8, 'Add 4']
  ),
  createPower(
    'Hel’s Grip',
    'hel',
    'Each axe damage you do heals you',
    4,
    [4, '1 HP per damage'],
    [12, '2 HP per damage'],
    [18, '3 HP per damage']
  ),
  createPower(
    'Skadi’s Hunt',
    'skadi',
    'Adds arrow value to each arrow selected',
    4,
    [6, '+1 arrow per arrow'],
    [10, '+2 arrow per arrow'],
    [14, '+3 arrow per arrow']
  ),
  createPower(
    'Freyja’s Plenty *',
    'freiya',
    'Adds value on random dice',
    2,
    [2, '+1 extra value dice'],
    [4, '+2 extra value dice'],
    [6, '+3 extra value dice']
  ),
  createPower(
    'Idun’s Rejuvenation',
    'idun',
    'Heal Health after the Resolution phase',
    7,
    [4, '+2 health'],
    [7, '+4 health'],
    [10, '+6 health']
  ),
  createPower(
    'Brunhild’s Fury',
    'brunhild',
    'Multiply axes, rounded up',
    4,
    [2, 'x1.5 axes'],
    [4, 'x2 axes'],
    [6, 'x3 axes']
  ),
  createPower(
    'Skuld’s claim',
    'skuld',
    'Destroy an opponent´s God Tokens for each arrow',
    3,
    [4, '-2 power per arrow'],
    [6, '-3 power per arrow'],
    [8, '-4 power per arrow']
  ),
  createPower(
    'Frigg’s Sight',
    'frigg',
    'Reroll any of your opponent´s dice',
    2,
    [2, 'Reroll 2 dice'],
    [3, 'Reroll 3 dice'],
    [4, 'Reroll 4 dice']
  ),
  createPower(
    'Loki’s Trick *',
    'loki',
    'Ban random opponent´s dice for the round',
    2,
    [2, 'ban 1 dice'],
    [5, 'ban 2 dice'],
    [7, 'ban 3 dice']
  ),
  createPower(
    'Mimir’s Wisdom',
    'mimir',
    'Gain power token for each damage dealt to you this round',
    4,
    [3, '+1 power token per damage'],
    [5, '+2 power token per damage'],
    [7, '+3 power token per damage']
  ),
  createPower(
    'Bragi’s Verve',
    'bragi',
    'Gain extra power tokens for each hand dice',
    4,
    [2, '+2 power per hand'],
    [8, '+3 power per hand'],
    [12, '+4 power per hand']
  ),
  // createPower(
  //   'Odin´s Sacrifice',
  //   'odin',
  //   'After the Resolution phase, sacrifice any number of your Health and gain Power per Health sacrificed',
  //   7,
  //   [6, '+3 Power per Health sacrified'],
  //   [8, '+4 Power per Health sacrified'],
  //   [10, '+5 Power per Health sacrified']
  // ),
  createPower(
    'Var’s Bond',
    'var',
    'Each power token spent by your opponent heals you',
    1,
    [10, '+1 Health per God Token'],
    [14, '+2 Health per God Token'],
    [18, '+3 Health per God Token']
  ),
  createPower(
    'Thrymr’s Theft *',
    'thrymr',
    'Reduce the effect level of a God Favor invoked by the opponent this round',
    1,
    [3, '- 1 Level'],
    [6, '- 2 Level'],
    [9, '- 3 Level']
  ),
  // createPower(
  //   'Tyr´s Pledge',
  //   'tyr',
  //   'Sacrifice any number of your Health Tokens to destroy an opponent´s God Token per Health Token sacrificed',
  //   3,
  //   [2, '- 2 power token per Health token'],
  //   [4, '- 2 power token per Health token'],
  //   [6, '- 2 power token per Health token']
  // )
];


export function getPowers() {
  return Array.from(allPowers);
}