import { createApp 
  //, provide 
  , h } from 'vue/dist/vue.esm-bundler'
import { createRouter, createWebHistory } from 'vue-router'
import { DefaultApolloClient } from '@vue/apollo-composable'
import apolloClient from './vue-apollo'
import Index from './Index.vue'
import App from './App.vue'
import About from './About.vue'

// 1. Define route components.
// These can be imported from other files
//const Home = { template: '<div>Home</div>' }
//const About = { template: '<div>About <router-link to="/">Go to Home</router-link></div>' }

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: App },
  { path: '/about', component: About },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

const app = createApp({
  setup () {
    //provide(DefaultApolloClient, apolloClient)
  },
  
  render: () => h(Index),
})
app.provide(DefaultApolloClient, apolloClient)
app.use(router)

app.mount('#app')
