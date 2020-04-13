import { GameState } from "./state";

/**
 * const state: GameState = yield CoroutineResult;
 * 
 */
export type GameCoroutine = Generator<CoroutineResult, void, GameState>

export type CoroutineResult = "next" | { frames: number };

type ActiveCoroutine = {
  fn: GameCoroutine;
  framesLeftToWait: number;
};

export type CoroutineId = number;

export class CoroutineManager {
  private lastCoroutineId: CoroutineId = -1;
  private activeCoroutines: { [key: number]: ActiveCoroutine } = [];

  startCoroutine(co: GameCoroutine): CoroutineId {
    this.activeCoroutines[++this.lastCoroutineId] = {
      fn: co,
      framesLeftToWait: 0,
    };

    return this.lastCoroutineId;
  }

  stopCoroutine(id: CoroutineId): void {
    delete this.activeCoroutines[id];
  }

  public updateCoroutines(state: GameState): void {
    for (const key of Object.keys(this.activeCoroutines)) {
      const co = this.activeCoroutines[Number(key)];

      if (co.framesLeftToWait > 0) {
        co.framesLeftToWait--;

        continue;
      }

      const { value, done } = co.fn.next(state);

      if (done) {
        this.stopCoroutine(Number(key));

        continue;
      }

      if (typeof value === "object") {
        co.framesLeftToWait = value.frames;

        continue;
      }
    }
  }
}
