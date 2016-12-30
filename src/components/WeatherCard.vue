<template>
    <div class="weather__card">
        <h2 class="title is-2 has-text-centered" v-show="foreCast">{{ foreCastDateTime }}</h2>
        <div class="box">
            <article class="media">
                <div class="media-left">
                    <slot name="icon"></slot>
                </div>
                <div class="media-content">
                <div class="content">
                    <p>
                        <span class="title is-3"><slot name="main"></slot></span>
                        <br>
                        <span><slot name="description"></slot></span>
                    </p>
                </div>
                <h2 class="title is-2 has-text-centered" v-show="foreCast">{{ foreCastTimeOfDay }}</h2>
                <div class="level">
                        <div class="level-item has-text-centered">
                            <p class="heading"><span v-show="!foreCast">Current</span> Temperature</p>
                            <p class="title"><slot name="curr_temp"></slot> °C</p>
                        </div>
                        <div class="level-item has-text-centered">
                            <p class="heading">Min Temperature</p>
                            <p class="title"><slot name="min_temp"></slot> °C</p>
                        </div>
                        <div class="level-item has-text-centered">
                            <p class="heading">Max Temperature</p>
                            <p class="title"><slot name="max_temp"></slot> °C</p>
                        </div>
                        <div class="level-item has-text-centered">
                            <p class="heading">Humidity</p>
                            <p class="title"><slot name="humidity"></slot> %</p>
                        </div>
                    </div>
                    <hr>
                    <div class="level">
                        <div class="level-item has-text-centered">
                            <p class="heading">Current pressure</p>
                            <p class="title"><slot name="pressure"></slot> hPa</p>
                        </div>
                        <div class="level-item has-text-centered">
                            <p class="heading">Wind speed</p>
                            <p class="title"><slot name="wind_speed"></slot> m/s</p>
                        </div>
                        <div class="level-item has-text-centered">
                            <p class="heading">Wind direction</p>
                            <p class="title"><slot name="wind_deg"></slot></p>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </div>
</template>

<script>
import dateFormat from 'date-format';
export default {
    name : 'weatherCard',
    props:{
        foreCast : {
            type : Boolean,
            default : false
        },
        foreCastDate: {
            Type: Date
        }
    },
    computed : {
        foreCastDateTime(){
            return dateFormat('dd/MM/yyyy',new Date(this.foreCastDate));
        },
        foreCastTimeOfDay(){
            return dateFormat('hh:mm:ss',new Date(this.foreCastDate));
        }
    }
}
</script>

<style>
.weather__card {
    margin-bottom : 10px;
}
</style>