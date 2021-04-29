import { LitElement, html, css } from 'lit-element';
import { navigator } from "lit-element-router";
import '../elements/orlog-button.js';
import '../elements/orlog-veil.js';

export class OrlogHome extends navigator(LitElement) {
  static get properties() {
    return {
      _isMusicUsed: {type: Boolean}
    };
  }

  constructor() {
    super();
    this._isMusicUsed = false;
  }

  _handleLinkSourceCode() {
    window.open('https://github.com/alexarroyoduque/orlog', '_blank');
  }

  goToGame() {
    if (!this._isMusicUsed) {
      this.toggleMusic();
    }
    this.navigate('/game');
  }

  toggleMusic() {
    this._isMusicUsed = true;
    let event = new CustomEvent('orlog-toggle-music', {});
    this.dispatchEvent(event);
  }

  _openVeil() {
    this.shadowRoot.querySelector('#modal').openVeil();
  }

  _closeVeil() {
    this.shadowRoot.querySelector('#modal').closeVeil();
  }

  static get styles() {
    return css`
      :host {
        color: #fff;
        height: 100vh;
        display: block;

        font-family: var(--theme-secondary-font-family);
        /* https://www.pexels.com/es-es/foto/foto-de-la-aurora-boreal-en-la-noche-40023/ */
        background-image: url('../src/images/background.jpg');
        background-size: cover;
      }

      section {
        position: relative;
        display: flex;
        background-color: rgba(0, 0, 0, 0.3);
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
      }

      orlog-button {
        width: 12rem;
        margin: .5rem 0;
        --orlog-button-font-size: 1.2rem;
      }

      orlog-button.main {
        --orlog-button-padding: 1rem;
      }

      orlog-button#sound {
        --orlog-button-padding: .5rem;

        position: absolute;
        margin: 0;
        width: 3rem;
        z-index: 99;
        right: 0;
        top: 0;
      }

      h1.main-title {
        margin: 1rem 0;
        letter-spacing: .2rem;
        font-family: var(--theme-primary-font-family);
        font-size: 3.5rem;
        color: var(--theme-color-turqoise);
        text-shadow: 0px 0px .4rem black;
      }

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
        text-align: center;
        margin: .5rem 0;
        padding: 0 1rem;
      }

      a {
        color: var(--theme-color-turqoise);
      }

      .about {
        margin-top: 4rem;
      }

      .dices-grid {
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

      .snow {
        z-index: 99;
      }

      .snow span {
        pointer-events: none;
        position: absolute;
        background-color: white;
        border-radius: 1rem;
        width: .5rem;
        height: .5rem;
        display: block;
        color: black;
        top: -1.5rem;
        opacity: .8;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
        overflow: hidden;
      }

      .snow span:nth-child(1) {
        animation-name: animation-snow-1;
        animation-duration: 8s;
      }

      .snow span:nth-child(2) {
        width: .7rem;
        height: .7rem;
        animation-delay: 4s;
        animation-name: animation-snow-2;
        animation-duration: 9s;
      }

      .snow span:nth-child(3) {
        width: .6rem;
        height: .6rem;
        animation-delay: 6s;
        animation-name: animation-snow-3;
        animation-duration: 12s;
      }

      .snow span:nth-child(4) {
        width: .4rem;
        height: .4rem;
        animation-delay: 2s;
        animation-name: animation-snow-4;
        animation-duration: 14s;
      }

      .snow span:nth-child(5) {
        width: .3rem;
        height: .3rem;
        animation-delay: 8s;
        animation-name: animation-snow-5;
        animation-duration: 10s;
      }

      .snow span:nth-child(6) {
        animation-delay: 7s;
        animation-name: animation-snow-6;
        animation-duration: 14s;
      }

      .snow span:nth-child(7) {
        width: .7rem;
        height: .7rem;
        animation-delay: 1s;
        animation-name: animation-snow-7;
        animation-duration: 13s;
      }

      @keyframes animation-snow-1 {
        0% { top: -1rem; left: 5%;}
        40% {left: 10%;}
        95% {opacity: .8;}
        100% { top: calc(100vh - 1rem); left: 20%; opacity: 0;}
      }

      @keyframes animation-snow-2 {
        0% { top: -1rem; left: 20%;}
        50% {left: 15%;}
        95% {opacity: .8;}
        100% { top: calc(100vh - 1rem); left: 40%; opacity: 0;}
      }

      @keyframes animation-snow-3 {
        0% { top: -1rem; left: 40%;}
        30% {left: 35%;}
        95% {opacity: .8;}
        100% { top: calc(100vh - 1rem); left: 50%; opacity: 0;}
      }

      @keyframes animation-snow-4 {
        0% { top: -1rem; left: 70%;}
        40% {left: 60%;}
        95% {opacity: .8;}
        100% { top: calc(100vh - 1rem); left: 80%; opacity: 0;}
      }

      @keyframes animation-snow-5 {
        0% { top: -1rem; left: 20%;}
        60% {left: 25%;}
        95% {opacity: .8;}
        100% { top: calc(100vh - 1rem); left:5%; opacity: 0;}
      }

      @keyframes animation-snow-6 {
        0% { top: -1rem; left: 50%;}
        50% {left: 40%;}
        95% {opacity: .8;}
        100% { top: calc(100vh - 1rem); left: 55%; opacity: 0;}
      }

      @keyframes animation-snow-7 {
        0% { top: -1rem; left: 90%;}
        50% {left: 85%;}
        95% {opacity: .8;}
        100% { top: calc(100vh - 1rem); left: 95%; opacity: 0;}
      }

    `;
  }

  render() {
    return html`
      <link rel="stylesheet" href="../../src/icons.css">

      <orlog-how id="modal"></orlog-how>

      <section>
        <span class="snow">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <orlog-button type="primary" selectable id="sound" @click=${this.toggleMusic}>
          <i class="icon-music"></i>
        </orlog-button>
        <h1 class="main-title">ORLOG</h1>

        <orlog-button class="main" type="primary" selectable @click=${this.goToGame}>Play</orlog-button>
        <orlog-button class="main" type="primary" selectable @click=${this._openVeil}>How to play</orlog-button>

        <p class="about">Original concept by Ubisoft© in Assassin's Creed Valhalla®</p>
        <p>Adapted by <a href="https://twitter.com/AlexArroyoDuque" target="_blank">@AlexArroyoDuque</a></p>
        <orlog-button class="main" type="secondary" selectable @click=${this._handleLinkSourceCode}>Source code</orlog-button>
        <p>Powered by lit-html</p>
      </section>

    `;
  }

}

customElements.define('orlog-home', OrlogHome);
