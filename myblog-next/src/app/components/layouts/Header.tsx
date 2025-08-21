'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
// import SettingsLanguageToggle from './SettingsLanguageToggle';
// import LayoutCarousel from './LayoutCarousel';

export default function Header() {
  const { t } = useTranslation();

  // Vue의 localePath 비슷하게 locale-aware 링크 생성
  const localePath = (path: string) => `/${path}`;

  return (
    <>
      <header className="m-4 bg-amber-50 border-2 border-solid border-amber-200 rounded-xl p-4">
        <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:items-start">
          <div className="hidden lg:inline-block lg:py-4">
            <Link href={localePath('introduce')}>
              <Image
                src="/static/assets/img/png/LogAndList.png"
                alt="LogAndList"
                width={128}
                height={128}
                className="pb-3 w-[96px] h-[96px] lg:w-[128px] lg:h-[128px]"
              />
            </Link>
          </div>
          <div className="text-center py-4 lg:py-12">
            <h1 className="font-bold text-gray-800 uppercase hover:text-gray-700 text-3xl lg:text-5xl">
              <Link className="text-gray-800" href={localePath('introduce')}>
                {t('title')}
              </Link>
            </h1>
            <p className="text-md lg:text-lg text-gray-600 mt-2">
              {t('description')}
            </p>
          </div>
          <div className="py-2 lg:py-12">
            {/* <SettingsLanguageToggle /> */}
          </div>
        </div>
      </header>
      {/* <LayoutCarousel /> */}
    </>
  );
}
