<template>
  <ul class="text-white" :class="flex ? 'flex space-x-3 ' : 'space-y-6'">
    <li>
      <a href="">
        <font-awesome-icon
          :icon="['fab', 'facebook']"
          class="icon alt"
          size="2xl"
        />
      </a>
    </li>
    <li>
      <a href="">
        <font-awesome-icon
          :icon="['fab', 'twitter']"
          class="icon alt"
          size="2xl"
        />
      </a>
    </li>
    <li>
      <a href="">
        <font-awesome-icon icon="fa-brands fa-square-instagram" size="2xl" />
      </a>
    </li>
    <li>
      <a href="">
        <font-awesome-icon icon="fa-brands fa-google-plus fas-2xl" size="2xl" />
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "social",
  props: {
    flex: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.svg-inline--fa {
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #e3434b;
  }
}
</style>
