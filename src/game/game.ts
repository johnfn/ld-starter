import { BaseGame } from "../library/base_game";
import { ResourcesToLoad } from "./resources";
import { Player } from "./player";
import { GameMap } from "./map";
import { Test } from "./test";
import { MyName } from "./whos_there";
import { DialogBox } from "./dialog";
import { GenericItem } from "./bookshelf";

export class Game extends BaseGame<typeof ResourcesToLoad> {
  public static Instance: Game;

  constructor() {
    super({
      canvasWidth : 800,
      canvasHeight: 800,
      scale       : 0.5,
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
