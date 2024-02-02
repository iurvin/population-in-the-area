import {transform} from "ol/proj";

export function to4326(coord: Array<number> | Array<Array<number>>) {
  if (typeof coord[0] === 'number') {
    return transform(coord as Array<number>, 'EPSG:3857', 'EPSG:4326');
  }
  return coord.map((c) => to4326(c));
}