import { Entity } from "../library/entity";
import { GameState } from "./state";

export type Mode =
  | "Normal"
  | "Dialog"

export class ModeEntity extends Entity<GameState> {
  activeModes: Mode[] = ["Normal"];

  shouldUpdate(state: GameState) {
    return this.activeModes.includes(state.mode);
  }

  baseUpdate(state: GameState): void {
    if (this.shouldUpdate(state)) {
      for (const cb of this.queuedUpdates) {
        cb(state);
      }

      this.update(state);
    }

    this.queuedUpdates = [];
  }
}