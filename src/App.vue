<template>
  <nav>
    <app-topbar></app-topbar>
  </nav>
  <router-view/>
</template>

<script>
import appTopbar from '@/components/Topbar'

  export default {
    name: 'app',
    components: {
      appTopbar
    },
  }

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
