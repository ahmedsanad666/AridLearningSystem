<template>
  <section class=" bg-mianColor rounded-lg shadow-md" >
 
    <div class="  md:w-3/4  mx-auto px-4 py-3 space-y-3">

        <h1 class=" md:text-5xl text-2xl font-bold">
            {{ CourseName }}
        </h1>
        <p>{{ CourseDes }}</p>
    </div>
  
  </section>
</template>

<script>
export default {

    props:['CourseName','CourseDes'],
}
</script>

<style lang="scss" scoped>
section{
    height:40%;
}
</style>