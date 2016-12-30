<template>
    <div class="header">
        <section class="hero is-primary is-bold is-medium">
            <div class="hero-head">
                 <nav class="container nav">
                    <div class="nav-left">
                        <a class="nav-item is-brand" href="#">
                            <img src="../../assets/logo.png" alt="Bulma logo">
                            <span>-weather</span>
                        </a>
                    </div>

                    <span class="nav-toggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </nav>
            </div>
            <div class="hero-body">
                <div class="container has-text-centered">
                    <h1 class="title is-1">
                        Vue-Weather
                    </h1>
                    <h2 class="subtitle is-3">
                        Find weather info for a city
                    </h2>
                    <p class="control has-addons is-flex">
                        <input class="input is-medium" type="text" placeholder="Find a city" v-model="city" @keyup.13="getWeatherForCity">
                        <a class="button is-info is-medium" @click="getWeatherForCity">
                            Search
                        </a>
                    </p>
                </div>
            </div>
          <!--   <div class="hero-foot">
              <h2 class="title has-text-centered is-4">
                  Weather alerts
              </h2>
          </div> -->
        </section>
    </div>
</template>
<script>
export default {
    name: 'headerNav',
    data () {
        return {
            city : 'longueuil'
        }
    },
    created () {
        this.getWeatherForCity(this.city);
        this.bus.$emit('search-location', this.city);
    },
    methods : {
        getWeatherForCity(){
            this.bus.$emit('search-location', this.city);
            this.axios.get(this.urlWeatherFor(this.city))
                .then((response) => {
                    this.bus.$emit('weather-found', response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
            this.axios.get(this.urlForeCastFor(this.city))
                .then((response) => {
                    this.bus.$emit('forecast-found', response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
}
</script>
<style scoped>
.control {
    margin-top: 10px;
    align-content: center;
    justify-content: center;
}
</style>