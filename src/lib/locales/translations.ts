interface Links {
  home: string;
  courses: string;
  sandbox: string;
  appendix: string;
}

interface Settings {
  title: string;
  field1: {
    name: string;
    values: {
      english: string;
      french: string;
    };
  };
  field2: {
    name: string;
  };
}

interface Navbar {
  links: Links;
  settings: Settings;
}

interface NotFound {
  message: string;
}

interface Home {
  title: string;
  presentation: string;
}

interface Pages {
  home: Home;
  notFound: NotFound;
}

export interface Translations {
  navbar: Navbar;
  pages: Pages;
}
