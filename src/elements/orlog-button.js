import { LitElement, html, css } from 'lit-element';

export class OrlogButton extends LitElement {
  static get properties() {
    return {
      type: { type: String },
      selectable: { type: Boolean },
      selected: { type: Boolean },
      disabled: {type: Boolean, attribute: 'disabled'}
    };
  }

  constructor() {
    super();
    this.disabled = false;
    this.type = 'primary';
  }

  _getClass() {
    return `${this.type} ${this.selectable ? 'selectable' : ''} ${this.selected ? 'selected' : ''}`;
  }

  static get styles() {
    return css`
      button {
        width: inherit;
        font-family: var(--theme-primary-font-family);
        font-weight: 400;
        font-size: var(--orlog-button-font-size, 1rem);
        outline: none;
        border: 1px solid;
        border-width: 1px;
        
        padding: var(--orlog-button-padding, .5rem);
        min-height: var(--orlog-button-min-height, auto);
        min-width: var(--orlog-button-min-width, auto);
        background-image: url('./src/images/dirty-black.png');
        background-size: cover;
        transition: background-color .3s ease-out;
      }

      button.primary {
        background-color: var(--theme-color-turqoise);
        border-image-slice: 1;
        border-image-source: linear-gradient(to bottom, var(--theme-color-turqoise-dark), var(--theme-color-turqoise));
        box-shadow: inset 0px 0px 4px 1px var(--theme-color-turqoise-dark);
      }

      button.primary:hover {
        background-color: var(--theme-color-turqoise-light);
      }

      button.primary[disabled], button.secondary[disabled] {
        opacity: .4;
      }

      button.secondary {
        color: #000;
        background-color: var(--theme-color-yellow);
        border-image-slice: 1;
        border-image-source: linear-gradient(to bottom, var(--theme-color-yellow-dark), var(--theme-color-yellow));
        box-shadow: inset 0px 0px 4px 1px var(--theme-color-yellow-dark);
      }

      button.secondary:hover {
        background-color: var(--theme-color-yellow-dark);
      }

      button.selectable {
        color: #fff;
        background-color: rgb(0, 0, 0, .7);
        background-image: url('./src/images/dirty-white.png');
        background-size: cover;
      }

      button.selectable:hover {
        background-color: var(--theme-color-silver);
      }

      button.secondary.selectable.selected {
        color: #000;
        background-color: var(--theme-color-yellow);
        background-image: url('./src/images/dirty-black.png');
      }

      :host([disabled]), button[disabled] {
        pointer-events: none;
      }

    `;
  }

  render() {
    return html`

      <button class=${this._getClass()} ?disabled=${this.disabled}>
        <slot></slot>
      </button>
    `;
  }

}

customElements.define('orlog-button', OrlogButton);
