import { reactive } from "vue";
import { initializeStacks } from "../usecases/game/initializeStacks.ts";
import type { Nut } from "../types/nut.ts";

interface GameState {
  level: number;
  state: {
    stacks: Nut[][];
    active: number | null;
  };
}
function initializeGameState(): GameState {
  return {
    level: 1,
    state: {
      stacks: initializeStacks(),
      active: null
    }
  };
}
const game = reactive({
  state: initializeGameState(),
  actions: {
    setActive(stackIndex: number | null) {
      game.state.state.active = stackIndex;
    },
    goToNextLevel() {
      game.state.level++;
      game.state.state.stacks = initializeStacks();
      game.state.state.active = null;
      localStorage.setItem("currentLevel", game.state.level.toString());
    }
  },
  getters: {
    isActive(stack: number) {
      return game.state.state.active === stack;
    },
    isGameWon() {
      return game.state.state.stacks.every((stack) => {
        if (stack.length === 0) return true;
        if (stack.length < 4) return false;
        return stack.every((nut) => nut.color === stack[0].color);
      });
    }
  }
});

export { game };
