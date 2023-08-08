<template>
    <section class=" bg-bgColor" >  

        <base-profile @close = "hideTable" v-if="updateTable"></base-profile>
        <user-data @update-table="showUpdateTable" class=" bg-mianColor">
            
        </user-data>
        <div class="m-auto   md:w-3/4">

            <!--  current user courses -->
            <current-courses ></current-courses>
            <!-- all courses -->
            <all-courses></all-courses>
        </div>
    </section>
</template>

<script>
import CurrentCourses from '@/components/Courses/CurrentCourses.vue'
import BaseProfile from '@/components/bases/BaseProfile.vue'
export default {
    components: { CurrentCourses ,BaseProfile},
    data(){
        return{
            updateTable:false,
        }
    },
    methods:{
        showUpdateTable(){
            this.updateTable = true;
           console.log(this.updateTable)
        },
        hideTable(){
            this.updateTable = false;
        }
    }
    

}
</script>
    BaseProfile

<style>

</style>