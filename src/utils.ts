export type UseState<T> = [T, (_: T) => void];

export function groupArr<T>(arr: T[], func: (val: T) => string) {
  let ret: { [key: string]: T[] } = {};
  arr.map((a) => ret[func(a)]?.push(a) ?? (ret[func(a)] = [a]));
  return ret;
}

export const longDate = Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
}).format;

export const shortDate = Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "numeric",
  year: "numeric",
}).format;
