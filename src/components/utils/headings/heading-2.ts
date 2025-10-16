import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("heading-2")
export class Heading2 extends LitElement {
  @property({ type: String }) name: string = "";

  render() {
    return html`<h2 class="heading-2">${this.name}</h2>`;
  }

  static styles = css`
    .heading-2 {
      font-size: var(--font-scale-lg);
      font-weight: 500;
      margin-block: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "heading-2": Heading2;
  }
}
