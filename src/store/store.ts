import { create } from "zustand";
import { persist } from "zustand/middleware";
import { News } from "../pages/Home";

interface ScrapState {
  scrap: News[];
  addArticle: (item: News) => void;
  deleteArticle: (id: string) => void;
}

export const useScrapStore = create(
  persist<ScrapState>(
    (set) => ({
      scrap: [],
      addArticle: (item) => {
        set((state) => ({
          scrap: [...state.scrap, item],
        }));
      },
      deleteArticle: (url) => {
        set((state) => ({
          scrap: state.scrap.filter((el) => el.url !== url),
        }));
      },
    }),
    {
      name: "scrap_list",
    }
  )
);

interface ToastState {
  toast: string;
  setToast: (param: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toast: "",
  setToast: (param) => {
    set(() => ({
      toast: param,
    }));
  },
}));

interface Category {
  category: string;
  setCategory: (param: string) => void;
}

export const useCategory = create<Category>((set) => ({
  category: "general",
  setCategory: (param) => {
    set(() => ({
      category: param,
    }));
  },
}));

interface CurrentKeyword {
  list: string[];
  setList: (item: string) => void;
  currentClicked: (item: string) => void;
}

export const useKeywordStore = create(
  persist<CurrentKeyword>(
    (set) => ({
      list: [],
      setList: (item) => {
        set((state) => ({
          list:
            state.list.length > 5
              ? [item, ...state.list.slice(1)]
              : [item, ...state.list],
        }));
      },
      currentClicked: (item) => {
        set((state) => ({
          list: [...state.list.filter((el) => el !== item)],
        }));
      },
    }),
    {
      name: "search_list",
    }
  )
);
