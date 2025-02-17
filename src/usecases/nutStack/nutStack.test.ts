import { describe, it, expect, beforeEach } from "vitest";
import { canMove, onNutStackClick } from "./nutStack";
import { game } from "../../state/game";

describe("nutStack utilities", () => {
  // Reset the game state before each test.
  beforeEach(() => {
    // Create 11 empty stacks (as in your initializeStacks function)
    game.state.state.stacks = Array.from({ length: 11 }, () => []);
    game.state.state.active = null;
  });

  describe("canMove", () => {
    it("should return false if the fromStack is empty", () => {
      game.state.state.stacks[0] = []; // empty fromStack
      game.state.state.stacks[1] = [{ color: 1, id: 1 }];
      expect(canMove(0, 1)).toBe(false);
    });

    it("should return false if the toStack is full (4 or more nuts)", () => {
      game.state.state.stacks[0] = [{ color: 1, id: 1 }];
      game.state.state.stacks[1] = [
        { color: 1, id: 2 },
        { color: 1, id: 3 },
        { color: 1, id: 4 },
        { color: 1, id: 5 }
      ];
      expect(canMove(0, 1)).toBe(false);
      expect(game.state.state.stacks[0]).toEqual([{ color: 1, id: 1 }]);
      expect(game.state.state.stacks[1]).toEqual([
        { color: 1, id: 2 },
        { color: 1, id: 3 },
        { color: 1, id: 4 },
        { color: 1, id: 5 }
      ]);
    });

    it("should return true if the toStack is empty", () => {
      game.state.state.stacks[0] = [{ color: 1, id: 1 }];
      game.state.state.stacks[1] = [];
      expect(canMove(0, 1)).toBe(true);
    });

    it("should return true if both stacks are non-empty and their top nuts have matching colors", () => {
      game.state.state.stacks[0] = [{ color: 1, id: 1 }];
      game.state.state.stacks[1] = [{ color: 1, id: 2 }];
      expect(canMove(0, 1)).toBe(true);
    });

    it("should return false if both stacks are non-empty and their top nuts have different colors", () => {
      game.state.state.stacks[0] = [{ color: 2, id: 1 }];
      game.state.state.stacks[1] = [{ color: 1, id: 2 }];
      expect(canMove(0, 1)).toBe(false);
    });
  });

  describe("onNutStackClick", () => {
    it("should set the active stack if clicking a non-empty stack when no active is set", () => {
      game.state.state.stacks[2] = [{ color: 1, id: 10 }];
      onNutStackClick(2);
      expect(game.state.state.active).toBe(2);
    });

    it("should toggle active to null when clicking on the active stack", () => {
      game.state.state.stacks[3] = [{ color: 1, id: 11 }];
      // Set stack 3 as active.
      game.actions.setActive(3);
      // Clicking the same stack should toggle off.
      onNutStackClick(3);
      expect(game.state.state.active).toBe(null);
    });

    it("should not move nuts if move is not allowed (e.g. top colors do not match)", () => {
      // Setup active stack (index 0) with top nut of color 2.
      game.state.state.stacks[0] = [
        { color: 2, id: 1 },
        { color: 2, id: 2 }
      ];
      // Setup target stack (index 1) with top nut of color 1.
      game.state.state.stacks[1] = [{ color: 1, id: 3 }];
      game.actions.setActive(0);
      onNutStackClick(1);
      // Expect no move: stacks remain unchanged and active remains.
      expect(game.state.state.stacks[0].length).toBe(2);
      expect(game.state.state.stacks[1].length).toBe(1);
      expect(game.state.state.active).toBe(0);
    });

    it("should move nuts from the active stack to the target stack if the move is allowed (single nut move)", () => {
      // Setup: active stack with one nut and target stack empty.
      game.state.state.stacks[0] = [{ color: 1, id: 100 }];
      game.state.state.stacks[1] = [];
      game.actions.setActive(0);
      onNutStackClick(1);
      // Expect the nut to be removed from stack 0 and added to stack 1.
      expect(game.state.state.stacks[0]).toEqual([]);
      expect(game.state.state.stacks[1]).toEqual([{ color: 1, id: 100 }]);
      expect(game.state.state.active).toBe(null);
    });

    it("should move multiple nuts from the active stack if they share the same color and capacity allows", () => {
      // --- Scenario B: Multiple nut move ---
      // We want the top nut(s) of stack 0 (active) to be moved.
      // Remember: the last element of the array is the "top".
      // We'll set up stack 0 so that its top three nuts are the same color (1)
      // and there is a nut of a different color at the bottom.
      game.state.state.stacks[0] = [
        { color: 2, id: 4 }, // bottom nut (will not be moved)
        { color: 1, id: 1 },
        { color: 1, id: 2 },
        { color: 1, id: 3 } // top nut
      ];
      // Target stack (index 1) is empty.
      game.state.state.stacks[1] = [];
      game.actions.setActive(0);
      onNutStackClick(1);
      /* Expected behavior:
               - doMove pops the top nut: { color:1, id:3 }.
               - Since stack 0 is not empty, it then checks the next top:
                   From stack 0, top is now { color:1, id:2 }.
               - Thus, all stack with same color moves.
            */
      expect(game.state.state.stacks[0]).toEqual([{ color: 2, id: 4 }]);
      expect(game.state.state.stacks[1]).toEqual([
        { color: 1, id: 3 },
        { color: 1, id: 2 },
        { color: 1, id: 1 }
      ]);
      expect(game.state.state.active).toBe(null);
    });
  });
});
