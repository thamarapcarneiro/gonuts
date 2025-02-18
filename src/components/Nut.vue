<script lang="ts" setup>
import { Color } from "@/types/color";

export interface NutProps {
  color: Color;
  id: number;
}
const props = defineProps<NutProps>();

const colorMap: Record<Color, string> = {
  [Color.PURPLE]: "#800080",
  [Color.RED]: "#ff0000",
  [Color.YELLOW]: "#ffff00",
  [Color.GREEN]: "#008000",
  [Color.GRAY]: "#808080",
  [Color.ORANGE]: "#ffa500",
  [Color.BLUE]: "#0000ff",
  [Color.CYAN]: "#00ffff",
  [Color.PINK]: "#ffc0cb"
};

const nutColor = colorMap[props.color];
</script>

<template>
  <!-- Bind the CSS variable so the background color can change dynamically -->
  <div class="nut" :style="{ '--nut-color': nutColor }"></div>
</template>

<style lang="scss" scoped>
.nut {
  width: 8rem;
  height: 8rem;
  background: var(--nut-color);

  border: 2px solid black;

  /* The mask-image keeps the nut shape */
  -webkit-mask-image: url("/src/assets/nut.png");
  mask-image: url("/src/assets/nut.png");

  -webkit-mask-size: contain;
  mask-size: contain;

  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;

  -webkit-mask-position: center;
  mask-position: center;

  /* Make sure the element can position pseudo-elements or backgrounds properly */
  position: relative;
}

@media (max-width: 600px) {
  .nut {
    height: 4rem;
    width: 4rem;
  }
}
</style>
