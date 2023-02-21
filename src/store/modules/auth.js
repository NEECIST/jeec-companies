import CryptoJS from 'crypto-js'
import axios from 'axios';
const state = {
  username: null,
  company: null,
};

const getters = {
    isAuthenticated: state => !!state.username,    
    StateUsername: state => state.username,
    Company: state => state.company,
};

const actions = {
async LogIn({commit},bad_form) {
  const form = {
    username: bad_form.username,
    password: bad_form.password
  }
  const response = await axios.post(process.env.VUE_APP_JEEC_BRAIN_URL + '/login_vue', {username : form.username})
  console.log(response.data)
  if(response != ""){
    console.log(response.data.password)
    const password = CryptoJS.DES.decrypt(response.data.password, process.env.VUE_APP_API_KEY).toString(CryptoJS.enc.Utf8);
    console.log(password)
    if (password.normalize() === form.password.normalize()){
      commit('setUser',form.username)
      commit('setCompany',response.data.company)
    }
    else{
      this.LogOut()
    }
  }
},
async LogOut({commit}){
  let user = null
  commit('LogOut',user)
}


};
const mutations = {
    setUser(state, username){
        state.username = username
    },
    LogOut(state){
        state.username = null
        state.company = null
    },
    setCompany(state,company){
      state.company = company
    }
};

export default {
  state,
  getters,
  actions,
  mutations
};


