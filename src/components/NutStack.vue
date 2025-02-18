<script lang="ts" setup>
import bolt from "@/assets/bolt.png";
import NutComponent from "@/components/Nut.vue";
import type { Stack } from "@/types/stack.ts";
import { game } from "@/state/game.ts";
import { onNutStackClick } from "@/usecases/nutStack/nutStack.ts";
import type { Nut } from "@/types/nut.ts";

export interface NutStackProps {
  stack: Stack;
  index: number;
}
const props = defineProps<NutStackProps>();

function onClick() {
  onNutStackClick(props.index);
}

function nutStyle(nut: Nut, indexInStack: number) {
  const isActive = game.getters.isActive(props.index);
  const currentStack = game.state.state.stacks[props.index];
  // Define different offsets for mobile (<600px) and desktop
  const mobileOffsetInactive = 4.5;  // example value for mobile when inactive
  const mobileOffsetActive = 6.0;  // example value for mobile when active
  const desktopOffsetActive = 6.0; // example value for desktop when active
  const desktopOffsetInactive = 5.0; // example value for desktop when inactive

  // Check if the screen is less than 600px wide
  const isMobile = window.matchMedia("(max-width: 600px)").matches;

  if (currentStack[currentStack.length - 1].id === nut.id && isActive) {
    return {
      bottom: indexInStack * 1.2 + (isMobile ? mobileOffsetActive : desktopOffsetActive) + "rem"
    };
  }
  return {
    bottom: indexInStack * 1.2 + (isMobile ? mobileOffsetInactive : desktopOffsetInactive) + "rem"
  };
}

</script>

<template>
  <div class="nut-stack" @click="onClick()">
    <img :src="bolt" alt="Stack base" class="bolt" />
    <transition-group name="nut" tag="div">
      <NutComponent
        v-for="(nut, ix) in props.stack"
        :key="`nut-${ix}`"
        :color="nut.color"
        class="nut"
        :style="nutStyle(nut, ix)"
        :id="nut.id"
      />
    </transition-group>
  </div>
</template>

<style lang="scss" scoped>
.nut-stack {
  position: relative;
  height: 16rem;
  width: 12rem;

  .bolt {
    width: 100%;
    display: block;
  }

  .nut {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    transition: bottom 0.1s ease-in-out;
  }
}

@media (max-width: 600px) {
  .nut-stack {
    height: 10rem;
    width: 6rem;
  }
}

</style>
