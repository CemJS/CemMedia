import { Cemjsx, Static } from "cemjs-all";
import logo from "@images/logo.png";

export default function () {
  return (
    <div class="px-5 pb-6 xl:container xl:mx-auto">
      <div class="pointer-events-none relative max-h-0 w-full">
        <img
          class="absolute right-0 top-[-70px] h-[120px] w-[120px]"
          src={logo}
          alt="logo"
        />
      </div>
      <h2 class="mb-3 text-base font-bold leading-[41.89px]">
        Платформа
        <br />
        Crypto Emergency
      </h2>
      <p class="text-little flex flex-col gap-[10px] leading-[19.36px]">
        <p>
          Cпециализированная социальная сеть для взаимодействия всех участников
          международного крипто-рынка, не уступающая по возможностями контента и
          общения таким социальным медиа, как Facebook, Instagram.
        </p>
        <p>
          На данный момент платформа поддерживает 60 языков, что дает
          практически безграничные возможности общения, поиска и размещения
          материалов.
        </p>
        <p>И еще расписать что то.</p>
      </p>
    </div>
  );
}
