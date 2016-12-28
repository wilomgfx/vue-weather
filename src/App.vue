<template>
  <div>
    <header-nav></header-nav>
    <section class="section">
      <div class="container">
        <div class="heading">
          <h1 class="title">Weather in the current location : {{ location }}</h1>
          <h2 class="subtitle">
            <weather-widget></weather-widget>
          </h2>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import 'bulma/css/bulma.css'
import headerNav from './components/global/Header.vue'
import weatherWidget from './components/global/WeatherWidget.vue'
export default {
  name: 'app',
  components : {
    headerNav,
    weatherWidget
  },
  created () {
    this.bus.$on('search-location' , (location) => {
      this.location = location;
    });
  },
  data () {
    return {
      location: 'Longueuil'
    }
  }
}
</script>

<style>

</style>
