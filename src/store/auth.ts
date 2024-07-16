import { create } from "zustand";

import { type Account } from "@/type/account";

type accountStore = {
  account: Account | null;
  setAccount: (account: Account | null) => void;
};

const useAccountStore = create<accountStore>((set) => ({
  account: null,
  setAccount: (account: Account | null) => set({ account: account }),
}));

export default useAccountStore;
