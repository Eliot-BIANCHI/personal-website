import type { IconName } from "$lib/components/utils/elements/types";

export type InputType = "text" | "number";

export interface SelectOption {
  iconName?: IconName;
  text?: string;
  value: string;
  selected?: boolean;
  disabled?: boolean;
}
