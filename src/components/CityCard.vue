<template>
  <v-card
    class="city-card"
    :class="{ 'city-card--dragging': isDragging }"
    @mousedown="handleMouseDown"
  >
    <v-card-title>
      <v-row align="center" justify="space-between">
        <div class="city-card__name">{{ city.name }}</div>
        <v-icon class="city-card__icon" @click.stop="removeCity"
          >mdi-close</v-icon
        >
      </v-row>
    </v-card-title>
    <v-card-text>
      <div class="city-card__temperature">{{ city.weather.temperature }}°C</div>
      <div class="city-card__description">{{ city.weather.description }}</div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { City } from "../types";

export default defineComponent({
  props: {
    city: {
      type: Object as () => City,
      required: true,
    },
    isDragging: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    removeCity() {
      // удаляем город из списка
      this.$emit("removeCity");
    },
    handleMouseDown(event: MouseEvent) {
      // начинаем перетаскивание элемента списка при нажатии на него
      if (event.button === 0) {
        this.$emit("dragStart", event);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.city-card {
  margin-bottom: 16px;
  transition: all 0.2s ease-in-out;

  &--dragging {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    opacity: 0.8;
    transform: scale(1.05);
  }
}

.city-card__name {
  font-size: 18px;
  font-weight: 500;
}

.city-card__icon {
  cursor: pointer;
}

.city-card__temperature {
  font-size: 24px;
  font-weight: 500;
}

.city-card__description {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.54);
}
</style>
