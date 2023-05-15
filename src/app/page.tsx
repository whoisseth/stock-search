/** @format */

import StockSearch from "./components/StockSearch";

export default function Home() {
  return (
    <div className="container p-4 mx-auto">
      <h1 className="text-3xl font-semibold">Stock Search</h1>
      <StockSearch />
    </div>
  );
}
