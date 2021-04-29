/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */


import { LitElement, html, css } from 'lit-element';
import { router } from 'lit-element-router';

import('./elements/orlog-router.js')
import('./pages/orlog-game.js')
import('./pages/orlog-home.js')


export class OrlogMain extends router(LitElement) {
  static get properties() {
    return {
      
    };
  }

  constructor() {
    super();
    this.route = '';
    this.addEventListener('click', this.playSoundButton);
  }

  static get routes() {
    return [{
      name: 'game',
      pattern: 'game'
    },{
      name: 'home',
      pattern: ''
    }];
  }

  toggleMusic() {
    let audio = this.shadowRoot.querySelector('#music');
    audio.paused ? audio.play() : audio.pause();
  }

  router(route, params, query, data) {
    this.route = route;
  }

  static get styles() {
    return css`
      :host {
        --theme-color-turqoise-lighter: #bcfff4;
        --theme-color-turqoise-light: #25ddbf;
        --theme-color-turqoise: #40c1a6;
        --theme-color-turqoise-dark: rgb(6, 127, 114);
        --theme-color-yellow: #faeea1;
        --theme-color-yellow-dark: #f0c066;
        --theme-color-red: #ff4040;
        --theme-color-black: #000;
        --theme-color-gray-light: #BDBDBD;
        --theme-color-silver: #474747;
        --theme-color-night-blue: rgb(7, 39, 45);

        --theme-primary-font-family: 'PT Serif', serif;
        --theme-secondary-font-family: 'Noto Sans', sans-serif;
      }

    `;
  }
    

  render() {
    return html`
      <!-- <orlog-link href="/game">game</orlog-link> -->
      <audio loop id="music">
        <source src="./src/audio/Glacier - Chris Haugen.mp3" type="audio/mp3">
      </audio>


      <orlog-router active-route=${this.route}>
        <div route="home">
          <orlog-home @orlog-toggle-music=${this.toggleMusic}></orlog-home>
        </div>
        <div route="game">
          <orlog-game @orlog-toggle-music=${this.toggleMusic}></orlog-game>
        </div>
      </orlog-router>
    `;
  }


}

customElements.define('orlog-main', OrlogMain);
