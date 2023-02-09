'use client';

type Props = {
  error: Error;
  reset: () => void;
};

export default function RootError(props: Props) {
  return (
    <div>
      Ups! something went wrong
      <p>{props.error.message}</p>
      <button onClick={() => props.reset()}>Reset error boundary</button>
    </div>
  );
}
