import { Application, Renderer, Point } from "pixi.js";
import { Entity } from "./entity";
import { Debug } from "./debug";
import { HashSet } from "./hash";
import { GameState } from "./state";
import { TypesafeLoader } from "./typesafe_loader";
import { CreateGame as ReactMountGame } from "./react/react_root";
import { Camera } from "./camera";

export let GameReference: BaseGame<any>;

export type GameArgs<T> = {
  scale       : number;
  canvasWidth : number;
  canvasHeight: number;
  resources   : T;
}

export class BaseGame<Resources> {
  app   : PIXI.Application;

  state : GameState;

  /** 
   * The root of the display hierarchy for the game. Everything that exists in
   * the game that isn't fixed as the camera moves should be under this.
   */
  stage : Entity;

  /**
   * A stage for things in the game that don't move when the camera move and are
   * instead fixed to the screen. For example, the HUD.
   */
  fixedCameraStage: Entity;

  assets: TypesafeLoader<Resources>;

  renderer: Renderer;

  camera: Camera;

  constructor(props: GameArgs<Resources>) {
    GameReference = this;

    this.state = new GameState();

    const view = document.getElementById('canvas');

    if (!view) {
      throw new Error("I couldn't find an element named #canvas on initialization. Giving up!")
    }

    this.app = new Application({
      width          : props.canvasWidth,
      height         : props.canvasHeight,
      antialias      : true,
      transparent    : false,
      resolution     : window.devicePixelRatio,
      autoDensity    : true,
      backgroundColor: 0x000,
      view           : view as HTMLCanvasElement,
    });

    this.app.stage.scale = new Point(props.scale, props.scale);

    this.stage = new Entity({
      name: "Stage",
    });
    this.state.stage = this.stage;

    this.app.stage.addChild(this.stage.sprite);

    this.fixedCameraStage = new Entity({
      name: "FixedStage"
    });
    this.app.stage.addChild(this.fixedCameraStage.sprite);

    this.state.renderer = this.app.renderer;
    this.state.stage = this.stage;

    this.assets = new TypesafeLoader(props.resources)
    this.assets.onLoadComplete(() => this.startGameLoop());
    this.assets.onLoadComplete(() => this.initialize());

    this.renderer = this.app.renderer;

    this.camera = new Camera({
      stage       : this.stage,
      state       : this.state,
      canvasWidth : props.canvasWidth,
      canvasHeight: props.canvasHeight,
    });

    ReactMountGame(this);

    this.stage.sprite.sortableChildren = true;
    this.fixedCameraStage.sprite.sortableChildren = true;
  }

  /**
   * Called after resources are finished loading.
   */
  initialize() {

  }

  startGameLoop = () => {
    this.app.ticker.add(() => this.gameLoop());
  };

  gameLoop = () => {
    const { entities } = this.state;

    Debug.Clear();

    this.state.keys.update();

    const activeEntities = entities.values();

    for (const entity of activeEntities) {
      entity.update(this.state);
    }

    this.state.entities = new HashSet(entities.values().filter(ent => !this.state.toBeDestroyed.includes(ent)));

    this.state.toBeDestroyed = [];

    // const grid = this.collisionHandler.buildCollisionGrid(this.state);

    // this.collisionHandler.resolveCollisions(this.state, grid);

    this.camera.update(this.state);

    Debug.ResetDrawCount();
  };
}