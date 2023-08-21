<template>
  <div
    class="w-full py-4 mb-2 flex items-center justify-between px-5 text-white gap-2"
  >
    <audio controls autoplay loop class="hidden" ref="music">
      <source src="~\src\assets\images\audio\QuizTime.mp3" type="audio/mpeg" />
    </audio>
    <ul class="flex gap-4 w-3/4 items-center">
      <li
        class="p-2 px-3 rounded-md cursor-pointer bg-bgLight"
        title="خروج"
        @click="exit"
      >
        <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" />
      </li>
      <li
        class="p-2 px-3 rounded-md cursor-pointer bg-bgLight"
        @click="toggleMusic"
      >
        <font-awesome-icon :icon="['fas', 'music']" v-if="music" />
        <img
          src="~\src\assets\images\musicSlash.svg"
          class="w-5 text-white icon"
          alt=""
          v-else
        />
      </li>
      <li
        class="border-textLight border tracking-wider grow md:grow-0 text-textLight relative h-full md:basis-[35%] basis-[40%] py-2 px-3 rounded-md"
      >
        Streak

        <div
          class="border-l-2 border-textLight absolute top-1 bottom-1 right-[35%]"
        ></div>
        <div
          class="border-l-2 absolute border-textLight top-1 bottom-1 right-[65%]"
        ></div>
      </li>
      <li class="py-2 px-4 bg-bgLight rounded-md">1/{{ QNumber }}</li>
    </ul>
    <ul class="flex gap-5 justify-end px-2 w-1/4 items-center">
      <li
        class="flex items-center flex-row-reverse bg-bgLight rounded-md py-1 px-3"
      >
        <img
          src="~\src\assets\images\QuizTheme\medal.png"
          alt="medale"
          class="w-8"
        />
        <span class="text-xl"> {{ rank > 0 ? rank : "--" }} </span>
      </li>
      <li class="md:block hidden cursor-pointer" @click="enterFullscreen">
        <font-awesome-icon :icon="['fas', 'expand']" class="text-3xl" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["QNumber", "rank"],
  data() {
    return {
      music: true,
    };
  },
  methods: {
    toggleMusic() {
      if (this.music) {
        this.$refs.music.pause();
        this.music = !this.music;
      } else {
        this.music = !this.music;
        this.$refs.music.play();
      }
    },
    enterFullscreen() {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    },
    exit() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  filter: invert(143%) sepia(69%) saturate(6451%) hue-rotate(197deg)
    brightness(198%) contrast(161%);
}
</style>
