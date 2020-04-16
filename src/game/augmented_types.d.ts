import { Player } from "./player";

declare module "Library" {
  export interface Mode {
    Dialog: never;
  }

  export interface IGameState {
    player: Player;
  }
}