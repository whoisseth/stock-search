/** @format */

import { atom } from "jotai";
import { StockData } from "../components/StockSearch2";

export const favoriteStocksAtom = atom<StockData[]>([]);
