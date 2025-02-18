<template>
  <div class="game-view">
    <h1>Go Nuts!</h1>
    <p>Level: {{ game.state.level }}</p>
    <div class="game">
      <Timer @update:timer="onUpdateTimer" />
      <div class="game__board">
        <NutStack
          v-for="(stack, ix) in game.state.state.stacks"
          :stack="stack"
          :key="`stack-${ix}`"
          class="stack"
          :index="ix"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { game } from "@/state/game.ts";
import NutStack from "@/components/NutStack.vue";
import { watch } from "vue";
import { useRouter } from "vue-router";
import { RoutesName } from "@/router/routes";
import Timer from "@/components/Timer.vue";
import { useBestTime } from "@/usecases/game/bestTime.ts";
const router = useRouter();
const bestTime = useBestTime();

function onUpdateTimer(time: number) {
  game.state.elapsedTime = time;
}

watch(
  () => game.state.state.stacks,
  () => {
    if (game.getters.isGameWon()) {
      bestTime.set(game.state.elapsedTime);
      router.push({
        name: RoutesName.NextLevel
      });
    }
  },
  { deep: true }
);
</script>
<style lang="scss" scoped>
.game {
  .game__board {
    margin-top: 4rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
