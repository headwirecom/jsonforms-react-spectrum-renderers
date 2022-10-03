// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_isempty
export function isEmpty(obj: any) {
  return [Object, Array].includes((obj || {}).constructor) && !Object.keys(obj || {}).length;
}
