import { reactive } from "vue";

function initializeLevelState() {
  return {
    stacks: [[], [], [], [], [], [], [], [], [], [], []]
  };
}
const game = reactive({
  state: initializeLevelState()
});

export { game };
