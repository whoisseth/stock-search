/** @format */

import Favorites from "./components/Favorites";
import StockSearch from "./components/StockSearch";
import StockSearch2 from "./components/StockSearch2";

export default function Home() {
  return (
    <div className="container p-4 mx-auto">
      <h1 className="text-3xl font-semibold">Stock Search</h1>
      {/* <StockSearch /> */}
      <section className="flex flex-wrap gap-2">
        <StockSearch2 />
        <Favorites />
      </section>
    </div>
  );
}
