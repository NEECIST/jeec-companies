<template>
  <div class="meal-page">
    <top-bar username="company"/>
    <section-header-component
    :name="meal.type + ' '+ meal.day"
    description="Choose your meal"
    back_page="/mealsdashboard"
    />
    <div class="section-title center-align" style="margin-top:50px;">
    List of foods
  </div>

  <div class="list">
    <blockquote v-if="error" class="create-error">
      {{ error }}
    </blockquote>
    <div v-else>

    <form id="dish_form" class="col s12" method="post">
      <div v-if="max_dish_quantity" class="sub_section-title left-align" style="margin-bottom: 20px;">
        Number of Dishes Available: {{ max_dish_quantity }}
      </div>
      <table style="width:95%;margin-left:auto;margin-right:auto" v-for="dish_type in dish_types" :key="dish_type.name" class="striped" :id="'table_'+dish_type.name">
        <thead>
          <tr>
            <th style="width:30%" v-if="dish_type.name=='Main Course'">Main Course</th>
            <th style="width:30%" v-else>{{ dish_type.name }}</th>
            <th style="width:50%">Description</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
            <!-- Os dishes devem ser condicionados por dish.type.name == dish_type -->
          <tr v-for="dish in dish_type.dishes" :key="dish.name">  
            <td>
              {{ dish.name }}
            </td>
  
            <td>
              {{ dish.description }}
            </td>
  
            <td>
              <input :id="'dish_quantity'+ loop_index0" :name="'dish_quantity_'+ dish_type.name " type="number" min="0" :value="20" class="validate s2">
              <input type="hidden" :name="'dish_' + dish_type.name " value="dish.external_id">
            </td>
          </tr>
          <br>
          <br>
        </tbody>
      </table>
      <router-link to="/mealsdashboard">
      <button type="submit" class="waves-effect blue lighten-2 btn add-btn left" ><i class="material-icons left">save</i>Save</button>
      </router-link>
    </form>
  </div>
    </div>
</div>
</template>

<script>

export default {
  name: 'meal-page',
  components:{
  },
  data(){
    return{
      meal:{type:"Lunch",day:"2 de Março de 2023"},
      error:"",
      max_dish_quantity:20,
      dish_types:[{name:'Entry',dishes:[{name:'Soup',description:'Good soup'},{name:'Bread',description:'Good bread'}]},
      {name:'Main Course',dishes:[{name:'Meat',description:'Good steak'},{name:'Fish',description:'Tasty Salmon'}]}],
      loop_index0:10,
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