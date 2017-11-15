<template>
  <div id="app">
    <v-app dark>
      <v-navigation-drawer
        persistent
        :clipped="clipped"
        v-model="drawer"
      >
        <v-list>
          <v-list-tile 
            router
            :to="item.to"
            :key="i"
            v-for="(item, i) in items"
            exact
          >
            <v-list-tile-action>
              <v-icon v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title">

              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar fixed>
        <v-toolbar-side-icon 
        @click.native.stop="drawer = !drawer">
        </v-toolbar-side-icon>
            <v-toolbar-title>
                {{title}}
            </v-toolbar-title>
            <v-text-field 
            @keyup.native.enter="searchWeather()"
            class="ml-3" 
            append-icon="search" 
            v-model="search"
            placeholder="City">

            </v-text-field>
        </v-toolbar>
      <main>
        <v-container fluid fill-height>
            <v-slide-y-transition mode="out-in">
              <router-view></router-view>
            </v-slide-y-transition>
        </v-container>
      </main>
      <v-footer :fixed="fixed">
        <v-spacer></v-spacer>
        <span>&copy; 2017</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
  export default {
    name: 'weather-electron',
    data: () => ({
      clipped: false,
      drawer: true,
      fixed: true,
      items: [
        { icon: 'apps', title: 'Welcome', to: '/' }
      ],
      title: 'Weather',
      search: ''
    }),
    methods: {
        searchWeather() {
            if(this.search!==''){
                this.$store.dispatch('fetchWeatherForCity', {cityName: this.search})
            }
        }
    }
  }
</script>

<style lang="stylus">
  @import './assets/stylus/main.styl'
</style>


<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  /* Global CSS */
</style>
