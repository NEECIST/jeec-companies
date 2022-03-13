<template>
<div class="activity-type">
 <top-bar username="company"/>

  <section-header-component
  name="Activity Types Management"
  description="Manage activity types of event.name"
  back_page='/dashboard'
  />

  <center>
    <div class="carousel-wrapper">
        <img class="left-arrow" :src="arrow_icon">
            <!-- <div class="carousel carousel-slider" style="min-height: 500px;"> -->
        <div v-for="activity in activities" :key="activity.name" class="carousel-item">
          <p class="activity-name">{{ activity.name }}</p>
          <p class="activity-description">{{ activity.description }}</p>
          <p class="activity-time" v-if="activity.end">{{ activity.day }} - {{ activity.time }}/{{activity.end_time}} </p>
          <p class="activity-time" v-else>{{ activity.day }} - {{ activity.time }}</p>

          <div class="flexbox-btns">
            <a v-if="activity.zoom_link" :href="activity.zoom_link" target="_blank"
              class="waves-effect red lighten-2 btn-large dashboard-btn" style="font-weight: 600;"><i
                class="large material-icons left">connected_tv</i>Zoom Link</a>
            
            <button id="calendar_btn" class="waves-effect red lighten-2 btn-large dashboard-btn" style="width: auto;"><i
                class="large material-icons left">event</i>Add To Calendar</button>
          </div>
        </div>
      <!-- </div> -->
      <img class="right-arrow" :src="arrow_icon">
    </div>
  </center>
</div>
</template>

<script>
export default {
  name: 'activity-type',
  components: {
  },
  data(){
      return{
        arrow_icon:require("../../assets/arrow.svg"),
        activities:[{name:"Atividade 1",description:"Função distribuição de probabilidade",day:"02 de Fevereiro de 2022",time:"3PM"},{name:"Autismo",description:"É o que eu tenho",day:"06 de Março de 2030",time:"12PM"}],
        settings:{
        "dots": true,
        "dotsClass": "slick-dots custom-dot-class",
        "edgeFriction": 0.35,
        "infinite": false,
        "speed": 500,
        "slidesToShow": 1,
        "slidesToScroll": 1
        }
      }
  },
  props:{
      activity_type:String,
  }
}

</script>

<style scoped>

.activity-time {
    margin-top: 60px;
    font-size: 30px !important;
}

.activity-description {
    font-size: 20px !important;
    min-height: 70px;
}

.activity-name {
    font-size: 40px !important;
    font-weight: 500;
}

.carousel-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80vw;
}

.left-arrow,
.right-arrow {
    cursor: pointer;
    margin-left: 10px;
    margin-right: 10px;
}

.right-arrow {
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
}

</style>
