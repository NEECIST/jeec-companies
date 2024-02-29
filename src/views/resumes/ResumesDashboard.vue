<template>

  <!-- <link rel="stylesheet" href="/static/admin/css/global.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> -->

  <!-- <script src="/static/jquery-3.6.0.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script> -->
<!-- 
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no,maximum-scale=1">
  <link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon">
  <link rel="shortcut icon" type="image/x-icon" href="./static/j_logo.png"> -->
<!-- 
  <link href="https://fonts.googleapis.com/css?family=Karla|Lato|Roboto|Raleway|Source+Sans+Pro" rel="stylesheet"> -->

<div class = "resumes-dashboard">
    <top-bar username="company"/>
    <section-header-component
    name="Student's Resumes"
    description="Download student curriculums"
    back_page="/companies/dashboard"
    />

  <div class="flexbox-btns" style="justify-content: center; margin-top: 70px;">
    <div>
      <button id="all_btn" class="waves-effect blue lighten-2 btn-large dashboard-btn" style="margin-right: 50px;"><i
        class="large material-icons left" @click="(this.showAll=true)">people</i>All</button>

    <button id="interested_btn" class="waves-effect blue lighten-2 btn-large dashboard-btn"><i
        class="large material-icons left" @click="(this.showAll=false)">person_add</i>Interested</button>
    </div>
      <!-- <div class="flexbox-btns" style="margin-bottom: 50px;"> -->
    <button v-if="response_data.error==''" class="waves-effect red btn dashboard-btn" style="font-weight: 700; margin-top:4vh"
      @click="downloadAll"><i
        class="material-icons left">file_download</i>Download All</button>
      <!-- </div> -->

  <p
    style="text-align: center; margin: 0; margin-top: 2vh; margin-bottom: 30px; font-size: 20px; font-weight: 700; color: red;">
    Be aware, students resumes submission hasn't closed yet</p>
</div>

  <div id="all">
    <div class="section-title center-align" style="margin-top:20px;">
      List of Students Resumes
    </div>

    <div class="list">
      <div v-if="response_data.error!=''">
      <blockquote class="create-error">
        {{ response_data.error }}
      </blockquote>
    </div>
      <div v-else>
      <div class="counter right">
        Students: {{ response_data.company_students.length }}
      </div>

      <table class="striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Degree</th>
            <th>Entry Year</th>
            <th>Email</th>
            <th>Interested</th>
            <th>Linkedin</th>
            <th>CV's</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in this.response_data.company_students" :class="not_interested(student)" :key="student[1]">
            <td><b>{{ student[4] }}</b></td>

            <td>
              {{ student[1] }}
            </td>

            <td>
              {{ student[0] }}
            </td>

            <td>
              {{ student[5] }}
            </td>

            <td>
              <div v-if="student[6]">
                <i class="material-icons icon-green">check</i>
              </div>
              <div v-else>
                <i class="material-icons icon-red">clear</i>
              </div>
            </td>

            <td>
              <div v-if="student[2]">
                <a :href="student[2]" target="_blank">{{ student[2] }}</a>
              </div>
              <div v-else>
                <i class="material-icons icon-red">clear</i>
              </div>
            </td>

            <td>
              <btn class="waves-effect waves-light btn-floating"
              @click="DownloadOne(student[3],student[4])"
              ><i class="material-icons left">download</i>CV</btn>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  </div>
  </div>
</template>

  <script>
  import { mapGetters } from "vuex";
  import axios from "axios";
  export default {
  name: 'resumes-dashboard',
  components: {
  },
  data(){
    return{
        showAll:true,
        response_data:{
            error:"",
            company_students:[]
        },
    }
},
methods:{
    ...mapGetters(["isAuthenticated"]),
    ...mapGetters(["Company"]),
    downloadAll(){
      axios({
                    url: process.env.VUE_APP_JEEC_BRAIN_URL + '/resumes/download_vue',
                    method: 'GET',
                    responseType: 'arraybuffer',
                    auth: {
                      username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
                      password: process.env.VUE_APP_JEEC_WEBSITE_KEY
                    }
                }).then(response=>this.forceFileDownload(response, 'curriculos_JEEC24.zip'))
    },
    forceFileDownload(response, title) {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', title)
      document.body.appendChild(link)
      link.click()
    },
    downloadOne(student_external_id,student_name){
      const filemane = "cv-" + student_name.replace(/\s/g,'') + ".pdf"
      axios({
                    url: process.env.VUE_APP_JEEC_BRAIN_URL + '/resumes/download_one',
                    method: 'POST',
                    responseType: 'arraybuffer',
                    data: student_external_id,
                    auth: {
                      username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
                      password: process.env.VUE_APP_JEEC_WEBSITE_KEY
                    }
                }).then(response=>this.forceFileDownload(response, filemane))
    },
},
computed:{
    not_interested(student){
        if(student[6]||this.showAll){
            return{
                dont_display:false
            }
        }
        else{
            return{
                dont_display:true
            }
        }
    }
},
mounted(){
  axios.post(process.env.VUE_APP_JEEC_BRAIN_URL + "/resumes/vue",{company:this.Company()},{auth: {
    username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
    password: process.env.VUE_APP_JEEC_WEBSITE_KEY
  }}).then(response=>{
    this.response_data=response.data
  });
}
}
    // $(function () {
    //   $("#all_btn").click(function () {
    //     $(".not-interested").show();
    //   });

    //   $("#interested_btn").click(function () {
    //     $(".not-interested").hide();
    //   });
    // })
  </script>

<style>

.dont_display{
    display:none
}

</style>