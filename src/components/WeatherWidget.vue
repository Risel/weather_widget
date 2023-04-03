<template>
  <v-card>
    <v-card-title>Погода в городах</v-card-title>
    <v-card-text>
      <v-list>
        <draggable v-model="cities">
          <city-card
            v-for="(city, index) in cities"
            :key="city.id"
            :city="city"
            :index="index"
            @remove="removeCity(index)"
          />
        </draggable>
      </v-list>
      <v-btn @click="showAddCityDialog = true">Добавить город</v-btn>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" @click="saveSettings">Сохранить</v-btn>
    </v-card-actions>
    <v-dialog v-model="showAddCityDialog">
      <v-card>
        <v-card-title>Добавить город</v-card-title>
        <v-card-text>
          <v-text-field v-model="newCityName" label="Название города" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="addCity">Добавить</v-btn>
          <v-btn @click="showAddCityDialog = false">Отмена</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import CityCard from "./CityCard.vue";
import { City } from "@/types";
import draggable from "vuedraggable";

export default Vue.extend({
  name: "WeatherWidget",
  components: {
    CityCard,
    draggable,
  },

  data: () => ({
    cities: [] as City[],
    showAddCityDialog: false,
    newCityName: "",
  }),
  methods: {
    async addCity() {
      // добавляем новый город в список
      const city = await this.fetchCityByName(this.newCityName);
      if (city) {
        this.cities.push(city);
        this.newCityName = "";
      }
      this.showAddCityDialog = false;
    },
    async removeCity(index: number) {
      // удаляем город из списка
      const city = this.cities[index];
      if (city) {
        this.cities.splice(index, 1);
      }
    },
    async fetchCityByName(name: string): Promise<City | undefined> {
      // получаем данные о погоде для города из API OpenWeather
      const apiKey = "ec1640fb5299f4bfed850744e0d1a2cf";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}&units=metric`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          const city: City = {
            id: data.id,
            name: data.name,
            weather: {
              temperature: data.main.temp,
              description: data.weather[0].description,
            },
          };
          return city;
        } else {
          console.error(`Ошибка получения данных: ${data.message}`);
        }
      } catch (error) {
        console.error(`Ошибка получения данных: ${error}`);
      }
    },
    saveSettings() {
      // сохраняем список городов в localStorage
      localStorage.setItem("weatherWidgetCities", JSON.stringify(this.cities));
    },
    loadSettings() {
      // загружаем список городов из localStorage
      const citiesJson = localStorage.getItem("weatherWidgetCities");
      if (citiesJson) {
        this.cities = JSON.parse(citiesJson);
      }
    },
  },
  created() {
    // загружаем список городов из localStorage при создании компонента
    this.loadSettings();
  },
});
</script>
