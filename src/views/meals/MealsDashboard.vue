<template>
  <div class="meals-dashboard">
    <top-bar username="company"/>
    <section-header-component
    name="Meals"
    description="Choose your meals"
    back_page="/dashboard"
    />
     <div class="section-title center-align" style="margin-top:50px;">
    List of meals
    </div>

  <div class="list">
    <blockquote v-if="error" class="create-error">
      {{ error }}
    </blockquote>
    <div class="counter right">
      Meals: {{ meals.length }}
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
        <tr v-for="meal in meals" :key="meal.name">
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
            <form method="get">
              <router-link :class="{ disabled: meal.open_registrations==false }" router-link to="/mealpage">
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
</template>

<script>

export default {
  name: 'meals-dashboard',
  components: {
  },
  data(){
    return{
      error:"",
      meals:[{name:"Comida da boa", day:"6 de Abril", time:"5:33", open_registrations:false},
      {name:"Comida da gostosa", day:"6 de Maio", time:"17:43", open_registrations:true}],
    }
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