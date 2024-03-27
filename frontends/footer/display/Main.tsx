import { Cemjsx } from "cemjs-all";
import logo from "@images/logoFull.png";
import socials from "json/socialsFooter.json";

export default function () {
  return (
    <footer class="flex flex-col gap-3 bg-red-500 p-[31px_20px_136px] text-little leading-[19.3px] text-white">
      <div class="flex gap-[0.625rem] ">
        <p>Связаться с нами</p>
        <a href="https://t.me/dmitriibelov">@dmitriibelov</a>
      </div>
      <p>Наши соцсети</p>
      <div class="flex gap-[6px]">
        {socials.map((item) => {
          return (
            <div class="flex items-center justify-center rounded-[50%] border-[0.5px] border-solid border-white">
              <img src={item.img} alt="social" />
            </div>
          );
        })}
      </div>
      <a href="">info@cryptoemergency.com</a>
      <img class="w-[73px]" src={logo} alt="Crypto Emergency" />
    </footer>
  );
}
