<template>
  <v-app>
    <v-main>
      <weather-widget />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import WeatherWidget from "./components/WeatherWidget.vue";

export default Vue.extend({
  name: "App",

  components: {
    WeatherWidget,
  },

  data: () => ({
    //
  }),
});
</script>
