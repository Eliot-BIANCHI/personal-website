import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

import "./components/app-navbar";

@customElement("my-app")
export class MyApp extends LitElement {
  render() {
    return html`
      <app-navbar></app-navbar>
      <div id="app"></div>
    `;
  }

  static styles = css`
    #app {
      color: var(--text-color);
      font-size: var(--font-scale-md);
      padding: 25px;
      transition: color var(--transition-duration)
        var(--transition-timing-function);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "my-app": MyApp;
  }
}
