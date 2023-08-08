<template>
  <div class="bg-mianColor rounded-lg shadow-md  py-4 px-3 flex justify-between items-center tracking-wide  font-bold  md:text-2xl text-xl hover:bg-slate-400">
   {{ LessonName }} 
   <font-awesome-icon :icon="['fas', 'angle-down']" />
 
  </div>
</template>

<script>
export default {
props:['LessonName']
}
</script>

<style>

</style>