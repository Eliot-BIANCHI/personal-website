import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

import ROUTES_JSON from "../jsons/routes.json";

@customElement("app-navbar")
export class AppNavbar extends LitElement {
  @property({ type: String }) activePath: string = "/";

  render() {
    return html`
      <nav class="app-navbar">
        <ul class="app-navbar__links">
          ${ROUTES_JSON.navbar.map(
            (route) => html`
              <li class="app-navbar__link">
                <a
                  href="${route.path}"
                  @click="${(event: Event) =>
                    this.handleClick(event, route.path)}"
                  class=${this.activePath === route.path ? "active" : ""}
                >
                  ${route.name.fr}
                </a>
              </li>
            `,
          )}
        </ul>
      </nav>
    `;
  }

  handleClick(event: Event, path: string) {
    event.preventDefault();
    const app = document.querySelector("my-app");
    if (app === null) return;
    app.navigateTo(path);
    this.activePath = path;
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

    .app-navbar__link > a {
      border-radius: var(--border-radius-sm);
      color: var(--text-color);
      font-weight: 500;
      outline: 2px solid transparent;
      outline-offset: var(--outline-offset);
      padding: 5px 10px;
      text-decoration: none;
      transition: color var(--transition-duration)
        var(--transition-timing-function);

      &:focus-visible {
        outline-color: var(--app-color);
      }

      &.active {
        color: var(--app-color);
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "app-navbar": AppNavbar;
  }
}
