import type { IconName } from "$lib/components/utils/elements/types";

const NAMES = ["home", "courses", "sandbox", "appendix"] as const;
type Name = (typeof NAMES)[number];

const HREFS = ["/", "/courses", "/sandbox", "/appendix"] as const;
export type Href = (typeof HREFS)[number];

interface Link {
  href: Href;
  name: Name;
  iconName: IconName;
}

export const LINKS: Link[] = [
  { href: "/", name: "home", iconName: "navbar--home" },
  {
    href: "/courses",
    name: "courses",
    iconName: "navbar--courses",
  },
  {
    href: "/sandbox",
    name: "sandbox",
    iconName: "navbar--sandbox",
  },
  {
    href: "/appendix",
    name: "appendix",
    iconName: "navbar--appendix",
  },
];
