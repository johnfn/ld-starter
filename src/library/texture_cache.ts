import { Rectangle, Texture } from 'pixi.js'
import { ResourceName } from '../game/resources';
import { Tile } from './tilemap/tilemap_types';
import { BaseGame } from './base_game';

export class TextureCache {
  static Cache: { [key: string]: Texture } = {};

  public static GetTextureFromSpritesheet<T>({ textureName, x, y, tilewidth, tileheight, game }: { 
    textureName: ResourceName; 
    x          : number;
    y          : number;
    tilewidth  : number;
    tileheight : number;
    game       : BaseGame<T>
  }): Texture {
    const key = `${ textureName }-${ x }-${ y }`;

    if (!TextureCache.Cache[key]) {
      const texture = game.loader.getResource(textureName).texture.clone();

      texture.frame = new Rectangle(x * tilewidth, y * tileheight, tilewidth, tileheight);

      this.Cache[key] = texture;
    }

    return this.Cache[key];
  }

  public static GetTextureForTile<T>({ game, tile }: { game: BaseGame<T>; tile: Tile; }): Texture {
    const {
      tile: {
        imageUrlRelativeToGame,
        spritesheetx,
        spritesheety,
      },
    } = tile;

    return TextureCache.GetTextureFromSpritesheet({ 
      textureName: imageUrlRelativeToGame as ResourceName, // TODO: Is there any way to improve this cast?
      x          : spritesheetx, 
      y          : spritesheety, 
      tilewidth  : tile.tile.tilewidth, 
      tileheight : tile.tile.tileheight ,
      game       : game,
    });
  }
}