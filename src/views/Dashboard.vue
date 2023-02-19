<template>
    <div class="dashboard-main">
      <div v-if="this.isAuthenticated()">
        <top-bar :username="BigData.user_name"/>

        <section-header-component
        :name="BigData.company_name"
        description="Access the features related to the event"
        back_page=''/>

        <img :src="image" class="company-logo-company-side centered-image">

        <div class="flexbox-btns">
          <router-link router-link to="/activitiesdashboard">
          <form  method="get">
            <button class="waves-effect blue lighten-2 btn-large dashboard-btn">Activities</button>
          </form>
          </router-link>
        
         
          <form v-for="activity_type in BigData.activity_types_name" :key="activity_type.name"  >
            <router-link  router-link :to="{name: 'activity-type', params:{activity_type_external_id: activity_type.external_id}}" >
              
              <button  class="waves-effect blue lighten-2 btn-large dashboard-btn">{{activity_type.name}}</button>
            </router-link>
          </form>
      

          <!-- this should be a boolean ?-->
          <!-- <router-link to="/jobfair">
          <form action="/companies/job_fair" method="get">
            <button class="waves-effect blue lighten-2 btn-large dashboard-btn">Job Fair</button>
          </form>
          </router-link> -->
        </div>

        <div class="flexbox-btns">
          <div v-for="auction in BigData.auctions" :key="auction.name">
            <router-link  router-link :to="{ name: 'auction-dashboard', params: { auction_external_id: auction.external_id }} " :auction="auction"  >
              <form>
                <button v-if="auction.is_open"   class="waves-effect red lighten-2 btn-large dashboard-btn" style="width: auto;">{{auction.name}}</button>
              </form> 
            </router-link>
        </div>
        <!-- @click="AuctionExternalIdSetter(auction.external_id)" -->
         <div v-show="BigData.food_manager == true">
          <router-link router-link to="/mealsdashboard">
            <form action="/companies/meals" method="get">
              <button class="waves-effect red lighten-2 btn-large dashboard-btn"><i
                  class="large material-icons left">restaurant</i>Meals</button>
            </form>
            </router-link>
         </div>

         <router-link router-link to="/changepassword">
            
            <button class="waves-effect red lighten-2 btn-large"><i
                class="large material-icons left">account_box</i>Change password</button>
          
          </router-link>
          
          <div v-show="BigData.cvs_enabled == true">
            <form method="get">
              <button class="waves-effect red lighten-2 btn-large dashboard-btn" style="width: auto;">
                  <i class="large material-icons left">person_outline</i>Students & CV's</button>
            </form>
          </div>
            <!-- <router-link to="/statisticsdashboard">
            <form method="get">
              <button class="waves-effect red lighten-2 btn-large dashboard-btn" style="width: auto;"><i class="large material-icons left">assessment</i>App Statistics</button>
            </form>
            </router-link> -->
          </div>
          

        <blockquote style="margin-left: 40px;margin-top: 70px; text-align:left">
          <b>Disclaimer!</b> Usage of this platform implies the acceptance of the <b>Terms and Conditions</b>!
        </blockquote>
          </div>
          <h2 v-else id="blink" class="error">
            ACCESS DENIED
            <br>
            <img :src="siren" class="blink">
            <audio v-if="true" controls autoplay >
              <source src="http://soundbible.com/mp3/Police Siren 3-SoundBible.com-553177907.mp3">
            </audio>
        </h2>
      </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters} from "vuex";
import axios from "axios"
// import CryptoJS from "crypto-js"
export default {
  name: 'dashboard-main',
  components: {
    
  },
  data(){
    return{
      BigData:{
        user_name: "",
        company_name:"",
        auctions:[],
        activity_types_name:[],
        food_manager : true,
        cvs_enabled: true
      },
      siren:require("../assets/siren.png"),
      image: null,
      
    }
  },
  methods:{
    ...mapGetters(["isAuthenticated"]),
    ...mapGetters(["StateUsername"]),
    ...mapGetters(["Company"]),
    forceFileDownload(response) {
      this.image = URL.createObjectURL(new Blob([response.data]))
    },
  },
  mounted() {
    axios.post(process.env.VUE_APP_JEEC_BRAIN_URL + '/dashboard_vue',{user: this.StateUsername()}).then(response => this.BigData = response.data)
    axios({
          url: process.env.VUE_APP_JEEC_BRAIN_URL + '/company/image',
          method: 'POST',
          responseType: 'arraybuffer',
          data: {
            company: this.Company(),
          }
        }).then(response=>{
          if(response.data!=''){
            this.forceFileDownload(response)
          }
        })
  },
}
</script>
<style scoped>


.company-logo-company-side {
  max-height: 150px;
  max-width: 300px;
  margin-top: 100px;
  margin-bottom: 60px;
}

.centered-image {
    display: block;
    margin-left: auto;
    margin-right: auto;
}

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


</style>