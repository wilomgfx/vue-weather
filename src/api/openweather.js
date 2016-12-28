export default class OpenWeatherApi {
    constructor() {
        this.baseUrl = 'http://api.openweathermap.org/data/2.5/'
        this.apiKey = '53f98cef6caffcd59474863e36886853'
        this.api = 'weather'
        this.query = 'q='
        this.apiUrl = `${this.baseUrl}${this.api}?${this.query}&APPID=${this.apiKey}&units=metric`;
    }
    
    rebuildApiUrl () {
        this.apiUrl = `${this.baseUrl}${this.api}?${this.query}&APPID=${this.apiKey}&units=metric`;
    }

    weatherFor (cityName){
        this.query= 'q=' + cityName;
        this.api = 'weather'
        this.rebuildApiUrl();
        return this.apiUrl;
    }

    foreCastFor (cityName){
        this.query= 'q=' + cityName;
        this.api = "forecast"
        this.rebuildApiUrl();
        return this.apiUrl;
    }
}