import { BaseGame } from "../library/base_game";
import { ResourcesToLoad } from "./resources";
import { Player } from "./player";
import { GameMap } from "./map";
import { Test } from "./test";
import { MyName } from "./whos_there";
import { DialogBox } from "./dialog";

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
    this.stage.addChild(new GameMap());
    this.stage.addChild(new Player());
    this.stage.addChild(new Test());

    this.fixedCameraStage.addChild(new DialogBox());

    if (MyName === "Grant") {
      // DialogBox.StartDialog(DialogTexts.IntroText);
    }
  };
}
