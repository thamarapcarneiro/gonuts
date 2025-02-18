<script lang="ts" setup>
import { game } from "@/state/game.ts";
import { useRouter } from "vue-router";
import { RoutesName } from "@/router/routes";
import { onMounted, ref } from "vue";
import { useBestTime } from "@/usecases/game/bestTime.ts";

const bestTime = useBestTime();
const router = useRouter();

const currentBestTime = ref();

function goToNextLevel() {
  game.actions.goToNextLevel();
  router.push({
    name: RoutesName.Game
  });
}

onMounted(() => {
  currentBestTime.value = bestTime.get();
});
</script>
<template>
  <div class="next-level">
    <h1>Congratulations!</h1>
    <p>You just completed level {{ game.state.level }}</p>
    <p>You managed to do it in {{ game.state.elapsedTime }} seconds</p>
    <p v-if="currentBestTime">Your best time is {{ currentBestTime }} seconds</p>
    <button @click="goToNextLevel()">Next Level</button>
  </div>
</template>
