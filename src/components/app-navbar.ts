import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("app-navbar")
export class AppNavbar extends LitElement {
  render() {
    return html`
      <nav class="app-navbar">
        <ul class="app-navbar__links">
          <li class="app-navbar__link">Accueil</li>
          <li class="app-navbar__link">Cours</li>
        </ul>
      </nav>
    `;
  }

  static styles = css`
    .app-navbar {
      background-color: var(--primary-background-color);
      box-shadow:
        var(--shadow-color) 0px 4px 6px -1px,
        var(--shadow-color-strong) 0px 2px 4px -1px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: var(--font-scale-md);
      height: var(--app-navbar-height);
      padding: 10px 20px;
      transition-property: background-color, box-shadow;
      transition-duration: var(--transition-duration);
      transition-timing-function: var(--transition-timing-function);
    }

    .app-navbar__links {
      display: flex;
      gap: var(--gap-lg);
      list-style: none;
      margin-block: 0;
      padding-left: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "app-navbar": AppNavbar;
  }
}
