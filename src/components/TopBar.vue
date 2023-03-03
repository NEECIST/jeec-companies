<template>
  <div class="top-bar">
    <div class="nav-bar">
      <a target="_blank" rel="noopener noreferrer" href="https://jeec.ist" method="get">
    <img class="jeec-logo-mobile" :src="jeec_logo">
      </a>

    <div class="company-dash-username right" style="color:black; margin-top:10px">{{username}}</div>

    <!-- <form action="{{ url_for('companies_api.company_logout') }}" method="get"> -->
    <router-link router-link to="/">
      <button @click="logout"  class="waves-effect red lighten-2 btn-small right logout-btn" ><i class="material-icons left">lock</i>Log
        out</button>
    </router-link>
    </div>
  </div>
</template>

<script>
import router from "../router";
import { mapActions } from "vuex";
export default {
  name: 'TopBar',
  props: {
    username: String
  },
  data(){
    return{
      jeec_logo:require("../assets/jeec_logo_mobile.svg"),
    };
  },
  methods:{
    ...mapActions(["LogOut"]),
    logout(){
        router.push('/')
        this.LogOut()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.nav-bar {
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
    padding-top: 10px;
    padding-bottom: 10px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    color: white;
    z-index: 1000;
    background-color: #ffffff;
}

.logout-btn {
    float: right;
    margin-right: 40px;
    width: 130px;
    margin-top: 10px;
}

.company-dash-username {
    margin-top: 16px;
    font-size: 17px;
    margin-right: 40px;
}

.jeec-logo-mobile {
    display: block;
    width: 50px;
    margin-left: 40px;
    float: left;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
