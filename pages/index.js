import { useCallback, useEffect, useState } from 'react';

const worker =
  process.browser && new Worker(new URL('../worker.js', import.meta.url));

export default function Index() {
  const [text, setText] = useState('');

  useEffect(() => {
    worker.onmessage = evt => setText(evt.data.text);
  }, []);

  const onChange = useCallback(e => {
    worker.postMessage(e.target.value);
  }, []);

  return (
    <div>
      <p>Do work in a WebWorker!</p>
      <input type="text" value={text} onChange={onChange} />
    </div>
  );
}
