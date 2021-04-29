import { LitElement, html, css } from 'lit-element';

export class OrlogVeil extends LitElement {
  static get properties() {
    return {
      _isOpen: { type: Boolean }
    };
  }

  constructor() {
    super();
    this._isOpen = false;
  }

  openVeil() {
    this._isOpen = true;
  }

  closeVeil() {
    this._isOpen = false;
  }

  static get styles() {
    return css`
      :host {
        position: relative;
        display: block;
      }

      .veil {
        position: absolute;
        z-index: 9999;
        background-color: var(--theme-color-black);
        min-height: 100vh;
        width: 100%;
        box-sizing: border-box;
        max-width: 720px;
      }

      .title-fixed [name="title"] {
        color: var(--theme-color-turqoise-light);
        margin: 0;
        font-size: 1.5rem;
        border-bottom: 2px solid var(--theme-color-turqoise-light);
        padding-bottom: .5rem .1rem;
        font-family: var(--theme-primary-font-family);
      }

      .title-fixed, .footer-fixed {
        position: fixed;
        background-color: var(--theme-color-black);
        width: 100%;
        max-width: 720px;
        text-align: center;
        top: 0;
        min-height: 2.2rem;
      }

      .footer-fixed {
        top: calc(100% - 3.5rem);
        min-height: 3.5rem;
        background-color: var(--theme-color-night-blue);
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .title-fixed > div, .footer-fixed > div {
        display: block;
        padding: .5rem;
      }

      .content {
        padding: .5rem;
        margin: 4rem 0 4rem;
      }

      ::slotted(h1), ::slotted(h2) {
        color: var(--theme-color-turqoise-light);
        margin: 0;
        font-size: 1.4rem;
        border-bottom: 2px solid var(--theme-color-turqoise-light);
        font-family: var(--theme-primary-font-family);
        padding: .5rem .1rem;
      }

      ::slotted(p) {
        color: #fff;
      }

    `;
  }

  render() {
    return html`

      <div class="veil" ?hidden=${!this._isOpen}>
        <div class="title-fixed">
          <div>
            <slot name="title"></slot>
          </div>
        </div>
          
        <div class="content">
          <slot name="content"></slot>
        </div>

        <div class="footer-fixed">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }

}

customElements.define('orlog-veil', OrlogVeil);
