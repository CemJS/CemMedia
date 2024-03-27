import { Cemjsx, Static } from "cemjs-all";
import logo from "@svg/logoCem.svg";
import megaphone from "@images/megaphone.png";
import radio from "@svg/radio.svg";

export default function () {
  return (
    <div class="relative bg-red-500 p-[3rem_1.25rem_1.25rem_1.25rem] @767:mx-auto">
      <div class="flex flex-col gap-3  xl:container xl:mx-auto">
        <p class="z-10 text-base font-semibold leading-[2.5625rem] text-white">
          Твоё МЕДИА
          <br />в Криптоиндустрии
        </p>
        <div class="mb-[3.25rem] flex items-center gap-1">
          <p class="z-10 text-[clamp(0.75rem,2vw,0.875rem)] font-normal text-white">
            Создано командой Crypto Emergency
          </p>
          <img src={logo} alt="Создано командой Crypto Emergency" />
        </div>
        <div class="z-10 flex flex-col gap-[1.375rem]">
          <button class="self-start rounded-[1.375rem] bg-white p-[0.825rem_3.3875rem] text-[clamp(20px,2vw,22px)] font-semibold [border:0.0313rem_solid_black] [transition:all_0.3s_ease] hover:bg-black hover:text-white">
            16 языков
          </button>
          <button class="self-end rounded-[1.375rem] bg-blue-500 p-[0.825rem_3.3875rem] text-[clamp(20px,2vw,22px)] font-semibold text-white [transition:all_0.3s_ease] [border:0.0313rem_solid_white] hover:!border-black hover:bg-white hover:text-black">
            10 каналов
          </button>
        </div>
        <img
          class="absolute right-[0.1875rem] top-[2rem]"
          src={megaphone}
          alt="megaphone"
        />
        <img
          class="absolute bottom-[0.1563rem] left-[0.625rem]"
          src={radio}
          alt="radio"
        />
      </div>
    </div>
  );
}
