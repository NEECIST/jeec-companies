<template>
  <div class="auction-dashboard">
    <top-bar username="company"/>
    <section-header-component
    :name="auction.name"
    :description="auction.description"
    back_page="/dashboard"
    />
    <div class="row" style="margin: auto;width: 50%;">
    <div class="col s12 m12 l12 center">
      <div class="card teal lighten-5" style="border-radius: 10px;">
        <div class="card-content">
            <div v-if="auction.bids.length==0">
                <span class="card-title">0 bids were made</span>
                <p>Minimum bid: {{ auction.minimum_value }} €</p>
            </div>
            <div v-else>
          <p>Current highest bid</p>
          <br>
          <span class="card-title"><b>{{ highest_bid.value }} €</b></span>

          <br>
          <p>{{ highest_bid.created_at }}</p>
          <br>
          <p>by</p>
          <p><b>{{ highest_bidder_name }}</b></p>
          <img :src="highest_bidder_logo" class="bidder-logo">
          </div>
        </div>

        <div class="card-action" style="padding-left: 50px;padding-right:50px;">
          <blockquote v-if="error" class="create-error">
            {{ error }}
          </blockquote>
          <form method="post">
            <div class="row">
              <div class="input-field col s6">
                <input id="value" name="value" type="number" :min="auction.bids.length==0? auction.minimum_value : highest_bid.value + 1"  required :disabled="auction.is_open!=true">
                <label for="value">Minimum of {{ auction.bids.length==0? auction.minimum_value : highest_bid.value + 1}} €</label>
                <div class="left red-text">{{ warning }}</div>
              </div>

              <label>
                <input type="checkbox" name="is_anonymous" value="True" :disabled="auction.is_open!=true"/>
                <span class="black-text right" style="margin-top:25px;">Anonymous bid</span>
              </label>
            </div>

            <button type="submit" class="waves-effect blue lighten-2 btn"
              :disabled="auction.is_open!=true"><i class="material-icons left">check</i>Submit
              Bid</button>
          </form>
        </div>
      </div>
    </div>

    <div class="center">
      <div class="row">
        <div class="col s6">
          <p><b>Starting date:</b></p>
          <p>{{ auction.starting_date }} - {{ auction.starting_time }}</p>
        </div>
        <div class="col s6">
          <p><b>Closing date:</b></p>
          <p>{{ auction.closing_date }} - {{ auction.closing_time }}</p>
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
    Bids by company:
  </div>

  <div class="list" style="margin-top: 10px">
    <blockquote v-if="company_bids.length==0" class="create-error">
      You have made 0 bids
    </blockquote>
    <div v-else>
    <div class="counter right">
      Bids: {{ company_bids.length }}
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
        <tr v-for="bid in company_bids" :key="bid.created_at">
          <td><b>{{ bid.value }} €</b></td>

          <td>
            <i v-if="bid.is_anonymous" class="material-icons icon-green">check</i>
            <i v-else class="material-icons icon-red">clear</i>
          </td>

          <td>{{ bid.day }}</td>

          <td>{{ bid.time }}</td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
    </div>
</template>

<script>

export default {
  name: 'auction-dashboard',
  components: {
  },
  data(){
    return{
      auction:{name:"Auction name",description:"Auction description",minimum_value:10,bids:[1,2,3,4],is_open:true,starting_date:"4 de Maio",starting_time:"13:00",closing_date:"5 de Maio",closing_time:"13:00"},
      participant_logos:['Naomeapatecearranjarumaimagem'],
      company_bids:[{value:20,day:"5 de Abril",is_anonymous:true,time:"12:34"},{value:30,day:"15 de Abril",is_anonymous:false,time:"19:30"}],
      highest_bid:{value:40,created_at:"4/07/2022, 12:43"},
      highest_bidder_name:"highest_bidder_name",
      highest_bidder_logo:"highest_bidder_name",
      error:"",
      warning:"",
    }
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
