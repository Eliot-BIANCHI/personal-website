import type { IconName } from "$lib/components/utils/elements/types";

const ROUTES = ["/", "/courses", "/sandbox", "/appendix"] as const;
export type Route = (typeof ROUTES)[number];

interface Name {
  en: string;
  fr: string;
}

interface Link {
  href: Route;
  name: Name;
  iconName: IconName;
}

export const LINKS: Link[] = [
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
