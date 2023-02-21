<template>
  <div class="job-fair">
  <div v-if="this.isAuthenticated()">
    <top-bar username="company"/>
    <section-header-component
    name="Job Fair"
    description=""
    back_page="/companies/dashboard"
    />
    <div class="flexbox-btns" style="justify-content: center;">
    <button id="info_btn" class="waves-effect blue lighten-2 btn-large dashboard-btn" style="width: 250px;"><i
        class="large material-icons left">info</i>Info</button>

    <button id="chat_btn" class="waves-effect blue lighten-2 btn-large dashboard-btn"
      style="margin-left: 50px; margin-right: 50px; width: 250px;"><i class="large material-icons left">chat</i>Chat
      Rooms</button>

    <button id="code_btn" class="waves-effect blue lighten-2 btn-large dashboard-btn" style="width: 250px;"><i
        class="large material-icons left">qr_code</i>Generate Code</button>
  </div>

  <div id="info">
    <div style="display: flex; justify-content: space-evenly; flex-wrap: wrap;">
      <div class="evf evf-user">
        <p><b>user:</b> {{user.evf_username }}</p>
        <p><b>password:</b> {{ user.evf_password }}</p>
        <form action="https://tecnicoevents.easyvirtualfair.com/" target="_blank">
          <button class="waves-effect red lighten-2 btn-large dashboard-btn"><i
              class="large material-icons left">language</i>Log In</button>
        </form>
      </div>

      <div class="evf">
        <p><b>user:</b> {{ user.company.evf_username }}</p>
        <p><b>password:</b> {{ user.company.evf_password }}</p>
        <form action="https://tecnicoevents.easyvirtualfair.com/backend" target="_blank">
          <button class="waves-effect red lighten-2 btn-large dashboard-btn"><i
              class="large material-icons left">language</i>Log In</button>
        </form>
      </div>
    </div>

    <div class="flexbox-btns" style="margin-top: 50px; justify-content: space-evenly;">
      <a v-if="job_fairs[0].zoom_link" :href="job_fairs[0].zoom_link" target="_blank" class="waves-effect lighten-2 btn-large dashboard-btn"
        style="font-weight: 600;"><i class="large material-icons left">connected_tv</i>Zoom Link</a>
      
      <button v-for="(job_fair,index) in job_fairs" :key="job_fair" :data-name="index" class="waves-effect lighten-2 btn-large dashboard-btn add-calender-btn"
        style="width: auto;"><i class="large material-icons left">event</i>Add To Calendar - {{ job_fair.day }}</button>
    </div>
  </div>
  </div>
  <h2 v-else id="blink" class="error" >
      ACCESS DENIED
      <br>
      <img :src="siren" class="blink">
  </h2>

  
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: 'job-fair',
  components: {
  },
  data(){
    return{
        siren:require("../../assets/siren.png"),
        user:{evf_username:"evf_username",evf_password:"evf_password",company:{evf_username:"company_evf_username",evf_password:"company_evf_password"}},
        job_fairs:[{day:"17 de maio de 2019",zoom_link:"vaiparaocacete.come"},{day:"19 de abril de 2029",zoom_link:"enfim.come"}]
    }
  },
  methods:{
    ...mapGetters(["isAuthenticated"]),
  },
}
</script>

<style scoped>
.flexbox-btns {
    display: -webkit-box;  /* iOS 6-, Safari 3.1-6, BB7 */
    display: -ms-flexbox;  /* IE 10 */
    display: -webkit-flex; /* Safari 6.1+. iOS 7.1+, BB10 */
    display: flex;         /*Firefox, Chrome, Opera */
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    margin-top: 30px;
}

.dashboard-btn {
    width: 200px;
    margin-bottom: 20px;
}

.evf {
    margin-top: 30px;
    background-color: #F2F3F3;
    width: 500px;
    border-radius: 30px;
    font-size: 20px;
}

.evf::before {
    content: 'EVF Backend Booth Credentials';
    font-size: 25px !important;
    font-weight: bold;
}

.evf-user::before {
    content: 'EVF User Booth Credentials';
}

.chat-frame {
    width: 80%;
    height: 100%;
}

</style>