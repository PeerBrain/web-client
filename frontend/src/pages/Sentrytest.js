function SentryTest() {
  return (
    <div>
      <button onClick={() => { throw new Error('Sentry test'); }}>Throw error</button>
    </div>
  );
}

export default SentryTest;