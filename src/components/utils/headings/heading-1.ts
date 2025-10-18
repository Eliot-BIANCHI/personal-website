import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createElement } from "../../../utils/dom";

const LETTER_TIMEOUT_IN_MS = 60;
const FADE_DURATION_IN_MS = 300;

@customElement("heading-1")
export class Heading1 extends LitElement {
  @property({ type: String }) mainName: string = "";
  @property({ type: String }) subName: string | undefined;
  @property({ type: Boolean }) playAnimation: boolean = false;
  @property({ type: Boolean }) fullScreen: boolean = false;

  firstUpdated() {
    if (this.playAnimation) {
      const styles = getComputedStyle(this);
      const letterTimeout =
        parseInt(styles.getPropertyValue("--letter-timeout")) ||
        LETTER_TIMEOUT_IN_MS;

      const fadeDuration =
        parseInt(styles.getPropertyValue("--fade-duration")) ||
        FADE_DURATION_IN_MS;

      let numberOfElementsAnimated = 0;

      for (const query of [".heading-1__main-title", ".heading-1__sub-title"]) {
        const element = this.renderRoot.querySelector(query);
        if (element === null) continue;

        numberOfElementsAnimated = Math.max(
          this.animateText(element, letterTimeout, fadeDuration),
          numberOfElementsAnimated,
        );
      }

      if (this.subName !== undefined) {
        const middleBar: HTMLSpanElement | null = this.renderRoot.querySelector(
          ".heading-1__middle-bar",
        );
        if (middleBar === null) return;
        middleBar.style.animationDuration = `
          ${numberOfElementsAnimated * letterTimeout + fadeDuration}ms
        `;
        middleBar.classList.add("animate");
      }
    }
  }

  animateText(parent: Element, timeout: number, duration: number) {
    const text = parent.textContent;
    parent.textContent = "";

    const letters = text.split("").map((c) => (c === " " ? "\u00A0" : c));

    for (const letter of letters) {
      const element = createElement("span", letter, ["letter"]);
      element.style.animationDuration = `${duration}ms`;
      parent.appendChild(element);
    }

    const elements = Array.from(parent.querySelectorAll(".letter"));
    const shuffled = elements.sort(() => Math.random() - 0.5);

    for (const [i, element] of shuffled.entries()) {
      setTimeout(() => element.classList.add("animate"), i * timeout);
    }

    return elements.length;
  }

  render() {
    const subName =
      this.subName !== undefined
        ? html`
            <span class="heading-1__middle-bar"></span>
            <span class="heading-1__sub-title">${this.subName}</span>
          `
        : "";

    return html`<h1 class="heading-1 ${this.fullScreen ? "full-screen" : ""}">
      <span class="heading-1__main-title">${this.mainName}</span>
      ${subName}
    </h1>`;
  }

  static styles = css`
    :host {
      --letter-timeout: 60;
      --fade-duration: 300;
    }

    .heading-1 {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: var(--gap-md);
      margin: 0 auto;
      width: max-content;
    }

    .heading-1__main-title {
      font-size: var(--font-scale-xl);
      font-weight: 500;
    }

    .heading-1__middle-bar {
      --bar-height: 2px;
      background-color: var(--text-color);
      content: "";
      height: var(--bar-height);
      transition: background-color var(--transition-duration)
        var(--transition-timing-function);
      width: 100%;

      &.animate {
        animation-name: growBar;
        animation-fill-mode: forwards;
      }
    }

    .heading-1__sub-title {
      font-size: var(--font-scale-lg);
      font-weight: normal;
      letter-spacing: 5px;
    }

    .heading-1.full-screen {
      height: calc(100dvh - var(--app-navbar-height));
      justify-content: center;

      & .heading-1__main-title {
        font-size: var(--font-scale-xxl);
      }

      & .heading-1__sub-title {
        font-size: var(--font-scale-xl);
      }
    }

    .letter {
      opacity: 0;

      &.animate {
        animation-name: fadeIn;
        animation-fill-mode: forwards;
      }
    }

    @keyframes growBar {
      from {
        width: 0;
      }
      to {
        width: 100%;
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "heading-1": Heading1;
  }
}
