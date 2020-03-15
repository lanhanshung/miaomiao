import Vue from 'vue'
import VueRouter from 'vue-router'
import homeRouter from './home'
import cinemaRouter from './cinema'
import profileRouter from './profile'
import detailRouter from './detail'

Vue.use(VueRouter)

const routes = [
  homeRouter,
  cinemaRouter,
  profileRouter,
  detailRouter
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
