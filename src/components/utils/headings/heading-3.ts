import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("heading-3")
export class Heading3 extends LitElement {
  @property({ type: String }) name: string = "";

  render() {
    return html`<h2 class="heading-3">${this.name}</h2>`;
  }

  static styles = css`
    .heading-3 {
      font-size: var(--font-scale-md);
      font-weight: 500;
      margin-block: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "heading-3": Heading3;
  }
}
