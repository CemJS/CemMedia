import { Cemjsx, Static } from "cemjs-all";
import phone from "@images/phone.png";
import youtube from "@images/youtube.png";

export default function () {
  return (
    <div class="px-2 xl:container xl:mx-auto">
      <div class="relative flex flex-col gap-1 rounded-ee-[105.21px] rounded-ss-[105.21px] bg-lime-500 p-[67px_20px_40px_20px] text-white">
        <h3 class="text-base font-bold">CEM MEDIA</h3>
        <div class="text-little flex flex-col gap-[0.625rem] leading-[19.3px]">
          <p>
            Мы проводим и разрабатываем маркетинговые стратегии, помогая
            клиентам достичь своих целей и привлечь целевую аудиторию. Они
            осуществляют анализ и исследование рынка, чтобы определить наиболее
            эффективные способы и каналы коммуникации для каждого конкретного
            бренда.
          </p>
          <p>
            Компания также специализируется на управлении социальными
            медиа-платформами, создании контента для онлайн-продвижения,
            веб-дизайне и разработке веб-сайтов, а также на креативном
            видео-производстве. Они стремятся использовать инновационные и
            творческие подходы, чтобы создавать привлекательный и эффективный
            контент, который поможет клиентам выделиться в конкурентной среде.
          </p>
        </div>

        <img
          class="absolute right-1 top-[-4.3125rem]"
          src={phone}
          alt="CEM MEDIA"
        />
        <img
          class="absolute bottom-[-7.0625rem] left-[-0.25rem]"
          src={youtube}
          alt="CEM MEDIA"
        />
      </div>
    </div>
  );
}
