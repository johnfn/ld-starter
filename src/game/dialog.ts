import { Entity } from "../library/entity";
import { GameState } from "../library/state";
import { TextEntity } from "../library/text_entity";
import { Game } from "./game";
import { GameCoroutine } from "../library/coroutine_manager";

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
    this.y = 550;

    const graphic = new Entity({ 
      texture: Game.Instance.assets.getResource("dialog_box.png").texture,
      name: "Dialog Graphic",
    });

    graphic.width = 1400;
    graphic.height = 500;
    this.addChild(graphic);

    DialogBox.Instance = this;

    this.speakerText = new TextEntity({ text: "Name test", width: 900, height: 400, fontSize: 60, color: "orange"});
    this.speakerText.y = 30;
    this.speakerText.x = 90;

    this.addChild(this.speakerText);

    this.dialogText = new TextEntity({ text: "Line test", width: 900, height: 400, fontSize: 40});
    this.dialogText.y = 120;
    this.dialogText.x = 380;

    this.addChild(this.dialogText);

    this.profilePic = new Entity({ name: "profile pic" });
    this.profilePic.x      = -110;
    this.profilePic.y      = 90;
    this.profilePic.width  = 530;
    this.profilePic.height = 530;
    this.addChild(this.profilePic);
  }

  *startDialog(dialog: DialogText): GameCoroutine {
    this.visible = true;
    this.activeDialogText = dialog;

    this.displayDialogContents();

    let state: GameState;

    while (this.activeDialogText.length > 0) {
      this.displayDialogContents();

      state = yield "next";

      if (state.keys.justDown.Spacebar) {
        this.activeDialogText.shift();
      }
    }

    this.visible = false;
  }

  public static *StartDialog(dialog: DialogText): GameCoroutine {
    yield* DialogBox.Instance.startDialog(dialog.slice(0));
  }

  displayDialogContents() {
    const speaker = this.activeDialogText[0].speaker;

    this.dialogText.setText(this.activeDialogText[0].text);
    this.speakerText.setText(speaker);

    if (speaker === "Chief Nabisco") {
      this.profilePic.texture = Game.Instance.assets.getResource("oberon_portrait.png").texture;
    } else if (speaker === "Detective Pringle") {
      this.profilePic.texture = Game.Instance.assets.getResource("miranda_portrait.png").texture;
    } else if (speaker === "Tasukete") {
      this.profilePic.texture = Game.Instance.assets.getResource("tasukete_portrait.png").texture;
    }
  }

  update(state: GameState): void { }
}