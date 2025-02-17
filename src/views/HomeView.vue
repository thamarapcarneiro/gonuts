<template>
  <div class="home">
    <h1>Nuts Sort</h1>
    <p>Gotta sort em all</p>
    <button @click="goNuts">Play</button>
  </div>
</template>
<script setup lang="ts">
import { RoutesName } from "../router/routes";
import { useRouter } from "vue-router";

const router = useRouter();
function goNuts() {
  router.push({
    name: RoutesName.Game
  });
}
</script>
