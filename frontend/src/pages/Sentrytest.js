import { useState, useEffect } from 'react';
import * as Sentry from "@sentry/react";

const user = localStorage.getItem('username') || '';
Sentry.setUser({ username: user });
function SentryTest() {
  return (
    <div>
      <button onClick={() => { throw new Error('Sentry test'); }}>Throw error</button>
    </div>
  );
}

export default SentryTest;