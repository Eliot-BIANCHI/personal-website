import type { Color, Position } from "$lib/types";

export interface ButtonClasses {
  round?: boolean;
  color?: Color;
  hide?: {
    above1024?: boolean;
    below1024?: boolean;
  };
  position?: Position;
  positioned?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
}

export type ButtonClickEvent = MouseEvent & {
  currentTarget: EventTarget & HTMLButtonElement;
};

export type IconName =
  | "arrow--compress"
  | "arrow--down"
  | "arrow--down-with-stroke"
  | "arrow--expand"
  | "arrow--up"
  | "arrow--up-with-stroke"
  | "cross"
  | "menu"
  | "microphone"
  | "navbar--appendix"
  | "navbar--courses"
  | "navbar--home"
  | "navbar--not-found"
  | "navbar--sandbox"
  | "settings"
  | "suit--club"
  | "suit--diamond"
  | "suit--heart"
  | "suit--spade"
  | "theme--moon"
  | "theme--sun"
  | "vertical-dots";

export type InputType = "text" | "number";
