import { Cemjsx, Static } from "cemjs-all";
import twitter from "./svg/twitter";
import inst from "./svg/inst";
import facebook from "./svg/facebook";
import cem from "./svg/cem";
import youtube from "./svg/youtube";
import vk from "./svg/vk";
import telegram from "./svg/telegram";
import yandex from "./svg/yandex";
import heart from "@images/heart.png";

export default function () {
  return (
    <div class="pb-[69px]">
      <div id="saveClasses" class="h-0 overflow-hidden opacity-0"></div>
      <div class="container xl:mx-auto">
        <h2 class="mb-5 ml-5 text-base font-semibold leading-[33.89px]">
          Наши соцсети
        </h2>
      </div>
      <div class="relative h-[440px] bg-indigo-500">
        <div class="relative h-full xl:container xl:mx-auto">
          <a class="absolute left-5 top-[19px]" href="">
            {twitter("hover:fill-sky-500")}
          </a>
          <a class="absolute right-[45px] top-8" href="">
            {inst("hover:fill-pink-600")}
          </a>
          <a class="absolute right-1/2 top-16 translate-x-1/2" href="">
            {facebook("hover:fill-indigo-700")}
          </a>
          <a class="absolute left-[33px] top-[192px]" href="">
            {cem("hover:fill-fuchsia-600")}
          </a>
          <a class="absolute right-[20px] top-[165px]" href="">
            {youtube("hover:fill-red-600")}
          </a>
          <a class="absolute right-1/2 top-[273px] translate-x-1/2" href="">
            {vk("hover:fill-sky-500")}
          </a>
          <a class="absolute bottom-[24px] left-[38px]" href="">
            {telegram("hover:fill-sky-400")}
          </a>
          <a class="absolute bottom-[30px] right-[35px]" href="">
            {yandex("hover:fill-black")}
          </a>
          <img
            class="absolute bottom-[-123px] right-[7px]"
            src={heart}
            alt="heart"
          />
        </div>
      </div>
    </div>
  );
}
