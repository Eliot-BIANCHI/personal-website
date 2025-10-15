import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("view-home")
export default class HomeView extends LitElement {
  static tag = "view-home";

  render() {
    return html`
      <h1>Bienvenue !</h1>
      <p>Ceci est la page d’accueil.</p>
    `;
  }
}
