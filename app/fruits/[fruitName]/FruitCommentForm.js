'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createComment } from './actions';

export default function FruitCommentForm(props) {
  const [comment, setComment] = useState(props.fruitComment);
  const router = useRouter();

  return (
    <form>
      <textarea
        value={comment}
        onChange={(event) => {
          setComment(event.currentTarget.value);
        }}
      />
      <button
        formAction={async () => {
          router.refresh();
          await createComment(props.fruitId, comment);
        }}
      >
        Update Comment
      </button>
    </form>
  );
}
