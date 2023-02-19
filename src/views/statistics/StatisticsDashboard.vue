<template>
  <div class="statistics-dashboard">
    <div v-if="this.isAuthenticated()">
        <top-bar username="company"/>
    <section-header-component
    name="Statistics"
    description="Statistics from app usage"
    back_page="/dashboard"
    />
    <div class="flexbox-btns" style="justify-content: center; margin-top: 90px;">
        <button @click="setGeneral" id="general_btn" class="waves-effect blue lighten-2 btn-large dashboard-btn" style="width: 250px;"><i
                class="large material-icons left">info</i>General</button>
        <button @click="setInteractions" id="interactions_btn" class="waves-effect blue lighten-2 btn-large dashboard-btn"
            style="margin-left: 50px; margin-right: 50px; width: 250px;">
            <i class="large material-icons left">autorenew</i>Interactions</button>
        <button @click="setParticipations" id="participations_btn" class="waves-effect blue lighten-2 btn-large dashboard-btn"
            style="width: 250px;"><i
                class="large material-icons left">group</i>Participations</button>
    </div>

    <div id="general" v-if="this.graph_type=='general'" class="total_stats" style="margin-top: 100px;">
        <div>
            <p style="font-size: 30px;">Total interactions:</p><br>
            <p style="font-size: 80px; color: #1B9DD9;">{{ response_data.total_interactions }}</p>
        </div>
        <div>
            <p style="font-size: 30px;">Total participations:</p><br>
            <p style="font-size: 80px; color: #1B9DD9">{{ response_data.total_participations }}</p>
        </div>
        <div>
            <p style="font-size: 30px;">Total interested:</p><br>
            <p style="font-size: 80px; color: #1B9DD9">{{ response_data.total_interested }}</p>
        </div>
    </div>

    <div id="rest" v-else class="stats_app">
            <div style="margin-left:20px;margin-top:60px">
                <div style="width:300px">
                    <div>Activities</div>
                        <select v-model="selected" style="display:block">
                        <option value="Total" selected="true">Total</option>
                        <option v-for="_activity in test_activities" :key="_activity" :value="_activity">{{_activity}}
                        </option>
                        </select>
                </div>
            </div>

            <div class="row" style="width:100%;margin-top:20px">
                <button id="activity_button" class="waves-effect waves-light btn back-btn left graph-btn"
                    @click="setActivity">By Activity</button>
            </div>
            <div class="row" style="width:100%;margin-top:60px">
                <button class="waves-effect waves-light btn back-btn left graph-btn"
                @click="setYear">By Year</button>
            </div>
            <div class="row" style="width:100%;margin-top:60px">
                <button class="waves-effect waves-light btn back-btn left graph-btn"
                @click="setCourse">By Course</button>
            </div>
            <Plotly :data="data" :layout="layout" :display-mode-bar="false"></Plotly>
    </div>
            <!-- <center>
                <div class="test" style="margin-top: 50px">
                    <div id="tester"></div>
                </div>
            </center> -->
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
import { Plotly } from 'vue-plotly'
export default {
  name: 'statistics-dashboard',
  components: {
    Plotly,
  },
  data(){
    return{
        data: [{
            values: [],
            labels: [],
            marker: {
                colors: [
                    "#68EDC6",
                    "#B5BA72",
                    "#E9B872",
                    "#BA2C73",
                    "#13505B",
                    "#353531",
                    "#FDE74C",
                    "#C1FBA4",
                    "#D8D4F2",
                    "#A5C4D4",
                ]
            },
            type: 'pie'
        }],
        layout: {
            height: 500,
            width: 1000,
            title: "Total interactions by activity"
        },
        siren:require("../../assets/siren.png"),
        selected:"",
        graph_type :"general",
        mode : "activity",
        test_activities:["Playing dumb","Trying to swim","Drowning in stupidity"],
        // options:['Total','Going to sushi','Playing piano','Just staring at a wall'],
        response_data:{
            participations_by_course:{},
            participations_by_year:{},
            interactions_by_course:{},
            interactions_by_year:{},
            total_interested:0,
            total_participations_by_year:{},
            total_participations:0,
            total_participations_by_activity:{},
            total_participations_by_course:{},
            total_interactions_by_year:{},
            total_interactions:0,
            total_interactions_by_course:{},
            total_interactions_by_activity:{},
            "error":"",
        }
    }
  },
  methods:{
    ...mapGetters(["isAuthenticated"]),
    ...mapGetters(["Company"]),
    setGeneral(){
        this.graph_type='general',
        this.graph_plot();
    },
    setInteractions(){
        this.graph_type='interactions'
        this.graph_plot();
    },
    setParticipations(){
        this.graph_type='participations'
        this.graph_plot();
    },
    setActivity(){
        this.mode='activity'
        this.graph_plot();
    },
    setYear(){
        this.mode='year'
        this.graph_plot();
    },
    setCourse(){
        this.mode='course'
        this.graph_plot();
    },
    replot(target_data) {
            if (target_data) {
                this.data[0].values = Object.values(target_data);
                this.data[0].labels = Object.keys(target_data);
                console.log(this.selected + " " + this.graph_type + " by " + this.mode);
                this.layout.title = this.selected + " " + this.graph_type + " by " + this.mode;
                Plotly.newPlot(this.data, this.layout);
            }
            else{
                console.log("No data with"+ this.selected + " " + this.graph_type + " by " + this.mode);
                this.layout.title = "No data for "+ this.selected + " " + this.graph_type + " by " + this.mode;
            }

        },
    graph_plot() {
        console.log("Entered graph plot with mode: "+this.mode+" and graph_type: "+this.graph_type)
        if (this.graph_type === "interactions") {
            if (this.mode === "course") {
                this.replot(this.response_data.interactions_by_course[this.selected]);
            }
            else if (this.mode === "year") {
                this.replot(this.response_data.interactions_by_year[this.selected]);
            }
            else if (this.mode === "activity") {
                this.replot(this.response_data.total_interactions_by_activity);
            }
        }
        else {
            if (this.mode === "course") {
                this.replot(this.response_data.participations_by_course[this.selected]);
            }
            else if (this.mode === "year") {
                this.replot(this.response_data.participations_by_year[this.selected]);
            }
            else if (this.mode === "activity") {
                this.replot(this.response_data.total_participations_by_activity);
            }
        }
    },
  },
  mounted(){
    axios.post(process.env.VUE_APP_JEEC_BRAIN_URL + '/statistics/vue',{company:this.Company()}).then(response => {
      this.response_data = response.data
    });
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