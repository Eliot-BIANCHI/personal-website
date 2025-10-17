import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

import {
  ROUTES,
  NOT_FOUND_ROUTE,
  type Route,
  type ViewModule,
} from "./navigation/routes";

import "./components/app-navbar";

@customElement("my-app")
export class MyApp extends LitElement {
  @property({ type: Object }) currentRoute: Route | null = null;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("hashchange", () => this._handleRouting());
    this._handleRouting();
  }

  disconnectedCallback() {
    window.removeEventListener("hashchange", () => this._handleRouting());
    super.disconnectedCallback();
  }

  private async _handleRouting() {
    const path = location.hash.slice(1) || "/";

    const route =
      ROUTES.find((route) => route.path === path) || NOT_FOUND_ROUTE;

    if (route.tag === undefined) {
      const module: ViewModule = await route.view();
      route.tag = module.default.tag;
    }

    document.title = route.name;

    this.currentRoute = route;
  }

  public navigateTo(url: string) {
    if (url === location.hash) return;
    location.hash = url;
  }

  public changeTheme(darkMode: boolean) {
    const navbar = this.renderRoot.querySelector("app-navbar");
    if (navbar === null) return;
    navbar.changeTheme(darkMode);
  }

  render() {
    return html`
      <app-navbar></app-navbar>
      <div id="app"></div>
    `;
  }

  async updated(changedProperties: Map<string, unknown>) {
    if (!changedProperties.has("currentRoute") || !this.currentRoute) return;

    const container: HTMLDivElement | null =
      this.renderRoot.querySelector("#app");
    if (container === null) return;

    container.innerHTML = "";

    const module: ViewModule = await this.currentRoute.view();
    const viewEl = document.createElement(module.default.tag);

    container.appendChild(viewEl);
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
