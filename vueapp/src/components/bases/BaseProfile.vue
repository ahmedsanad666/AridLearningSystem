<template>
  <Teleport to="body">
    <div
      @click="$emit('Close')"
      class="overLay absolute top-0 left-0 h-[200vh] w-full"
    ></div>
    <section
      class="py-4 px-3 rounded-2xl shadow-2xl absolute-center md:w-[60%] w-[80%] border bg-slate-300"
    >
      <h2 class="my-2 text-center md:text-2xl text-xl">تحديث البيانات</h2>
      <base-spinner v-if="isLoading"></base-spinner>
      <form @submit.prevent="updateUser" class="h-[60vh] rounded-2xl shadow-xl">
        <div
          class="flex md:flex-row-reverse flex-col gap-2 justify-between px-4"
        >
          <div class="md:w-1/3">
            <div>
              <input ref="fileInput" type="file" @change="uploadImage" />
              <div v-if="imageUrl">
                <img :src="imageUrl" alt="Uploaded Image" />
              </div>
            </div>
          </div>
          <div class="space-y-2 w-full">
            <input type="text" v-model.trim="id" hidden />
            <!-- <input type="text" v-model.trim="role" hidden /> -->
            <div class="form-controller">
              <label for="firstName">الاسم بالعربية</label>
              <input
                type="text"
                id="firstName"
                placeholder="الاسم بالعربية"
                v-model.trim="ArName"
              />
            </div>
            <div class="form-controller">
              <label for="lastname">الاسم بالانجليزية</label>
              <input
                type="text"
                id="lastname"
                placeholder="الاسم بالانجليزية"
                v-model.trim="EnName"
              />
            </div>
            <div class="form-controller">
              <label for="email">البريد الالكترونى</label>
              <input
                type="email"
                id="email"
                placeholder="البريد الالكترونى"
                v-model.trim="email"
              />
            </div>
            <!-- <div class="form-controller">
              <label for="pass">كلمة المرور</label>
              <input
                type="password"
                id="pass"
                placeholder=" كلمة المرور"
                v-model.trim="password"
              />
            </div> -->
          </div>
        </div>
        <button
          type="submit "
          class="py-2 px-4 rounded-md bg-red-800 text-white font-bold text-center my-2 mr-4"
        >
          تحديث
        </button>
      </form>
    </section>
  </Teleport>
</template>

<script>
export default {
  data() {
    return {
      selectedFile: null,
      imageUrl:null,
      id: "",
      ArName: "",
      EnName: "",
      email: "",
      password: "",
      ValidForm: true,
      error: "",
      isLoading: false,
    };
  },
  methods: {
    uploadImage() {
      const fileInput = this.$refs.fileInput;
      this.selectedFile = fileInput.files[0];
      this.imageUrl = window.URL.createObjectURL(this.selectedFile);
      // this.BlogData.file = fileInput.files[0];
      // this.BlogData.imageUrl = window.URL.createObjectURL(this.BlogData.file);
    },
    async currentUser() {
      let userId = this.$store.getters["auth/userId"];

      try {
        await this.$store.dispatch("students/AllUsers");
        let user = this.$store.getters["students/allUsers"].find(
          (el) => el.id == userId
        );
        
        this.id = user.id;
        this.email = user.email;
        this.ArName = user.arName;
        this.EnName = user.enName;
        this.password = user.password;
        this.imageUrl = "data:image/jpeg;base64," + user.imgByte;
        //    this.role = user.role;
        console.log(user)
        
      } catch (e) {
        console.log(e);
      }
    },
    async updateUser() {
      if (
        this.email === "" ||
        this.arName === "" ||
        this.enName === "" ||
        this.password === ""
      ) {
        this.ValidForm = false;
        return;
      }

      const data = new FormData();
      data.append("id", this.id);
      data.append("enName", this.EnName);
      data.append("arName", this.ArName);
      data.append("email", this.email);
      // data.append("password", this.password);
      data.append("files", this.selectedFile);

      // let payload = {
      //     id: this.id,
      //     firstName : this.firstName ,
      //     lastName : this.lastName,
      //     email  : this.email,
      //     password:this.password
      // }
      this.isLoading = true;
      try {
        await this.$store.dispatch("students/UpdateUser", data);
        await this.$store.dispatch("students/AllUsers");
        location.reload();

        console.log(this.$store.getters["students/allUsers"]);
      } catch (e) {
        this.error =
          e.message || "failed to udpate reload the page and try again ";
      }
      this.isLoading = false;
    },
  },

  created() {
    this.currentUser();
  },
};
</script>

<style lang="scss" scoped>
.absolute-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.form-controller {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  input {
    padding: 0.7rem 1.5rem;
    border-radius: 8px;
    outline: none;
  }
}
form {
  overflow: scroll;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent; /* Set the color of the scrollbar thumb and track */
}

form::-webkit-scrollbar {
  width: 0.5em; /* Adjust the width as needed */
}

form::-webkit-scrollbar-track {
  background: transparent; /* Set the background color of the scrollbar track */
}
.overLay {
  background: rgba(0, 0, 0, 0.8);
}
img {
  height: 200px;
  width: 200px;
}
</style>
