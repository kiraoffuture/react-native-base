import * as Localization from "expo-localization";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@/i18n/locales/en.json";
import vi from "@/i18n/locales/vi.json";

const deviceLanguage = Localization.getLocales()?.[0]?.languageCode ?? "en";
const lng = deviceLanguage === "vi" ? "vi" : "en";

// eslint-disable-next-line import/no-named-as-default-member -- we need the default i18next instance, not the named export `use`
void i18next.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    vi: { translation: vi },
  },
  lng,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
  compatibilityJSON: "v4",
});

export { i18next as i18n };
