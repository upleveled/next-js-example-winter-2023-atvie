'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { setFruitNote } from '../../../util/actions';

export default function ActionFromClient(props) {
  const [text, setText] = useState(props.fruitNote);
  const router = useRouter();

  return (
    <form>
      <input readOnly hidden={true} value={props.fruitName} name="fruit-name" />
      <textarea
        name="fruit-note"
        value={text}
        onChange={(event) => {
          setText(event.currentTarget.value);
        }}
        onBlur={() => router.refresh()}
      />
      <button formAction={setFruitNote}>Update Opinion</button>
    </form>
  );
}
