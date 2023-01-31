'use client';

export default function RootError({ error, reset }) {
  return (
    <div>
      Ups! something went wrong
      <p>{error.message}</p>
      <button onClick={() => reset()}>Reset error boundary</button>
    </div>
  );
}
