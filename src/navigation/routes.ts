import ROUTES_JSON from "../jsons/routes.json";

const VIEWS = import.meta.glob("../views/*.ts") as Record<
  string,
  () => Promise<ViewModule>
>;

interface LocalizedName {
  en: string;
  fr: string;
  assistant?: string;
}

interface Chapter {
  name: LocalizedName;
  path: string;
}

interface Section {
  name: LocalizedName;
  chapters: Chapter[];
}

interface Course {
  name: LocalizedName;
  sections: Section[];
}

interface NavbarItem {
  name: LocalizedName;
  path: string;
}

interface RoutesJson {
  navbar: NavbarItem[];
  courses: Course[];
}

export interface ViewModule {
  default: { tag: string; new (): HTMLElement };
}

export interface Route {
  name: string;
  hiddenName: string;
  path: string;
  tag?: string;
  view: () => Promise<ViewModule>;
}

function build(routes: RoutesJson) {
  const navbarRoutes = routes.navbar.map((route) => ({
    name: route.name.fr,
    path: route.path,
    assistant: route.name.assistant,
  }));

  const coursesRoutes = routes.courses
    .flatMap((course) => course.sections)
    .flatMap((section) => section.chapters)
    .map((chapter) => ({
      name: chapter.name.fr,
      path: chapter.path,
      assistant: chapter.name.assistant,
    }));

  const routesInformation = [navbarRoutes, coursesRoutes].flat();

  return routesInformation.map(({ name, path, assistant }) => ({
    name,
    hiddenName: assistant || name.toLowerCase(),
    path,
    view: VIEWS[`../views${path === "/" ? "/home" : path}.ts`],
  }));
}

export const ROUTES: Route[] = build(ROUTES_JSON);

export const NOT_FOUND_ROUTE: Route = {
  name: "Page non trouvée",
  hiddenName: "NF",
  path: "",
  view: VIEWS[`../views/not-found.ts`],
};
