import { useCallback, useEffect, useState } from 'react';

const worker =
  process.browser && new Worker(new URL('../worker.js', import.meta.url));

export default function Index() {
  const [text, setText] = useState('');
  const [text1, setText1] = useState('');

  useEffect(() => {
    worker.onmessage = evt => setText(evt.data.text);
  }, []);

  const onChange = useCallback(e => {
    worker.postMessage(e.target.value);
  }, []);

  const onChange1 = useCallback(e => {
    setText1(e.target.value);
  }, []);

  return (
    <div>
      <p>Text field connected to web worker!</p>
      <input type="text" value={text} onChange={onChange} />
      <p>Normal react text field</p>
      <input type="text" value={text1} onChange={onChange1} />
    </div>
  );
}
