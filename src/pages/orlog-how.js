import { LitElement, html, css } from 'lit-element';
import '../elements/orlog-button.js';
import '../elements/orlog-veil.js';

export class OrlogHow extends LitElement {
  static get properties() {
    return {
    };
  }

  constructor() {
    super();
  }

  openVeil() {
    this.shadowRoot.querySelector('#modal').openVeil();
  }

  closeVeil() {
    this.shadowRoot.querySelector('#modal').closeVeil();
  }

  static get styles() {
    return css`
      h3 {
        margin: 1rem 0 .5rem 0;
        font-family: var(--theme-primary-font-family);
        text-align: center;
        font-weight: 400;
        font-size: 1.2rem;
        color: var(--theme-color-turqoise);
        text-transform: uppercase;
      }

      p {
        color: #fff;
        text-align: center;
        margin: .5rem 0;
        padding: 0 1rem;
      }

      .about {
        margin-top: 4rem;
      }

      .dices-grid {
        color: #fff;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-column-gap: .5rem;
        grid-row-gap: .5rem;
        margin-bottom: 1.5rem;
      }

      .icon-heart {
        color: var(--theme-color-red);
      }

      .icon-power {
        color: var(--theme-color-yellow);
      }

      .special {
        color: var(--theme-color-yellow);
        border: 2px dashed var(--theme-color-yellow);
        padding: 0 2px;
      }

      orlog-button {
        --orlog-button-min-width: 10rem;
      }

    `;
  }

  render() {
    return html`
      <link rel="stylesheet" href="../../src/icons.css">
      <orlog-veil id="modal">
        <h2 slot="title">How to play</h2>
        <div slot="content">
          <p>Orlog is a dice game from Assassin's Creed Valhalla in which two players attempt to reduce their opponent's "health" <i class="icon-heart"></i> to zero through various dice rolls and bonus effects.</p>
          <h3>Each dice has 6 faces</h3>
          <div class="dices-grid">
            <div><i class="icon-axe"></i> Deals 1 damage</div>
            <div><i class="icon-helmet"></i> Block 1 <i class="icon-axe"></i></div>
            <div><i class="icon-arrow"></i> Deals 1 damage</div>
            <div><i class="icon-shield"></i> Block 1 <i class="icon-arrow"></i></div>
            <div><i class="icon-hand"></i> Steal 1 <i class="icon-power"></i> rival</div>
            <div><i>Each dice has 2</i> <i class="icon-axe"></i></div>
          </div>
          <p>On each dice, two of its faces can add a power point <i class="icon-power"></i> if is <span class="special">special</span>.</p>
          <p>For each player: <i class="icon-axe"></i> attack first, then <i class="icon-arrow"></i> attack and finally <i class="icon-hand"></i> steal.</p>
          <h3>Initial phase</h3>
          <p>Each player chooses three God favors that they can use during the game using the accumulated power points <i class="icon-power"></i>.
          <br>
          Every God favor has a priority. Priority 1 will be resolved first.
          </p>

          <h3>Roll phase</h3>
          <p>Starting randomly, the two players take turns rolling their individual sets of dice. After each roll, players chooses which dice to keep, if any, and which to reroll. A player may reroll some or all of the dice up to two times on this phase.</p>
          <h3>God favor phase</h3>
          <p>Each player can choose to cast a blessing if has enough power <i class="icon-power"></i>, or may skip it entirely.</p>
          <h3>Resolution phase</h3>
          <p>Each players' set of dice faces are compared with damage either blocked or dealt, and favor gained or stolen. At the end of the resolution, the related dice faces are color-coded for easy recognition of what happened. The game is over when a player's health reaches zero. </p>

        </div>
        <div slot="footer">
          <orlog-button type="primary" @click=${this.closeVeil}>
            Back
          </orlog-button>
        </div>
      </orlog-veil>

    `;
  }

}

customElements.define('orlog-how', OrlogHow);
