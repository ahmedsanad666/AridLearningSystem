<template>
  <section class="min-h-screen">
    <h1 class="text-center py-3 my-4 font-bold md:text-3xl text-2xl">
      LeaderBoard
    </h1>
    <div class="container py-3 px-4">
      <ul class="md:w-[50%] w-[90%] m-auto shadow-xl rounded-l-lg space-y-4">
       
        <li
          class="flex rounded-lg py-3 px-2 justify-between items-center"
          v-for="(item, k) in newData"
          :key="k"
        >
          <span>{{ k}} | {{ item.apiUser.userName  }}</span>
          <span>{{ item.userPoints }}</span>
          <!-- <div >
                <img :src="`data:image/jpeg;base64,${item.imgByte}`"  />
              </div> -->
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      UsersData: [],
      newData: [],
    };
  },
  methods: {
    async usersPoints() {
      try {
        await this.$store.dispatch("courses/userCourses");
        await this.$store.dispatch('students/AllUsers')
        this.UsersData = this.$store.getters["courses/UserCourses"];

        const users = this.$store.getters["students/allUsers"];

      
        this.newData = this.UsersData.slice().sort(
          (a, b) => b.userPoints - a.userPoints
        );

  //  this.newData = this.newData.map((e) => {
  //         const user = users.find((user) => user.id == e.userId);
  //         return { ...e, ...user };
  //       });
        console.log(this.newData);
        
      } catch (e) {
        console.log(e);
      }
    },
  },

  created() {
    this.usersPoints();
  },
};
</script>

<style lang="scss" scoped>
li:nth-child(odd) {
  background: #444654;
  color: #ecf0f1;
}
img{
  width:45px;
}
</style>
