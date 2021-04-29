import { LitElement, html, css } from 'lit-element';
import { outlet } from "lit-element-router";

export class OrlogRouter extends outlet(LitElement) {


  static get styles() {
    return css`

    `;
  }

  render() {
    return html`
      <slot></slot>
    `;
  }


}

customElements.define('orlog-router', OrlogRouter);
