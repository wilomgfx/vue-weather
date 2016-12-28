<template>
    <div class="box">
        <article class="media">
            <div class="media-left">
                <i :class="icon"></i>
            </div>
            <div class="media-content">
                <div class="content">
                    <p>
                    <strong>{{ weather.main }}</strong>
                    <br>
                        {{ weather.description }}
                </p>
                </div>
               <nav class="level">
                    <div class="level-item has-text-centered">
                        <p class="heading">Current Temperature</p>
                        <p class="title">{{ main.temp }} °C</p>
                    </div>
                    <div class="level-item has-text-centered">
                        <p class="heading">Min Temperature</p>
                        <p class="title">{{ main.temp_min }} °C</p>
                    </div>
                    <div class="level-item has-text-centered">
                        <p class="heading">Max Temperature</p>
                        <p class="title">{{ main.temp_max }} °C</p>
                    </div>
                    <div class="level-item has-text-centered">
                        <p class="heading">Humidity</p>
                        <p class="title">{{ main.humidity }}%</p>
                    </div>
                </nav>
            </div>
        </article>
        <!--<article class="media">
            <div class="media-content">
                <div class="content has-text-centered">
                    <h2>5 Days forecast</h2>
                </div>
                <nav class="level" v-for="forecast in foreCast.list">
                    <div class="level-item has-text-centered">
                        <p class="heading">Temperature on {{ forecast.dt_txt }}</p>
                        <p class="title">{{ forecast.main.temp }} °C</p>
                    </div>
                    <div class="level-item has-text-centered">
                        <p class="heading">Min Temperature</p>
                        <p class="title">{{ main.temp_min }} °C</p>
                    </div>
                    <div class="level-item has-text-centered">
                        <p class="heading">Max Temperature</p>
                        <p class="title">{{ main.temp_max }} °C</p>
                    </div>
                    <div class="level-item has-text-centered">
                        <p class="heading">Humidity</p>
                        <p class="title">{{ main.humidity }}%</p>
                    </div>
                </nav>
            </div>
        </article>-->
    </div>
</template>

<script>
export default {
    name : 'weatherWidget',
    created () {
        this.bus.$on('weather-found', (data) =>
        {
            let weatherData = data;
            console.log(weatherData);
            this.weather = weatherData.weather[0];
            this.main = weatherData.main;
        })
        this.bus.$on('forecast-found', (data) =>
        {
            let foreCastData = data;
            this.foreCast = foreCastData;
            
        })
    },
    data () {
        return {
            weather : {},
            main : {},
            foreCast : {},
            sys : {}
        }
    },
    computed : {
        icon(){
            if(Object.getOwnPropertyNames(this.weather).length > 1){
                let id = this.weather.id;
                let suffix = '';
                let now = Date.now();
                if(now > this.sys.sunrise && now < this.sys.sunset){
                    suffix = '-d';
                }else{
                    suffix = '-n';
                }
                return `owf owf-${id}${suffix} owf-5x`;
            }
            return '';
        }
    }
}

</script>

<style>

</style>