import { Renderer } from "pixi.js";
import { KeyboardState } from "./keyboard";
import { Entity } from "./entity";
import { HashSet } from "./data_structures/hash";

export class BaseGameState implements Partial<Library.IGameState> {
  keys          : KeyboardState;
  renderer     !: Renderer;
  entities      = new HashSet<Entity>();
  toBeDestroyed : Entity[] = [];
  stage        !: Entity;
  spriteToEntity: { [key: number]: Entity } = {};
  mode          : Library.Mode = 0; // TODO

  constructor() {
    this.keys = new KeyboardState();
  }
}
