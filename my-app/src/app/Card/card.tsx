"use client";

import React from "react";
import "./card.css";
import custom from "./custom.module.css";
import customScss from "./card-custom.module.scss";
import clsx from "clsx";
export default function Card() {
  const [expanding, setExpanding] = React.useState(false);
  // className={`card ${custom.card} ${customScss["card-text"]}`
  return (
    <>
      <div
        className={clsx("card", {
          [custom.card]: expanding,
          [customScss["card-text"]]: expanding,
        })}
      >
        card
      </div>
      <button onClick={() => setExpanding(!expanding)}>Click me !</button>
    </>
  );
}
