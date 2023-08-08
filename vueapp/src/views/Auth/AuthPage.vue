<template>
  <section class="bg-gray-50 bg-gray-900  min-h-screen py-4 my-3">
    <h1 class="text-center text-red-700 tex-2xl" v-if="error">{{ error }}</h1>
    <base-spinner v-if="isLoding"></base-spinner>
    <!-- ............................................ login system ........................................................... -->
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
      v-if="LoginMode"
    >
      <div
        class="w-full bg-[#111827] text-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
          >
            تسجيل الدخول
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="LogIn">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900"
                >البريد الاكتروني
              </label>
              <input
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
                v-model.trim="email.val"
                @blur="clearValidity('email')"
              />
              <p class="text-md text-red-800" v-if="!email.isValid"> {{ email.error }}</p>
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900"
                >كلمة المرور</label
              >
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                v-model.trim="password.val"
                @blur="clearValidity('password')"


              />
              <p class="text-md text-red-800" v-if="!password.isValid"> {{ password.error }}</p>
              <p class="text-md text-red-800" > كلكة المرور يجب ان تحتوى على احرف كبيره و صغيره و علامات خاصه</p>


            </div>
            <!-- <div class="flex items-center justify-between">
                        <div class="flex items-start">
                            <div class="flex items-center h-5">
                                <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="">
                            </div>
                            <div class="ml-3 text-sm">
                                <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                            </div>
                        </div>
                        <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div> -->
            <button
              type="submit"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              تسجيل الدخول
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              ليس لديك حساب ?
              <button
                @click="ToggleMode"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
            انشاء حساب 
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
    <!-- ............................................ signup system ........................................................... -->
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
      v-else
    >
      <div
        class="w-full bg-[#111827] text-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            انشاء حساب جديد
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="SignUp" >
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >الاسم بالعربي
              </label>
              <input
                type="text"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
                v-model.trim="firstName.val"
                @blur="clearValidity('firstName')"

                
              />
              <p class="text-md text-red-800" v-if="!firstName.isValid"> {{ firstName.error }}</p>

            </div>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >الاسم بالانجليزي</label
              >
              <input
                type="text"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
                v-model.trim="lastName.val"
                @blur="clearValidity('lastName')"

              />
              <p class="text-md text-red-800" v-if="!lastName.isValid"> {{ lastName.error }}</p>

            </div>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >اسم المستخدم</label
              >
              <input
                type="text"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
                v-model.trim="userName.val"
                @blur="clearValidity('userName')"

              />
              <p class="text-md text-red-800" v-if="!userName.isValid"> {{ userName.error }}</p>

            </div>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >البريد الالكترونى</label
              >
              <input
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
                v-model.trim="email.val"
                @blur="clearValidity('email')"

              />
              <p class="text-md text-red-800" v-if="!email.isValid"> {{ email.error }}</p>

            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >المرور</label
              >
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                v-model.trim="password.val"
                @blur="clearValidity('password')"

              />
              <p class="text-md text-red-800" > كلكة المرور يجب ان تحتوى على احرف كبيره و صغيره و علامات خاصه</p>
              <p class="text-md text-red-800" v-if="!password.isValid"> {{ password.error }}</p>

            </div>
            <!-- <div>
              <label for="role">اختر دور :</label>
              <select v-model.trim="role.val" id="role">
                <option value="user">مستخدم</option>
                <option value="admin">مشرف</option>
              </select>
              <p class="text-md text-red-800" v-if="!role.isValid"> {{ role.error }}</p>

              
            </div> -->
            <button
            
              type="submit"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              انشاء حساب
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              <button
                @click="ToggleMode"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                تسجيل الدخول
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      LoginMode: true,
      firstName:{
        val:'',
        isValid:true
        ,
        error:''
      },
      lastName: {
        val:'',
        isValid:true ,
        error:''
      },
      userName: {
        val:'',
        isValid:true ,
        error:''
      },
      email: {
        val:'',
        isValid:true ,
        error:''
      },
      // role:{
      //   val:'',
      //   isValid:true ,
      //   error:''
      // },
      password: {
        val:'',
        isValid:true ,
        error:''
      },
      isLoding: false,
    ValidForm : true,
    error:''
    };
  },
  methods: {
    ToggleMode() {
      this.LoginMode = !this.LoginMode;
    },

    clearValidity(input){
      this[input].isValid = true;
    },
    ValidateForm(){
    
      this.ValidForm = true;
      if(this.LoginMode){
        if(this.email.val === '' || !this.email.val.includes("@")){
          this.email.isValid = false
          this.email.error = "لا يمكن ان يكون الحقل خال او لا يحتوى على @"
          this.ValidForm = false;
        };
        if(this.password.val === '' ){
          this.email.isValid = false
          this.email.error = "لا يمكن ان يكون الحقل خال "
          this.ValidForm = false;
        };
      }else{
    
        if(this.email.val === '' || !this.email.val.includes("@")){
          this.email.isValid = false
          this.email.error = "لا يمكن ان يكون الحقل خال او لا يحتوى على @"
          this.ValidForm = false;
        };
        if(this.firstName.val === '' ){
          this.firstName.isValid = false
          this.firstName.error = "لا يمكن ان يكون الحقل خال "
          this.ValidForm = false;
        };
        if(this.lastName.val === ''){
          this.lastName.isValid = false
          this.lastName.error = "لا يمكن ان يكون الحقل خال"
          this.ValidForm = false;
        };
        if(this.userName.val === '' ){
          this.userName.isValid = false
          this.userName.error = "لا يمكن ان يكون الحقل خال"
          this.ValidForm = false;
        };
        // if(this.role.val === '' ){
        //   this.role.isValid = false
        //   this.role.error = "لا يمكن ان يكون الحقل خال"
        //   this.ValidForm = false;
        // };

        if(this.password.val === '' || this.password.val.length < 6){
          this.password.isValid = false
          this.password.error = " لا يمكن ان يكون الحقل خال ويجب ان يتكون من احرف كبيره و صغيره و علامات خاصه وارقام "
          this.ValidForm = false;
        };
      
      }
    },
   async SignUp() {
      this.ValidateForm();
      if(!this.ValidForm){
        return;
      }
      const userData = {
        arName: this.firstName.val,
        enName: this.lastName.val,
        userName: this.userName.val,
        email: this.email.val,
        // role: this.role.val,
        password: this.password.val,
      };
this.isLoding = true;
      try{
        console.log(userData);
       await this.$store.dispatch("auth/signUp",userData);
       location.reload();

      }catch(e){
     this.error = e.messsage || 'failed try again';
    }
    this.isLoding = false;




  },
 async LogIn(){
    this.ValidateForm();
      if(!this.ValidForm){
        return;
      }
    const userData = {
    
        email: this.email.val,
        password: this.password.val,
      };
      this.isLoding = true;

      try{
       await this.$store.dispatch("auth/logIn",userData);
       this.$router.push('home');

      }catch(e){
      this.error  = e.messsage || "failed try again";
    }
    this.isLoding = false;

  }
}}
</script>

<style lang="scss" scoped>
input {
  color: black;
}

select{
  background: #111827;
  color:white
;}
</style>
