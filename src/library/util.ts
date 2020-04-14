let lastUsedId = 0;

export const getUniqueID = () => {
  return lastUsedId++;
};

export class Util {
  static MinBy<T>(list: T[], fn: (T: T) => number): T | undefined {
    let lowestT    : T | undefined = undefined;
    let lowestValue: number | undefined = undefined;

    for (const item of list) {
      const value = fn(item);

      if (lowestValue === undefined || value < lowestValue) {
        lowestT = item;
        lowestValue = value;
      }
    }

    return lowestT;
  }

  static MaxBy<T>(list: T[], fn: (T: T) => number): T | undefined {
    let highestT    : T | undefined = undefined;
    let highestValue: number | undefined = undefined;

    for (const item of list) {
      const value = fn(item);

      if (highestValue === undefined || value > highestValue) {
        highestT = item;
        highestValue = value;
      }
    }

    return highestT;
  }

  static RandRange(low: number, high: number): number {
    return Math.floor(Math.random() * (high - low) + low);
  }
}
