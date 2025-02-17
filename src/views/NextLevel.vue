<script lang="ts" setup>
import { game } from "@/state/game.ts";
import { useRouter } from "vue-router";
import { RoutesName } from "@/router/routes";

const router = useRouter();
function goToNextLevel() {
  game.actions.goToNextLevel();
  router.push({
    name: RoutesName.Game
  });
}
</script>
<template>
  <div class="next-level">
    <h1>Congratulations!</h1>
    <p>You just completed level {{ game.state.level }}</p>

    <button @click="goToNextLevel()">Next Level</button>
  </div>
</template>
