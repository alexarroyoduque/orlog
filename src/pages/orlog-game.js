import { LitElement, html, css } from 'lit-element';

import { gameStyles } from './orlog-game-styles';
import '../elements/orlog-veil.js';
import '../elements/orlog-button.js';
import './orlog-how.js';
import {getDices} from './dices'
import {getPowers} from './powers'
import {previousPhase, turnPhase} from './matchPhases'
export class OrlogGame extends LitElement {

  static get properties() {
    return {
      player1: {type: Object},
      player2: {type: Object},
      previousPhase: {type: Object},
      turns: {type: Object},
      dices: {type: Array},
      powers: {type: Array},
      isDisabledPowerConfirmSelection: {type: Boolean},
      isVisibleInitialPowerSelection: {type: Boolean},
      resolutionMessage: {type: Boolean},
      winnerPlayer: {type: String},
      winnerMessage: {type: String}
    };
  }

  constructor() {
    super();
    this.winnerPlayer = '';
    this.winnerMessage = '';
    this.resolutionMessage = '';
    this.previousPhase = previousPhase;
    this.previousPhase.zero.isActive = true;
    this.turnPhase = turnPhase;
    this.isVisibleInitialPowerSelection = false;
    this.isDisabledPowerConfirmSelection = true;
    this.player1 = {
      id: 1,
      dices: JSON.parse(JSON.stringify(getDices())),
      health: 15,
      turnBlocks: 0,
      power: 0,
      virtualPower: 0,
      stolenPower: 0,
      powerUsed: '',
      hasPriority: false,
      isActive: false,
      powers: []
    };
    this.player2 = {
      id: 2,
      dices: JSON.parse(JSON.stringify(getDices())),
      health: 15,
      turnBlocks: 0,
      power: 0,
      virtualPower: 0,
      stolenPower: 0,
      powerUsed: '',
      hasPriority: false,
      isActive: false,
      powers: []
    };
    this.powers = Array.from(getPowers());
  }

  updatePlayers() {
    this.player1 = {...this.player1};
    this.player2 = {...this.player2};
  }

