import { Rectangle, Texture } from 'pixi.js'
import { ResourceName } from '../game/resources';
import { Tile } from './tilemap/tilemap_types';
import { TypesafeLoader } from './typesafe_loader';

export class TextureCache {
  static Cache: { [key: string]: Texture } = {};

  public static GetTextureFromSpritesheet({ resourceName: textureName, x, y, tilewidth, tileheight, assets }: { 
    resourceName: ResourceName; 
    x          : number;
    y          : number;
    tilewidth  : number;
    tileheight : number;
    assets     : TypesafeLoader<{}>;
  }): Texture {
    const key = `${ textureName }-${ x }-${ y }`;

    if (!TextureCache.Cache[key]) {
      const texture = (assets.getResource(textureName) as Texture).clone();

      texture.frame = new Rectangle(x * tilewidth, y * tileheight, tilewidth, tileheight);

      this.Cache[key] = texture;
    }

    return this.Cache[key];
  }

  public static GetTextureForTile({ assets, tile }: { assets: TypesafeLoader<{}>; tile: Tile; }): Texture {
    const {
      tile: {
        imageUrlRelativeToGame,
        spritesheetx,
        spritesheety,
      },
    } = tile;

    return TextureCache.GetTextureFromSpritesheet({ 
      // TODO: Is there any way to improve this cast?
      // Once I add a loader for tilemaps, probably yes!
      resourceName: imageUrlRelativeToGame.slice(0, imageUrlRelativeToGame.lastIndexOf(".")) as ResourceName,
      x          : spritesheetx, 
      y          : spritesheety, 
      tilewidth  : tile.tile.tilewidth, 
      tileheight : tile.tile.tileheight,
      assets     : assets,
    });
  }
}