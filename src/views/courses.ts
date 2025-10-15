import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("view-courses")
export default class CoursesView extends LitElement {
  static tag = "view-courses";

  render() {
    return html` <h1>Voici tous les cours</h1> `;
  }
}
