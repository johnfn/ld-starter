
import { Entity } from "../library/entity";
import { GameState } from "../library/state";
import { TextEntity } from "../library/text_entity";
import { Game } from "./game";

type DialogText = {
  speaker: string;
  text   : string;
}[];

export class DialogBox extends Entity {
  public static Instance: DialogBox;
  private activeDialogText: DialogText = [];
  private dialogText: TextEntity;

  constructor() {
    super({
      name: "DialogBox",
    });

    this.visible = false;

    this.x = 100;
    this.y = 100;

    const graphic = new Entity({ 
      texture: Game.Instance.assets.getResource("dialog.png").texture,
    });

    this.addChild(graphic);

    DialogBox.Instance = this;

    this.dialogText = new TextEntity("This is a test of a text");

    this.addChild(this.dialogText);
  }

  startDialog(dialog: DialogText) {
    this.visible = true;
    this.activeDialogText = dialog;
  }

  public static StartDialog(dialog: DialogText): void {
    DialogBox.Instance.startDialog(dialog);
  }

  update(state: GameState): void {
    if (this.activeDialogText.length === 0) {
      return;
    }

    this.dialogText.setText(this.activeDialogText[0].speaker)
  }
}