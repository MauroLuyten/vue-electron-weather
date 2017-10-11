import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        weatherCache: [],
        currentWeather: null,
        weatherSource: 'http://localhost:8080/weather?city=',
        weatherSourceType: 'local',
        error: null,

    },
    mutations: {
        addWeatherForCity(state, payload) {
            state.weatherCache.push(payload.weather)
        },
        setCurrentWeather(state, payload) {
            state.currentWeather = payload.weather
        },
        setWeatherSource(state, payload) {
            state.weatherSource = payload
        },
        setWeatherSourceType(state, payload) {
            state.weatherSourceType = payload
        },
        setError(state, payload){
            state.error = payload
        }

    },
    actions: {
        fetchWeatherForCity({commit, getters}, payload) {
            commit('setError', null)
            var headers = null
            var APPID = ''
            if(getters.getWeatherSourceType==='local'){
                 headers = {
                  'Access-Control-Allow-Origin': '*',
                }
            } else {
                APPID = '&APPID=e2da41a82e64cc600fb73c8e8c7996f8'
            }
            axios.get(getters.getWeatherSource + `${payload.cityName}${APPID}`,{
                
            })
            .then(response => {
                commit('addWeatherForCity', {weather: response.data})
                commit('setCurrentWeather', {weather: response.data})
            }).catch(error=>{
                commit('setError', error)
            })
        },
        changeWeatherSource({commit}, payload) {
            if(payload.source==='local'){
                commit('setWeatherSource', 'http://localhost:8080/weather?city=' )
                commit('setWeatherSourceType', payload.source )
            } else if(payload.source==='openWeatherMap'){
                commit('setWeatherSource', 'http://api.openweathermap.org/data/2.5/weather?q=' )
                commit('setWeatherSourceType', payload.source )
            } else console.log('missed')
        },
        clearError({commit}){
            commit('setError', null)
        }

    },
    getters: {
        getError(state){
            return state.error
        },
        getWeatherCache(state) {
            return state.weatherCache
        },
        getWeatherForCity: (state) => (cityName) => {
            return state.weatherCache.find(city => city.name===cityName)
        },
        getCurrentWeather(state) {
            return state.currentWeather
        },
        getWeatherSource (state) {
            return state.weatherSource
        },
        getWeatherSourceType (state) {
            return state.weatherSourceType
        }
    }
  
})
