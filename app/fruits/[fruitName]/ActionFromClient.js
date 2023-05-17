'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { setFruitNote } from '../../../util/actions';

export default function ActionFromClient(props) {
  const [text, setText] = useState(props.fruitNote);
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [text, router]);

  return (
    <>
      <form>
        <input
          readOnly
          hidden={true}
          value={props.fruitName}
          name="fruit-name"
        />
        <textarea
          name="fruit-note"
          value={text}
          onChange={(event) => {
            setText(event.currentTarget.value);
          }}
        />
        <button formAction={setFruitNote}>Update Opinion</button>
      </form>
      <button
        onClick={() => {
          setText('');
        }}
      >
        Clear
      </button>
    </>
  );
}
