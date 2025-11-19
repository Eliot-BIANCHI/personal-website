interface Settings {
  title: string;
  field1: {
    name: string;
  };
  field2: {
    name: string;
  };
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
  settings: Settings;
  pages: Pages;
}
