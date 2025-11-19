import type { LocalizedName } from "$lib/types";

const HREFS = [
  "/mathematics/probabilities/introduction",
  "/mathematics/probabilities/formulas",
] as const;
export type Href = (typeof HREFS)[number];

interface Chapter {
  name: LocalizedName;
  href: Href;
}

interface Section {
  name: LocalizedName;
  chapters: Chapter[];
}

export interface Course {
  name: LocalizedName;
  sections: Section[];
}

export const COURSES: Course[] = [
  {
    name: { en: "Mathematics", fr: "Mathématiques" },
    sections: [
      {
        name: { en: "Probability", fr: "Probabilité" },
        chapters: [
          {
            name: { en: "introduction", fr: "introduction" },
            href: "/mathematics/probabilities/introduction",
          },
          {
            name: { en: "Formulas", fr: "Formules" },
            href: "/mathematics/probabilities/formulas",
          },
        ],
      },
    ],
  },
];

export const COURSES_FLATTENED = COURSES.flatMap((course) => course.sections)
  .flatMap((section) => section.chapters)
  .map((chapter) => ({
    href: chapter.href,
    name: chapter.name,
  }));
