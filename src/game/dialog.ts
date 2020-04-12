import { Entity } from "../library/entity";
import { GameState } from "../library/state";
import { TextEntity } from "../library/text_entity";
import { Game } from "./game";

export type DialogText = {
  speaker: string;
  text   : string;
}[];

export class DialogBox extends Entity {
  public static Instance: DialogBox;
  public static DialogVisible = () => DialogBox.Instance.visible;

  private activeDialogText: DialogText = [];
  private dialogText: TextEntity;
  private speakerText: TextEntity;

  constructor() {
    super({
      name: "DialogBox",
    });

    this.visible = false;

    this.x = 100;
    this.y = 100;

    const graphic = new Entity({ 
      texture: Game.Instance.assets.getResource("dialog_box.png").texture,
    });

    this.addChild(graphic);

    DialogBox.Instance = this;

    this.speakerText = new TextEntity("This is a test of a text");
    this.speakerText.y = 0;

    this.addChild(this.speakerText);

    this.dialogText = new TextEntity("This is a test of a text");
    this.dialogText.y = 50;

    this.addChild(this.dialogText);
  }

  startDialog(dialog: DialogText) {
    this.visible = true;
    this.activeDialogText = dialog;
  }

  public static StartDialog(dialog: DialogText): void {
    DialogBox.Instance.startDialog(dialog);
  }

  stopDialog() {
    this.visible = false;
  }

  update(state: GameState): void {
    if (this.activeDialogText.length === 0) {
      this.stopDialog();

      return;
    }

    this.dialogText.setText(this.activeDialogText[0].text);
    this.speakerText.setText(this.activeDialogText[0].speaker);

    if (state.keys.justDown.Spacebar) {
      this.activeDialogText.shift();
    }
  }
}