  sleep(seconds) {
    this.requestUpdate();
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < (seconds * 1000));
  }

  initGame() {
    console.log('init game')
    this.turnPhase.step = 0;
    this.player1SelectPowers();
    this.shadowRoot.querySelector('#initialPowerSelectionVeil').openVeil();
  }

  togglePower(power) {
    power.isSelected = !power.isSelected;
    this.powers = [...this.powers];

    this.isDisabledPowerConfirmSelection = this.powers.filter(p => p.isSelected).length !== 3;
  }

  confirmInitialPowers() {
    let selectedPowers = this.powers.filter(p => p.isSelected);
    if (this.previousPhase.A.isActive) {
      this.player1.powers = JSON.parse(JSON.stringify(selectedPowers));
      this.player1.powers.forEach(power => {power.isSelected = false});
      this.player2SelectPowers();
    } else if (this.previousPhase.B.isActive) {
      this.player2.powers = JSON.parse(JSON.stringify(selectedPowers));
      this.player2.powers.forEach(power => {power.isSelected = false});
      this.resetSelectedPowers();
      this.shadowRoot.querySelector('#initialPowerSelectionVeil').closeVeil();
      this.setRandomPriority();
    }

    window.scrollTo(0, 0);
  }

  resetSelectedPowers() {
    this.powers
      .filter(p => p.isSelected)
      .map(p => this.togglePower(p))

    this.powers = Array.from(this.powers);
  }

  player1SelectPowers() {
    console.log('player1SelectPowers')
    this.resetSelectedPowers();
    this.previousPhase.zero.isActive = false;
    this.previousPhase.A.isActive = true;
    this.isVisibleInitialPowerSelection = true;
    this.powers = getPowers();
  }

  player2SelectPowers() {
    console.log('player2SelectPowers')
    this.isDisabledPowerConfirmSelection = false;
    this.resetSelectedPowers();
    this.previousPhase.A.isActive = false;
    this.previousPhase.B.isActive = true;
  }

  setRandomPriority() {
    this.previousPhase.B.isActive = false;
    this.previousPhase.C.isActive = true;
    this.player1.hasPriority = false;
    this.player2.hasPriority = false;

    Math.random() < 0.5 ? this.player1.hasPriority = true : this.player2.hasPriority = true;

    this.isVisibleInitialPowerSelection = false;

    this.startTurnPhase();
  }

  getTotalPower(player) {
    return player.power + player.virtualPower;
  }

  getActivePlayer() {
    return this.player1.isActive ? this.player1 : this.player2;
  }

  getInactivePlayer() {
    return !this.player1.isActive ? this.player1 : this.player2;
  }

  changePriority() {
    if (this.player1.hasPriority) {
      this.player1.hasPriority = false;
      this.player2.hasPriority = true;
    } else {
      this.player2.hasPriority = false;
      this.player1.hasPriority = true;
    }

    this.updatePlayers();
  }

  setActivePlayer() {
    if (this.player1.hasPriority) {
      this.player2.isActive = false;
      this.player1.isActive = true;
    } else {
      this.player1.isActive = false;
      this.player2.isActive = true;
    }
    
    this.updatePlayers();
  }

  canThrowDices(player) {
    let dicesSelected = player.dices.filter(dice => dice.isSelected).length;
    
    return this.turnPhase.throwDices.isActive && player.isActive && dicesSelected < 6;
  }

  throwDices() {
    if (this.player1.isActive) {
      this.player1.dices = this.shuffleNotSavedDices(this.player1.dices);
    } else {
      this.player2.dices = this.shuffleNotSavedDices(this.player2.dices);
    }

    this.updatePlayers();

    this.turnPhase.throwDices.isActive = false;

    if (this.turnPhase.step === 5 || this.turnPhase.step === 6) {
      this.autoSelectDices();
    }

    this.turnPhase.selectDices.isActive = true;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1)); 
  }

  shuffleNotSavedDices(playerDices) {
    let dicesClone = [...playerDices]
    let dicesNotSelected = [];
    let idsNotSelected = [];
    
    dicesNotSelected = dicesClone.filter(dice => !dice.isSelected);
    dicesNotSelected.forEach(dice => {
      idsNotSelected.push(dice.id);
      dice.faces.forEach(face => face.isVisible = false);
    });

    idsNotSelected.forEach(i => {
      dicesClone[i].faces[this.getRandomInt(5)].isVisible = true;  
    })

    return dicesClone;
  }

  continueAfterSelection() {
    this.player1.dices
      .filter(dice => dice.isSelected && !dice.isSaved)
      .map(dice => dice.isSaved = true);

    this.player2.dices
      .filter(dice => dice.isSelected && !dice.isSaved)
      .map(dice => dice.isSaved = true);

    this.updatePlayers();
    this.turnPhase.selectDices.isActive = false;
    this.changePriority();
    this.startTurnPhase();
  }

  toggleDice(player, dice) {
    if (this.turnPhase.selectDices.isActive && player.isActive && !dice.isSaved) {
      dice.isSelected = !dice.isSelected;
      dice.faces.find(face => face.isVisible).isSelected = dice.isSelected;
    }

    this.updatePlayers();
  }

  getDiceClass(player, dice){
    let diceClass = '';
    if (this.turnPhase.selectDices.isActive && player.isActive && !dice.isSaved) {
      diceClass += ' dice-selectable';
    }

    diceClass += dice.isSelected ? ' dice-selected' : ' dice-no-selected';

    return diceClass;
  }

  autoSelectDices() {
    if (this.player1.isActive) {
      this.player1.dices.map(dice => {
        dice.isSelected = true;
        dice.isSaved = true;
      });

      this.player1 = {...this.player1};
    } else {
      this.player2.dices.map(dice => {
        dice.isSelected = true;
        dice.isSaved = true;
      });

      this.player2 = {...this.player2};
    }
  }

  calculateVirtualPower() {
    this.player1.dices.forEach(dice => {
      if (dice.faces.filter(face => face.isVisible && face.isSpecial).length) {
        this.player1.virtualPower++;
      }
    });

    this.player2.dices.forEach(dice => {
      if (dice.faces.filter(face => face.isVisible && face.isSpecial).length) {
        this.player2.virtualPower++;
      }
    });

    this.updatePlayers();
  }

  managePossibleWinner() {
    if (this.player1.health <= 0) {
      this.shadowRoot.querySelector('#winnerVeil').openVeil();
      this.winnerPlayer = 'Player 2';
      this.generateWinnerMessage(this.player1.id, this.player1.health)
    } else if (this.player2.health <= 0) {
      this.shadowRoot.querySelector('#winnerVeil').openVeil();
      this.winnerPlayer = 'Player 1';
      this.generateWinnerMessage(this.player2.id, this.player2.health)
    }
  }

  getVisibleFaces(player) {
    return player.dices.map(dice => dice.faces.find(face => face.isVisible));
  }

  getFacesAmountVisibles(player) {
    let facesVisibles = this.getVisibleFaces(player);
    let faces = {};
    let amounts = {axes: 0, arrows: 0, helmets: 0, shields: 0, hands: 0};

    faces.axes = facesVisibles.filter(face => face.type === 'axe');
    faces.arrows = facesVisibles.filter(face => face.type === 'arrow');
    faces.helmets = facesVisibles.filter(face => face.type === 'helmet');
    faces.shields = facesVisibles.filter(face => face.type === 'shield');
    faces.hands = facesVisibles.filter(face => face.type === 'hand');

    faces.axes.forEach(axe => {amounts.axes+= axe.amount});
    faces.arrows.forEach(arrow => {amounts.arrows+= arrow.amount});
    faces.helmets.forEach(helmet => {amounts.helmets+= helmet.amount});
    faces.shields.forEach(shield => {amounts.shields+= shield.amount});
    faces.hands.forEach(hand => {amounts.hands+= hand.amount});

    return amounts;
  }

  // heimdall
  getHealthPerBlockTotal(axes, helmets, healthPerBlock) {
    let blocks = 0;
    if (helmets <= 0) {
      blocks = 0;
    } else if (axes <= helmets) {
      blocks = helmets - axes;
    } else if (axes > helmets) {
      blocks = helmets;
    }

    return blocks * healthPerBlock;
  }

  // hel
  getHealthPerAxeTotal(axes, helmets, healthPerAxeSuccess) {
    let axeSuccess = 0;
    if (axes <= 0 || helmets >= axes) {
      axeSuccess = 0;
    } else if (helmets <= axes) {
      axeSuccess = axes - helmets;
    }

    return axeSuccess * healthPerAxeSuccess;
  }

  // mimir
  getPowerPerDamage(facesAttack, facesDefense, powerPerDamage) {
    let axesDamage = facesAttack.axes - facesDefense.helmets;
    let arrowsDamage = facesAttack.arrows - facesDefense.shields;

    axesDamage = axesDamage < 0 ? 0 : axesDamage;
    arrowsDamage = arrowsDamage < 0 ? 0 : arrowsDamage;

    return (axesDamage + arrowsDamage) * powerPerDamage;
  }

  resolveDamage(facesAttack, facesAttackAmount, facesDefense, facesDefenseAmount, playerDefense) {
    console.log('resolveDamage')
    let axesResult = 0;
    let arrowsResult = 0;
    let powerDefenserOverBattle = playerDefense.resolvePowerOverBattle || {};
    let healthBonus = 0;
    let powerBonus = 0;
    let playerAttacking = playerDefense.id === 2 ? this.player1 : this.player2;
    let powerAttakingOverBattle = playerAttacking.resolvePowerOverBattle || {};

    axesResult = facesAttackAmount.axes - facesDefenseAmount.helmets;
    arrowsResult = facesAttackAmount.arrows - facesDefenseAmount.shields;
    
    if (powerDefenserOverBattle.id === 'heimdall') {
      healthBonus = this.getHealthPerBlockTotal(facesAttackAmount.axes, facesDefenseAmount.helmets, powerDefenserOverBattle.healthPerBlock)
      playerDefense.health += healthBonus;
    } else if (powerAttakingOverBattle.id === 'hel') {
      healthBonus = this.getHealthPerAxeTotal(facesAttackAmount.axes, facesDefenseAmount.helmets, powerAttakingOverBattle.healthPerAxeSuccess)
      playerAttacking.health += healthBonus;
    } else if (powerAttakingOverBattle.id === 'mimir') {
      powerBonus = this.getPowerPerDamage(facesAttackAmount, facesDefenseAmount, powerAttakingOverBattle.powerPerDamage)
      playerAttacking.power += powerBonus;
    }

    facesAttack
      .filter(face => face.type === 'axe')
      .forEach(face => {face.resolving = 'axe-attack'});
    facesDefense
      .filter(face => face.type === 'helmet')
      .forEach(face => {face.resolving = 'helmet-defense'});
    facesAttack
      .filter(face => face.type === 'arrow')
      .forEach(face => {face.resolving = 'arrow-attack'});
    facesDefense
      .filter(face => face.type === 'shield')
      .forEach(face => {face.resolving = 'shield-defense'});
    facesAttack
      .filter(face => face.type === 'hand')
      .forEach(face => {face.resolving = 'hand-attack'});

    console.log('attacking: PLAYER: ', playerAttacking.id)
    console.log('player defenser id', playerDefense.id)
    console.log('player defenser health', playerDefense.health)
    if (axesResult > 0) {
      playerDefense.health = playerDefense.health - axesResult;
      this.managePossibleWinner();
    }
    console.log('axesResult', axesResult)

    if (arrowsResult > 0) {
      playerDefense.health = playerDefense.health - arrowsResult;
      this.managePossibleWinner();
    }

    console.log('arrowsResult', arrowsResult)
    console.log('player defenser id', playerDefense.id)
    console.log('player defenser health', playerDefense.health)
  }

  addsPowerFromVirtualPower(player) {
    player.power+= player.virtualPower;
    player.virtualPower = 0;
  }

  resolveStolePower(playerAttack, playerDefense, handsAttack) {
    console.log('resolveStolePower')
    console.log(playerAttack.id)
    if (handsAttack && playerDefense.power <= handsAttack) {
      playerAttack.power += playerDefense.power;
      playerAttack.stolenPower = playerDefense.power;
      playerDefense.power = 0;
    } else if (handsAttack) {
      playerDefense.power -= handsAttack;
      playerAttack.power += handsAttack;
      playerAttack.stolenPower = handsAttack;
    }

  }

  thorPowerEffect(playerDefenser, cost) {
    let damage = 0;
    switch (cost) {
      case 4:
        damage = 2;
        break;
      case 8:
        damage = 5;
        break;
      case 12:
        damage = 8;
        break;
    }

    playerDefenser.health -= damage;
  }

  // Remove helmets
  vidarPowerEffect(playerDefenser, cost) {
    let amountFaces = this.getFacesAmountVisibles(playerDefenser);
    let facesVisibles = this.getVisibleFaces(playerDefenser);
    let helmetsToRemove = 0;
    switch (cost) {
      case 2:
        helmetsToRemove = 2;
        break;
      case 4:
        helmetsToRemove = 4;
        break;
      case 6:
        helmetsToRemove = 6;
        break;
    }

    if (helmetsToRemove > amountFaces.helmets) {
      facesVisibles.forEach(face => {
        if (face.type === 'helmet') {
          face.amount = 0;
        }
      });
    } else {
      let helmets = facesVisibles.filter(face => face.type === 'helmet');
      for (let i = 0, j = 0; i < helmetsToRemove; j++) {
        while (helmets[j].amount > 0 && i < helmetsToRemove) {
          helmets[j].amount--;
          i++;
        }
      }
    }
  }

  // Gives health per block (with helmet or shield)
  heimdallPowerEffect(playerUsingPower, cost) {
    let healthPerBlock = 0;
    switch (cost) {
      case 4:
        healthPerBlock = 1;
        break;
      case 7:
        healthPerBlock = 2;
        break;
      case 10:
        healthPerBlock = 4;
        break;
    }

    playerUsingPower.resolvePowerOverBattle = {id: 'heimdall', healthPerBlock};
  }

  // Remove shields
  ullPowerEffect(playerDefenser, cost) {
    let amountFaces = this.getFacesAmountVisibles(playerDefenser);
    let facesVisibles = this.getVisibleFaces(playerDefenser);
    let shieldsToRemove = 0;
    switch (cost) {
      case 2:
        shieldsToRemove = 2;
        break;
      case 3:
        shieldsToRemove = 3;
        break;
      case 4:
        shieldsToRemove = 6;
        break;
    }

    if (shieldsToRemove > amountFaces.shields) {
      facesVisibles.forEach(face => {
        if (face.type === 'shield') {
          face.amount = 0;
        }
      });
    } else {
      let shields = facesVisibles.filter(face => face.type === 'shield');
      for (let i = 0, j = 0; i < shieldsToRemove; j++) {
        while (shields[j].amount > 0 && i < shieldsToRemove) {
          shields[j].amount--;
          i++;
        }
      }
    }
  }

  baldrPowerEffect(playerUsingPower, cost) {

  }

  // Adds to the total value of whichever die face is the majority
  freyrPowerEffect(playerUsingPower, cost) {
    let amountFaces = this.getFacesAmountVisibles(playerUsingPower);
    let facesVisibles = this.getVisibleFaces(playerUsingPower);
    let addValue = 0;
    switch (cost) {
      case 4:
        addValue = 2;
        break;
      case 6:
        addValue = 3;
        break;
      case 8:
        addValue = 4;
        break;
    }

    let sortable = [];
    for (var type in amountFaces) {
        sortable.push([type, amountFaces[type]]);
    }
    
    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });

    let faceMajority = sortable[0][0].substr(0, sortable[0][0].length -1);
    facesVisibles.find(face => face.type === faceMajority).amount += addValue;
  }

  // Each axe damage you do heals you
  helPowerEffect(playerUsingPower, cost) {
    let healthPerAxeSuccess = 0;
    switch (cost) {
      case 4:
        healthPerAxeSuccess = 1;
        break;
      case 12:
        healthPerAxeSuccess = 2;
        break;
      case 18:
        healthPerAxeSuccess = 4;
        break;
    }

    playerUsingPower.resolvePowerOverBattle = {id: 'hel', healthPerAxeSuccess};
  }

  // Adds arrow value to each arrow selected
  skadiPowerEffect(playerUsingPower, cost) {
    let arrowsToAdd = 0;
    let facesVisibles = this.getVisibleFaces(playerUsingPower);

    switch (cost) {
      case 6:
        arrowsToAdd = 1;
        break;
      case 10:
        arrowsToAdd = 2;
        break;
      case 14:
        arrowsToAdd = 3;
        break;
    };

    facesVisibles.forEach(face => {
      if (face.type === 'arrow') {
        face.amount += arrowsToAdd;
      }
    });
  }

  // Roll additional dice during the round
  freiyaPowerEffect(playerUsingPower, cost) {
    let facesVisibles = this.getVisibleFaces(playerUsingPower);
    let extra = 0;
    switch (cost) {
      case 2:
        extra = 1;
        break;
      case 4:
        extra = 2;
        break;
      case 6:
        extra = 3;
        break;
    };

    facesVisibles[this.getRandomInt(facesVisibles.length - 1)].amount += extra;
  }

  // Heal Health after the Resolution phase
  idunPowerEffect(playerUsingPower, cost) {
    let healthBonus = 0;
    switch (cost) {
      case 4:
        healthBonus = 2;
        break;
      case 7:
        healthBonus = 4;
        break;
      case 10:
        healthBonus = 6;
        break;
    };

    playerUsingPower.health += healthBonus;
  }

  // Multiply axes, rounded up
  brunhildPowerEffect(playerUsingPower, cost) {
    let multiplicator = 0;
    let facesVisibles = this.getVisibleFaces(playerUsingPower);
    let axes = facesVisibles.filter(face => face.type === 'axe');

    switch (cost) {
      case 2:
        multiplicator = 1.5;
        break;
      case 4:
        multiplicator = 2;
        break;
      case 6:
        multiplicator = 3;
        break;
    };

    if (axes.length % 2 !== 0 && multiplicator === 1.5) {
      if (axes.length === 1) {
        axes[0].amount = 2;
      } else if (axes.length === 3) {
        axes[0].amount = 2;
        axes[1].amount = 2;
        axes[2].amount = 1;
      } else if (axes.length === 5) {
        axes[0].amount = 2;
        axes[1].amount = 2;
        axes[2].amount = 2;
        axes[3].amount = 1;
        axes[4].amount = 1;
      }
    } else {
      facesVisibles.forEach(face => {
        if (face.type === 'axe') {
          face.amount *= multiplicator;
        }
      });
    }
  }

  // Destroy an opponent´s God Tokens for each arrow
  skuldPowerEffect(playerUsingPower, playerDefenser, cost) {
    let amountFaces = this.getFacesAmountVisibles(playerUsingPower);
    let multiplicator = 0;
    switch (cost) {
      case 4:
        multiplicator = 2;
        break;
      case 6:
        multiplicator = 3;
        break;
      case 8:
        multiplicator = 4;
        break;
    };

    if (playerDefenser.power <= amountFaces.arrows * multiplicator) {
      playerDefenser.power = 0;
    } else {
      playerDefenser.power -= (amountFaces.arrows * multiplicator);
    }
  }

  // Reroll random of your opponent´s dice
  friggPowerEffect(playerDefenser, cost) {
    let rerollAmount = 0;
    let rerollDiceIndex = [0, 1, 2, 3, 4, 5];
    rerollDiceIndex = rerollDiceIndex.sort(() => Math.random() - 0.5);

    switch (cost) {
      case 2:
        rerollAmount = 2;
        break;
      case 3:
        rerollAmount = 3;
        break;
      case 4:
        rerollAmount = 4;
        break;
    };
    rerollDiceIndex.length = rerollAmount;
    let dicesSaved = playerDefenser.dices.filter(dice => dice.isSaved);

    for (let i = 0; i < rerollDiceIndex.length; i++) {
      let faceVisible = dicesSaved[rerollDiceIndex[i]].faces.find(face => face.isVisible);
      faceVisible.isVisible = false;

      dicesSaved[rerollDiceIndex[i]].faces[this.getRandomInt(5)].isVisible = true;
    }

  }

  // Ban opponent´s dice for the round
  lokiPowerEffect(playerDefenser, cost) {
    let facesVisibles = this.getVisibleFaces(playerDefenser);
    let dicesToBanIndex = [0, 1, 2, 3, 4, 5];
    dicesToBanIndex = dicesToBanIndex.sort(() => Math.random() - 0.5);
    let dicesToBan = 0;
    switch (cost) {
      case 2:
        dicesToBan = 1;
        break;
      case 5:
        dicesToBan = 2;
        break;
      case 7:
        dicesToBan = 3;
        break;
    }
    dicesToBanIndex.length = dicesToBan;

    for (let i = 0; i < dicesToBanIndex.length; i++) {
      facesVisibles[dicesToBanIndex[i]].amount = 0;
    }

  }

  // Gain power token for each damage dealt to you this round
  mimirPowerEffect(playerUsingPower, cost) {
    let powerPerDamage = 0;
    switch (cost) {
      case 3:
        powerPerDamage = 1;
        break;
      case 5:
        powerPerDamage = 2;
        break;
      case 7:
        powerPerDamage = 3;
        break;
    }

    playerUsingPower.resolvePowerOverBattle = {id: 'mimir', powerPerDamage};
  }

  // Gain extra power tokens for each hand dice
  bragiPowerEffect(playerUsingPower, cost) {
    let amountFaces = this.getFacesAmountVisibles(playerUsingPower);
    let multiplicator = 0;
    switch (cost) {
      case 2:
        multiplicator = 2;
        break;
      case 8:
        multiplicator = 3;
        break;
      case 12:
        multiplicator = 4;
        break;
    }

    playerUsingPower.power += (multiplicator * amountFaces.hands);
  }

  odinPowerEffect(playerUsingPower, cost) {
    
  }

  // Each power token spent by your opponent heals you
  varPowerEffect(playerUsingPower, playerDefenser, cost) {
    let multiplicator = 0;
    let playerDefenserPower = playerDefenser.powers.find(power => power.isSelected);
    switch (cost) {
      case 10:
        multiplicator = 1;
        break;
      case 14:
        multiplicator = 2;
        break;
      case 18:
        multiplicator = 3;
        break;
    }

    if (playerDefenserPower) {
      let playerDefenserPowerCost = playerDefenserPower.uses.find(use => use.isSelected);
      playerUsingPower.health += (playerDefenserPowerCost.cost * multiplicator);
    }

  }

  // Reduce the effect level of a God Favor invoked by the opponent this round
  thrymrPowerEffect(playerWithThrymr, playerWithoutThrymr) {
    let powerNoThrymr = playerWithoutThrymr.powers.find(power => power.isSelected);
    let powerThrymr = playerWithThrymr.powers.find(power => power.isSelected);
    let cost = powerThrymr.uses.find(use => use.isSelected).cost;
    let downgrade = 0;
    switch (cost) {
      case 3:
        downgrade = 1;
        break;
      case 6:
        downgrade = 2;
        break;
      case 9:
        downgrade = 3;
        break;
    }

    if (powerNoThrymr) {
      let useNoThrymr = powerNoThrymr.uses.find(use => use.isSelected);
      let useLevel = useNoThrymr.level;

      useNoThrymr.isSelected = false;

      if (useLevel - downgrade <= 0) {
        powerNoThrymr.isSelected = false;
      } else if (useLevel - downgrade === 1) {
        powerNoThrymr.uses[0].isSelected = true;
      } else if (useLevel - downgrade === 2) {
        powerNoThrymr.uses[1].isSelected = true;
      }
    }

    playerWithThrymr.thrymrApplied = true;
    playerWithoutThrymr.thrymrApplied = true;
  }

  powerManager(playerUsingPower, powerSelected, useSelected) {
    let otherPlayer = playerUsingPower.id === 1 ? this.player2 : this.player1;
    let otherPlayerPower = otherPlayer.powers.find(power => power.isSelected);

    if (!playerUsingPower.thrymrApplied && powerSelected.id === 'thrymr' && otherPlayerPower.id === 'thrymr') {
      console.log('anulated thrymr');
    } else if (!playerUsingPower.thrymrApplied && powerSelected.id === 'thrymr') {
      this.thrymrPowerEffect(playerUsingPower, otherPlayer);
    } else if (!playerUsingPower.thrymrApplied && otherPlayerPower && otherPlayerPower.id === 'thrymr') {
      this.thrymrPowerEffect(otherPlayerPower, playerUsingPower);
    } else if (powerSelected.id === 'thor') {
      this.thorPowerEffect(otherPlayer, useSelected.cost);
    } else if (powerSelected.id === 'vidar') {
      this.vidarPowerEffect(otherPlayer, useSelected.cost);
    } else if (powerSelected.id === 'heimdall') {
      this.heimdallPowerEffect(playerUsingPower, useSelected.cost);
    } else if (powerSelected.id === 'ull') {
      this.ullPowerEffect(otherPlayer, useSelected.cost);
    }/* else if (powerSelected.id === 'baldr') { //TODO
      this.baldrPowerEffect(playerUsingPower, useSelected.cost);
    } */else if (powerSelected.id === 'freyr') {
      this.freyrPowerEffect(playerUsingPower, useSelected.cost);
    } else if (powerSelected.id === 'hel') {
      this.helPowerEffect(playerUsingPower, useSelected.cost);
    } else if (powerSelected.id === 'skadi') {
      this.skadiPowerEffect(playerUsingPower, useSelected.cost);
    } else if (powerSelected.id === 'freiya') { //modified
      this.freiyaPowerEffect(playerUsingPower, useSelected.cost);
    } else if (powerSelected.id === 'idun') {
      this.idunPowerEffect(playerUsingPower, useSelected.cost);
    } else if (powerSelected.id === 'brunhild') {
      this.brunhildPowerEffect(playerUsingPower, useSelected.cost);
    } else if (powerSelected.id === 'skuld') {
      this.skuldPowerEffect(playerUsingPower, otherPlayer, useSelected.cost);
    } else if (powerSelected.id === 'frigg') {
      this.friggPowerEffect(otherPlayer, useSelected.cost);
     } else if (powerSelected.id === 'loki') { // modified
      this.lokiPowerEffect(otherPlayer, useSelected.cost);
    } else if (powerSelected.id === 'mimir') {
      this.mimirPowerEffect(playerUsingPower, useSelected.cost);
    } else if (powerSelected.id === 'bragi') {
      this.bragiPowerEffect(playerUsingPower, useSelected.cost);
    }/* else if (powerSelected.id === 'odin') { // TODO
      this.odinPowerEffect(playerUsingPower, useSelected.cost);
    }*/ else if (powerSelected.id === 'var') {
      this.varPowerEffect(playerUsingPower, otherPlayer, useSelected.cost);
    } /*else if (powerSelected.id === 'tyr') { // TODO
      this.tyrPowerEffect(playerUsingPower, useSelected.cost);
    }*/

    playerUsingPower = {...playerUsingPower};
    otherPlayer = {...otherPlayer};
  }

  applyPowerEffect(player, powerSelected) {
    console.log(powerSelected.name);
    console.log('player', player.id);
    let useSelected = powerSelected.uses.find(use => use.isSelected);
    let cost = useSelected.cost;
    console.log('power', player.power);
    console.log('cost', cost);
    if (this.getTotalPower(player) >= cost) {
      player.power = player.power - cost;
      this.powerManager(player, powerSelected, useSelected);
      player.powerUsed = `${powerSelected.name} level ${useSelected.level}`;
      console.log('power applied')
    } else {
      player.powerUsed = 'Not enought power';
      console.log('not enought power')
    }

    powerSelected.uses.find(use => use.isSelected).isSelected = false;
    powerSelected.isSelected = false;

    player = {...player};
  }

  resolvePowers(playerActive, playerInactive, priority) {
    console.log('resolvePowers')
    let playerActivePower = playerActive.powers.find(power => power.isSelected && power.priority === priority);
    let playerInactivePower = playerInactive.powers.find(power => power.isSelected && power.priority === priority);

    if (playerActivePower) {
      console.log(priority)
      this.applyPowerEffect(playerActive, playerActivePower);
      this.managePossibleWinner();
    }

    if (playerInactivePower) {
      console.log(priority)
      this.applyPowerEffect(playerInactive, playerInactivePower);
      this.managePossibleWinner();
    }


  }

  resolveBattle() {
    console.log('resolving battle...')
    let playerActive = this.getActivePlayer();
    let playerInactive = this.getInactivePlayer();
    let activeId = playerActive.id;
    let activeHealth1 = playerActive.health;
    let inactiveId = playerInactive.id;
    let inactiveHealth1 = playerInactive.health;

    this.resolvePowers(playerActive, playerInactive, 1);
    this.resolvePowers(playerActive, playerInactive, 2);
    this.resolvePowers(playerActive, playerInactive, 3);
    this.resolvePowers(playerActive, playerInactive, 4);

    let playerActiveFacesAmount = this.getFacesAmountVisibles(playerActive);
    let playerActiveFaces = this.getVisibleFaces(playerActive);
    let playerInactiveFacesAmount = this.getFacesAmountVisibles(playerInactive);
    let playerInactiveFaces = this.getVisibleFaces(playerInactive);
    
    this.resolveDamage(playerActiveFaces, playerActiveFacesAmount, playerInactiveFaces, playerInactiveFacesAmount, playerInactive);
    this.addsPowerFromVirtualPower(playerActive);

    this.resolveDamage(playerInactiveFaces, playerInactiveFacesAmount, playerActiveFaces, playerActiveFacesAmount, playerActive);
    this.addsPowerFromVirtualPower(playerInactive);

    this.resolvePowers(playerActive, playerInactive, 5);
    
    this.resolveStolePower(playerActive, playerInactive, playerActiveFacesAmount.hands);
    this.resolveStolePower(playerInactive, playerActive, playerInactiveFacesAmount.hands);
    this.resolvePowers(playerActive, playerInactive, 6);
    this.resolvePowers(playerActive, playerInactive, 7);

    let activeHealth2 = playerActive.health;
    let inactiveHealth2 = playerInactive.health;

    this.generateResolutionMessage(
      activeId, (activeHealth2 - activeHealth1), playerActive.stolenPower, playerActive.powerUsed,
      inactiveId, (inactiveHealth2 - inactiveHealth1), playerInactive.stolenPower, playerInactive.powerUsed
    );

    this.updatePlayers();
    console.log('battle resolved!')
  }

  resetTurn() {
    this.turnPhase.step = 0;
    this.resolutionMessage = '';
    this.player1.turnBlocks = 0;
    this.player2.turnBlocks = 0;
    this.player1.virtualPower = 0;
    this.player2.virtualPower = 0;
    this.player1.stolenPower = 0;
    this.player2.stolenPower = 0;
    this.player1.powerUsed = '';
    this.player2.powerUsed = '';
    this.player1.thrymrApplied = false;
    this.player2.thrymrApplied = false;    
    this.player1.resolvePowerOverBattle = {};
    this.player2.resolvePowerOverBattle = {};
    this.player1.dices.forEach(dice => {dice.isSelected = dice.isSaved = false;});
    this.player2.dices.forEach(dice => {dice.isSelected = dice.isSaved = false;});
    this.player1.dices.forEach(dice => {dice.faces.forEach(face => {face.amount = 1; face.resolving = '';})});
    this.player2.dices.forEach(dice => {dice.faces.forEach(face => {face.amount = 1; face.resolving = '';})});
    this.player1.powers.forEach(power => {
      power.isSelected = false;
      power.uses.forEach(use => {use.isSelected = false});
    });
    this.player2.powers.forEach(power => {
      power.isSelected = false;
      power.uses.forEach(use => {use.isSelected = false});
    });
  }

  nextTurn() {
    this.resetTurn();
    
    this.changePriority();
    this.updatePlayers();
    this.turnPhase.step = 0;
    this.turnPhase.nextTurnIsReady.isActive = false;
    this.startTurnPhase();
  }

  startTurnPhase() {
    this.turnPhase.step++;
    console.log('step', this.turnPhase.step)
    this.previousPhase.C.isActive = false;

    this.setActivePlayer();

    if (this.turnPhase.step < 7) {
      this.turnPhase.throwDices.isActive = true;

      if (this.player1.isActive && this.canThrowDices(this.player1)) {
        this.turnPhase.throwDices.isActive = true;
      } else if (this.player1.isActive) {
        this.turnPhase.selectDices.isActive = true;
      } else if (this.player2.isActive && this.canThrowDices(this.player2)) {
        this.turnPhase.throwDices.isActive = true;
      } else if (this.player2.isActive) {
        this.turnPhase.selectDices.isActive = true;
      }
    } else if (this.turnPhase.step === 7) {
      this.turnPhase.throwDices.isActive = false;
      this.turnPhase.selectDices.isActive = false;

      this.calculateVirtualPower();
      this.turnPhase.selectBattlePower.isActive = true;
    } else if (this.turnPhase.step === 8) {
      this.turnPhase.selectBattlePower.isActive = true;
    } else if (this.turnPhase.step === 9) {
      this.turnPhase.selectBattlePower.isActive = false;
      this.turnPhase.resolveBattle.isActive = true;
      this.resolveBattle();
      setTimeout(()=> {
        this.turnPhase.resolveBattle.isActive = false;
        this.turnPhase.nextTurnIsReady.isActive = true;
        this.requestUpdate();
      }, 1500);

    }
  }

  canSelectBattlePower(player, power) {
    return player.isActive &&
      this.turnPhase.selectBattlePower.isActive &&
      (player.virtualPower + player.power)  >= power.uses[0].cost;
  }

  selectBattlePower(player, power) {
    console.log('selectBattlePower')
    power.isSelected = true;
    this.shadowRoot.querySelector('#battlePowerSelectionVeil').openVeil();

    this.updatePlayers();
  }

  getBattlePowerSelected() {
    let player = this.getActivePlayer();
    let powerSelected = player.powers.find(power => power.isSelected) || {uses: []};
    return powerSelected;
  }

  cancelBattlePowerSelection() {
    let player = this.getActivePlayer();
    player.powers.find(p => p.isSelected).isSelected = false;
    this.shadowRoot.querySelector('#battlePowerSelectionVeil').closeVeil();
    player = {...player};
  }

  selectPowerEffect(use) {
    let player = this.getActivePlayer();
    use.isSelected = true;

    this.shadowRoot.querySelector('#battlePowerSelectionVeil').closeVeil();
    this.changePriority();
    player = {...player};
    this.startTurnPhase();
  }

  continueWithoutSelectBattlePower() {
    this.changePriority();
    this.setActivePlayer();
    this.startTurnPhase();
  }

  getMatchMessages() {
    let currentTurnPhase = Object.keys(this.turnPhase).find(key => this.turnPhase[key].isActive)

    return currentTurnPhase ? this.turnPhase[currentTurnPhase].description : '';
  }

  get resolutionComplete() {
    return this.resolutionMessage;
  }

  generateResolutionMessage(id1, health1, stolen1, power1, id2, health2, stolen2, power2) {
    this.resolutionMessage = html`
      Player${id1}: ${health1 || '-0'}<i class="icon-heart"></i> steal ${stolen1 || 0}<i class="icon-power"></i><br>
      Player${id2}: ${health2 || '-0'}<i class="icon-heart"></i> steal ${stolen2 || 0}<i class="icon-power"></i><br>
      <span class="power-resolution">${power1 ? `P${id1} uses ${power1}`: ''}</span><br>
      <span class="power-resolution">${power2 ? `P${id2} uses ${power2}`: ''}</span>
    `;
  }

  generateWinnerMessage(id, health) {
    this.winnerMessage = html`
      Player${id}: final  <i class="icon-heart">health</i> = ${health || '0'}</i>
    `;
  }

  toggleMusic() {
    let event = new CustomEvent('orlog-toggle-music', {});
    this.dispatchEvent(event);
  }

  openMenu() {
    this.shadowRoot.querySelector('#menuVeil').openVeil();
  }

  closeMenu() {
    this.shadowRoot.querySelector('#menuVeil').closeVeil();
  }

  reset() {
    location.reload();
  }

  static get styles() {
    return [gameStyles, css``];
  }

  render() {
    return html`
      <link rel="stylesheet" href="../../src/icons.css">
      <orlog-veil id="initialPowerSelectionVeil">
          <h1 slot="title" ?hidden=${!this.previousPhase.A.isActive}>${this.previousPhase.A.description}</h1>
          <h1 slot="title" ?hidden=${!this.previousPhase.B.isActive}>${this.previousPhase.B.description}</h1>

          <div slot="footer">
            <orlog-button type="primary" ?disabled="${this.isDisabledPowerConfirmSelection}" @click=${this.confirmInitialPowers}>
              Confirm
            </orlog-button>
          </div>
          
          <div slot="content">
            <ul>
              ${this.powers.map(power => html`
                <li>
                  <orlog-button type="secondary" selectable ?selected=${power.isSelected} @click=${() => this.togglePower(power)}>
                    ${power.name} <span class="priority">priority ${power.priority}</span>
                  </orlog-button>

                  <div class="power-description">
                    <p>${power.description}</p>
                  </div>
                  <div class="power-cost">
                    <p><span class="cost">${power.uses[0].cost}</span><span class="icon"><i class="icon-power"></i></span> ${power.uses[0].shorDescription}</p>
                    <p><span class="cost">${power.uses[1].cost}</span><span class="icon"><i class="icon-power"></i></span> ${power.uses[1].shorDescription}</p>
                    <p><span class="cost">${power.uses[2].cost}</span><span class="icon"><i class="icon-power"></i></span> ${power.uses[2].shorDescription}</p>
                  </div>
                </li>
              `)}
            </ul>
          </div>
      </orlog-veil>

      <orlog-veil id="battlePowerSelectionVeil">
        <h1 slot="title">Select level or skip</h1>
        <div slot="content" class="content power-battle-effect-selection">
          <h2 class="subtitle">${this.getBattlePowerSelected().name}</h2>
          <div class="priority">
            <p>Priority ${this.getBattlePowerSelected().priority}</p>
          </div>
          <p>${this.getBattlePowerSelected().description}</p>
          <ul>
            ${this.getBattlePowerSelected().uses.map(use => html`
              <li>
                <orlog-button
                      type="secondary"
                      ?disabled=${this.getTotalPower(this.getActivePlayer()) < use.cost}
                      @click=${() => this.selectPowerEffect(use)}
                >${use.cost}<i class="icon-power"></i> ${use.shorDescription}
                </orlog-button></li>
            `)}
          </ul>
        </div>
        <div slot="footer">
          <orlog-button type="primary" selectable @click=${this.cancelBattlePowerSelection}>Cancel</orlog-button>
        </div>
      </orlog-veil>

      <orlog-veil id="winnerVeil">
        <h1 slot="title">Winner: ${this.winnerPlayer}</h1>
        <div slot="content">
          <p>${this.winnerMessage}</p>
        </div>
        <div slot="footer">
          <orlog-button type="primary" selectable @click=${this.reset}>Reset game</orlog-button>
        </div>
      </orlog-veil>

      
      <orlog-how id="menuVeil"></orlog-how>

      <div class="grid-container">
        <div class="player-2 player-hud">
          <div class="health"><i class="icon-heart"></i> ${this.player2.health}</div>
          <div class="power"><i class="icon-power"></i> ${this.player2.power} (${this.player2.virtualPower})</div>
          <div class="player-name">Player 2</div>
          <div class="menu-actions">
            <orlog-button type="primary" selectable id="sound" @click=${this.toggleMusic}>
              <i class="icon-music"></i>
            </orlog-button>
            <orlog-button type="primary" selectable id="menu" @click=${this.openMenu}>
              <i class="icon-help"></i>
            </orlog-button>
          </div>
        </div>
        <div class="player-2 player-powers">
          ${this.player2.powers.map(power => html`
            <div class="dashboard-powers">
              <orlog-button type="secondary" @click="${() => this.selectBattlePower(this.player2, power)}" ?disabled=${!this.canSelectBattlePower(this.player2, power)}>
                ${power.name}
              </orlog-button> 
              ${power.uses.map(use => html`
                <p class="cost ${this.getTotalPower(this.player2) < use.cost ? 'impossible' : ''}"><i class="icon-power"></i>${use.cost}</p>
              `)}
            </div>
          `)}
        </div>

        <div class="player-2 player-dices ${!this.player2.isActive && !this.turnPhase.nextTurnIsReady.isActive ? 'inactive' : ''}">
          ${this.player2.dices.map(dice => html`
            <div class="dice ${this.getDiceClass(this.player2, dice)} resolving-2-${dice.faces.find(face => face.isVisible).resolving}" @click="${() => this.toggleDice(this.player2, dice)}">
              <span class="${dice.faces.find(face => face.isVisible).isSpecial ? 'special' : ''}">
                <i class="icon-${dice.faces.find(face => face.isVisible).type}"></i>
                <span class="dice-amount dice-amount-${dice.faces.find(face => face.isVisible).amount}" ?hidden=${dice.faces.find(face => face.isVisible).amount === 1}>
                  x${dice.faces.find(face => face.isVisible).amount}
                </span>
              </span>
              <div class="dice-special-help">
                <div>
                  ${dice.faces.filter(face => face.isSpecial).map(face => html`
                    <span><i class="icon-${face.type}"></i></span>
                  `)}
                </div>

              </div>
            </div>
          `)}
        </div>

        <div class="central-zone">
          <div class="messages">
            <p ?hidden=${this.previousPhase.zero.isActive || this.turnPhase.resolveBattle.isActive || this.turnPhase.nextTurnIsReady.isActive}>
              Player ${this.getActivePlayer().id}
            </p>
            <p ?hidden=${this.turnPhase.nextTurnIsReady.isActive}>${this.getMatchMessages()}</p>
            <p ?hidden=${!this.turnPhase.nextTurnIsReady.isActive}>${this.resolutionComplete}</p>
          </div>

          <div class="actions">
            <orlog-button type="primary" ?hidden="${!this.previousPhase.zero.isActive}" @click=${this.initGame}>init game</orlog-button>
            <div ?hidden="${!this.player2.isActive}">
              <orlog-button type="primary" ?hidden="${!this.turnPhase.throwDices.isActive}" ?disabled=${!this.canThrowDices(this.player2)} @click=${this.throwDices}>
                Throw
              </orlog-button>
              <orlog-button type="primary" ?hidden="${!this.turnPhase.selectDices.isActive}" @click=${this.continueAfterSelection}>
                Continue
              </orlog-button>
              <orlog-button type="primary" ?hidden="${!this.turnPhase.selectBattlePower.isActive}" @click=${this.continueWithoutSelectBattlePower}>
                Skip
              </orlog-button>
              <orlog-button type="primary" ?hidden="${!this.turnPhase.nextTurnIsReady.isActive}" @click=${this.nextTurn}>
                Next turn
              </orlog-button>
            </div>
            <div ?hidden="${!this.player1.isActive}">
              <orlog-button type="primary" ?hidden="${!this.turnPhase.throwDices.isActive}" ?disabled=${!this.canThrowDices(this.player1)} @click=${this.throwDices}>
                Throw
              </orlog-button>
              <orlog-button type="primary" ?hidden="${!this.turnPhase.selectDices.isActive}" @click=${this.continueAfterSelection}>
                Continue
              </orlog-button>
              <orlog-button type="primary" ?hidden="${!this.turnPhase.selectBattlePower.isActive}" @click=${this.continueWithoutSelectBattlePower}>
                Skip
              </orlog-button>
              <orlog-button type="primary" ?hidden="${!this.turnPhase.nextTurnIsReady.isActive}" @click=${this.nextTurn}>
                Next turn
              </orlog-button>
            </div>
          </div>
        </div>

        <div class="player-1 player-dices ${!this.player1.isActive && !this.turnPhase.nextTurnIsReady.isActive ? 'inactive' : ''}">
          ${this.player1.dices.map(dice => html`
            <div class="dice ${this.getDiceClass(this.player1, dice)} resolving-1-${dice.faces.find(face => face.isVisible).resolving}" @click="${() => this.toggleDice(this.player1, dice)}">
              <span class="${dice.faces.find(face => face.isVisible).isSpecial ? 'special' : ''}">
                <i class="icon-${dice.faces.find(face => face.isVisible).type}"></i>
                <span class="dice-amount dice-amount-${dice.faces.find(face => face.isVisible).amount}" ?hidden=${dice.faces.find(face => face.isVisible).amount === 1}>
                  x${dice.faces.find(face => face.isVisible).amount}
                </span>
              </span>
              <div class="dice-special-help">
                <div>
                  ${dice.faces.filter(face => face.isSpecial).map(face => html`
                    <span><i class="icon-${face.type}"></i></span>
                  `)}
                <div>
              </div>
            </div>
          `)}
        </div>

        <div class="player-1 player-powers">
          ${this.player1.powers.map(power => html`
            <div class="dashboard-powers">
              <orlog-button type="secondary" @click="${() => this.selectBattlePower(this.player1, power)}" ?disabled=${!this.canSelectBattlePower(this.player1, power)}>
                ${power.name}
              </orlog-button> 
              ${power.uses.map(use => html`
                <p class="cost ${this.getTotalPower(this.player1) < use.cost ? 'impossible' : ''}"><i class="icon-power"></i>${use.cost}</p>
              `)}
            </div>
          `)}
        </div>

        <div class="player-1 player-hud">
          <div class="health"><i class="icon-heart"></i> ${this.player1.health}</div>
          <div class="power"><i class="icon-power"></i>  ${this.player1.power} (${this.player1.virtualPower})</div>
          <div class="player-name">Player 1</div>
        </div>

      </div>
    `;
  }


}

customElements.define('orlog-game', OrlogGame);
