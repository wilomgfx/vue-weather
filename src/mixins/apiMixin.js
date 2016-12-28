import OpenWeatherApi from '../api/openweather.js';

const api = new OpenWeatherApi();

export default {
  methods: {
     weatherFor : function(name) {
         return api.weatherFor(name);
     },
     foreCastFor (name) {
       return api.foreCastFor(name);
     }
  }
}