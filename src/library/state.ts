import { Renderer } from "pixi.js";
import { KeyboardState } from "./keyboard";
import { Entity } from "./entity";
import { HashSet } from "./data_structures/hash";

export class GameState {
  keys          : KeyboardState;
  renderer     !: Renderer;
  entities      = new HashSet<Entity>();
  toBeDestroyed : Entity[] = [];
  stage        !: Entity;

  constructor() {
    this.keys = new KeyboardState();
  }
}
