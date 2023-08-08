<template>
  <div class="carousel lg:h-screen h-96 relative">
    <div class="carosul-innter relative overflow-hidden h-full">
      <carosul-item
        v-for="(slide, index) in slides"
        :key="index"
        :slide="slide"
        :index="index"
        :currentSlide="currentSlide"
        :direction="dir"
        @mouseenter="stopSliderTimer"
        @mouseout="startSliderTimer"
      />
      />
    </div>
    <!-- controls -->
    <carouselBtn @next="next" @prev="prev" />
    <!-- social media -->

    <div class="social-media absolute hidden lg:block inset-y-1/2 left-10 mt-6">
      <social-media />
    </div>
    <div class="goDown absolute w-full top-3/4 text-center hidden lg:block">
      <a href="#serv">
        <span class="p-8 px-4 rounded-3xl">
          <font-awesome-icon
            class="text-lightColor"
            :icon="['fa-solid', 'fa-arrow-down']"
            size="xl"
          />
        </span>
      </a>
    </div>
  </div>
</template>

<script>
import CarosulItem from "./carousel/CarouselItem.vue";
import CarouselBtn from "./carousel/CarouselBtn.vue";
import SocialMedia from "./bases/SocialMedia.vue";

export default {
  components: { CarosulItem, CarouselBtn, SocialMedia },
  data() {
    return {
      slides: ["header_1", "header_2", "header_3"],

      currentSlide: 0,
      interVal: null,
      dir: true,
    };
  },
  methods: {
    setSlideTime(index) {
      this.currentSlide = index;
    },
    _next() {
      this.dir = true;
      const index =
        this.currentSlide < this.slides.length - 1 ? this.currentSlide + 1 : 0;
      this.setSlideTime(index);
    },
    next() {
      this._next();
      this.startSliderTimer();
    },
    prev() {
      this.dir = false;
      const index =
        this.currentSlide > 0 ? this.currentSlide - 1 : this.slides.length - 1;
      this.setSlideTime(index);
    },
    startSliderTimer() {
      this.stopSliderTimer();
      this.interVal = setInterval(() => {
        this._next();
      }, 5000);
    },
    stopSliderTimer() {
      clearInterval(clearInterval(this.interVal));
    },
  },

  mounted() {
    this.startSliderTimer();
  },
  beforeUnmount() {
    this.stopSliderTimer();
  },
};
</script>

<style scoped lang="scss">
.goDown {
  span {
    cursor: pointer;
    box-shadow: 0px 0px 6px 1px #ccc;

    .svg-inline--fa {
      animation: arrow-animation infinite 2s;
      // transform: translateY(-5px);
    }
  }
}
@keyframes arrow-animation {
  0% {
    transform: translate(0, -8px);
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  80% {
    opacity: 0;
    transform: translate(0, 20px);
  }
  100% {
    opacity: 0;
  }
}
</style>
