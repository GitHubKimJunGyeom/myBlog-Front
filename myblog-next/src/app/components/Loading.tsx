"use client";

import { useMemo } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Loading() {
  const { t, i18n } = useTranslation();

  const animatedText = useMemo(() => {
    const text = t("loading");
    const jumpDuration = 0.1;
    const totalDuration = text.length * jumpDuration;

    return text
      .split("")
      .map((char, i) => {
        const delay = i * jumpDuration;
        const safeChar = char === " " ? "\u00A0" : char;
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              animation: `single-jump ${totalDuration}s ease-in-out infinite`,
              animationDelay: `${delay}s`,
            }}
          >
            {safeChar}
          </span>
        );
      });
  }, [t]);

  const imageSrc = useMemo(() => {
    const lang = i18n.language || "ja";
    return `/static/assets/img/png/LoadingAguimanChan_${lang}.png`;
  }, [i18n.language]);

  return (
    <div className="loading-container w-full md:w-2/3 flex flex-col px-3 items-center">
      <p className="loading-text mb-3 text-[25px] text-gray-800">
        {animatedText}
      </p>
      <div className="loading-image mt-3 w-[450px] h-[450px] relative">
        <Image
          src={imageSrc}
          alt="loading image"
          fill
          className="object-cover"
        />
      </div>

      <style jsx>{`
        @keyframes single-jump {
          0%,
          20%,
          100% {
            transform: translateY(0);
          }
          10% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}
