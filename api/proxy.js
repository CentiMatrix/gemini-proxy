export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const url = new URL(request.url);

  if (url.pathname === "/") {
    return new Response(`Gemini Proxy is running!`, { status: 200 });
  }

  url.host = 'generativelanguage.googleapis.com';
  url.protocol = 'https:';
  url.port = '';

  const newRequest = new Request(url, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  });

  try {
    return await fetch(newRequest);
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
