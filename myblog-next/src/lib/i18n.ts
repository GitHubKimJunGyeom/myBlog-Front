// lib/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import koBlog from "@/locales/ko/blog.json";
import jaBlog from "@/locales/ja/blog.json";

i18n.use(initReactI18next).init({
  lng: "ko", // 초기 언어
  fallbackLng: "ko",
  resources: {
    ko: { blog: koBlog },
    ja: { blog: jaBlog },
  },
  ns: ["blog"],
  defaultNS: "blog",
  interpolation: { escapeValue: false },
});

export default i18n;
