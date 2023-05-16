const { generateKey } = require('fernet');

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const key = generateKey().toString('base64');
  return new Response(key, { status: 200 });
}