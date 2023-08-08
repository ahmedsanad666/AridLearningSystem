<template>
  
  <section class="min-h-screen" >
    <h1 class="text-center  md:text-3xl text-xl font-bold py-3 my-2">المدونه </h1>
    
    <div class="container my-12 mx-auto px-4 md:px-12">
        <base-spinner v-if="isLoading"></base-spinner>
        <div>
            <router-link v-if="isAdmin && isLoggedIn" class="py-2 px-4 bg-red-800  text-white hover:bg-slate-300 rounded-lg hover:text-red-800 " to="/Blogs/AddBlog">Add New Blog</router-link>
        </div>
        <div class="flex flex-wrap -mx-1 lg:-mx-4">
            
        <!-- Column -->
        
        <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3" v-for="(blog , key) in allBlogs" :key="key">

            <!-- Article -->
            <article class="overflow-hidden rounded-lg shadow-lg">

                <router-link :to="`/Blogs/${blog.id}`">
                    <img alt="Placeholder" class="block h-auto w-full" :src="`data:image/jpeg;base64,${blog.imgByte}`">
                </router-link>

                <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                    <h1 class="text-lg">
                        <a class="no-underline hover:underline text-black" href="#">
                           {{ blog.title }}
                        </a>
                    </h1>
                    <p class="text-grey-darker text-sm">
                        {{blog.CreatedDate}}
                    </p>
                </header>

                <footer class="flex items-center justify-between leading-none p-2 md:p-4">
                    <a class="flex items-center no-underline hover:underline text-black" href="#">
                        <img alt="Placeholder" class="block rounded-full mx-4" :src="`data:image/jpeg;base64,${blog.cuUser.imgByte}`" >
                        <p class="ml-2 text-sm">
                           {{ blog.apiUser.userName}}
                        </p>
                    </a>
                    
                </footer>

            </article>
            <!-- END Article -->

        </div>
        <!-- END Column -->

     

    </div>
</div>
  
  </section>
</template>

<script>
import dayjs from 'dayjs';
export default {    
    data(){
       return{
        error:'',
        allBlogs:[],
        isLoading:false,
       }
    },
    computed:{
        isLoggedIn() {
      return this.$store.getters['auth/isAuthenticated']
    },
    isAdmin() {
      return this.$store.getters['auth/isAdmin']
    },
    }
    ,
    methods:{
       async GetAllBlogs(){
            this.isLoading = false;
            try{

            await this.$store.dispatch('blog/AllBlogs');
            await this.$store.dispatch("students/AllUsers");
           const  Blogs = this.$store.getters['blog/AllBlogs'];
            
        const users = this.$store.getters["students/allUsers"];

           this.allBlogs = Blogs.map(blog => {
            const dateObj = dayjs(blog.createDate);
            const CreatedDate = dateObj.format('ddd MMM');
            
                const user = users.find(el => el.id === blog.apiUser.id);
             
            return{
               cuUser:user,
                ...blog,
                CreatedDate
            }  
        }) 

     
            }catch(e){
                this.error = e.message || "Failed to Get Blogs Try Again later";

            }


        }
    },
    created(){
        this.GetAllBlogs();
    }
}
</script>

<style lang="scss" scoped>
footer{

    img{
        width:45px;
    }
}
</style>