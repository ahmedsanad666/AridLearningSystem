<template>
  
  
  <section class=" min-h-screen">
 
    <div class="container py-5 ">

        <h1 class="text-center md:text-3xl text-xl font-bold">{{ blog.title }}</h1>
<base-spinner v-if="isLoading"></base-spinner>
        <div class="  w-3/4 m-auto rounded-2xl shadow-lg py-4 px-3 my-3 " v-html="formattedContent">
        </div>
    </div>
  </section>
</template>

<script>
import DOMPurify from 'dompurify';

export default {
    data(){
        return{
            blog:[],
            error:'',
            isLoading:false
        }
    },
    computed:{
        formattedContent() {
      // Use DOMPurify to sanitize the HTML content and prevent any potential security issues
      return DOMPurify.sanitize(this.blog.content, { USE_PROFILES: { html: true } });
    }
    },
    methods:
    {
      async  getBlog(){
            const blogId = this.$route.params.BlogId;
           this.isLoading  = true;
            try{
                await this.$store.dispatch('blog/AllBlogs');
           const  Blogs = this.$store.getters['blog/AllBlogs'];
            
           this.blog = Blogs.find(blog => blog.id == blogId);
        
            }catch(e){
this.error = e.message || "failed to get Blog data";
            }

            this.isLoading = false;
        }
    }
,
created(){
    this.getBlog();
    console.log(this.formattedContent)
}
}
</script>

<style>

</style>