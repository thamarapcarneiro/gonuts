<script setup lang="ts">
import { onMounted } from "vue";
import { game } from "@/state/game.ts";

onMounted(() => {
  const currentLevel = localStorage.getItem("currentLevel");
  if (!currentLevel) return;
  game.state.level = parseInt(currentLevel);
});
</script>

<template>
  <div class="view">
    <RouterView />
  </div>
</template>

<style lang="scss">
@use "@/assets/style.scss";
</style>
