import { GameState } from "./state";

/**
 * const state: GameState = yield CoroutineResult;
 * 
 */
export type GameCoroutine = Generator<CoroutineResult, void, GameState>

export type CoroutineResult = "next" | { frames: number };

type ActiveCoroutine = {
  fn              : GameCoroutine;
  framesLeftToWait: number;
  name            : string;
};

export type CoroutineId = number;

export class CoroutineManager {
  private lastCoroutineId: CoroutineId = -1;
  private activeCoroutines: { [key: number]: ActiveCoroutine } = [];

  startCoroutine(name: string, co: GameCoroutine): CoroutineId {
    for (const activeCo of Object.values(this.activeCoroutines)) {
      if (activeCo.name === name) {
        throw new Error(`Two coroutines with the name ${ name }. Tell grant about this!!!`);
      }
    }

    this.activeCoroutines[++this.lastCoroutineId] = {
      fn              : co,
      framesLeftToWait: 0,
      name            : name,
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
