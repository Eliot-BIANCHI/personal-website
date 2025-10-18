import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";

import ROUTES_JSON from "../jsons/routes.json";
import { startAssistant, stopAssistant } from "../assistant/assistant";

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

@customElement("app-navbar")
export class AppNavbar extends LitElement {
  @state() activePath: string = location.hash.slice(1) || "/";
  @state() darkTheme: boolean = prefersDarkScheme.matches;
  @state() assistantOn: boolean = prefersDarkScheme.matches;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("hashchange", this._onHashChange);
  }

  disconnectedCallback() {
    window.removeEventListener("hashchange", this._onHashChange);
    super.disconnectedCallback();
  }

  render() {
    return html`
      <nav class="app-navbar">
        <ul class="app-navbar__links">
          ${ROUTES_JSON.navbar.map(
            (route) => html`
              <li class="app-navbar__link">
                <a
                  href="${route.path}"
                  @click=${(event: Event) =>
                    this._handleClick(event, route.path)}
                  class=${this.activePath === route.path ? "active" : ""}
                >
                  ${route.name.fr}
                </a>
              </li>
            `,
          )}
        </ul>

        <div class="app-navbar__utils">
          <button
            class="app-navbar__change-theme ${this.darkTheme ? "dark" : ""}"
            @click=${this._toggleTheme}
          ></button>
          <button
            class="app-navbar__toggle-assistant ${this.assistantOn ? "on" : ""}"
            @click=${this._toggleAssistant}
          ></button>
        </div>
      </nav>
    `;
  }

  private _handleClick(event: Event, path: string) {
    event.preventDefault();
    const app = document.querySelector("my-app");
    if (app === null) return;
    app.navigateTo(path);
  }

  private _toggleTheme() {
    this.darkTheme = !this.darkTheme;
    this.darkTheme
      ? (document.documentElement.dataset.theme = "dark")
      : (document.documentElement.dataset.theme = "light");
  }

  public changeTheme(darkMode: boolean) {
    if ((this.darkTheme && darkMode) || (!this.darkTheme && !darkMode)) return;
    this._toggleTheme();
  }

  private _toggleAssistant() {
    this.assistantOn = !this.assistantOn;
    this.assistantOn ? startAssistant() : stopAssistant();
  }

  private _onHashChange = () => {
    this.activePath = location.hash.slice(1) || "/";
  };

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

    .app-navbar__utils {
      display: flex;
      align-items: center;
      gap: var(--gap-xl);
    }

    .app-navbar__change-theme {
      --padding: 4px;
      --width: 24px;
      background-color: var(--moon-color);
      border: none;
      border-radius: 99px;
      box-sizing: border-box;
      cursor: pointer;
      height: calc(var(--width) + var(--padding) * 2);
      outline: 2px solid transparent;
      outline-offset: var(--outline-offset);
      position: relative;
      transition: background-color var(--transition-duration)
        var(--transition-timing-function);
      width: calc(var(--width) * 2 + var(--padding) * 2);

      &:hover {
        background-color: var(--moon-color-strong);
      }

      &:focus-visible {
        outline-color: var(--app-color);
      }

      &::before {
        aspect-ratio: 1 / 1;
        background-color: #fff;
        background-image: url("/src/assets/icons/moon.svg");
        border-radius: 99px;
        background-repeat: no-repeat;
        background-position: center;
        content: "";
        position: absolute;
        top: var(--padding);
        right: var(--padding);
        transition: translate var(--transition-duration)
          var(--transition-timing-function);
        width: var(--width);
        z-index: 1;
      }

      &.dark {
        background-color: var(--sun-color);

        &:hover {
          background-color: var(--sun-color-strong);
        }

        &::before {
          background-image: url("/src/assets/icons/sun.svg");
          translate: calc(-100%);
        }
      }
    }

    .app-navbar__toggle-assistant {
      aspect-ratio: 1 / 1;
      background-color: var(--button-color);
      border: none;
      border-radius: 99px;
      cursor: pointer;
      outline: 2px solid transparent;
      outline-offset: var(--outline-offset);
      position: relative;
      transition:
        background-color var(--transition-duration)
          var(--transition-timing-function),
        rotate 500ms var(--transition-timing-function);
      width: 40px;

      &:hover {
        background-color: var(--button-color-strong);
      }

      &:focus-visible {
        outline-color: var(--app-color);
      }

      &.on {
        background-color: var(--app-color);
        rotate: 270deg;

        &:hover {
          background-color: var(--app-color-strong);
        }
      }

      &::before {
        aspect-ratio: 1 / 1;
        background-color: #fff;
        border-radius: 9px;
        content: "";
        display: inline-block;
        position: absolute;
        top: 50%;
        right: 5px;
        transform: translateY(-50%);
        width: 10px;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "app-navbar": AppNavbar;
  }
}
