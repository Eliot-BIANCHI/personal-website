import { LANGUAGES, type Language } from "$lib/types";
import LOCAL_STORAGE from "$lib/storages/local.json";
import type { Translations } from "./locales/translations";
import { defaultTranslations } from "./locales/default";

class I18n {
  t = $state<Translations>(defaultTranslations);
  lang: Language = $state("en");

  async load(lang: Language) {
    this.lang = lang;
    try {
      const { default: translations } = await import(
        `./locales/${lang}/translations.ts`
      );
      this.t = translations;
    } catch {
      const fallback = (await import("./locales/en/translations")).default;
      this.t = fallback;
    }
  }
}

export const i18n = new I18n();

const appLanguage = localStorage.getItem(
  LOCAL_STORAGE.SETTINGS.LANGUAGE,
) as Language | null;

const navigatorLanguage = navigator.language.split("-")[0];

i18n.load(
  appLanguage
    ? appLanguage
    : LANGUAGES.some((language) => language === navigatorLanguage)
      ? (navigatorLanguage as Language)
      : "en",
);
