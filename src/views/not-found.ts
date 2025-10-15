import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("view-not-found")
export default class NotFoundView extends LitElement {
  static tag = "view-not-found";

  render() {
    return html`<p>Nous n'avons pas pu trouver la page que vous cherchiez</p>`;
  }
}
