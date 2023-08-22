<template>
  <div
    class="w-full py-4 mb-2 flex items-center justify-between px-5 text-white gap-2"
  >
    <audio controls autoplay loop class="hidden" ref="music">
      <source src="~\src\assets\images\audio\QuizTime.mp3" type="audio/mpeg" />
    </audio>
    <audio controls autoplay class="hidden" ref="streak">
      <source src="~\src\assets\images\audio\streak.mp3" type="audio/mpeg" />
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
        class="border-textLight border tracking-wider grow md:grow-0 relative h-full text-black select-none md:basis-[35%] basis-[40%] py-2 px-3 rounded-md"
      >
        Streak
        <div
          :style="{ width: streak + '%' }"
          class="absolute top-0 bottom-0 right-0 streak text-white font-bold flex items-center tracking-wider bg-[#FFB400] rounded-md"
        ></div>
        <div
          class="tracking-wider text-white absolute right-3 flex items-center px-4 left-0 top-0 bottom-0"
        >
          Streak
        </div>
        <div
          class="border-l-2 border-textLight absolute top-1 bottom-1 right-[35%]"
        ></div>
        <div
          class="border-l-2 absolute border-textLight top-1 bottom-1 right-[65%]"
        ></div>
      </li>
      <li class="py-2 px-4 bg-bgLight rounded-md">
        {{ currentQNumber }}/{{ QNumber }}
      </li>
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
  props: ["QNumber", "rank", "currentQNumber"],
  data() {
    return {
      music: true,
      streak: 0,
    };
  },
  methods: {
    updateStreak() {
      if (this.streak >= 0 && this.streak < 100) {
        this.$refs.streak.play();
        this.streak = 33.33;
      }
    },
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
  mounted() {},
};
</script>

<style lang="scss" scoped>
.icon {
  filter: invert(143%) sepia(69%) saturate(6451%) hue-rotate(197deg)
    brightness(198%) contrast(161%);
}
.streak {
  transition: width 2s linear;
}
</style>
