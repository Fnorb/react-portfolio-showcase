import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "de",
    supportedLngs: ["de", "en"],
    ns: ["common", "about", "gallery", "insights"],
    defaultNS: "common",
    backend: {
      loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}/{{ns}}.json`,
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag", "querystring"],
      caches: ["localStorage"],
    },
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

const applyHtmlLang = (lng: string) => {
  document.documentElement.lang = lng;
  document.documentElement.dir = i18n.dir(lng);
};
applyHtmlLang(i18n.resolvedLanguage || "de");
i18n.on("languageChanged", applyHtmlLang);

export default i18n;
