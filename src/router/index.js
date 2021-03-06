import Vue from 'vue'
import VueRouter from 'vue-router'
import CompaniesLogin from '../views/CompaniesLogin.vue'
import Dashboard from '../views/Dashboard.vue'
import ActivitiesDashboard from '../views/activities/ActivitiesDashboard.vue'
import ActivityType from '../views/activities/ActivityType.vue'
import MealsDashboard from '../views/meals/MealsDashboard.vue'
import MealPage from '../views/meals/MealPage.vue'
import AuctionDashboard from '../views/auction/AuctionDashboard.vue'
import JobFair from '../views/activities/JobFair.vue'
import StatisticsDashboard from '../views/statistics/StatisticsDashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'companies-login',
    component: CompaniesLogin
  },
  {
    path: '/dashboard',
    name: 'dashboard-main',
    component: Dashboard
  },
  {
    path: '/activitiesdashboard',
    name: 'activities-dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ActivitiesDashboard
  },
  {
    path: '/activitytype',
    name: 'activity-type',
    component: ActivityType
  },
  {
    path: '/mealsdashboard',
    name: 'meals-dashboard',
    component: MealsDashboard
  },
  {
    path: '/mealpage',
    name: 'meal-page',
    component: MealPage
  },
  {
    path: '/auctiondashboard',
    name: 'auction-dashboard',
    component: AuctionDashboard
  },
  {
    path: '/jobfair',
    name: 'job-fair',
    component: JobFair
  },
  {
    path: '/statisticsdashboard',
    name: 'statistics-dashboard',
    component: StatisticsDashboard
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
