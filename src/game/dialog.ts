
import { Entity } from "../library/entity";
import { GameState } from "../library/state";
import { TextEntity } from "../library/text_entity";
import { Game } from "./game";

export class DialogBox extends Entity {
  public static Instance: DialogBox;

  constructor() {
    super({
      name: "DialogBox",
    });

    this.x = 100;
    this.y = 100;

    const graphic = new Entity({ 
      texture: Game.Instance.assets.getResource("dialog.png").texture,
    });

    this.addChild(graphic);

    DialogBox.Instance = this;

    const text = new TextEntity("This is a test of a text");

    this.addChild(text);
  }

  update(state: GameState): void {

  }
}