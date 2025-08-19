"use client";

import React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";


export default function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { t, i18n } = useTranslation();
  const resolvedParams = React.use(params);
  const lang = resolvedParams.lang;
  
  // URL param 기반 언어 전환
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return (
    <div>
      <h1>{lang}</h1>
      <h1>{lang}</h1>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
}
