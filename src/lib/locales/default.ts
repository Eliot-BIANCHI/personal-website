import type { Translations } from "./translations";

export const defaultTranslations: Translations = {
  navbar: {
    links: {
      home: "Home",
      courses: "Courses",
      sandbox: "Sandbox",
      appendix: "Appendix",
    },
    settings: {
      title: "Settings",
      field1: {
        name: "Language",
        values: {
          english: "English",
          french: "French",
        },
      },
      field2: {
        name: "Assistant?",
      },
    },
  },
  pages: {
    home: {
      title: "Personnal website",
      presentation:
        "Student in Artificial intelligence at the ISIMA of Clermont-Ferrand.",
    },
    notFound: {
      message: "We can't find the page you're looking for",
    },
  },
};
