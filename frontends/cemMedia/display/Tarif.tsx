import { Cemjsx, Static } from "cemjs-all";
import video from "@images/tarifs/video.png";
import radio from "@images/tarifs/radio.png";
import tarifs from "json/tarifs.json";

export default function () {
  return (
    <div class="px-5 pb-[95px] xl:container xl:mx-auto">
      <h2 class="mb-8 text-base font-semibold leading-[33.89px]">Тарифы</h2>
      <div class="flex flex-col gap-[22px] @767:grid @767:grid-cols-2">
        {tarifs.map((item) => {
          return (
            <div class="pointer-events-none flex flex-col [&:nth-child(even)_#title]:self-end [&:nth-child(even)_#title]:![border-radius:0_60px_0_60px]">
              {item.img == "video" ? (
                <div class="h-0 w-[242px]">
                  <img
                    class="ml-auto mr-[-75px] mt-[-43px] h-[100px] w-[100px]"
                    src={video}
                    alt="Итервью"
                  />
                </div>
              ) : null}
              {item.img == "radio" ? (
                <div class="h-0 w-[242px] self-end">
                  <img
                    class="ml-[-90px] mr-auto mt-[-57px] h-[150px] w-[150px]"
                    src={radio}
                    alt="Итервью"
                  />
                </div>
              ) : null}
              <p
                id="title"
                init={($el: any) => {
                  const observer = new IntersectionObserver((entries) => {
                    entries.forEach(async (entry) => {
                      if (entry.isIntersecting) {
                        observer.unobserve($el);
                        $el.classList.add("scale-[1.1]");
                        setTimeout(() => {
                          $el.classList.remove("scale-[1.1]");
                        }, 1000);
                      }
                    });
                  });
                  observer.observe($el);
                }}
                class={[
                  "relative z-10 mb-[-21px] flex max-h-[73px] w-[242px] items-center justify-center p-[27px] text-center text-little font-medium leading-[19px] text-white [transition:all_0.5s_ease] [border-radius:60px_0_60px_0]",
                  `bg-${item.color}`,
                ]}
              >
                {item.title}
              </p>
              <div
                html={item.text}
                class="relative z-[9] flex h-full flex-col gap-[10px] rounded-[22px] border-[0.5px] border-solid border-black bg-white p-[45px_25px] text-little leading-[19.3px]"
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
