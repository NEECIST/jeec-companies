<template>
  <div class="companies-login">
   <div style="text-align:center; width:100%">
        <img class="jeec-logo-login" style="width:7%; margin-top:80px; margin-right:30px" :src="jeec_logo">
        <img class="brain-logo-login" style="width:7%" :src="brain_logo">
    </div>
    
    <div class="section-header">
        <h2><p>Partners Login</p></h2>
    </div>

    <div class="login-card center-align">
        <form method="post">
            <div class="input-field col s12">
                <input v-model="form.username"  type="text" placeholder="Username" class="username-input" name="username">
            </div>
            
            <div class="input-field col s12">
                <input v-model="form.password" type="password" placeholder="Password" class="password-input" name="password">
            </div>

        
                <p v-if="showError" class="login-error">error msg would appear here</p>

               <button @click="submit" class="waves-effect blue lighten-2 btn-large login-button">Login</button>

        </form>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import axios from "axios"
export default {
  name: 'companies-login',
  components: {
    
  },
  data(){
    return{
        jeec_logo:require("../assets/jeec_logo_mobile.svg"),
        brain_logo: require( "../assets/brain.png"),
        form:{
          username:"",
          password:"",
        },
        showError:false,
    };
  },
  methods:{
    ...mapActions(["LogIn"]),
    ...mapGetters(["isAuthenticated"]),
    ...mapGetters(["StateUsername"]),
    async CheckTerms(username){
      await axios.post(process.env.VUE_APP_JEEC_BRAIN_URL + '/terms_check_vue',{user: username},{auth: {
    username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
    password: process.env.VUE_APP_JEEC_WEBSITE_KEY
  }}).then(response => this.check = response.data)
          if(this.check.accepted_terms){
            this.$router.push("/companies/dashboard");
            this.showError = false
          }
          else{
            this.$router.push("/companies/terms_conditions");
          }

    },
    async submit(e) {
      e.preventDefault()
      try {
        await this.LogIn(this.form);
        if(this.isAuthenticated()){
          this.CheckTerms(this.StateUsername())
        }
        else{
          this.showError = true
        }
      } catch (error) {
        this.showError = true
      }
    }
  },
  mounted() {
    
  },
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
.login-button {
  margin-top: 30px;
  width: 150px;
}
</style>