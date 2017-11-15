<template>
    <v-layout width="900">
        <v-flex>
            <v-card v-if="weather" class="mb-3">
                    <v-layout row>
                            <img :src="iconPath" height="150px" alt="">
                            <p  id="current_temp">
                                {{currentTemp}}°C   
                            </p>
                    </v-layout>
                <v-card-title class="pt-0 pb-0">
                    <p id="city_name" class="ml-3 ">{{weather.name}}</p>
                </v-card-title>
                <v-card-text class="text-xs-right">
                    description: {{weatherDescription}} 
                    <br> current temperature: {{currentTemp}}°C 
                    <br> high temperature: {{highTemp}}°C 
                    <br> low temperature: {{lowTemp}}°C 
                    <br> humidity: {{humidity}}% 
                    <br> pressure: {{pressure}} hPa
                    <br> windspeed: {{windspeed}} m/s
                    <br> wind direction: {{windDirection}} deg
                </v-card-text>
            </v-card>
            <v-card v-if="weather" class="mb-3">
                <v-card-title>
                    <h5>Destination Info</h5>
                </v-card-title>
                <v-card-text>
                    {{conditionalDescription}}
                </v-card-text>
            </v-card>
            <div v-if="reviews">
                <template v-for="(review, index) in reviews"  >
                    <v-card :key="index" class="mb-3">  
                        <v-card-title>
                            <h5>Review {{index+1}}</h5>
                        </v-card-title>
                        <v-card-text>
                            {{review.review}}
                        </v-card-text>
                    </v-card>
                </template>
            </div>
            <v-card v-if="weather&&!reviews" class="mb-3">
                <v-card-title>
                    <h5>Reviews</h5>
                </v-card-title>
                <v-card-text>
                    No reviews found
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>

</template>
<script>
export default {
  data: () => ({}),
  computed: {
    weather() {
      return this.$store.getters.getCurrentWeather;
    },
    cityInfo() {
        return this.$store.getters.getCurrentCityInfo
    },
    conditionalDescription(){
        return this.cityInfo? this.cityInfo.description : 'No info found'
    },
    reviews() {
        return this.$store.getters.getCurrentReviews
    },
    weatherDescription() {
      return this.weather.weather[0].description;
    },
    currentTemp() {
      return Math.round(this.weather.main.temp - 273);
    },
    highTemp() {
      return Math.round(this.weather.main.temp_max - 273);
    },
    lowTemp() {
      return Math.round(this.weather.main.temp_min - 273);
    },
    humidity() {
      return this.weather.main.humidity;
    },
    pressure() {
      return this.weather.main.pressure;
    },
    windspeed() {
      return this.weather.wind.speed;
    },
    windDirection() {
      return this.weather.wind.deg;
    },
    icon() {
      return this.weather.weather[0].icon;
    },
    iconPath() {
      return `static/weather-icons/${this.icon}.svg`;
    }
  }
};
</script>
<style lang="stylus" scoped>
#current_temp {
    font-size: 60px !important;
    margin: auto;
}

#city_name {
    font-size: 46px !important;
}
</style>


