<template>
  <section>
  <h1>Login</h1>
  <div v-if = "loggingIn">
    <img src="../assets/pacman_loading.svg" alt="">
  </div>
  <div v-if="errorMessage" class="alert alert-danger" role="alert">
  {{errorMessage}}
</div>
<form v-if = "!loggingIn" @submit.prevent="login()">
  <div class="form-group">
    <label for="username">Username</label>
    <input type="text"
     v-model="user.username"
     class="form-control"
     id="username"
     aria-describedby="usernameHelp"
     placeholder="Enter username" required>
     <small id="usernameHelp" class="form-text text-muted"> Enter your username</small>
  </div>
  <div class="form-group">
    <label for="password">Password</label>
      <input type="password"
      v-model="user.password"
      class="form-control"
      id="password"
      aria-describedby="passwordHelp"
      placeholder="Enter password" required>
      <small id="passwordHelp" class="form-text text-muted">Enter your password</small>
  </div>
  <button type="submit" class="btn btn-primary">Login</button>
</form>
</section>
</template>

<script>
import Joi from '@hapi/joi';

const LOGIN_URL = 'http://localhost:5000/auth/login';


const schema = Joi.object({
  username: Joi.string().regex(/(^[a-zA-Z0-9_]*$)/).min(2).max(30)
    .required(),
  password: Joi.string().trim().min(10).required(),
});


export default {
  data:()=>({
    errorMessage:'',
    loggingIn:false,
    user:{
      username:'',
      password:'',
    },
  }),
  methods: {
    login() {
      this.errorMessage='';
      if (this.validUser()){
        const body = {
          username:this.user.username,
          password:this.user.password,
        };
        this.loggingIn= true;
        fetch(LOGIN_URL,{
          method:'POST',
          headers:{
            'content-type':'application/json',
          },
          body: JSON.stringify(body),
      })
        .then(response => {
          if (response.ok) {
          return response.json();
        }
          return response.json().then(error => {
          throw new Error(error.message);
        });
      })
      .then(result => {
        console.log(result);
        localStorage.token = result.token
          setTimeout(()=>{
          this.loggingIn = false;
          this.$router.push('/dashboard');
      },1000)
    })
      .catch(error => {
        setTimeout(()=>{
        this.loggingIn = false;
        this.errorMessage=error.message;
      },1000);
    })
      }
    },
    validUser() {
      const result = schema.validate(this.user);
  if (result.error === undefined) {
    return true;
  }
  if(result.error.message.includes('username')){
    this.errorMessage ='Username is invalid 😭'
    }else{
      this.errorMessage = 'Password is invlaid 🙅‍♂️'
  }
    }
  },
};
</script>

<style>
</style>
