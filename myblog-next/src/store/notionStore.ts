// src/store/notion.ts
import { create } from "zustand";
import { carouselItems } from "@/constants/carouselItems";

type FetchStatus = "idle" | "pending" | "success" | "error";

interface NotionState {
  lang: string;
  database: string;
  pageList: string;
  tags: [] | string[];
  clickedTags: string[];
  formattedData: null;
  fetchDataError: null;
  fetchDataStatus: FetchStatus;
  carousel: typeof carouselItems;
  resetTags: () => void;

  // actions
  setDataBase: (lang: string, nowDataBase: string) => void;
  setPageList: (nowPageList: string) => void;
  toggleTag: (tag: string) => void;
  fetchNotionData: (lang: string, database: string) => Promise<void>;
  fetchDataBaseTags: (lang: string, database: string) => Promise<void>;
}

export const useNotionStore = create<NotionState>((set, get) => ({
  lang: "ja",
  database: "programming_insight_list",
  pageList: "programming_insight_list",
  tags: [],
  clickedTags: [],
  formattedData: null,
  fetchDataError: null,
  fetchDataStatus: "idle",
  carousel: carouselItems,
  resetTags: () => set({ tags: [] }),

  setDataBase: (lang, nowDataBase) => {
    if (nowDataBase === "programming_insight_list") {
      nowDataBase = `${nowDataBase}_${lang}`;
    }
    set({ database: nowDataBase });
  },

  setPageList: (nowPageList) => {
    set({ pageList: nowPageList });
  },

  toggleTag: (tag) => {
    const { clickedTags } = get();
    if (clickedTags.includes(tag)) {
      set({ clickedTags: clickedTags.filter((t) => t !== tag) });
    } else {
      set({ clickedTags: [...clickedTags, tag] });
    }
  },

  fetchNotionData: async (lang, database) => {
    set({ fetchDataStatus: "pending" });
    try {
      const res = await fetch(
        `/api/notion/${lang}/database/${database}?tags=${get().clickedTags.join(",")}`,
        { method: "GET" }
      ).then((res) => res.json());

      set({ formattedData: res, fetchDataStatus: "success" });
    } catch (err) {
      set({ fetchDataError: err, fetchDataStatus: "error" });
    }
  },

  fetchDataBaseTags: async (lang, database) => {
    set({ fetchDataStatus: "pending" });
    try {
      const res = await fetch(`/api/notion/${lang}/tags/${database}`, {
        method: "GET",
      }).then((res) => res.json());

      set({
        tags: res?.tags ?? [],
        fetchDataStatus: "success",
      });
    } catch (err) {
      set({ fetchDataError: err, fetchDataStatus: "error" });
    }
  },
}));
