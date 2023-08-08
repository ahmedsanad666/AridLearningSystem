<template>
  <div class="space-y-6">
    <h1 class="md:text-4xl text-4xl font-bold text-center text-darkBlue">
      {{ secHead }}
    </h1>
    <p class="max-w-2xl px-4 text-center mx-auto text-gray">
      {{ secP }}
    </p>
  </div>
</template>

<script>
export default {
  props: ["secHead", "secP"],
};
</script>

<style></style>
