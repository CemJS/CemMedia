import { Cemjsx, Static } from "cemjs-all";
import Intro from "./Intro";
import About from "./About";
import WhatWedo from "./WhatWedo";
import Features from "./Features";
import Social from "./Social";
import Tarif from "./Tarif";
import Outro from "./Outro";

export default function () {
  return (
    <div class="mx-auto">
      <Intro />
      <About />
      <WhatWedo />
      <Features />
      <Social />
      <Tarif />
      <Outro />
    </div>
  );
}
