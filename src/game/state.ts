import { BaseGameState } from "../library/base_state";
import { Mode } from "./modes";
import { Player } from "./player";

export class GameState extends BaseGameState {
  mode   : Mode = "Normal";
  player!: Player;
}