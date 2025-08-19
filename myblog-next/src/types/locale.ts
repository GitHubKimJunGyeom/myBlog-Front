// types/locale.ts
import koBlog from "@/locales/ko/blog.json";

// 기준 언어(ko)의 JSON 타입을 가져와서 전체 구조 정의
export type BlogLocale = typeof koBlog;

export type LocaleKey = "ja" | "ko";

export type UILocales = {
  blog: BlogLocale;
};
