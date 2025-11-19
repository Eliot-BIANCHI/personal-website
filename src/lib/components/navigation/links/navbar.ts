import type { IconName } from "$lib/components/utils/elements/types";
import type { LocalizedName } from "$lib/types";

const HREFS = ["/", "/courses", "/sandbox", "/appendix"] as const;
export type Href = (typeof HREFS)[number];

interface Link {
  href: Href;
  name: LocalizedName;
  iconName: IconName;
}

export const NAVBAR: Link[] = [
  { href: "/", name: { en: "Home", fr: "Accueil" }, iconName: "navbar--home" },
  {
    href: "/courses",
    name: { en: "Courses", fr: "Cours" },
    iconName: "navbar--courses",
  },
  {
    href: "/sandbox",
    name: { en: "Sandbox", fr: "Bac à sable" },
    iconName: "navbar--sandbox",
  },
  {
    href: "/appendix",
    name: { en: "Appendix", fr: "Annex" },
    iconName: "navbar--appendix",
  },
];
