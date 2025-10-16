import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

import "../components/utils/headings/heading-1";

@customElement("view-home")
export default class HomeView extends LitElement {
  static tag = "view-home";

  render() {
    return html`
      <heading-1
        mainTitle="Personal website"
        subTitle="Eliot BIANCHI"
        playAnimation
      ></heading-1>
    `;
  }
}
