export const sum = x => {
  let s = 0;
  for (let i = 0; i < x.length; i++) s += x[i];
  return s;
};
export const mean = x => sum(x) / x.length;
export const createTimer = () => {
  const started = {};
  const timings = {};
  const time = label => {
    started[label] = performance.now();
  };
  const timeEnd = label => {
    const end = performance.now();
    if (started[label]) {
      timings[label] = timings[label] || [];
      timings[label].push(end - started[label]);
    }
  };
  const total = label => sum(timings[label] || []);
  const average = label => mean(timings[label] || []);
  const count = label => (timings[label] || []).length;
  const totals = () =>
    Object.keys(timings).map(label => ({ label, total: total(label) }));
  const averages = () =>
    Object.keys(timings).map(label => ({ label, average: average(label) }));
  return { time, timeEnd, timings, average, count, total, totals, averages };
};
