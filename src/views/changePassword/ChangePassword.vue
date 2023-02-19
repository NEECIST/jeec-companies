<template>
    <div class="change-password">
        <top-bar :username="this.StateUsername()"/>
      <section-header-component
      name="Change password"
      description=""
      back_page="/dashboard"
      />

      <p v-if="error!=''" class="login-error">{{ error }}</p>
      <p v-if="success" class="login-success">Password changed succesfully. You can go back to the dashboard</p>
  
      <div class="login-card center-align">
          <form >
              <div class="input-field col s12">
                    Old password
                  <input v-model="old_password"  type="password" class="password-input">
              </div>
              
              <div class="input-field col s12">
                    New password
                  <input v-model="new_password" type="password" class="password-input">
              </div>

              <div class="input-field col s12">
                New password confirmation
                  <input v-model="new_password_confirmation" type="password" class="password-input">
              </div>
  
                 <button @click="changePassword" class="waves-effect blue lighten-2 btn-large submit-button">Submit changes</button>
  
          </form>
      </div>
  
    </div>
  </template>
<script>
import { mapGetters } from "vuex";
import CryptoJS from 'crypto-js'
import axios from "axios"
export default {
    name: 'change-password',
    components: {
      
    },
    data(){
      return{
          real_password:'',
          old_password:'',
          new_password:'',
          new_password_confirmation:'',
          error:'',
          success: false,
      };
    },
    methods:{
        ...mapGetters(["StateUsername"]),
        changePassword(e){
          e.preventDefault();
            if(this.new_password!=this.new_password_confirmation){
                this.error = "New passwords must match!"
                this.success = false
            }
            else if (this.real_password != this.old_password){
                this.error = "Invalid credentials!"
                this.success = false
              }
            else{
              let new_password = CryptoJS.DES.encrypt(this.new_password, process.env.VUE_APP_API_KEY).toString();
                axios.post(process.env.VUE_APP_JEEC_BRAIN_URL + "/changepassword",{username:this.StateUsername(),new_password:new_password}).then(response=>{
                    if(response.data!=''){
                        this.error = response.data
                        this.success = false
                    }
                    else{
                        this.success = true
                        this.error=''
                        this.old_password='',
                        this.new_password='',
                        this.new_password_confirmation=''
                    }
                })
              }
            }
    },
    mounted(){
      axios.post(process.env.VUE_APP_JEEC_BRAIN_URL + "/getpassword",{username:this.StateUsername()}).then(response=>{
        let hashed = response.data
        this.real_password = CryptoJS.DES.decrypt(hashed, process.env.VUE_APP_API_KEY).toString(CryptoJS.enc.Utf8);
        console.log(this.real_password)
      })
    }
}
</script>

<style scoped>

.section-header {
  position: relative;
  padding-bottom: 10px;
  margin-bottom: 30px;
  margin-top: 0px;
}

.section-header::before {
content: '';
position: absolute;
display: block;
width: 100px;
height: 2px;
background: #4089ff;
bottom: 0;
left: calc(50% - 50px);
}

.section-header h2 {
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
font-size: 36px;
text-transform: uppercase;
text-align: center;
font-family: Avenir,Helvetica,Arial,sans-serif;
color: #2c3e50;
font-weight: 700;
margin-bottom: 10px;
}

.section-header p {
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-align: center;
padding: 0;
margin: 0;
font-size: 20px;
font-family: 'Karla';
font-weight: 500;
color: #9195a2;
}
.login-card {
  margin-left: 30vw;
  margin-right: 30vw;
  border-radius: 30px;
  padding-top: 10px;
  padding-bottom: 50px;
}
@media only screen and (max-width: 750px) {
.login-card {
  margin-left: 20vw;
  margin-right: 20vw;
}
}
.login-error {
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 15px;
    color: red;
}
.login-success {
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 15px;
    color: green;
}
</style>
