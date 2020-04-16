import { BaseGameState } from "../library/base_state";
import { Player } from "./player";

export class GameState extends BaseGameState implements Library.IGameState {
  mode   : Library.Mode = 0;
  player!: Player;
}