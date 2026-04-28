import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ActivitiesView from '../views/ActivitiesView.vue'
import FriendsView from '../views/FriendsView.vue'
import LoginView from '../views/LoginView.vue'
import AdminView from '../views/AdminView.vue'
import { useSessionStore } from '../stores/session'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/activities',
      name: 'activities',
      component: ActivitiesView,
      beforeEnter: (to, from, next) => {
        const session = useSessionStore()
        if (session.user) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/friends',
      name: 'friends',
      component: FriendsView,
      beforeEnter: (to, from, next) => {
        const session = useSessionStore()
        if (session.user) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      beforeEnter: (to, from, next) => {
        const session = useSessionStore()
        if (session.user?.role === 'admin') {
          next()
        } else {
          next('/login')
        }
      }
    }
  ]
})

router.beforeEach(() => {
  const session = useSessionStore()
  if (!session.user) {
    const userString = sessionStorage.getItem('user')
    if (userString) {
      session.user = JSON.parse(userString)
    }
  }
})

export default router
