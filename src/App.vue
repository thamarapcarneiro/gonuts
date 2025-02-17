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
  <RouterView />
</template>

<style scoped></style>
