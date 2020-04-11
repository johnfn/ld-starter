import { Vector2 } from "./vector2";
import { Entity } from "./entity";
import { GameState } from "./state";
import { Rect } from "./rect";
import { Debug } from "./debug";

export class FollowCamera {
  private static LERP_SPEED = 0.09;

  /**
   * Top left coordinate of the camera.
   */
  private _position: Vector2 = Vector2.Zero;
  private _target  : Entity;
  private _stage   : Entity;
  private _width   : number;
  private _height  : number;
  private _state   : GameState;

  constructor(props: { 
    stage       : Entity;
    followTarget: Entity;
    width       : number; 
    height      : number;
    state       : GameState;
  }) {
    this._stage  = props.stage;
    this._width  = props.width;
    this._height = props.height;
    this._target = props.followTarget;
    this._state  = props.state;

    this.centerOn(new Vector2(this._target.position));
  }

  public get center(): Vector2 {
    return new Vector2({
      x: this._position.x + this._width / 2,
      y: this._position.y + this._height / 2
    });
  }

  public bounds(): Rect {
    return new Rect({
      x: this.center.x - this._width / 2,
      y: this.center.y - this._height / 2,
      width: this._width,
      height: this._height,
    });
  }

  private halfDimensions(): Vector2 {
    return new Vector2({
      x: this._width / 2,
      y: this._height / 2
    });
  }

  centerOn = (position: Vector2) => {
    this._position = position.subtract(this.halfDimensions());
  };

  // currentRegion(): Rect | undefined {
  //   const mapRegions = this._state.map.getCameraRegions();

  //   return mapRegions.find(region => region.contains(this._target.positionVector()));
  // }

  calculateDesiredPosition = (state: GameState): Vector2 => {
    let desiredPosition = Vector2.Zero;

    if (this._target) {
      desiredPosition = this._target.center.subtract(this.halfDimensions());
    }

    const currentRegion = new Rect({ x: 0, y: 0, width: 2000, height: 2000 });

    if (!currentRegion) {
      console.error("no region for camera!");

      return desiredPosition;
    }

    // if (currentRegion.w < C.CANVAS_WIDTH || currentRegion.h < C.CANVAS_HEIGHT) {
    //   throw new Error("There is a region on the map which is too small for the camera.");
    // }

    // fit the camera rect into the regions rect

    if (desiredPosition.x < currentRegion.left) {
      desiredPosition = desiredPosition.withX(currentRegion.left);
    }

    if (desiredPosition.x + this.bounds().w > currentRegion.right) {
      desiredPosition = desiredPosition.withX(currentRegion.right - this._width);
    }

    if (desiredPosition.y < currentRegion.top) {
      desiredPosition = desiredPosition.withY(currentRegion.top);
    }

    if (desiredPosition.y + this.bounds().h > currentRegion.bottom) {
      desiredPosition = desiredPosition.withY(currentRegion.bottom - this._height);
    }

    return desiredPosition;
  };

  update = (state: GameState) => {
    if (Debug.DebugMode) {
      return;
    }

    const desiredPosition = this.calculateDesiredPosition(state);

    this._position = this._position.lerp(desiredPosition, FollowCamera.LERP_SPEED);

    this._stage.x = Math.floor(-this._position.x);
    this._stage.y = Math.floor(-this._position.y);
  };
}