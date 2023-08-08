<template>
  <button class="text-center py-2 px-4 rounded-full  "  :class="`${bg}`">
    {{ text }}
  </button>
</template>

<script>
export default {
  props: ["text","bg"],
};
</script>

<style lang="scss" scoped>

.bg-blue{
background: #2980b9;
}
.bg-red{
  background: #c0392b;
}


</style>
