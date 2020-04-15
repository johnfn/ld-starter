import { Renderer } from "pixi.js";
import { KeyboardState } from "./keyboard";
import { Entity } from "./entity";
import { HashSet } from "./data_structures/hash";

export class BaseGameState<TState extends BaseGameState = any> {
  keys          : KeyboardState;
  renderer     !: Renderer;
  entities      = new HashSet<Entity<TState>>();
  toBeDestroyed : Entity<TState>[] = [];
  stage        !: Entity<TState>;
  spriteToEntity: { [key: number]: Entity<TState> } = {};

  constructor() {
    this.keys = new KeyboardState();
  }
}
