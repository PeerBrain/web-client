import { useState, useEffect } from 'react';
import * as Sentry from "@sentry/react";

function LoggedOut() {
    Sentry.setUser({ username: '' });
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  return (
    <div class="box">
        <h1 class="title">Logged Out</h1>
        <p>You have been logged out.</p>
    </div>
    );
}

export default LoggedOut;