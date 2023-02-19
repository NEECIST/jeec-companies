<template>
  <div class="auction-dashboard">
    <div v-if="(this.isAuthenticated())">
    <top-bar :username="BigData.user_name"/>
    <div v-if="BigData.valid">
      <section-header-component
      :name="BigData.auction.name"
      :description="BigData.auction.description"
      back_page="/dashboard"
      />
      <div class="row" style="margin: auto;width: 50%;">
        <div class="col s12 m12 l12 center">
          <div class="card teal lighten-5" style="border-radius: 10px;">
            <div class="card-content">
                <div v-if="BigData.auction.bids_len==0">
                    <span class="card-title">0 bids were made</span>
                    <p>Minimum bid: {{ BigData.auction.minimum_value }} €</p>
                </div>
                <div v-else>
              <p>Current highest bid</p>
              <br>
              <span class="card-title"><b>{{ BigData.highest_bid.value }} €</b></span>
    
              <br>
              <p>{{ BigData.highest_bid.created_at }}</p>
              <br>
              <p>by</p>
              <p><b>{{ BigData.highest_bidder_name }}</b></p>
              <img :src="image" class="bidder-logo">
              </div>
            </div>
    
            <div class="card-action" style="padding-left: 50px;padding-right:50px;">
              <blockquote v-if="BigData.error" class="create-error">
                {{ error }}
              </blockquote>
              <form @submit="submit()">
                <div class="row">
                  <div class="input-field col s6">
                    <input id="value" name="value" type="number" v-model="bid_value" :min="BigData.auction.bids_len==0? BigData.auction.minimum_value : BigData.highest_bid.value + 1"  required :disabled="BigData.auction.is_open!=true" :placeholder=" min_bid">
                    
                    <div class="left red-text">{{ BigData.warning }}</div>
                  </div>
    
                  <label>
                    <input type="checkbox" name="is_anonymous" value="True" :disabled="BigData.auction.is_open!=true" v-model="is_anon"/>
                    <span class="black-text right" style="margin-top:25px;">Anonymous bid</span>
                  </label>
                </div>
              
                <button type="submit"  class="waves-effect blue lighten-2 btn"
                :disabled="BigData.auction.is_open!=true"><i class="material-icons left">check</i>Submit
                Bid</button>
              
              
              </form>
            </div>
          </div>
        </div>
    
        <div class="center">
          <div class="row">
            <div class="col s6">
              <p><b>Starting date:</b></p>
              <p>{{ BigData.auction.starting_date }} - {{ BigData.auction.starting_time }}</p>
            </div>
            <div class="col s6">
              <p><b>Closing date:</b></p>
              <p>{{ BigData.auction.closing_date }} - {{ BigData.auction.closing_time }}</p>
            </div>
          </div>
        </div>
      </div>
    
      <br>
    
      <div class="divider" style="margin-left: 6vw; margin-right: 6vw;"></div>
    
      <div class="section-title center-align" style="margin-top:30px;">
        Participants:
      </div>
    
      <div class="participants-flex">
        <div v-for="logo in participant_logos" :key="logo">
          <img class="participant-logo" :src="logo">
        </div>
      </div>
    
      <div class="divider" style="margin-left: 6vw; margin-right: 6vw;"></div>
    
      <div class="section-title center-align" style="margin-top:30px;">
        Bids by {{BigData.company_name}}:
      </div>
    
      <div class="list" style="margin-top: 10px">
        <blockquote v-if="BigData.company_bids_len==0" class="create-error">
          You have made 0 bids
        </blockquote>
        <div v-else>
        <div class="counter right">
          Bids: {{ BigData.company_bids_len }}
        </div>
        <table class="striped">
          <thead>
            <tr>
              <th>Value</th>
              <th>Anonymous bid</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="bid in BigData.company_bids" :key="bid.created_at">
              <td><b>{{ bid.value }} €</b></td>
    
              <td>
                <i v-if="bid.is_anonymous" class="material-icons icon-green">check</i>
                <i v-else class="material-icons icon-red">clear</i>
              </td>
    
              <td>{{ bid.created_at }}</td>
    
              <td>{{ bid.created_at }}</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>
    <div v-else >
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
  name: 'auction-dashboard',
  components: {
  },
  data(){
    return{
      BigData:{
            auction:{
                name: "",
                bids:[],
                bids_len:null,
                description:"",
                minimum_value:"",
                is_open:false,
                starting_date:"",
                starting_time:"",
                closing_date:"",
                closing_time:"",
            },
            user_name: "",
            company_name:"",
            error:"",
            highest_bid:{value:null,
                            created_at: ""},
            warning:"",
            highest_bidder_name:"",
            highest_bidder_logo:"",
            participant_logos:[],
            company_bids:[],
            company_bids_len:null,
            valid:false
            },
      BigDataSubmit:{

      },
      siren:require("../../assets/siren.png"),
      participant_logos:[],
      image:"",
      min_bid:"",
      is_anon:false,
      bid_value:null
    }
  },
  methods:{
    ...mapGetters(["isAuthenticated"]),
    ...mapGetters(["StateUsername"]),
    // ...mapGetters(["AuctionExternalId"]),
    submit(){
      axios.post(process.env.VUE_APP_JEEC_BRAIN_URL + '/auctiondashboard_vue/bid',{user: this.StateUsername(), auction_ex_id: this.this.$route.params.auction_external_id, bid_value: this.bid_value, is_anonymous: this.is_anon}).then(response => this.BigDataSubmit = response.data)
      //axios.post(process.env.VUE_APP_JEEC_BRAIN_URL + '/auctiondashboard_vue/bid',{user: this.StateUsername(), auction_ex_id: this.AuctionExternalId(), bid_value: this.bid_value, is_anonymous: this.is_anon}).then(response => this.BigDataSubmit = response.data)
    }
    
  },
  mounted(){
    axios.post(process.env.VUE_APP_JEEC_BRAIN_URL + '/auctiondashboard_vue/:auction_external_id',{user: this.StateUsername(), auction_ex_id: this.$route.params.auction_external_id}).then(response=>{
    this.BigData = response.data
    this.image = require("../../assets/" + this.BigData.highest_bidder_logo)
   
    var i;
    for(i = 0; i < this.BigData.participant_logos.length;i++ ){
      this.participant_logos.push(require("../../assets/" + this.BigData.participant_logos[i]))
    }

    this.min_bid = 'Minimum bid of ' + (this.BigData.auction.bids_len==0? this.BigData.auction.minimum_value : this.BigData.highest_bid.value + 1).toString() +'€'
  })
  //axios.post(process.env.VUE_APP_JEEC_BRAIN_URL + '/auctiondashboard/bid',{user: this.StateUsername(), auction_ex_id: this.$route.params.auction_external_id, bid_value: this.bid_value, is_anonymous: this.is_anon}).then(response => this.BigDataGet = response.data)
}

}
</script>

<style scoped>

.bidder-logo {
    margin-top: 20px;
    max-height: 150px;
    max-width: 200px;
}

.create-error {
    bottom: 10px;
    font-size: 16px;
    font-weight: 600;
    margin-left: 30px;
}

.section-title {
    font-size: 25px;
    font-family: 'Karla';
    font-weight: 600;
}

.participants-flex {
    display: -webkit-box;  /* iOS 6-, Safari 3.1-6, BB7 */
    display: -ms-flexbox;  /* IE 10 */
    display: -webkit-flex; /* Safari 6.1+. iOS 7.1+, BB10 */
    display: flex;         /*Firefox, Chrome, Opera */
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding-top: 20px;
    padding-bottom: 15px;
    padding-left: 3vw;
    padding-right: 3vw;
  }
.participant-logo {
    justify-content: center;
    max-height: 100px;
    max-width: 100px;
    margin: 10px 25px;
}

.list {
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 30px;
    padding-bottom: 150px;
}

.counter {
    font-size: 15px;
    word-spacing: 10px;
    color: rgb(102, 101, 101);
    margin-right: 40px;
}

.icon-green {
    color: green
}

.icon-red {
    color: red
}

</style>
