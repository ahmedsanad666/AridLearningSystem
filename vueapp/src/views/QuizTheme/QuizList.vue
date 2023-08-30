<template>
  <section class="min-h-screen py-4">
    <h1 class="text-center py-4 my-4 md:text-3xl text-2xl">قائمة الاختبارات</h1>
    <ul class="flex gap-5 m-auto w-3/4 justify-center items-center">
      <li>
        <router-link to="/AllQuiziz/MultipleQuiz">اختيارات متعددة</router-link>
      </li>
      <li>
        <router-link to="/AllQuiziz/fillTheBlank">املا الفراغات</router-link>
      </li>
      <li>
        <router-link to="/AllQuiziz/DragDrop">سحب واسقاط</router-link>
      </li>
      <li>
        <router-link to="/AllQuiziz/match">تطابق</router-link>
      </li>
    </ul>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
li {
  padding: 1rem 2rem;
  border-radius: 1rem;
  box-shadow: 0px 0px 3px 5px rgba($color: #000000, $alpha: 0.5);
  cursor: pointer;
}
</style>
