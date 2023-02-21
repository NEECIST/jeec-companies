import Vue from 'vue'
import VueRouter from 'vue-router'
import CompaniesLogin from '../views/CompaniesLogin.vue'
import Dashboard from '../views/Dashboard.vue'
import ActivitiesDashboard from '../views/activities/ActivitiesDashboard.vue'
import Activity from '../views/activities/Activity.vue'
import ActivityType from '../views/activities/ActivityType.vue'
import MealsDashboard from '../views/meals/MealsDashboard.vue'
import MealPage from '../views/meals/MealPage.vue'
import AuctionDashboard from '../views/auction/AuctionDashboard.vue'
import JobFair from '../views/activities/JobFair.vue'
// import StatisticsDashboard from '../views/statistics/StatisticsDashboard.vue'
import ResumesDashboard from '../views/resumes/ResumesDashboard.vue'
import TermsConditions from '../views/TermsConditions.vue'
import ChangePassword from '../views/changePassword/ChangePassword.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/companies',
    name: 'companies-login',
    component: CompaniesLogin
  },
  {
    path: '/companies/dashboard',
    name: 'dashboard-main',
    component: Dashboard
  },
  {
    path: '/companies/activitiesdashboard',
    name: 'activities-dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ActivitiesDashboard
  },
  {
    path: '/companies/activity',
    name: 'activity-full-detail',
    component: Activity
  },
  {
    path: '/companies/activitytype',
    name: 'activity-type',
    component: ActivityType
  },
  {
    path: '/companies/mealsdashboard',
    name: 'meals-dashboard',
    component: MealsDashboard
  },
  {
    path: '/companies/mealpage/:external_id',
    name: 'meal-page',
    component: MealPage
  },
  {
    path: '/companies/auctiondashboard',
    name: 'auction-dashboard',
    props:true,
    component: AuctionDashboard
  },
  {
    path: '/companies/jobfair',
    name: 'job-fair',
    component: JobFair
  },
  // {
  //   path: '/statisticsdashboard',
  //   name: 'statistics-dashboard',
  //   component: StatisticsDashboard
  // },
  {
    path: '/companies/resumesdashboard',
    name: 'resumes-dashboard',
    component: ResumesDashboard
  },
  {
    path: '/companies/terms_conditions',
    name: 'terms-conditions',
    component: TermsConditions
  },
  {
    path: '/companies/changepassword',
    name: 'change-password',
    component: ChangePassword
  },
  { path: "*", component: CompaniesLogin },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
