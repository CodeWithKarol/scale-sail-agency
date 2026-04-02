import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Proxy for webhook calls to n8n/Make to hide secrets and validate requests.
 * 
 * Expected headers/params:
 * - Method: POST
 * - Query param 'type': 'consultation' | 'quote'
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Basic Method Check
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { type } = req.query;
  const payload = req.body;

  // 2. Routing Logic
  let targetUrl: string | undefined;

  switch (type) {
    case 'consultation':
      targetUrl = process.env['WEBHOOK_CONSULTATION_URL'];
      break;
    case 'quote':
      targetUrl = process.env['WEBHOOK_QUOTE_URL'];
      break;
    default:
      return res.status(400).json({ error: 'Invalid or missing type parameter' });
  }

  if (!targetUrl) {
    console.error(`Missing target URL for type: ${type}`);
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    // 3. Optional: Verify Cloudflare Turnstile token from the server-side
    // const turnstileToken = payload.turnstileToken;
    // const turnstileResult = await verifyTurnstile(turnstileToken);
    // if (!turnstileResult.success) {
    //   return res.status(403).json({ error: 'Turnstile verification failed' });
    // }

    // 4. Forward to final destination (n8n/Make)
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        _processedAt: new Date().toISOString(),
        _source: 'Vercel Function Proxy'
      }),
    });

    const data = await response.text();

    if (!response.ok) {
        throw new Error(`Upstream returned ${response.status}: ${data}`);
    }

    return res.status(200).json({ 
        success: true, 
        message: 'Successfully forwarded', 
        upstreamResponse: data 
    });

  } catch (error: any) {
    console.error('Webhook proxy error:', error);
    return res.status(500).json({ 
        error: 'Failed to process webhook', 
        details: process.env['NODE_ENV'] === 'development' ? error.message : undefined 
    });
  }
}

/**
 * Helper to verify Cloudflare Turnstile tokens (Optional)
 */
// async function verifyTurnstile(token: string) {
//   const secret = process.env['TURNSTILE_SECRET_KEY'];
//   if (!secret) return { success: true }; // Skip if not configured
//
//   const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     body: `secret=${secret}&response=${token}`,
//   });
//
//   return await result.json();
// }
