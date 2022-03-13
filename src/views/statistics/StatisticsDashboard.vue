<template>
  <div class="statistics-dashboard">
    <top-bar username="company"/>
    <section-header-component
    name="Statistics"
    description="Statistics from app usage"
    back_page="/dashboard"
    />
    <div class="flexbox-btns" style="justify-content: center; margin-top: 90px;">
        <button @click="general=true, interactions=false, participations=false" id="general_btn" class="waves-effect blue lighten-2 btn-large dashboard-btn" style="width: 250px;"><i
                class="large material-icons left">info</i>General</button>
        <button @click="interactions=true, general=false, participations=false" id="interactions_btn" class="waves-effect blue lighten-2 btn-large dashboard-btn"
            style="margin-left: 50px; margin-right: 50px; width: 250px;">
            <i class="large material-icons left">autorenew</i>Interactions</button>
        <button @click="participations=true, general=false, interactions=false" id="participations_btn" class="waves-effect blue lighten-2 btn-large dashboard-btn"
            style="width: 250px;"><i
                class="large material-icons left">group</i>Participations</button>
    </div>

    <div id="general" v-if="general" class="total_stats" style="margin-top: 100px;">
        <div>
            <p style="font-size: 30px;">Total interactions:</p><br>
            <p style="font-size: 80px; color: #1B9DD9;">{{ total_interactions }}</p>
        </div>
        <div>
            <p style="font-size: 30px;">Total participations:</p><br>
            <p style="font-size: 80px; color: #1B9DD9">{{ total_participations }}</p>
        </div>
    </div>

    <div id="rest" v-if="participations || interactions" class="stats_app">
            <div style="margin-left:20px;margin-top:60px">
                <label>Activities</label>
                <div style="width:300px">
                    <v-select :options="options"></v-select>
                </div>
            </div>

            <div class="row" style="width:100%;margin-top:20px">
                <button id="activity_button" class="waves-effect waves-light btn back-btn left graph-btn"
                    @click="activity_button=true,year_button=false,course_button=false">By Activity</button>
            </div>
            <div class="row" style="width:100%;margin-top:60px">
                <button class="waves-effect waves-light btn back-btn left graph-btn"
                     @click="activity_button=false,year_button=true,course_button=false">By Year</button>
            </div>
            <div class="row" style="width:100%;margin-top:60px">
                <button class="waves-effect waves-light btn back-btn left graph-btn"
                     @click="activity_button=false,year_button=false,course_button=true">By Course</button>
            </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'statistics-dashboard',
  components: {
  },
  data(){
    return{
        general:true,
        interactions:false,
        participations:false,
        activity_button:false,
        year_button:false,
        course_button:false,
        total_interactions:20,
        total_participations:10,
        options:['Total','Going to sushi','Playing piano','Just staring at a wall']
    }
  }
}
</script>

<style scoped>

.back-btn {
    margin-left: 40px;
    margin-top: 10px;
    position: absolute;
}

.graph-btn {
    width: 300px;
    margin-left: 30px;
}

.stats_app {
    text-align: left;
}


.total_stats {
    display: flex;
    justify-content: space-evenly;
    font-size: 30px;
}

.total_stats p {
    margin: 0;
    text-align: center;
    width: 100%;
    font-weight: 700;
    line-height: 20px;
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
</style>