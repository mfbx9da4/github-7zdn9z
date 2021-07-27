import { useCallback, useEffect, useState } from 'react';
import { createTimer } from './createTimer';

const timer = createTimer();
if (process.browser) window.timer = timer;

const worker =
  process.browser && new Worker(new URL('../worker.js', import.meta.url));

export default function Index() {
  const [text, setText] = useState('');
  const [text1, setText1] = useState('');
  const [results, setResults] = useState({});

  useEffect(() => {
    worker.onmessage = evt => setText(evt.data.text);
  }, []);

  const onChange = useCallback(e => {
    timer.time('web-worker');
    worker.postMessage(e.target.value);
  }, []);

  const onChange1 = useCallback(e => {
    timer.time('react-only');
    setText1(e.target.value);
  }, []);

  const onShowTimings = useCallback(() => {
    setResults(timer.totals());
  }, []);

  useEffect(() => {
    timer.timeEnd('react-only');
    timer.timeEnd('web-worker');
  }, []);

  return (
    <div>
      <p>Text field connected to web worker!</p>
      <input type="text" value={text} onChange={onChange} />
      <p>Normal react text field</p>
      <input type="text" value={text1} onChange={onChange1} />
      <button onClick={onShowTimings}>Show timings</button>
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
}
