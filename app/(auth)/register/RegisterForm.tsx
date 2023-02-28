'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LoginResponseBody } from '../../api/(auth)/register/route';

type Props = { returnTo?: string | string[] };

export default function RegisterForm(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const router = useRouter();

  const returnTo = props.returnTo;

  async function loginHandler() {
    const loginResponse = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username: username.toLowerCase(),
        password,
      }),
    });

    const loginResponseBody = (await loginResponse.json()) as LoginResponseBody;

    if ('errors' in loginResponseBody) {
      setErrors(loginResponseBody.errors);
      return console.error(loginResponseBody.errors);
    }

    if (
      returnTo &&
      !Array.isArray(returnTo) && // Security: Validate returnTo parameter against valid path
      // (because this is untrusted user input)
      /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
    ) {
      router.replace(returnTo);
      router.refresh();
      return;
    }

    router.replace(`/profile/${loginResponseBody.user.username}`);
    router.refresh();
  }

  return (
    <>
      <h1>Login</h1>
      {errors.map((error) => {
        return <p key={`error-${error.message}`}>ERROR: {error.message}</p>;
      })}
      <label>
        username
        <input
          value={username}
          onChange={(event) => {
            setUsername(event.currentTarget.value.toLowerCase());
          }}
        />
      </label>
      <br />
      <label>
        password
        <input
          value={password}
          onChange={(event) => {
            setPassword(event.currentTarget.value);
          }}
        />
      </label>
      <button
        onClick={async () => {
          await loginHandler();
        }}
      >
        Register
      </button>
    </>
  );
}
