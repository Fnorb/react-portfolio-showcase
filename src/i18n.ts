import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "de",
    supportedLngs: ["de", "en"],
    nonExplicitSupportedLngs: true,
    load: "languageOnly",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "querystring", "htmlTag", "navigator"],
      caches: ["localStorage"],
    },
  });

const applyHtmlLang = (lng: string) => {
  document.documentElement.lang = lng;
  document.documentElement.dir = i18n.dir(lng);
};
applyHtmlLang(i18n.language);
i18n.on("languageChanged", applyHtmlLang);

export default i18n;
