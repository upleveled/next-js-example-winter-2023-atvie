'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function GenerateButton() {
  const [color, setColor] = useState('#123fee');
  const router = useRouter();

  return (
    <button
      style={{ backgroundColor: color }}
      onClick={() => {
        setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
        router.refresh();
      }}
    >
      generate
    </button>
  );
}
