'use client';

import { ChangeEvent, useState } from 'react';

export default function TsUseStateAndEventsForm() {
  const [name, setName] = useState<string | undefined>();
  const [animals, setAnimals] = useState<{ id: number; name: string }[]>([]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.currentTarget.value);
  }

  return (
    <div>
      name:
      <input value={name} onChange={handleChange} />
      {name}
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={() => setAnimals([{ id: 1, name: 'karl' }])}>
        add animal
      </button>
      <h2>animals</h2>
      <ul>
        {animals.map((animal) => (
          <li key={`animal-${animal.id}`}>{animal.name}</li>
        ))}
      </ul>
    </div>
  );
}
