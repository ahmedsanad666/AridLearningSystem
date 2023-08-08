<template>
    <section>

<h1 class="text-center py-5 font-bold lg:text-3xl text-2xl"> Current user courses</h1>
<div v-if="Error" class="  text-red-600 flex items-center justify-center m-auto h-11 shadow-md w-1/3 rounded-lg">

<h1 class=" text-center font-bold text-3xl ">{{Error
 }}</h1>
</div>

<base-spinner v-if="isLoading"></base-spinner>
  <ul class="w-3/4 space-y-3 mx-auto my-4 " >
    <li class=" bg-mainText py-3 px-2 rounded-lg" v-for="(item,key) in currentCourses" :key="key">
      <router-link :to="`/profile/${item.id}`" class=" text-mianColor  flex px-5 items-center font-bold  tracking-wider" >
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
            currentCourses:[],
            isLoading:false,
            Error:''
        }
    },

    computed:{


   
},
methods:{

async currentCours(){
    let currentUserId = this.$store.getters['auth/userId'];
    this.isLoading = true;
    try{
      await this.$store.dispatch('courses/AllCourses');
      await this.$store.dispatch("courses/userCourses");
      await this.$store.dispatch('students/AllUsers')

    
      let userCoursesData = this.$store.getters['courses/UserCourses'].filter(
            (el) => (el.userId === currentUserId)
        );
        console.log( userCoursesData = this.$store.getters['courses/UserCourses'].filter(
            (el) => (el.apiUserId === currentUserId)
        ));
        
        let AllCourses = this.$store.getters['courses/allCourses'];

        userCoursesData.forEach((courseData) =>{
            AllCourses.forEach(el =>{
                if(el.id == courseData.courseId){
                    this.currentCourses.push(el);    
                    
                }
            })
        })


    }catch(e){
      this.Error = "failed to Get Courses" || e.message; 
    
  }
  this.isLoading = false;

       
    
   },
},
created(){
    this.currentCours();
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
    width: 100%;
    height: 100%;
    top:0;
    left: 0;

}

}
</style>