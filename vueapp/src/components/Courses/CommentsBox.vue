<template>
  <section class=" space-y-3 absolute h-[70%] py-2 px-3 w-[95%] m-auto">
    <div class="py-2 flex justify-between items-center">
      <span>{{ count }} Comment </span>
      <span
        @click="$emit('hideComment')"
        class="rounded-full shadow-sm py-1 px-3 bg-slate-100 cursor-pointer"
      >
        <font-awesome-icon :icon="['fas', 'chevron-right']" /> Hide</span
      >
    </div>
    <!-- commnet content -->
    <textarea
      v-model.trim="comment"
      @keyup.enter="AddComment"
      class="outline-none w-full py-1 px-2 bg-slate-100 m-auto rounded-xl h-16"
      placeholder="Write Comment"
    ></textarea>
    <p class=" text-red-700 " v-if="!validForm"> can't be empty</p>
    <hr class="w-3/4 m-auto text-slate-700" />

    <div class="h-[89%] commentSec">
        <base-spinner v-if="isLoading"></base-spinner>
        <ul class="space-y-3 py-2 px-3">
        <li
          class="bg-[#ccc] py-2 px-3 rounded-xl"
          v-for="(el, key) in Comments"
          :key="key"
        >
          {{ el.comment }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  props: ["slideId"],
  data() {
    return {
      comment: "",
      error: "",
      isLoading: false,
      Comments: [],
    validForm :true,
    count:0,
    };
  },
  methods: {
   async AddComment() {
 this.validForm = true;
    if(this.comment == ''){
        this.validForm = false;
        return;
    }
      const userId = this.$store.getters["auth/userId"] + "";
      const slideId = this.slideId;
    const  payload = {
        comment: this.comment,
        applicationUserId: userId,
        slideId: slideId,
      };
      this.isLoading = true;
       try{
        await this.$store.dispatch('courses/AddComment',payload) 
        this.loadComments();
       }catch(e){
        this.error = e.message || "failed to send comment";
       }
       this.isLoading = false;

      this.comment = "";
    },
    async loadComments() {
      this.isLoading = true;
      console.log(this.slideId);
      try {
        await this.$store.dispatch("courses/SlideComments");
        this.Comments = this.$store.getters["courses/slideComments"].filter(e => e.slideId == this.slideId);
        
        this.count = this.Comments.length;
      } catch (e) {
        this.error = e.message || "failed to Load comments";
      }

      this.isLoading = false;
    },
  },
  created() {
      this.loadComments();

  },
};
</script>

<style lang="scss" scoped>
.commentSec {
  overflow: scroll;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent; /* Set the color of the scrollbar thumb and track */
}

.commentSec::-webkit-scrollbar {
  width: 0.5em; /* Adjust the width as needed */
}

.commentSec::-webkit-scrollbar-track {
  background: transparent; /* Set the background color of the scrollbar track */
}
</style>
