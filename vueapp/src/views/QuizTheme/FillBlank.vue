<template>
    
    <div class="otp-container">
      <input
        v-for="(char, index) in otp"
        :key="index"
        ref="otpInput"
        :value="char"
        @input="handleInput(index)"
        class="otp-input"
        maxlength="1"
        @focus="focusInput(index)"
      />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        otp: ['', '', '', '', '', '']
      };
    },
    methods: {
      handleInput(index) {
        if (index < this.otp.length - 1 && this.otp[index] !== '') {
          this.otp[index + 1] = '';
          this.$refs.otpInput[index + 1].focus();
        }
      },
      focusInput(index) {
        if (index > 0 && this.otp[index] === '') {
          this.$refs.otpInput[index - 1].focus();
        }
      }
    }
  };
  </script>
  