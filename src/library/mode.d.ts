// import { KeyboardState } from "./keyboard";
// import { HashSet } from "./data_structures/hash";
// import { Mode } from "mode";

// export = Library;
// export as namespace Library;

declare namespace Library {
  export enum Mode { 
    Normal,
  }

  type HashSet<T>    = import("./data_structures/hash").HashSet<T>;
  type Entity        = import("./entity").Entity;
  type KeyboardState = import("./keyboard").KeyboardState;

  export interface IGameState {
    keys          : KeyboardState;
    renderer      : Renderer;
    entities      : HashSet<Entity>;
    toBeDestroyed : Entity[];
    stage         : Entity;
    mode          : Mode;
    spriteToEntity: { [key: number]: Entity };
    player        : Player;
  }
}

declare module "Test" {
  export enum TestEnum {
    A,
    B,
    C,
  }
}