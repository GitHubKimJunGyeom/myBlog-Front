// src/app/[lang]/database/[...slug]/page.tsx
"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { NotionRenderer } from "react-notion-x";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism.css";
import "katex/dist/katex.min.css";

import { useNotionStore } from "@/store/notionStore";
import Loading from "@/app/components/Loading";
import RenderingFail from "@/app/components/RenderingFail";

export default function DatabasePage() {
  const params = useParams();
  const slug = params?.slug as string[];
  const pageId = params?.pageId as string;
  const database = decodeURIComponent(slug?.[0] || "");
  const title = decodeURIComponent(slug?.[1] || "");
  const description = decodeURIComponent(slug?.[2] || "");
  const lang = "ja";

  const {
    recordMap,
    fetchDataStatus,
    fetchDataError,
    setRecordMap,
    setFetchStatus,
    setFetchError,
    fetchDataBaseTags,
  } = useNotionStore();

  // 태그 초기화 & fetch
  useEffect(() => {
    fetchDataBaseTags(lang, database);
  }, [lang, database, fetchDataBaseTags]);

  // 페이지 데이터 fetch
  useEffect(() => {
    const fetchPageData = async () => {
      if (!pageId) return;

      setFetchStatus("pending");
      setFetchError(null);

      try {
        const res = await fetch(`/api/notion/${lang}/databasePage/${pageId}`);
        if (!res.ok) throw new Error("Failed to fetch page data");
        const data: { recordMap: unknown } = await res.json();

        setRecordMap(data.recordMap);
        setFetchStatus("success");
      } catch (err: unknown) {
        setFetchStatus("error");
        setFetchError(err instanceof Error ? err.message : "Unknown error");
      }
    };

    fetchPageData();
  }, [lang, pageId, setRecordMap, setFetchStatus, setFetchError]);

  if (fetchDataStatus === "pending") return <Loading />;
  if (fetchDataStatus === "error") return <RenderingFail error={fetchDataError} />;

  return (
    <div className="w-full md:w-2/3 flex flex-col p-3 border-t border-gray-300 overflow-y-auto">
      <h1 className="font-bold text-black text-4xl w-full">{title}</h1>
      <h2 className="mt-4 text-sm text-gray-500 pb-3 w-full">{description}</h2>

      {recordMap && <NotionRenderer recordMap={recordMap} fullPage={false} darkMode={false} />}
    </div>
  );
}
