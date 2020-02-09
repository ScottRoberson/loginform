<template>

<section>
  <h1>Signup</h1>
  <div v-if = "signingUp">
    <img src="../assets/pacman_loading.svg" alt="">
  </div>
  <div v-if="errorMessage" class="alert alert-danger" role="alert">
  {{errorMessage}}
</div>
<form 
    v-if="!signingUp"        @submit.prevent="signup">
  <div class="form-group">
    <label for="username">Username</label>
    <input type="text"
     v-model="user.username"
     class="form-control"
     id="username"
     aria-describedby="usernameHelp"
     placeholder="Enter a username" required>
    <small id="usernameHelp" class="form-text text-muted">
    Username must be at least 2 characters and shorter
    than 30. Username can only contain alphanumeric characters and underscores.</small>
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="password">Password</label>
      <input type="password"
      v-model="user.password"
      class="form-control"
      id="password"
      aria-describedby="passwordHelp"
      placeholder="Enter a password" required>
      <small id="passwordHelp" class="form-text text-muted">
      Password must be at least 10 or more characters long.</small>
    </div>
    <div class="form-group col-md-6">
      <label for="confirmPassword">Confirm Password</label>
      <input
      v-model="user.confirmPassword"
      type="password"
      class="form-control"
      id="confirmPassword"
      aria-describedby="confirmPasswordHelp"
      placeholder="Confirm Password" required>
      <small id="passwordHelp" class="form-text text-muted">
      Please Confirm your password</small>
    </div>
  </div>
    <button type="submit" class="btn btn-primary">Signup</button>
  </form>
</section>

</template>

<script>

import Joi from '@hapi/joi';


const SIGNUP_URL = 'http://localhost:5000/auth/signup';

const schema = Joi.object({
  username: Joi.string().regex(/(^[a-zA-Z0-9_]*$)/).min(2).max(30)
    .required(),
  password: Joi.string().trim().min(10).required(),
  confirmPassword: Joi.string().trim().min(10).required(),
  
});

export default {
  data: () => ({
    signingUp:false,
    errorMessage: '',
    user: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  }),
watch:{
user:{
  handler(){
    this.errorMessage=''
  },
  deep:true,
},
},

  methods: {
    signup() {
      const body = {
        username:this.user.username,
        password:this.user.password,
        };
      this.signingUp=true;
      fetch(SIGNUP_URL, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
        'content-type': 'application/json',
  },
}).then(response => {
  if (response.ok) {
      return response.json();
  }
      return response.json().then(error => {
      throw new Error(error.message);
  });
}).then(user => {
    setTimeout(()=>{
      this.signingUp = false;
      this.$router.push('/login');
    },1000)
}).catch(error => {
    setTimeout(()=>{
      this.signingUp = false;
      this.errorMessage='That username is already taken. Please choose another one';
    },1000);
      })
    }
  }
}
</script>

<style>
</style>


//This code threw an error when submiting the form.
// validUser() {
//   if (this.user.password !== this.user.confirmPassword) {
//     this.errorMessage = 'Passwords must match. 🙈';
//      return false;
//   }
//   const result = schema.validate(this.user);
//   if (result.error === null) {
//     return true;
//   }
//   if(result.error.includes('username')){
//     this.errorMessage ='Username is invalid 😭'
//     }else{
//       this.errorMessage = 'Password is invlaid 🙅‍♂️'
//   }
//   },
