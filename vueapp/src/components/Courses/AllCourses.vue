<template>
    <section class=" min-h-screen">

<h1 class="text-center py-5 font-bold lg:text-3xl text-2xl"> جميع الدورات</h1>

<div v-if="Error" class="  text-red-600 flex items-center justify-center m-auto h-11 shadow-md w-1/3 rounded-lg">

    <h1 class=" text-center font-bold text-3xl ">{{Error
     }}</h1>
</div>

<base-spinner v-if="isLoading"></base-spinner>
  <ul class="w-3/4 space-y-3 mx-auto my-4 " >
    <li  class=" bg-mainText py-3 px-2 rounded-lg" v-for="(item,key) in allCourses" :key="key">
     <button v-if="!item.enrolled && isLoggedIn" @click="enrollCourse(item.id)" class=" text-white absolute left-0 w-[10%] h-full top-0 bg-red-600">تسجيل الان </button>

     
     <button v-else-if="isLoggedIn" class=" text-white absolute left-0 w-[10%] h-full top-0  bg-green-700"> مسجل </button>
        <router-link  :to=" item.enrolled ?`/profile/${item.id}` : `/courses/${item.id}`" class=" text-mianColor border flex px-5 items-center font-bold  tracking-wider" >
          {{ item.name }}
      </router-link>
  </li>
</ul>

</section>
</template>

<script>
export default {
    data(){
        return{
                isLoading:false,
                Error:'',
            }
    },
    computed:{
        isLoggedIn() {
      return this.$store.getters['auth/isAuthenticated']
    },
    allCourses(){

        let userCourse = this.$store.getters['courses/UserCourses'];
        let UserId = this.$store.getters['auth/userId'];
        let courses = this.$store.getters['courses/allCourses'];

        let courseData = courses.map(el => {
  const isEnrolled = userCourse.some(item => item.courseId === el.id && item.apiUserId === UserId );
userCourse.forEach(element => {
    console.log(element)
});
  return {
    ...el,
    enrolled: isEnrolled,
  };
});

      
        return  courseData;
    },

   
},
methods:{
   
    async enrollCourse(CourseId){


     const    payload={
            apiUserId:this.$store.getters['auth/userId'],
            userPoints:0,
            courseId:CourseId
        }
        try{
            await this.$store.dispatch('courses/AddUserCourse',payload);
            this.$router.push('/profile');
        }catch(e){
            this.Error = e.message || "failed to enroll";
        }

    },
    async loadCourses(){
        this.isLoading = true;
    
    try{
      await this.$store.dispatch('courses/AllCourses');
      await this.$store.dispatch('courses/userCourses');
    }catch(e){
      this.Error = "failed to Get Courses" || e.message; 
    
  }
  this.isLoading = false;
},
},
created(){
this.loadCourses();
}

}
</script>

<style lang="scss" scoped>

li{
    cursor:pointer;
    position: relative

    ;
    min-height: 3rem;

a{
    position: absolute;
    width: 90%;
    height: 100%;
    top:0;
    right: 0;

}
}
</style>