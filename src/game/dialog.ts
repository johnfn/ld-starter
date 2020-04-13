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
  private profilePic: Entity;

  constructor() {
    super({
      name: "DialogBox",
    });

    this.visible = false;

    this.x = 100;
    this.y = 100;

    const graphic = new Entity({ 
      texture: Game.Instance.assets.getResource("dialog_box.png").texture,
      name: "Dialog Graphic",
    });

    graphic.width = 800;
    graphic.height = 500;
    this.addChild(graphic);

    DialogBox.Instance = this;

    this.speakerText = new TextEntity({ text: "This is a test of a text", width: 800, height: 400 });
    this.speakerText.y = 0;
    this.speakerText.x = 50;

    this.addChild(this.speakerText);

    this.dialogText = new TextEntity({ text: "This is a test of a text", width: 400, height: 400 });
    this.dialogText.y = 50;
    this.dialogText.x = 350;

    this.addChild(this.dialogText);

    this.profilePic = new Entity({ name: "profile pic" });
    this.profilePic.x      = 0;
    this.profilePic.y      = 50;
    this.profilePic.width  = 300;
    this.profilePic.height = 300;
    this.addChild(this.profilePic);
  }

  startDialog(dialog: DialogText) {
    this.visible = true;
    this.activeDialogText = dialog;

    this.displayDialogContents();
  }

  public static StartDialog(dialog: DialogText): void {
    DialogBox.Instance.startDialog(dialog);
  }

  stopDialog() {
    this.visible = false;
  }

  displayDialogContents() {
    const speaker = this.activeDialogText[0].speaker;

    this.dialogText.setText(this.activeDialogText[0].text);
    this.speakerText.setText(speaker);

    if (speaker === "Chief Oberon Nabisco") {
      this.profilePic.texture = Game.Instance.assets.getResource("oberon_portrait.png").texture;
    } else if (speaker === "Detective Pringle") {
      this.profilePic.texture = Game.Instance.assets.getResource("miranda_portrait.png").texture;
    } else if (speaker === "Tasukete") {
      this.profilePic.texture = Game.Instance.assets.getResource("tasukete_portrait.png").texture;
    }
  }

  update(state: GameState): void {
    if (this.activeDialogText.length === 0) {
      this.stopDialog();

      return;
    }

    this.displayDialogContents();

    if (state.keys.justDown.Spacebar) {
      this.activeDialogText.shift();
    }
  }
}