/** @format */

"use client";

import React from "react";

type Props = {
  symbol: string;
  price: string;
  high: string;
  low: string;
  open: string;
  close: string;
  className?: string;
};

export default function StockCard(props: Props) {
  return (
    <div className={props.className}>
      <h2 className="text-lg font-semibold">{props.symbol}</h2>
      <p>Current Price: {props.price}</p>
      <p>High Price: {props.high}</p>
      <p>Low Price: {props.low}</p>
      <p>Opening Price: {props.open}</p>
      <p>Previous Close: {props.close}</p>
    </div>
  );
}
