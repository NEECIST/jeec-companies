<template>
  <div class="meal-page">
    <div v-if="this.isAuthenticated()">
    <top-bar :username="this.StateUsername()"/>
    <section-header-component
    :name="response_data.meal.type + ' '+ response_data.meal.day"
    description="Choose your meal"
    back_page="/companies/mealsdashboard"
    />
    <div class="section-title center-align" style="margin-top:50px;">
    List of foods
  </div>

  <div class="list">
    <blockquote v-if="response_data.error" class="create-error">
      {{ response_data.error }}
    </blockquote>
    <div v-else>

    <form id="dish_form" class="col s12" @submit="sendQuantities">
      <div v-if="response_data.max_dish_quantity" class="sub_section-title left-align" style="margin-bottom: 20px;">
        Number of Dishes Available: {{ response_data.max_dish_quantity }}
      </div>
      <table style="width:95%;margin-left:auto;margin-right:auto" v-for="dish_type in response_data.dish_types" :key="dish_type" class="striped" :id="'table_'+dish_type">
        <thead>
          <tr>
            <th style="width:30%" v-if="dish_type=='MainCourse'">Main Course</th>
            <th style="width:30%" v-else>{{ dish_type }}</th>
            <th style="width:50%">Description</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
            <!-- Os dishes devem ser condicionados por dish.type.name == dish_type -->
              <tr v-for="dish in response_data.dishes.filter((item) => {return (item.type == dish_type)})" :key="dish.name">  <!-- do a filter--> 
            <td>
              {{ dish.name }}
            </td>
  
            <td>
              {{ dish.description }}
            </td>
  
            <td>
              <input type="number" min="0" v-model="dish.quantity" class="validate s2">
            </td>
          </tr>
          <br>
          <br>
        </tbody>
      </table>
      <button type="submit" class="waves-effect blue lighten-2 btn add-btn left" ><i class="material-icons left">save</i>Save</button>
    </form>
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
import axios from "axios";
export default {
  name: 'meal-page',
  components:{
  },
  data(){
    return{
      siren:require("../../assets/siren.png"),
      response_data:{
        meal:{type:"",day:""},
        error:"",
        max_dish_quantity:0,
        dish_types:[],
        dishes:[]
      }
    }
  },
  methods:{
    ...mapGetters(["isAuthenticated"]),
    ...mapGetters(["StateUsername"]),
    ...mapGetters(["Company"]),
    sendQuantities(e){
      e.preventDefault()
      axios.post(process.env.VUE_APP_JEEC_BRAIN_URL + '/mealsdashboard/meal/change',{meal_external_id: this.$route.params.external_id, company:this.Company(), dishes:this.response_data.dishes},{auth: {
    username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
    password: process.env.VUE_APP_JEEC_WEBSITE_KEY
  }})
      this.$router.push('/companies/mealsdashboard')
    },
},

  mounted(){
    console.log(this.Company())
    axios.post(process.env.VUE_APP_JEEC_BRAIN_URL + '/mealsdashboard/meal',{meal_external_id: this.$route.params.external_id, company:this.Company()},{auth: {
    username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
    password: process.env.VUE_APP_JEEC_WEBSITE_KEY
  }}).then(response=>this.response_data=response.data)
  }
}
</script>

<style scoped>

.section-title {
    font-size: 25px;
    font-family: 'Karla';
    font-weight: 600;
}

.list {
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 30px;
    padding-bottom: 150px;
}

.create-error {
    bottom: 10px;
    font-size: 16px;
    font-weight: 600;
    margin-left: 30px;
}

.sub_section-title {
    font-size: 18px;
    font-family: 'Karla';
    font-weight: 600;
}
</style>