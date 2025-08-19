"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  lang: string;
}

export default function PageContent({ lang }: Props) {
  const { t, i18n } = useTranslation();

  // URL param 기반 언어 전환
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return (
    <div>
      <h1>{lang}</h1>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
}
