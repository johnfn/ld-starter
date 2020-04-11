import { BaseGame } from "../library/base_game";
import { ResourcesToLoad } from "./resources";
import { Entity } from "../library/entity";
import { Player } from "./player";

export class Game extends BaseGame<typeof ResourcesToLoad> {
  public static Instance: Game;

  constructor() {
    super({
      canvasWidth : 600,
      canvasHeight: 400,
      resources   : ResourcesToLoad,
    });

    Game.Instance = this;
  }

  initialize() {
    this.stage.addChild(new Player());
  };
}
