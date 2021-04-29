import { css } from 'lit-element';

export const gameStyles = css`
:host {
  background-color: #000;
  height: 100vh;
  display: block;

  font-family: var(--theme-secondary-font-family);
  font-size: .9rem;

  background-color: var(--theme-color-night-blue);
  background-image: url('./src/images/dirty-white.png');
  background-size: cover;
}

orlog-button .priority {
  font-size: .8rem;
  font-family: var(--theme-secondary-font-family);
}

.grid-container {
  position: relative;
  display: block;
  min-height: 100vh;
  width: 100%;
}


orlog-veil .subtitle {
  padding: .5rem;
  margin: 1rem;
  background-color: rgb(255 255 255 / 90%);
  text-align: center;
  color: black;
  font-size: 1.2rem;
  font-family: var(--theme-primary-font-family);
}

orlog-veil p {
  margin: .2rem 0;
}

orlog-veil ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

orlog-veil ul li {
  width: 100%;
  margin-top: 1rem;
}

@media (min-width: 490px) {
  orlog-veil ul li {
    width: 48%;
  }
}

orlog-veil#initialPowerSelectionVeil ul orlog-button {
  width: 100%;
  margin-top: .8rem;
}

orlog-veil#initialPowerSelectionVeil ul .power-description {
  display: inline-block;
  width: 45%;
  vertical-align: top;
}

orlog-veil#initialPowerSelectionVeil ul .power-cost {
  display: inline-block;
  width: calc(55% - .5rem);
}

orlog-veil#initialPowerSelectionVeil ul .power-cost .cost {
  color: var(--theme-color-yellow);
}

orlog-veil p {
  color: #fff;
}

.menu-actions {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  --orlog-button-padding: .1rem;
  --orlog-button-min-height: 1rem;
  align-items: flex-start;
}

.player-name {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #c3c3c3;
}

.menu-actions #menu {
  margin-left: 1rem;
}

.health, .power {
  color: #fff;
  font-size: 1.1rem;
  text-shadow: 0 0 .5rem #000;
  font-family: var(--theme-primary-font-family);
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-heart {
  color: var(--theme-color-red);
}

.icon-power {
  color: var(--theme-color-yellow);
}

orlog-button[type="secondary"] .icon-power {
  color: #000;
}

.player-1 .health {
  background: radial-gradient(at bottom, var(--theme-color-red),#ff000000 70%);
}

.player-2 .health {
  background: radial-gradient(at top, var(--theme-color-red),#ff000000 70%);
}

.player-1 .power {
  background: radial-gradient(at bottom, #a89c00,#ff000000 70%);
}

.player-2 .power {
  background: radial-gradient(at top, #a89c00,#ff000000 70%);
}

.dice {
  position: relative;
  font-size: 2.1rem;
  background-color: rgb(255, 255, 255, 0.2);
  color: white;
  display: flex;
  align-items: center;
  align-content: stretch;
  justify-content: space-evenly;
  flex-direction: column;
}

.dice-amount {
  position: absolute;
  top: 0;
  right: 0;
  color: var(--theme-color-turqoise-light);
  font-size: 1.1rem;
  text-shadow: -1px 0px 2px black;
  background-color: #00000078;
  border-radius: 0 0 0 4px;
}

.dice-amount-0 {
  position: absolute;
  top: 0;
  right: 0;
  color: #f78317;
  font-size: 1.1rem;
  text-shadow: -1px 0px 2px #000;
  background-color: #00000078;
  border-radius: 0 0 0 4px;
}

i {
  font-family: "icons";
}

.dice-special-help {
  font-size: 1rem;
  padding: 1px;
  margin: 0;
  opacity: .5;
}

.dice-special-help > div {
  border-top: 1px solid var(--theme-color-yellow);
  border-radius: 1rem;
}


@keyframes dice-selectable-animation {
  0% { background-color: rgb(255, 255, 255, 0.3)}
  100% { background-color: rgb(255, 255, 255, 0.6)}
}

.dice-selectable {
  animation-duration: .8s;
  animation-name: dice-selectable-animation;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: ease-in;
}

.dice-selected {
  box-shadow: #fff 0px 0px 4px 4px inset;
}

.special {
  color: var(--theme-color-yellow);
  border: 2px dashed var(--theme-color-yellow);
}

.resolving-1-axe-attack, .resolving-2-helmet-defense {
  background-color: #0D47A1;
}

.resolving-1-arrow-attack, .resolving-2-shield-defense {
  background-color: #1E88E5;
}

.resolving-2-axe-attack, .resolving-1-helmet-defense {
  background-color: #4A148C;
}

.resolving-2-arrow-attack, .resolving-1-shield-defense {
  background-color: #8E24AA;
}

.resolving-1-hand-attack, .resolving-2-hand-attack {
  background-color: #455A64;
}

.player-hud {
  color: white;
  text-align: center;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 5vh;
  gap: 0px 0px;
  grid-template-areas:
    ". . . .";
  background-color: #0000005e;
}

.player-dices {
  transition: opacity .3s ease-out;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 15vh;
  gap: 2px;
  grid-template-areas:
    ". . . . . .";
}

.inactive {
  opacity: .5;
}

.central-zone {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 16vh;
  gap: 0px 0px;
  grid-template-areas:
    ". . . . . .";
}

.messages {
  grid-area: 1 / 1 / 2 / 5;
  text-align: center;
  background-color: #f7f4f0;
  box-shadow: inset 1px 1px 4rem -1rem black;
  padding: .5rem;
  background-image: url('./src/images/dirty-black.png');
  background-size: cover;
}

.messages p {
  margin: 0;
}
.messages p:first-child{
  font-family: var(--theme-primary-font-family);
  margin: 0 3rem 0.5rem;
  padding: .2rem;
  font-size: 1rem;
  border-bottom: 1px solid rgb(0 0 0 / 30%);
}

.messages .power-resolution {
  font-size: .7rem;
}

.actions {
  grid-area: 1 / 5 / 2 / 7;
  display: flex;
  align-items: center;
  justify-content: center;
}

.player-powers {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 22vh;
  gap: 0px 0px;
  grid-template-areas:
    ". . .";
}

.dashboard-powers {
  padding: .5rem .25rem;
}
.player-powers button {
  width: 100%;
  margin: 0;
  font-size: .8rem;
  min-height: 2.5rem;
  padding: .2rem;
}

.player-powers .cost {
  padding: 0;
  margin: .2rem 0 0 0;;
  font-size: .8rem;
  text-align: center;
  color: white;
}

.player-powers .cost.impossible {
  opacity: .4;
}

orlog-veil .power-battle-effect-selection p {
  text-align: center;
  margin: .5rem 0;
}

orlog-veil .power-battle-effect-selection .priority {
  padding: 0 20% 0 20%;
}

orlog-veil .power-battle-effect-selection .priority p {
  border-bottom: 1px solid #e6e6e6;
  margin-top: 0;
  margin-bottom: 1rem;
}

orlog-veil .power-battle-effect-selection ul {
  text-align: center;
  margin: .5rem 0;
}
orlog-veil .power-battle-effect-selection ul li {
  margin-top: 1rem;
}
orlog-veil .power-battle-effect-selection ul button {
  width: 70%;
}

orlog-veil orlog-button[type="primary"] {
  --orlog-button-min-width: 10rem;
}

.dashboard-powers orlog-button {
  width: 100%;
  font-size: .7rem;
  --orlog-button-padding: .2rem;
  --orlog-button-min-height: 3rem;
}

#battlePowerSelectionVeil ul li {
  width: 71%;
  --orlog-button-min-width: 100%;
}

#winnerVeil p {
  text-align: center;
}

@media (min-width: 370px) {
  .dice {
    font-size: 2.5rem;
  }
  .dice-special-help {
    font-size: 1.2rem;
  }
  
  .messages {
    font-size: 1rem;
  }
  .messages .power-resolution {
    font-size: .9rem;
  }

  .player-powers .cost {
    font-size: 1rem;
  }

  .player-hud {
    font-size: 1.1rem;
  }
  .health, .power {
    font-size: 1.2rem;
  }

  .dice-amount, .dice-amount-0 {
    font-size: 1.2rem;
  }
}

`;