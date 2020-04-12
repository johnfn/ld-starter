import { Vector2 } from "./vector2";
import { Rect } from "./rect";
import { Sprite, Texture, MaskData, Container } from "pixi.js";
import { getUniqueID } from "./util";
import { RectGroup } from "./rect_group";
import { GameState } from "./state";
import { GameReference } from "./base_game";

export enum EntityType {
  NormalEntity,

  /** 
   * The collision information for this entity will be calculated by the main
   * game loop.
   */
  MovingEntity,
}

class AugmentedSprite extends Sprite {
  id = getUniqueID();
}

// TODO: probably make less of these methods abstract?
export class Entity {
  /**
   * Only use is to be displayed in the hierarchy
   */
  name       : string;

  id         = getUniqueID();
  entityType = EntityType.NormalEntity;
  sprite     : AugmentedSprite;
  transparent: boolean;

  static SpriteToEntity: { [key: number]: Entity } = {};

  protected _collideable: boolean;
  protected _interactable: boolean;

  constructor(props: {
    collidable  ?: boolean;
    name         : string;
    texture     ?: Texture;
    transparent ?: boolean;
    interactable?: boolean;
  }) {
    this.sprite        = new AugmentedSprite(props.texture);;
    this.name          = props.name;
    Entity.SpriteToEntity[this.sprite.id] = this;

    this._collideable  = props.collidable ?? false;
    this._interactable = props.interactable ?? false;

    this.startUpdating();

    this.sprite.sortableChildren = true;
    this.sprite.anchor.set(0);

    this.transparent = props.transparent || false;
  }

  addChild(child: Entity) {
    this.sprite.addChild(child.sprite);
  }

  removeChild(child: Entity) {
    this.sprite.removeChild(child.sprite);
  }

  startUpdating() {
    GameReference.state.entities.put(this);
  }

  stopUpdating() {
    GameReference.state.entities.remove(this);
  }

  update(state: GameState): void {}

  setCollideable(isCollideable: boolean) {
    this._collideable = isCollideable;
  }

  setTexture(newTexture: Texture) {
    this.sprite.texture = newTexture;
  }

  public collisionBounds(): RectGroup {
    return new RectGroup([
      new Rect({
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height
      })
    ]);
  }

  public get center(): Vector2 {
    return new Vector2(this.position).add({
      x: this.width / 2,
      y: this.height / 2
    });
  }

  children(): Entity[] {
    const children = this.sprite.children;
    const result: Entity[] = [];

    for (const child of children) {
      if (child instanceof AugmentedSprite) {
        result.push(Entity.SpriteToEntity[child.id]);
      }
    }

    return result;
  }

  // Use this instead of destroy
  destroy(state: GameState) {
    state.toBeDestroyed.push(this);
  }

  hash(): string {
    return `[Entity ${ this.id }]`;
  }

  isCollideable(): boolean {
    return this._collideable;
  }

  isInteractable(): boolean {
    return this._interactable;
  }

  // Sprite wrapper stuff

  public get x(): number { return this.sprite.x; }
  public set x(value: number) { this.sprite.x = value; }

  public get y(): number { return this.sprite.y; }
  public set y(value: number) { this.sprite.y = value; }

  public get width(): number { return this.sprite.width; }
  public set width(value: number) { this.sprite.width = value; }

  public get height(): number { return this.sprite.height; }
  public set height(value: number) { this.sprite.height = value; }

  public get alpha(): number { return this.sprite.alpha; }
  public set alpha(value: number) { this.sprite.alpha = value; }

  public get position(): Vector2 { return new Vector2({ x: this.x, y: this.y }); }

  public get zIndex(): number { return this.sprite.zIndex; }
  public set zIndex(value: number) { this.sprite.zIndex = value; this.sprite.parent && this.sprite.parent.sortChildren(); }

  public get visible(): boolean { return this.sprite.visible; }
  public set visible(value: boolean) { this.sprite.visible = value; }

  public set texture(value: Texture) { this.sprite.texture = value; }

  public set mask(value: Container | MaskData) { this.sprite.mask = value; }
  public get mask(): Container | MaskData { return this.sprite.mask; }

  public get scale(): Vector2 { return new Vector2({ x: this.sprite.scale.x, y: this.sprite.scale.y }); }
  public set scale(value: Vector2) { 
    this.sprite.scale.x = value.x;
    this.sprite.scale.y = value.y;
  }
}
