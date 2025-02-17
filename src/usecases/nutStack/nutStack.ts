import { game } from "@/state/game.ts";

const canMove = (from: number, to: number) => {
  const { state } = game.state;
  const fromStack = state.stacks[from];
  const toStack = state.stacks[to];
  if (fromStack.length === 0 || toStack.length >= 4) return false;
  if (toStack.length === 0) return true;
  return (
    fromStack[fromStack.length - 1].color === toStack[toStack.length - 1].color
  );
};

const doMove = (from: number, to: number) => {
  const { state } = game.state;
  const fromStack = state.stacks[from];
  const toStack = state.stacks[to];
  const removed = fromStack.pop();
  if (!removed) return;
  const toAdd = [removed];
  while (
    fromStack.length > 0 &&
    fromStack[fromStack.length - 1].color === removed.color &&
    toStack.length + toAdd.length < 4
  ) {
    toAdd.push(fromStack.pop()!);
  }
  toAdd.forEach((nut) => toStack.push(nut));
  game.actions.setActive(null);
};

const onNutStackClick = (nutStackIndex: number) => {
  const { state } = game.state;
  const currentStack = state.stacks[nutStackIndex];
  const activeStack = state.active === null ? null : state.stacks[state.active];
  if (currentStack.length === 0 && state.active === null) return;
  if (!activeStack) {
    return game.actions.setActive(nutStackIndex);
  }

  if (state.active === nutStackIndex) {
    return game.actions.setActive(null);
  }

  const canMoveOnClick = canMove(state.active!, nutStackIndex);

  if (activeStack && canMoveOnClick) {
    doMove(state.active!, nutStackIndex);
    game.actions.setActive(null);
  }
};

export { onNutStackClick, canMove };
