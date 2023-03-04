<template>
  <div class="activities-dashboard">
    <div v-if="this.isAuthenticated()">
      <top-bar :username="BigData.user_name"/>
      <section-header-component
      name="Activities"
      description="Your activities"
      back_page="/companies/dashboard"
      />
      <div class="section-title center-align" style="margin-top:50px;">
      List of activities
      </div>

      <div class="list">
        <div v-if="BigData.error">
          <blockquote  class="create-error">
            {{ BigData.error }}
          </blockquote>
        </div>
        <div v-else>
          <div class="counter right">
            Activities: {{ BigData.activities.length }}
          </div>
    
          <table class="striped" style="width:95%; margin-left:auto; margin-right:auto" >
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Description</th>
                <th>Day</th>
                <th>Time</th>
                <th>Location</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="activity in BigData.activities" :key="activity.name">
                <td><b>{{ activity.name }} </b></td>
    
                <td>
                  {{ activity.activity_type }}
                </td>
    
                <td v-if="activity.description">
                {{ activity.description }} 
                </td>
                <td v-else>
                  No Description Provided
                </td>
    
                <td v-if="activity.day">
                  
                  {{ activity.day }}
          
                </td>
                <td v-else>
                  No Day Specified
                </td>
    
                <td v-if="activity.time">
                
                  {{ activity.time }}
        
                </td>
                <td v-else>
                  No Time Specified
                </td>
    
                <td v-if="activity.location">
                  
                  {{ activity.location }}
              
                </td>
                <td v-else>
                  No Location Specified
                </td>
    
                <td>
                  <router-link :to="{name: 'activity-full-detail', params: {activity_external_id : activity.activity_ex_id}}">
                    <button title="Scan QR Code" class="waves-effect waves-light btn-floating"><i
                        class="material-icons left">qr_code</i>Info </button>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
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
import axios from "axios"

export default {
  name: 'activities-dashboard',
  components: {
  },
  data(){ 
    return{
      BigData:{
        user_name: "",
        company_name:"",
        activities:[],
        error:""
      },
      siren:require("../../assets/siren.png"),
    }
  },
  methods:{
    ...mapGetters(["isAuthenticated"]),
    ...mapGetters(["StateUsername"]),
  },
  mounted() {
    axios.post(process.env.VUE_APP_JEEC_BRAIN_URL + '/dashboard_vue/activitiesdashboard_vue',{user: this.StateUsername()},{auth: {
    username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
    password: process.env.VUE_APP_JEEC_WEBSITE_KEY
  }}).then(response=>this.BigData=response.data)
  },
}
</script>

<style scoped>

.section-title {
    font-size: 25px;
    font-family: 'Karla';
    font-weight: 600;
}

.create-error {
    bottom: 10px;
    font-size: 16px;
    font-weight: 600;
    margin-left: 30px;
}

.counter {
    font-size: 15px;
    word-spacing: 10px;
    color: rgb(102, 101, 101);
    margin-right: 40px;
}


img{
  width: 60%;
}
</style>