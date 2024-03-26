import { Cemjsx, Func, Static, Fn } from "cemjs-all";
import inst from "@svg/inst.svg";
import telegram from "@svg/telegram.svg";
import logo from "@svg/logo.svg";

export default function () {
  return (
    <header class="mx-auto p-[70px_20px_11px_20px] xl:container">
      <div class="flex justify-between gap-[10px]">
        <div class="flex gap-[19px] pb-[8px]">
          <img class="cursor-pointer self-end" src={telegram} alt="Telegram" />
          <img class="cursor-pointer self-end" src={inst} alt="Instagram" />
        </div>
        <img src={logo} alt="Cem Media" />
      </div>
    </header>
  );
}
