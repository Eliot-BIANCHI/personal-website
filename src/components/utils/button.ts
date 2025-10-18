import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("base-button")
export class BaseButton extends LitElement {
  @property({ type: String }) text: string = "";

  render() {
    return html`<button></button>`;
  }

  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    "base-button": BaseButton;
  }
}
