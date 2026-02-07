import { useEffect, useState } from "preact/hooks";
import arrow from "@/assets/icons/arrow.png";
import arrowLight from "@/assets/icons/arrow_light.png";

type CarouselSlideIndicatorsProps = {
  carouselId: string;
};

export default function CarouselSlideIndicators({
  carouselId,
}: CarouselSlideIndicatorsProps) {
  const [slideCount, setSlideCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToSlide = (index: number) => {
    if (index < 0 || index >= slideCount) {
      return;
    }
    const carousel = document.getElementById(carouselId);
    const viewport = carousel?.querySelector(".carousel-viewport");
    if (carousel && viewport) {
      const slideWidth = carousel.clientWidth;
      viewport.scrollTo({
        left: index * slideWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const carousel = document.getElementById(carouselId);
    const numOfSlides: number =
      carousel?.querySelectorAll(".slide").length ?? 0;
    setSlideCount(numOfSlides);
  }, [carouselId]);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const el = e.target as HTMLElement;
      const scrollLeft = el.scrollLeft;
      const slideWidth = el.clientWidth;
      setCurrentIndex(Math.round(scrollLeft / slideWidth));
    };

    const carousel = document.getElementById(carouselId);
    const viewport = carousel?.querySelector(".carousel-viewport");
    viewport?.addEventListener("scroll", handleScroll);

    return () => {
      viewport?.removeEventListener("scroll", handleScroll);
    };
  }, [carouselId]);

  return (
    <div class="mt-10 flex items-center justify-center gap-5">
      <button
        class={`${currentIndex <= 0 ? "opacity-50" : "cursor-pointer hover:opacity-70"} mr-10`}
        onClick={() => scrollToSlide(currentIndex - 1)}
      >
        <img
          alt="Previous slide"
          src={arrow.src}
          width="36"
          height="30"
          class="dark:hidden"
        />
        <img
          alt="Previous slide"
          src={arrowLight.src}
          width="36"
          height="30"
          class="hidden dark:block"
        />
      </button>
      {Array.from({ length: slideCount }, (_, index) => (
        <div
          key={index}
          class={`carousel-dot h-2 w-2 cursor-pointer rounded-full bg-black transition-all duration-300 ease-in-out dark:bg-white ${
            index === currentIndex ? "opacity-100" : "opacity-50"
          }`}
          onClick={() => scrollToSlide(index)}
        ></div>
      ))}
      <button
        class={`${currentIndex >= slideCount - 1 ? "opacity-50" : "cursor-pointer hover:opacity-70"} ml-10`}
        onClick={() => scrollToSlide(currentIndex + 1)}
      >
        <img
          alt="Next slide"
          src={arrow.src}
          width="36"
          height="30"
          class="rotate-180 dark:hidden"
        />
        <img
          alt="Next slide"
          src={arrowLight.src}
          width="36"
          height="30"
          class="hidden rotate-180 dark:block"
        />
      </button>
    </div>
  );
}
