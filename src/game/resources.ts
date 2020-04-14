// Put all resources the game uses in this file and we'll preload them before
// the game starts.

export enum ResourceType {
  Image,
  TileMap,
  Spritesheet,
}

export const ResourcesToLoad = {
  "owo.png"       : ResourceType.Image,
  "miranda.png"   : ResourceType.Image,
  "map.json"      : ResourceType.TileMap,
  "music.json"    : ResourceType.TileMap,
  "tileset.png"   : ResourceType.Image,
  "dialog_box.png": ResourceType.Image,
  "bookshelf.png" : ResourceType.Image,
  "tasukete_portrait.png": ResourceType.Image,
  "miranda_portrait.png" : ResourceType.Image,
  "oberon_portrait.png"  : ResourceType.Image,

  "tasukete/tasukete_0000.png"  : ResourceType.Image,
  "tasukete/tasukete_0001.png"  : ResourceType.Image,
  "tasukete/tasukete_0002.png"  : ResourceType.Image,
  "tasukete/tasukete_0003.png"  : ResourceType.Image,
  "tasukete/tasukete_0004.png"  : ResourceType.Image,
  "tasukete/tasukete_0005.png"  : ResourceType.Image,
  "tasukete/tasukete_0006.png"  : ResourceType.Image,
  "tasukete/tasukete_0007.png"  : ResourceType.Image,
  "tasukete/tasukete_0008.png"  : ResourceType.Image,
  "tasukete/tasukete_0009.png"  : ResourceType.Image,
  "tasukete/tasukete_0010.png"  : ResourceType.Image,
  "tasukete/tasukete_0011.png"  : ResourceType.Image,
  "tasukete/tasukete_0012.png"  : ResourceType.Image,
  "tasukete/tasukete_0013.png"  : ResourceType.Image,
  "tasukete/tasukete_0014.png"  : ResourceType.Image,
  "tasukete/tasukete_0015.png"  : ResourceType.Image,
  "tasukete/tasukete_0016.png"  : ResourceType.Image,
  "tasukete/tasukete_0017.png"  : ResourceType.Image,
  "tasukete/tasukete_0018.png"  : ResourceType.Image,
};

export type ResourceName = keyof typeof ResourcesToLoad;