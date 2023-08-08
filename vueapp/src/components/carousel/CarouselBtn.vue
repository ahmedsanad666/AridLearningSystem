<template>
  <div class="controls absolute w-full flex justify-between px-6">
    <button class="left" @click="$emit('prev')">
      <font-awesome-icon class="text-lightColor md:p-4 md:px-8  p-2 border rounded-3xl "  :icon="['fa-solid', 'fa-arrow-left']" />
    </button>
    <button class="left" @click="$emit('next')">
      <font-awesome-icon  class="text-lightColor  md:p-4  md:px-8 p-2 border rounded-3xl " :icon="['fa-solid', 'fa-arrow-right']" />
    </button>
  </div>
</template>

<script>
export default {
  emits: ["prev", "next"],
};
</script>

<style lang="scss" scoped>
.controls {
  top: 40%;

  button {
    .svg-inline--fa {
    
    // color:$lightColor;

box-shadow: 0px 0px 6px 1px #ccc;
    }
  }
}
</style>
