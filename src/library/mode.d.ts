declare module "Library" {
  export interface Mode { 
    Normal: never;
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
    mode          : keyof Mode;
    spriteToEntity: { [key: number]: Entity };
  }
}