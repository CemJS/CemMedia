import { Cemjsx, Static } from "cemjs-all";

export default function () {
  return (
    <div class="flex flex-col px-5 pb-10 pt-12 xl:container xl:mx-auto">
      <div
        id="right"
        class="flex h-[183px] max-h-[183px] w-full max-w-[183px] flex-col items-center gap-[7px] self-end rounded-[50%] rounded-ee-none border-[0.5px] border-solid border-neutral-700 bg-zinc-100 px-[7px] pb-[20px] pt-[15px]"
      >
        <p class="text-[110px] font-bold leading-[100px] text-red-500">3</p>
        <p class="self-end text-[16px] font-semibold leading-[19.3px] text-neutral-900">
          Года на IT рынке
          <br />и крипторынке
        </p>
      </div>
      <div
        id="left"
        class="mt-[-58px] flex h-[183px] max-h-[183px] w-full max-w-[183px] flex-col items-center gap-[7px] self-start rounded-[50%] rounded-es-none border-[0.5px] border-solid border-neutral-700 bg-zinc-100 px-[7px] pb-[20px] pt-4"
      >
        <p class="text-[110px] font-bold leading-[100px] text-blue-500">10</p>
        <p class="self-start text-[16px] font-semibold leading-[19.3px] text-neutral-900">
          Каналов
          <br />
          продвижения
        </p>
      </div>
      <div
        id="right"
        class="mt-[-58px] flex h-[183px] max-h-[183px] w-full max-w-[183px] flex-col items-center gap-[7px] self-end rounded-[50%] rounded-ee-none border-[0.5px] border-solid border-neutral-700 bg-zinc-100 px-[7px] pb-[20px] pt-[33px]"
      >
        <p class="text-[85px] font-bold leading-[100px] text-orange-400">100</p>
        <p class="self-end text-[16px] font-semibold leading-[19.3px] text-neutral-900">
          Тысяч охват
        </p>
      </div>
      <div
        id="left"
        class="mt-[-58px] flex h-[183px] max-h-[183px] w-full max-w-[183px] flex-col items-center gap-[7px] self-start rounded-[50%] rounded-es-none border-[0.5px] border-solid border-neutral-700 bg-zinc-100 px-[7px] pb-[20px] pt-[33px]"
      >
        <p class="text-[110px] font-bold leading-[100px] text-lime-500">16</p>
        <p class="self-start text-[16px] font-semibold leading-[19.3px] text-neutral-900">
          Языков
        </p>
      </div>
    </div>
  );
}
