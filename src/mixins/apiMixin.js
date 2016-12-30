import OpenWeatherApi from '../api/openweather.js';

const api = new OpenWeatherApi();

export default {
  methods: {
     urlWeatherFor : function(name) {
         return api.weatherFor(name);
     },
     urlForeCastFor (name) {
       return api.foreCastFor(name);
     }
  }
}