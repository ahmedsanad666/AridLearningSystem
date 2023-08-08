<template>
  <section class="space-y-6">
    <!-- question -->
<div class=" bg-mianColor py-7 shadow-lg px-5 rounded-xl  mx-auto">   
    <p class="text-center  max-w-xl mx-auto">
        {{ question }}
    </p>
</div>
        <div>
           
                
                <ul class=" space-y-4">
                <li  class="bg-mianColor rounded-lg shadow-md  py-2 px-10 tracking-wide    hover:bg-slate-400" v-for="(el, key) in choices"
                    :key="key" 
                    ref="myli"
                    @click="MyEvent(key)">
                    
                    <span class="flex justify-center items-center ">{{ key }}</span> 
                    
                    {{ el }}
                </li>

            </ul>
          
        </div>

  </section>
</template>

<script>

export default {
  
    props:{
        question:{
            type:String,
            required:true
        },
        choices:{
            type:Array,
            required:true
        },
      
        rightAns:{
            type:Number,
            required:true
        }

        
    },
    data(){
        return{
            showAns:false
        }
    },
    
    methods:{
        MyEvent(key){
            let li = this.$refs.myli;
            li.forEach(element => {
               element.classList.remove("checked"); 
            });
            li[key].classList.add('checked');

            this.$emit('MyEvent',key);
        },
        ShowAnsState(key){
            let li = this.$refs.myli;
            this.showAns = true;
          
            li[key -1].classList.add('right');


     
        },
        removeRightClass(){
            let li  = this.$refs.myli;
            li.forEach(el =>{
                el.classList.remove('right');
                el.classList.remove('checked');

            })
        }
    },
 


}
</script>

<style lang="scss" scoped>

li.checked{
    background: rgb(148 163 184)  ;
}

li.right{
    background: green;
}
li{
    cursor: pointer;
    transition: .3s linear
    ;
position: relative;

span{
    position: absolute;
    background: #2c3e50;
    top:0;
    left:0;
    height: 100%;
    padding: .5rem;
    color:white;
    font-weight: 500;
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
}
}

</style>