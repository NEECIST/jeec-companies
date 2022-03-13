<template>
    <div class="dashboard-main">
    <top-bar username="company"/>

  <section-header-component
  name="Jeec Brain"
  description="Access the features related to the event"
  back_page=''/>

  <img :src="company_logo" class="company-logo-company-side centered-image">


  <div class="flexbox-btns">
    <!-- {% for activity_type in activity_types %} -->
    <!-- <form action="/companies/activity_type/{{activity_type.external_id.hex}}" method="get"> -->
    <router-link router-link to="/activitiesdashboard">
    <form  method="get">
      <button class="waves-effect blue lighten-2 btn-large dashboard-btn">Activities</button>
    </form>
    </router-link>
<!-- {% endfor %} -->
  
 <router-link v-for="activity_type in activity_types" :key="activity_type" router-link to="/activitytype">
    <form  method="get">
      <button class="waves-effect blue lighten-2 btn-large dashboard-btn">{{activity_type}}</button>
    </form>
    </router-link>

    <!-- {% if job_fair == true %} -->
    <router-link to="/jobfair">
    <form action="/companies/job_fair" method="get">
      <button class="waves-effect blue lighten-2 btn-large dashboard-btn">Job Fair</button>
    </form>
    </router-link>
    <!-- {% endif %} -->
  </div>

  <div class="flexbox-btns">
    <!-- {% for auction in auctions %} -->
    <!-- Disable if auction is not open -->
    <!-- <form action="/companies/auction/{{auction.external_id.hex}}" method="get"> -->
    <router-link to="/auctiondashboard">
    <form method="get">
      <button class="waves-effect red lighten-2 btn-large dashboard-btn" style="width: auto;">Auction Name</button>
    </form>
    </router-link>
    <!-- {% endfor %} -->


    <!-- {% if user.food_manager is sameas true %} -->
    <router-link router-link to="/mealsdashboard">
    <form action="/companies/meals" method="get">
      <button class="waves-effect red lighten-2 btn-large dashboard-btn"><i
          class="large material-icons left">restaurant</i>Meals</button>
    </form>
    </router-link>
    <!-- {% endif %} -->

    <!-- Disable is cvs are not enabled -->
    <form method="get">
      <button class="waves-effect red lighten-2 btn-large dashboard-btn" style="width: auto;">
          <i class="large material-icons left">person_outline</i>Students & CV's</button>
    </form>
    <router-link to="/statisticsdashboard">
    <form method="get">
      <button class="waves-effect red lighten-2 btn-large dashboard-btn" style="width: auto;"><i class="large material-icons left">assessment</i>App Statistics</button>
    </form>
    </router-link>
  </div>

  <blockquote style="margin-left: 40px;margin-top: 70px; text-align:left">
    <b>Disclaimer!</b> Usage of this platform implies the acceptance of the <b>Terms and Conditions</b>!
  </blockquote>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'dashboard-main',
  components: {
    
  },
  data(){
    return{
      company_logo: require("../assets/jeec_logo_mobile.svg"),
      activity_types: ['Giveaway','Workshop','Lecture'],
    }
  }
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