<template>
    <div>
        <v-layout justify-center>
            <v-flex xs12 sm10 md6>
                <v-alert 
                v-model="error"
                v-if="error"
                dismissible
                color="error"
                icon="error"
                class="red">
                {{error.message}}
                </v-alert>
                <v-select 
                :items="weatherSources" 
                v-model="currentSource" 
                item-value="text"
                label="Source">

                </v-select>
                <weathercard>
                </weathercard>
                <v-card v-if="!weather">
                    <v-card-title>
                        <h5>Welcome</h5>
                    </v-card-title>
                    <v-card-text>
                        Type a city/commune in the search bar above and select a source to get started!
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
export default {
    data: () => ({
        weatherSources: [
            'local',
            'openWeatherMap'
        ],
    }),
    components: {
        weathercard: require('@/components/WeatherCard.vue')
    },
    computed: {
        currentSource: {
            get() {
                return this.$store.getters.getWeatherSourceType
            },
            set(value) {
                this.$store.dispatch('changeWeatherSource', { source: value })
            },
        },
        error: {
            get(){
                return this.$store.getters.getError
            },
            set(value){
                this.$store.dispatch('clearError')
            }
        },
        weather() {
            return this.$store.getters.getCurrentWeather
        }
        
    }
}
</script>

