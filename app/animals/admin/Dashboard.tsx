'use client';
// import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Animal } from '../../../database/animals';

type Props = {
  animals: Animal[];
  csrfToken: string;
};

export default function Dashboard(props: Props) {
  // const router = useRouter();
  const [animals, setAnimals] = useState<Animal[]>(props.animals);
  const [idOnEditMode, setIdOnEditMode] = useState<number>();
  const [firstName, setFirstName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [accessory, setAccessory] = useState<string>('');
  const [editFirstName, setEditFirstName] = useState<string>('');
  const [editType, setEditType] = useState<string>('');
  const [editAccessory, setEditAccessory] = useState<string>('');
  const [error, setError] = useState<string>();

  return (
    <div>
      <label>
        First Name:
        <input
          value={firstName}
          onChange={(event) => setFirstName(event.currentTarget.value)}
        />
      </label>
      <label>
        Type:
        <input
          value={type}
          onChange={(event) => setType(event.currentTarget.value)}
        />
      </label>
      <label>
        Accessory:
        <input
          value={accessory}
          onChange={(event) => setAccessory(event.currentTarget.value)}
        />
      </label>
      <button
        onClick={async () => {
          const response = await fetch('/api/animals', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firstName,
              type,
              accessory,
              csrfToken: props.csrfToken,
            }),
          });

          const data = await response.json();

          if (data.error) {
            setError(data.error);
            return;
          }
          // you should use this
          // router.refresh();

          setAnimals([...animals, data.animal]);
        }}
      >
        Create Animal
      </button>
      {typeof error === 'string' && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        {animals.map((animal) => (
          <div key={`animal-${animal.id}`}>
            {idOnEditMode !== animal.id ? (
              animal.firstName
            ) : (
              <input
                value={editFirstName}
                onChange={(event) =>
                  setEditFirstName(event.currentTarget.value)
                }
              />
            )}{' '}
            {idOnEditMode !== animal.id ? (
              animal.type
            ) : (
              <input
                value={editType}
                onChange={(event) => setEditType(event.currentTarget.value)}
              />
            )}{' '}
            {idOnEditMode !== animal.id ? (
              animal.accessory
            ) : (
              <input
                value={editAccessory}
                onChange={(event) =>
                  setEditAccessory(event.currentTarget.value)
                }
              />
            )}{' '}
            <button
              onClick={async () => {
                const response = await fetch(`/api/animals/${animal.id}`, {
                  method: 'DELETE',
                });

                const data = await response.json();

                if (data.error) {
                  setError(data.error);
                  return;
                }

                // router.refresh();

                setAnimals(
                  animals.filter(
                    (animalOnState) => animalOnState.id !== data.animal.id,
                  ),
                );
              }}
            >
              X
            </button>
            {idOnEditMode !== animal.id ? (
              <button
                onClick={() => {
                  setIdOnEditMode(animal.id);
                  setEditFirstName(animal.firstName);
                  setEditType(animal.type);
                  setEditAccessory(animal.accessory || '');
                }}
              >
                edit
              </button>
            ) : (
              <button
                onClick={async () => {
                  const response = await fetch(`/api/animals/${animal.id}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      firstName: editFirstName,
                      type: editType,
                      accessory: editAccessory,
                    }),
                  });

                  const data = await response.json();

                  if (data.error) {
                    setError(data.error);
                    return;
                  }
                  setIdOnEditMode(undefined);

                  // router.refresh();
                  setAnimals(
                    animals.map((animalOnState) => {
                      return animalOnState.id !== data.animal.id
                        ? animalOnState
                        : data.animal;
                    }),
                  );
                }}
              >
                save
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
