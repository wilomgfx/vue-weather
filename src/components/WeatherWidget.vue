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
        <h2 class="subtitle has-text-centered">Filter by date</h2>
        <div class="tabs is-centered is-medium">
            <ul>
                <span v-for="(date,index) in foreCastDates">
                    <li :class="{ 'is-active': date.isActive }">
                        <a href="#" @click.prevent="filterByDate(index)">{{ date.date }}</a>
                    </li>
                </span>
            </ul>
        </div>
        <div v-for="(weatherItem, index) in foreCastListByDate">
            <weather-card :fore-cast="true" :fore-cast-date="weatherItem.dt_txt" v-show="selectedDate == weatherItem.date">
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
            this.selectedDate = this.foreCastListByDate[0].date;
            this.foreCastDates[0].isActive = true;
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
            foreCastListByDate : [],
            foreCastDates: [],
            selectedDate : ''
        }
    },
    methods : {
        foreCastsByDate(){
            if(this.foreCast){
                var foreCasts = this.foreCast.list;
                foreCasts.forEach((data) =>{
                    let date = dateFormat('dd/MM/yyyy',new Date(data.dt_txt));
                    data['date'] = date;
                    let foreCastDate = {date, isActive : false};
                    if(!foreCasts.containsObjProperty(foreCastDate, 'date', this.foreCastDates)){
                        this.foreCastDates.push(foreCastDate);
                    }
                })
                return foreCasts;
            }
            return [];
        },
        filterByDate(index){
            for(let i =0;i < this.foreCastDates.length; i++){
                this.foreCastDates[i].isActive = false;
            }
            this.selectedDate = '';
            this.foreCastDates[index].isActive = true;
            this.selectedDate = this.foreCastDates[index].date;
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