import { create } from "zustand";

interface UrlProps {
  backdrop: string;
  poster: string;
  profile: string;
}

export interface genresProps {
  id: number;
  name: string;
}
[];

interface HomeState {
  url: UrlProps;
  genres: Record<number, genresProps>;
  setApiConfiguration: (urlProps: UrlProps) => void;
  setgeneresConfigure: (genere: genresProps) => void;
}

const useHomeStore = create<HomeState>((set) => ({
  url: { backdrop: "", poster: "", profile: "" },
  genres: {},
  setApiConfiguration: (url: UrlProps) => {
    set((state) => ({ ...state, url }));
  },
  setgeneresConfigure: (genere: genresProps) => {
    set((state) => ({ ...state, genere }));
  },
}));

export default useHomeStore;
