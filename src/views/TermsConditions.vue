<template>
    <div class="activity-type"  >
      <div v-if="this.isAuthenticated()">
        <top-bar :username="BigData.username"/>
        <div class="section-header" style="margin-top: 15vh;">
            <h2>JEEC Brain</h2>
            <p>Terms and Conditions</p>
        </div>
    
        <div class="text" style="text-align:left">
            <p  class="terms-warning " style="font-weight: 700; font-size: 24px;"> <u>
                You must accept the following terms, before proceeding to the dashboard!
            </u></p>
            <br><p >
                These Website Standard Terms and Conditions written on this webpage shall manage your use of our websites, JEECIST Website and Platform accessible at https://jeec.ist and https://jeec.jose-correia.com/.
                These Terms will be applied fully and affect to your use of this Website. By using this Website, you agreed to accept all terms and conditions written in here. You must not use this Website if you disagree with any of these Website Standard Terms and Conditions.
            </p><p class="text-section"><big><b>
                Intellectual Property Rights
            </b></big></p><p class="text-ident">
                Other than the content you own, under these Terms, JEECIST and/or its licensors own all the intellectual property rights and materials contained in this Website.
            </p><p class="text-ident">
                    You are granted limited license only for purposes of viewing the material contained on this Website.
                </p>
            <p class="text-section"><big><b>
                Restrictions:
            </b></big></p><p class="text-ident">
                You are specifically restricted from all the following:</p> 
                    <p style="padding-left: 8vw;">- using this Website in any way that is or may be damaging to this Website;</p>
                    <p style="padding-left: 8vw;">- using this Website in any way that impacts user access to this Website;</p>
                    <p style="padding-left: 8vw;">- using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity;</p>
                    <p style="padding-left: 8vw;">- engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website;</p>
                    <p class="text-ident"> Certain areas of this Website are restricted from being accessed by you and JEECIST may further restrict access by you to any areas of this Website, at any time, in absolute discretion. Any user ID and password you may have for this Website are confidential and you must maintain confidentiality as well. JEECIST may un-sync, reset or terminate JEECIST Passwords in its sole discretion or any reason. JEECIST cannot and will not be liable for any loss or damage arising from your failure to comply with the above.</p>
                <p class="text-section"><big><b>
            Your Content
        </b></big></p><p class="text-ident">
                In these Website Standard Terms and Conditions, "Your Content" shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant JEECIST a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.        
            </p><p class="text-ident">Your Content must be your own and must not be invading any third-party's rights. JEECIST reserves the right to remove any of Your Content from this Website at any time without notice.
            </p><p class="text-section"><big><b>
                Links To Other Web Sites
            </b></big></p><p class="text-ident">
                    Our Service may contain links to third-party web sites or services that are not owned or controlled by JEECIST.
    
                    JEECIST has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party web sites or services. You further acknowledge and agree that JEECIST shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
                    
                    We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.
            </p><p class="text-section "><big><b>
                Linking to this Web Site
            </b></big></p><p class="text-ident">
                You may provide links to this Site, provided that (a) you do not remove or obscure, by framing or otherwise, any portion of this Site, including any advertisements, terms of use or service, copyright notice, and other notices on this Site, (b) you immediately deactivate and discontinue providing links to this Site if requested by JEECIST, and (c) JEECIST may deactivate any link(s) at its discretion.
            </p><p class="text-section"><big><b>
                No warranties
            </b></big></p><p class="text-ident">
                This Website is provided "as is," with all faults, and JEECIST express no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you.
            </p><p class="text-section"><big><b>
                Indemnification
            </b></big></p><p class="text-ident">
                You hereby indemnify to the fullest extent JEECIST from and against any and/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these Terms.
            </p><p class="text-section"><big><b>
                Assignment
            </b></big></p><p class="text-ident">
                The JEECIST is allowed to assign, transfer, and subcontract its rights and/or obligations under these Terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these Terms.
            </p><p class="text-section"><big><b>
                Entire Agreement
            </b></big></p><p class="text-ident">
                These Terms constitute the entire agreement between JEECIST and you in relation to your use of this Website, and supersede all prior agreements and understandings.
            </p><p class="text-section"><big><b>
                Governing Law
            </b></big></p><p class="text-ident">
                These Terms shall be governed and construed in accordance with the laws of Portugal, without regard to its conflict of law provisions.
            </p><p class="text-section"><big><b>
                Severability
            </b></big></p><p class="text-ident">
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.
            </p><p class="text-section"><big><b>
                Contact Us
            </b></big></p><p class="text-ident">
                For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at 
                <b>contacto@jeec.ist</b> or by mail using the details provided below:
            </p><p>
                <b>NEECIST, Rua Alves Redol 1, Lisboa, 11, 1049-001, Portugal</b>
            </p>
        </div>
    
        <div class="accept-container">
            <button @click="AcceptTerms()" class="waves-effect waves-light btn-large"><i class="large material-icons left">check</i>Accept Terms & Conditions</button>
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
    import axios from "axios"
    export default {
      name: 'terms-conditions',
      components: {
      },
      data(){
          return{
            siren:require("../assets/siren.png"),
            BigData:{
              "user_name":"",
              "company_name":"",
            },
            desc:"",
            accepted_terms:false
          }
      },
      methods:{
        ...mapGetters(["isAuthenticated"]),
        ...mapGetters(["StateUsername"]),
        AcceptTerms(){
            axios.post(process.env.VUE_APP_JEEC_BRAIN_URL + '/terms',{user: this.StateUsername()},{auth: {
    username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
    password: process.env.VUE_APP_JEEC_WEBSITE_KEY
  }}).then(response =>{ this.BigData = response.data})
            this.$router.push("/companies/dashboard");
        }
      },
      
    }
    
    </script>
    
    <style scoped>
    .text{
        font-family: 'Montserrat';
        font-style: normal;
        padding-left: 3vw;
        padding-right: 3vw;
    }

    .text-ident{
        padding-left: 3vw;
    }
    
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
    .flex-container{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: stretch;
      
    }
    .item{
     background-color:  rgb(240,240,240);
     padding:1%;
     border-radius:10%
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
    .container {
      flex-wrap: wrap ;
    }
    
    </style>
    