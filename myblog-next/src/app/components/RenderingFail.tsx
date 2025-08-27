"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

interface RenderingFailProps {
  error?: string | Error | null;
}

export default function RenderingFail({ error = null }: RenderingFailProps) {
  const { t } = useTranslation();

  const errorMessage = error
    ? typeof error === "string"
      ? error
      : error.message
    : t("blog.clipping_list_rendering_error");

  return (
    <div className="w-full flex flex-col items-center">
      <div className="mt-3 mb-5 border-2 border-solid border-amber-200 rounded-xl overflow-hidden">
        <Image
          src="/static/assets/img/png/OjikiAguimanChan.png"
          alt="loading-image"
          width={240} // w-60
          height={240} // 비율 맞춤
          className="rounded-xl"
        />
      </div>

      <div className="whitespace-pre-line font-bold text-xl text-black bg-amber-50 border-2 border-solid border-amber-200 rounded-xl p-7">
        {errorMessage}
      </div>

      <button
        onClick={() => window.history.back()}
        type="button"
        className="inline-flex items-center border border-indigo-300 mt-3 p-3 rounded-md text-indigo-500 hover:bg-indigo-200 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16l-4-4m0 0l4-4m-4 4h18"
          />
        </svg>
        <span className="ml-1 font-bold text-lg">Back</span>
      </button>
    </div>
  );
}
