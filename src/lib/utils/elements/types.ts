import type { Color, Position } from "$lib/types";

export interface ButtonClasses {
  round?: boolean;
  color?: Color;
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
  | "suit--club"
  | "suit--diamond"
  | "suit--heart"
  | "suit--spade";

export type InputType = "text" | "number";
