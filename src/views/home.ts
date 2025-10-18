import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

import "../components/utils/headings/heading-1";
import "../components/utils/shapes/diagonal";

@customElement("view-home")
export default class HomeView extends LitElement {
  static tag = "view-home";

  render() {
    return html`
      <heading-1
        mainName="Personal website"
        subName="Eliot BIANCHI"
        playAnimation
        fullScreen
      ></heading-1>

      <shape-diagonal>
        <div class="profile-section">
          <p>
            Étudiant en Intelligence articielle à l'ISIMA de Clermont-Ferrand.
          </p>
          <img
            class="profile-section__picture"
            src="/src/assets/images/suit.jpeg"
          />
        </div>
      </shape-diagonal>

      <!--<shape-diagonal invert>
        <h3>Hello</h3>
      </shape-diagonal>-->
    `;
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 100px;
    }

    .profile-section {
      display: flex;
      align-items: center;
      justify-content: space-around;
    }

    .profile-section__picture {
      border-radius: 99px;
    }
  `;
}
