<template>
  <div class="timer">
    <Transition>
      {{ timerText }}
    </Transition>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";

const emit = defineEmits(["update:timer"]);
const timer = ref(0);
const timerMs = ref(0);
const timerMsText = computed(() => {
  if (timerMs.value < 10) return `0${timerMs.value}`;
  return timerMs.value;
});
const timerText = computed(() => {
  if (timer.value < 10) return `0${timer.value}:${timerMsText.value}`;
  return `${timer.value}:${timerMsText.value}`;
});
onMounted(() => {
  setInterval(() => {
    timer.value++;
    emit("update:timer", timer.value);
  }, 1000);
  setInterval(() => {
    timerMs.value++;
    if (timerMs.value === 100) {
      timerMs.value = 0;
    }
  }, 20);
});
</script>
<style lang="scss" scoped>
.timer {
  font-size: 2em;
  text-align: center;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
