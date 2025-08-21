"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useNotionStore } from "@/store/notionStore";
import { useTranslation } from 'react-i18next';
// import NotionMultiselectTagButton from "@/components/NotionMultiselectTagButton";

export default function SideBar() {
  const { t } = useTranslation("blog");
  const pathname = usePathname();
  const notionStore = useNotionStore();

  // pagePath: route.path.split('/')[2] equivalent
  const pagePath = useMemo(() => {
    const pathParts = pathname.split("/");
    return pathParts[2] || "";
  }, [pathname]);

  // tags
  const tags = notionStore.tags;

  return (
    <aside className="w-full md:w-1/3 flex flex-col items-center px-3 border-l border-t border-gray-300">
      {pagePath !== "introduce" && (
        <div className="w-full bg-amber-50 border-2 border-solid border-amber-200 shadow-xl flex flex-col my-4 p-6 rounded-lg">
          <p className="text-xl font-semibold pb-5">Tag</p>
          {tags.length > 0 && (
            // <NotionMultiselectTagButton tags={tags} />
            <div>test</div>
          )}
          {tags.length === 0 && (
            <div className="flex flex-col items-center">
              <p className="text-xl font-semibold pb-5">{t("tag_nothing")}</p>
              <Image
                src="/static/assets/img/png/OjikiAguimanChan.png"
                width={192}
                height={192}
                className="rounded-lg border"
                alt="OjikiAguimanChan"
              />
            </div>
          )}
        </div>
      )}

      <div className="w-full bg-amber-50 border-2 border-solid border-amber-200 rounded-lg shadow-xl flex flex-col my-4 p-6 items-center hover:bg-amber-100 cursor-pointer">
        <p className="text-xl font-semibold pb-5">{t("greeting")}</p>
        <Link
          href="/introduce"
          className="w-full p-8 max-w-lg rounded-2xl flex flex-col items-center"
        >
          <Image
            src="/static/assets/img/png/IntroduceAguimanChan.png"
            width={384}
            height={384}
            className="shadow-xl rounded-lg border w-full"
            alt="IntroduceAguimanChan"
          />
        </Link>
      </div>
    </aside>
  );
}
