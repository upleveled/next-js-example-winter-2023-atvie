import { NextResponse } from 'next/server';
import { HTMLAttributes } from 'react';

declare const INTERNALS: unique symbol;

declare module 'next/server' {
  /**
   * Workaround to enable generic type arguments for NextResponse until
   * PR is merged:
   * https://github.com/vercel/next.js/pull/47526
   * Original issue: https://github.com/vercel/next.js/issues/45943
   */
  export class NextResponse<Body = unknown> extends Response {
    [INTERNALS]: {
      cookies: ResponseCookies;
      url?: NextURL;
      Body?: Body;
    };
    static json<JsonBody>(
      body: JsonBody,
      init?: ResponseInit,
    ): NextResponse<JsonBody>;
  }
}

declare module '@types/react' {
  interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    // autoFocus?: boolean | undefined;
    // disabled?: boolean | undefined;
    // form?: string | undefined;
    formAction?: string | (() => Promise<any>) | undefined;
    // formEncType?: string | undefined;
    // formMethod?: string | undefined;
    // formNoValidate?: boolean | undefined;
    // formTarget?: string | undefined;
    // name?: string | undefined;
    // type?: 'submit' | 'reset' | 'button' | undefined;
    // value?: string | ReadonlyArray<string> | number | undefined;
  }
}
