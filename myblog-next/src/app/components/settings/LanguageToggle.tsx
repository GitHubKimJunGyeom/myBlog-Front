'use client'; // App Router의 클라이언트 컴포넌트임을 명시

import { useRouter, usePathname } from 'next/navigation'; // Pages Router의 useRouter 대신 사용
import { useTranslation } from 'react-i18next'; // next-i18next 대신 사용

const locales = [
  { code: 'ja', displayCode: 'JP' },
  { code: 'ko', displayCode: 'KR' },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { i18n } = useTranslation();

  const switchLocale = async (langCode: string) => {
    // 1. i18next의 언어 변경
    await i18n.changeLanguage(langCode);

    // 2. Next.js 라우터로 페이지 이동 (pathname 유지하면서 언어만 변경)
    router.push(`/${langCode}${pathname.substring(3)}`);
  };

  return (
    <div className="flex items-center gap-4 rounded-lg border border-black/90 px-3 py-1 backdrop-blur-xl text-gray-400">
      {locales.map((locale) => (
        <button
          key={locale.code}
          type="button"
          className={`font-black rounded-lg text-xl ${
            i18n.language === locale.code ? 'text-amber-600' : 'text-neutral-500'
          }`}
          onClick={() => switchLocale(locale.code)}
        >
          {locale.displayCode}
        </button>
      ))}
    </div>
  );
}