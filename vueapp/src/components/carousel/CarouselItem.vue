<template>
  <transition :name="direction ? 'slide-in' : 'slide-out'">
    <div
      class="carousel-item absolute top-0 left-0 bottom-0 right-0"
      v-show="currentSlide === index"
      @mouseenter="mouseenter"
      @mouseout="mouseout"
    >
    <!--          :src="require(`../../assets/images/header/${slide}.jpg`)"
 -->
      <img
       
       src="../../assets//images/header/header_1.jpg"
        alt="headerImg"
      />
      <div
        class="absolute lg:inset-20  lg:inset-x-32 lg:w-1/2 lg:h-1/2 h-full w-full  inset-1  text-lightColor flex justify-center items-center"
      >
        <!-- content slide 1 -->
        <div class="content h-1/2 w-1/2 space-y-6" v-show="index === 0">
          <h1 class="lg:text-6xl text-2xl ">It's time for better help.</h1>
          <p>
            We can help you conquer a wide range of psychological and emotional
            problems.
          </p>
          <button
            class="py-2 px-4 rounded-full bg-lightGreen outline-none border-none font-mono hover:bg-redColor"
          >
            Schedule A Visit
          </button>
        </div>
        <!-- content slide 3 -->
        <div class="content h-1/2 w-1/2 space-y-6" v-show="index === 1">
          <h1 class="lg:text-6xl text-2xl">Feeling stress or anxious?</h1>
          <p>
            We can help you conquer a wide range of psychological and emotional
            problems.
          </p>
          <button
            class="py-2 px-4 rounded-full bg-lightGreen outline-none border-none font-mono hover:bg-redColor"
          >
            View All Therapies
          </button>
        </div>
        <!-- content slide 3 -->
        <div class="content h-1/2 w-1/2 space-y-6" v-show="index === 2">
          <h1 class="lg:text-6xl text-2xl">Meet our psychiatrists</h1>
          <p>Our psychiatrists are highly skilled to meet your unique needs.</p>
          <button
            class="py-2 px-4 rounded-full bg-lightGreen outline-none border-none font-mono hover:bg-redColor"
          >
            Meet Psychiatrists
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  emits: ["mouseenter", "mouseout"],
  props: ["slide", "currentSlide", "index", "direction"],
};
</script>

<style lang="scss" scoped>
.carousel-item {
  height: fit-content;
  img {
    filter: brightness(0.25);
  }
}

.slide-in-enter-active,
.slide-in-leave-active,
.slide-out-enter-active,
.slide-out-leave-active {
  transition: 1.3s all ease-in-out;
}

.slide-in-enter-from {
  transform: translateX(-100%);
}
.slide-in-leave-to {
  transform: translateX(100%);
}
.slide-out-enter-from {
  transform: translateX(100%);
}
.slide-out-leave-to {
  transform: translateX(-100%);
}

button {
  transition: all 0.2s ease-in-out;
}
</style>
