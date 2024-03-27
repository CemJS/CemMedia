import { Cemjsx, Static } from "cemjs-all";
import twitter from "@images/social/twitter.svg";
import inst from "@images/social/inst.svg";
import facebook from "@images/social/facebook.svg";
import cem from "@images/social/cem.svg";
import youtube from "@images/social/youtube.svg";
import vk from "@images/social/vk.svg";
import telegram from "@images/social/telegram.svg";
import yandex from "@images/social/yandex.svg";
import heart from "@images/heart.png";

export default function () {
  return (
    <div class="pb-[69px]">
      <div class="container xl:mx-auto">
        <h2 class="mb-5 ml-5 text-base font-semibold leading-[33.89px]">
          Наши соцсети
        </h2>
      </div>
      <div class="relative h-[440px] bg-indigo-500">
        <div class="relative h-full xl:container xl:mx-auto">
          <a class="absolute left-5 top-[19px]" href="">
            <img src={twitter} alt="twitter" />
          </a>
          <a class="absolute right-[45px] top-8" href="">
            <img src={inst} alt="inst" />
          </a>
          <a class="absolute right-1/2 top-16 translate-x-1/2" href="">
            <img src={facebook} alt="facebook" />
          </a>
          <a class="absolute left-[33px] top-[192px]" href="">
            <img src={cem} alt="cem" />
          </a>
          <a class="absolute right-[20px] top-[165px]" href="">
            <img src={youtube} alt="youtube" />
          </a>
          <a class="absolute right-1/2 top-[273px] translate-x-1/2" href="">
            <img src={vk} alt="vk" />
          </a>
          <a class="absolute bottom-[24px] left-[38px]" href="">
            <img src={telegram} alt="telegram" />
          </a>
          <a class="absolute bottom-[30px] right-[35px]" href="">
            <img src={yandex} alt="yandex" />
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
