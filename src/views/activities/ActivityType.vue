<template>
<div class="activity-type">
  <div v-if="this.isAuthenticated()">
    <top-bar :username="BigData.username"/>
    <div v-if="BigData.valid">
      <section-header-component
      name="Activity Types Management"
      :description="desc"  
      back_page='/dashboard'
      />

      
      <div class="flex-container" style="margin-top:10vh">
          <!-- <img class="left-arrow" :src="arrow_icon"> -->
              <!-- <div class="carousel carousel-slider" style="min-height: 500px;"> -->
          <div v-for="activity in BigData.activities" :key="activity.name" class="item">
            <p class="activity-name">{{ activity.name }}</p>
            <p class="activity-description">{{ activity.description }}</p>
            <p class="activity-time" v-if="activity.end">{{ activity.day }} - {{ activity.time }}/{{activity.end_time}} </p>
            <p class="activity-time" v-else>{{ activity.day }} - {{ activity.time }}</p>

            <div class="flexbox-btns">
              <!-- <a v-if="activity.zoom_link" :href="activity.zoom_link" target="_blank"
                class="waves-effect red lighten-2 btn-large dashboard-btn" style="font-weight: 600;"><i
                  class="large material-icons left">connected_tv</i>Zoom Link</a> -->
              <button @click="add_to_calendar(activity)" id="calendar_btn" class="waves-effect red lighten-2 btn-large dashboard-btn" style="width: auto;"><i
                  class="large material-icons left">event</i>Add To Calendar</button>
            </div>
          </div>
        <!-- </div> -->
        <!-- <img class="right-arrow" :src="arrow_icon"> -->
      </div>
    </div>
    <div v-else>
      <section-header-component
      name="Error"
      :description="BigData.error"
      back_page="/dashboard"
      />
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
import axios from "axios"
export default {
  name: 'activity-type',
  components: {
  },
  data(){
      return{
        siren:require("../../assets/siren.png"),
        // arrow_icon:require("../../assets/arrow.svg"),
        BigData:{
          "user_name":"",
          "company_name":"",
          "activities":[],
          "event_name":"",
          "valid":true,
          "error":""
        },
        desc:"",
      }
  },
  methods:{
    ...mapGetters(["isAuthenticated"]),
    ...mapGetters(["StateUsername"]),
    ...mapGetters(["ActivityType"]),
    get_date(activity) {
      var start_date = new Date(
        activity.day.substring(0, 11) + " " + activity.time + ":00"
      );
      var end_date = new Date(
        activity.day.substring(0, 11) +
        " " +
        activity.end_time +
        ":00"
      );

      start_date =
        start_date.getFullYear().toString() +
        (start_date.getMonth() + 1 < 10
          ? "0" + (start_date.getMonth() + 1).toString()
          : (start_date.getMonth() + 1).toString()) +
        (start_date.getDate() < 10
          ? "0" + (start_date.getDate()).toString()
          : (start_date.getDate()).toString()) +
        "T" +
        (start_date.getHours() < 10
          ? "0" + start_date.getHours()
          : start_date.getHours()) +
        (start_date.getMinutes() < 10
          ? "0" + start_date.getMinutes()
          : start_date.getMinutes()) +
        "00";

      end_date =
        end_date.getFullYear().toString() +
        (end_date.getMonth() + 1 < 10
          ? "0" + (end_date.getMonth() + 1).toString()
          : (end_date.getMonth() + 1).toString()) +
        (end_date.getDate() < 10
          ? "0" + (end_date.getDate()).toString()
          : (end_date.getDate()).toString()) +
        "T" +
        (end_date.getHours() < 10
          ? "0" + end_date.getHours()
          : end_date.getHours()) +
        (end_date.getMinutes() < 10
          ? "0" + end_date.getMinutes()
          : end_date.getMinutes()) +
        "00";

      return start_date + "/" + end_date;
    },
      add_to_calendar(activity){
        var url = "https://calendar.google.com/calendar/render?action=TEMPLATE";
        url = url + "&text=" + activity.name;
        url = url + "&ctz=" + "Europe/Lisbon";
        url = url + "&location=" + activity.location;
        url = url + "&dates=" + this.get_date(activity);
        url =
          url +
          "&sprop=website:" +
          activity.registration_link +
          "&sprop=name:" +
          activity.name;
        var date = new Date();

        if (
          date.getHours().toString() + ":" + date.getMinutes().toString() > activity.time
        ) {
          url = url + "&crm=" + "BUSY"; //busy
        } else if (!activity.registration_open) {
          url = url + "&crm=" + "BLOCKING"; //blocking
        } else {
          url = url + "&crm=" + "AVAILABLE"; //available
        }

        var win = window.open(url, '_blank');
        win.focus();
      },
  },

  mounted() {
    axios.post(process.env.VUE_APP_JEEC_BRAIN_URL + '/activitiesdashboard_vue/activity_type',{user: this.StateUsername(), activity_type_external_id: this.$route.params.activity_type_external_id}).then(response =>{ this.BigData = response.data,this.desc = "Manage activity types of " + this.BigData.event_name} )
  },
  
}

</script>

<style scoped>

.activity-time {
    margin-top: 60px;
    font-size: 30px !important;
}

.activity-description {
    font-size: 20px !important;
    min-height: 70px;
}

.activity-name {
    font-size: 40px !important;
    font-weight: 500;
}
.flex-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: stretch;
  
}
.item{
 background-color:  rgb(240,240,240);
 padding:1%;
 border-radius:10%
}
.left-arrow,
.right-arrow {
    cursor: pointer;
    margin-left: 10px;
    margin-right: 10px;
}

.right-arrow {
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
}
.container {
  flex-wrap: wrap ;
}

</style>
