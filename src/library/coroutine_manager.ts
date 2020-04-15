import { BaseGameState } from "./base_state";
import { KeyInfoType } from "./keyboard";

/**
 * const state: GameState = yield CoroutineResult;
 */
export type GameCoroutine<TState extends BaseGameState> = Generator<CoroutineResult, void, TState>

export type CoroutineResult = "next" | { frames: number } | { untilKeyPress: keyof KeyInfoType };

type ActiveCoroutine<TState extends BaseGameState> = {
  fn    : GameCoroutine<TState>;
  status: 
    | { waiting: false }
    | { waiting: true; type: "frames"  ; frames: number }
    | { waiting: true; type: "untilKey"; untilKey: keyof KeyInfoType }
  name  : string;
};

export type CoroutineId = number;

export class CoroutineManager<TState extends BaseGameState> {
  private lastCoroutineId: CoroutineId = -1;
  private activeCoroutines: { [key: number]: ActiveCoroutine<TState> } = [];

  startCoroutine(name: string, co: GameCoroutine<TState>): CoroutineId {
    for (const activeCo of Object.values(this.activeCoroutines)) {
      if (activeCo.name === name) {
        throw new Error(`Two coroutines with the name ${ name }. Tell grant about this!!!`);
      }
    }

    this.activeCoroutines[++this.lastCoroutineId] = {
      fn    : co,
      status: { waiting: false },
      name  : name,
    };

    return this.lastCoroutineId;
  }

  stopCoroutine(id: CoroutineId): void {
    delete this.activeCoroutines[id];
  }

  public updateCoroutines(state: TState): void {
    for (const key of Object.keys(this.activeCoroutines)) {
      const co = this.activeCoroutines[Number(key)];

      if (co.status.waiting) {
        if (co.status.type === "frames") {
          if (co.status.frames-- < 0) {
            co.status = { waiting: false };
          } else {
            continue;
          }
        } else if (co.status.type === "untilKey") {
          if (state.keys.justDown[co.status.untilKey]) {
            co.status = { waiting: false };
          } else {
            continue;
          }
        }
      }

      const { value, done } = co.fn.next(state);

      if (done) {
        this.stopCoroutine(Number(key));

        continue;
      }

      if (value === "next") {
        continue;
      } 

      if (typeof value === "object") {
        if ("frames" in value) {
          co.status = { waiting: true, type: 'frames', frames: value.frames };

          continue;
        } else if ("untilKeyPress" in value) {
          co.status = { waiting: true, type: 'untilKey', untilKey: value.untilKeyPress };

          continue;
        }
      }
    }
  }
}
