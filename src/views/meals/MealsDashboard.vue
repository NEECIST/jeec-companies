<template>
  <div class="meals-dashboard">
    <div v-if="this.isAuthenticated()">
    <top-bar :username="this.StateUsername()"/>
    <section-header-component
    name="Meals"
    description="Choose your meals"
    back_page="/companies/dashboard"
    />
     <div class="section-title center-align" style="margin-top:50px;">
    List of meals
    </div>

  <div class="list">
    <blockquote v-if="response_data.error" class="create-error">
      {{ response_data.error }}
    </blockquote>
    <div class="counter right">
      Meals: {{ response_data.length }}
    </div>

    <table class="striped" style="width:95%; margin-left:auto; margin-right:auto">
      <thead>
        <tr>
          <th>Type</th>
          <th>Day</th>
          <th>Time</th>
          <th>Location</th>
          <th>Choose Dishes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="meal in response_data.meals" :key="meal.name">
          <td>
            {{ meal.name }}
          </td>

          <td v-if="meal.day">
            {{ meal.day }}
          </td>

          <td v-if="meal.time">
            {{ meal.time }}
          </td>

          <td v-if="meal.location">
            {{ meal.location }}
          </td>

          <td>
            <i v-if="meal.open_registrations==true" class="material-icons icon-green">check</i>
            <i v-else class="material-icons icon-red">clear</i>
          </td>

          <td>
            <form>
              <router-link :class="{ disabled: meal.open_registrations==false }" router-link :to="{ name: 'meal-page', params: {external_id: meal.external_id }}">
              <button title="Choose Dishes" class="waves-effect waves-light btn-floating" :disabled="meal.open_registrations==false"><i
                  class="material-icons left">room_service</i>Choose Dishes</button>
              </router-link>
            </form>
          </td>
        </tr>
      </tbody>
    </table>
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
import axios from "axios";
export default {
  name: 'meals-dashboard',
  components: {
  },
  data(){
    return{
      siren:require("../../assets/siren.png"),
      response_data:{
        error:"",
        meals:[],
        length:0,
      },
    }
  },
  methods:{
    ...mapGetters(["isAuthenticated"]),
    ...mapGetters(["StateUsername"]),
    ...mapGetters(["Company"]),
  },
  mounted(){
    axios.post(process.env.VUE_APP_JEEC_BRAIN_URL + '/mealsdashboard',{company:this.Company()},{auth: {
    username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
    password: process.env.VUE_APP_JEEC_WEBSITE_KEY
  }}).then(response => {
      this.response_data = response.data
    });
  }
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

.icon-green {
    color: green
}

.icon-red {
    color: red
}
.disabled {
    pointer-events:none; 
    opacity:0.6;        
 }
</style>