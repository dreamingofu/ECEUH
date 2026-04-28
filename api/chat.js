export const config = { runtime: 'edge' };

const SYSTEM = `You are Homework Helper, an AI study assistant built for University of Houston Electrical and Computer Engineering students. You are embedded in the ECEUH Knowledge Base.

You specialize in:
- ECE 2202 (Circuit Analysis II): AC analysis, phasors, impedance, Thevenin/Norton, Bode plots, Laplace transforms, second-order RLC circuits, transfer functions
- ECE 3331 (Programming Applications in ECE): C programming, pointers, memory management, arrays, structs, linked lists, file I/O, algorithms
- ECE 3441 (Digital Logic Design): Boolean algebra, logic gates, K-maps, combinational circuits, flip-flops, sequential circuits, FSMs, Mealy/Moore machines, timing analysis
- General EE math: differential equations, linear algebra, complex numbers, Fourier analysis

Response guidelines:
- Always show complete step-by-step derivations when solving problems
- Use LaTeX math notation: $...$ for inline math and $$...$$ for display/block equations
- Use fenced code blocks with the language tag for all code (e.g. \`\`\`c ... \`\`\`)
- Be pedagogical — explain the "why", not just the "how"
- Reference the specific course when relevant (e.g., "In ECE 3441, this is Unit 4 material...")
- Keep answers focused and well-structured with headers where appropriate
- If a problem is ambiguous, state your assumptions clearly before solving`;

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req) {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: CORS });

  let messages;
  try {
    ({ messages } = await req.json());
  } catch {
    return new Response('Invalid JSON body', { status: 400, headers: CORS });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response('messages array required', { status: 400, headers: CORS });
  }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return new Response(
      'ANTHROPIC_API_KEY is not set. Add it in your Vercel project → Settings → Environment Variables.',
      { status: 500, headers: CORS }
    );
  }

  const upstream = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 8096,
      stream: true,
      system: SYSTEM,
      messages,
    }),
  });

  if (!upstream.ok) {
    const errText = await upstream.text();
    return new Response(errText, { status: upstream.status, headers: CORS });
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
      ...CORS,
    },
  });
}
