import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("shape-diagonal")
export class ShapeDiagonal extends LitElement {
  @property({ type: Boolean }) invert: boolean = false;

  render() {
    return html`<div class="shape-diagonal ${this.invert ? "invert" : ""}">
      <slot></slot>
    </div>`;
  }

  static styles = css`
    .shape-diagonal {
      --background-color: var(--app-color);
      --skew-angle: -5deg;
      isolation: isolate;
      position: relative;

      &.invert {
        --background-color: var(--app-color-2);
        --skew-angle: 5deg;
      }

      &::after {
        background-color: var(--background-color);
        content: "";
        position: absolute;
        inset: 0;
        transform: skewY(var(--skew-angle));
        z-index: -1;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "shape-diagonal": ShapeDiagonal;
  }
}
