let previousPhase = {
  zero: {
    description: 'Init game',
    isActive: false
  },
  A: {
    description: 'Player1: select 3 God favors',
    isActive: false
  },
  B: {
    description: 'Player2: select 3 God favors',
    isActive: false
  },
  C: {
    description: 'Gods select inicial priority',
    isActive: false
  }
};

let turnPhase = {
  step: 0,
  throwDices: {
    description: 'Throws the dice',
    isActive: false
  },
  selectDices: {
    description: 'Choose the dice you want and continue',
    isActive: false
  },
  selectBattlePower: {
    description: 'Choose a God favor or skip',
    isActive: false
  },
  resolveBattle: {
    description: 'Resolving battle...',
    isActive: false
  },
  nextTurnIsReady: {
    description: '',
    isActive: false
  }
};

export {previousPhase, turnPhase};