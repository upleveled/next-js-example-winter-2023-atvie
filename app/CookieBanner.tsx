'use client';

import { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../util/localStorage';
import styles from './CookieBanner.module.scss';

export default function CookieBanner() {
  const [areCookiesTermsAccepted, setAreCookiesTermsAccepted] = useState(true);

  // this only exist on the client/browser
  useEffect(() => {
    // this function triggers on first render

    // Check if there is a localStorage field for the cookieBanner
    const localStorageValue = getLocalStorage('areCookiesTermsAccepted');
    // If not then initial value is false§
    // If yes the the initial value is what is stored in the browser
    const initialState =
      localStorageValue === undefined ? false : localStorageValue;

    setAreCookiesTermsAccepted(initialState);
  }, []);

  return (
    <div
      className={`
        ${styles.cookieBanner}
        ${areCookiesTermsAccepted ? styles.close : styles.open}
      `}
    >
      <div>This is the cookie Police. Please accept terms and conditions</div>
      <button
        onClick={() => {
          setAreCookiesTermsAccepted(true);
          setLocalStorage('areCookiesTermsAccepted', true);
        }}
      >
        Accept
      </button>
    </div>
  );
}
