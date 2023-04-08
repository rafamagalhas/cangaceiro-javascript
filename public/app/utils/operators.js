export const partialize = (fn, ...params) => fn.bind(null, ...params);

export const compose =
  (...fns) =>
  (value) =>
    fns.reduceRight((previousValue, fn) => fn(previousValue), value);

export const takeUntil = (times, fn) => {
  return () => (times-- > 0) && fn();
}

export const debounceTime = (milliseconds, fn) => {
  let timer = 0;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, milliseconds);
  }
}