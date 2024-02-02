import {transform} from "ol/proj";

// @ts-ignore
export function to4326(coord: Array<number> | Array<Array<number>>) {
  if (typeof coord[0] === 'number') {
    return transform(coord as Array<number>, 'EPSG:3857', 'EPSG:4326');
  }
  // @ts-ignore
  return coord.map((c) => to4326(c));
}