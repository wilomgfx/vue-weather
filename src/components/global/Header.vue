<template>
    <div>
        <nav class="nav">
            <div class="nav-left">
                <a class="nav-item is-brand" href="#">
                    <img src="../../assets/logo.png" alt="Bulma logo">
                    -weather
                </a>
            </div>

            <span class="nav-toggle">
                <span></span>
                <span></span>
                <span></span>
            </span>

            <div class="nav-right nav-menu">
                <form class="container is-flex" @submit.prevent>
                    <p class="control has-addons">
                        <input class="input" type="text" placeholder="Find a city" v-model="city" @keyup.13="getWeatherForCity">
                        <a class="button is-info" @click="getWeatherForCity">
                            Search
                        </a>
                    </p>
                </form>
            </div>
        </nav>
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
            this.axios.get(this.weatherFor(this.city))
                .then((response) => {
                    this.bus.$emit('weather-found', response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
            this.axios.get(this.foreCastFor(this.city))
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
    align-items: center;
}
</style>