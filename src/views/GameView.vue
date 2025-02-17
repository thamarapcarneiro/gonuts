<template>
  <h1>Go Nuts!</h1>
  <p>Level: {{ game.state.level }}</p>
  <div class="game">
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
</template>
<script lang="ts" setup>
import { game } from "@/state/game.ts";
import NutStack from "@/components/NutStack.vue";
import { watch } from "vue";
import { useRouter } from "vue-router";
import { RoutesName } from "@/router/routes";
const router = useRouter();

watch(
  () => game.state.state.stacks,
  () => {
    if (game.getters.isGameWon()) {
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
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
