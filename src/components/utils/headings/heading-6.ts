import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("heading-6")
export class Heading6 extends LitElement {
  @property({ type: String }) name: string = "";

  render() {
    return html`<h2 class="heading-6">${this.name}</h2>`;
  }

  static styles = css`
    .heading-6 {
      font-size: var(--font-scale-md);
      font-weight: 500;
      margin-block: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "heading-6": Heading6;
  }
}
