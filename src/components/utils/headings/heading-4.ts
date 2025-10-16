import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("heading-4")
export class Heading4 extends LitElement {
  @property({ type: String }) name: string = "";

  render() {
    return html`<h2 class="heading-4">${this.name}</h2>`;
  }

  static styles = css`
    .heading-4 {
      font-size: var(--font-scale-ld);
      font-weight: 500;
      margin-block: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "heading-4": Heading4;
  }
}
