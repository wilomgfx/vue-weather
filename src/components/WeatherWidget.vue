<template>
    <div>
        <div class="heading">
            <h1 class="title">Weather at location : {{ location }}</h1>
        </div>
        <weather-card>
            <i slot="icon" :class="icon"></i>
            <span slot="main">{{ weather.main }}</span>
            <span slot="description">{{ weather.description }}</span>
            <span slot="curr_temp">{{ main.temp }}</span>
            <span slot="min_temp">{{ main.temp_min }}</span>
            <span slot="max_temp">{{ main.temp_max }}</span>
            <span slot="humidity">{{ main.humidity }}</span>
            <span slot="pressure">{{ main.pressure }}</span>
            <span slot="wind_speed">{{ wind.speed }}</span>
            <span slot="wind_deg">{{ wind.deg }}</span>
        </weather-card>
        <hr>
        <div class="heading">
          <h1 class="title">5 days forecast for : {{ location }}</h1>
        </div>
        <weather-card v-for="weatherItem in foreCastListByDate" :fore-cast="true" :fore-cast-date="weatherItem.dt_txt">
            <i slot="icon" :class="icon"></i>
            <span slot="main">{{ weatherItem.weather[0].main }}</span>
            <span slot="description">{{ weatherItem.weather[0].description }}</span>
            <span slot="curr_temp">{{ weatherItem.main.temp }}</span>
            <span slot="min_temp">{{ weatherItem.main.temp_min }}</span>
            <span slot="max_temp">{{ weatherItem.main.temp_max }}</span>
            <span slot="humidity">{{ weatherItem.main.humidity }}</span>
            <span slot="pressure">{{ weatherItem.main.pressure }}</span>
            <span slot="wind_speed">{{ weatherItem.wind.speed }}</span>
            <span slot="wind_deg">{{ weatherItem.wind.deg }}</span>
        </weather-card>
    </div>
</template>

<script>
import weatherCard from './WeatherCard.vue'
import dateFormat from 'date-format';
export default {
    name : 'weatherWidget',
    components: {
        weatherCard
    },
    props:['location'],
    created (){
        this.bus.$on('forecast-found', (data) =>
        {
            let foreCastData = data;
            this.foreCast = foreCastData;
            this.foreCastListByDate = this.foreCastsByDate();
        });

        this.bus.$on('weather-found', (data) =>
        {
            let mainData = data;
            this.main = mainData.main;
            this.weather = mainData.weather[0];
            this.sys = mainData.sys;
            this.wind = mainData.wind; 
        });
    },
    data (){
        return {
            weather : {},
            main : {},
            sys : {},
            wind : {},
            foreCast : {},
            foreCastListByDate : []
        }
    },
    methods : {
        foreCastsByDate(){
            if(this.foreCast){
                var foreCasts = this.foreCast.list;
                foreCasts.forEach((data) =>{
                    let date = dateFormat('dd/MM/yyyy',new Date(data.dt_txt));
                    data['date'] = date;
                })
                return foreCasts;
            }
            return [];
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
                return `owf owf-${id}${suffix} owf-5x owf-border`;
            }
            return '';
        }
    }
}

</script>

<style>
</style>