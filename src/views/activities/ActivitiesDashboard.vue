<template>
  <div class="activities-dashboard">
    <top-bar username="company"/>
    <section-header-component
    name="Activities"
    description="Your activities"
    back_page="/dashboard"
    />
     <div class="section-title center-align" style="margin-top:50px;">
    List of activities
  </div>

  <div class="list">
    <!-- {% if error is not none %} -->
    <blockquote v-if="error" class="create-error">
      {{ error }}
    </blockquote>
    <!-- {% else %} -->
    <div class="counter right">
       Activities: {{ activities.length }}
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
        <tr v-for="activity in activities" :key="activity.name">
          <td><b>{{ activity.name }}</b></td>

          <td>
            {{ activity.activity_type }}
          </td>

          <td v-if="activity.description">
           {{ activity.description }} 
          </td>

          <td v-if="activity.day">
            
            {{ activity.day }}
    
          </td>

          <td v-if="activity.time">
           
            {{ activity.time }}
   
          </td>

          <td v-if="activity.location">
            
            {{ activity.location }}
        
          </td>

          <td>
            <form method="get">
              <button title="Activity Info" class="waves-effect waves-light btn-floating"><i
                  class="material-icons left">search</i>Info</button>
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
  name: 'activities-dashboard',
  components: {
  },
  data(){
    return{
      error:"",
      activities:[{name:"Ver uma cena", activity_type:"Ver", description:"Vão ver uma cena fixe", day:"10",time:"10AM",location:"Torre Norte"},
      {name:"Testar uma cena", activity_type:"Testar",description:"Vão testar uma cena fixe", day:"12",time:"12AM",location:"Pavilhão Central"}],
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
</style>