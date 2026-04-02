import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Super-Bulletproof Proxy for webhook calls to n8n/Make.
 * Focus: Security, Cleanliness, and ESM support.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const payload = req.body;
    const rawType = req.query['type'];
    const type = Array.isArray(rawType) ? rawType[0] : rawType;

    // 3. Server-Side Turnstile Verification
    let turnstileSecret: string | undefined;
    if (type === 'consultation') {
      turnstileSecret = process.env['TURNSTILE_SECRET_CONSULTATION'];
    } else if (type === 'quote') {
      turnstileSecret = process.env['TURNSTILE_SECRET_QUOTE'];
    }

    const turnstileToken = payload.turnstileToken;

    if (turnstileSecret) {
      try {
        const verifyResponse = await globalThis.fetch(
          'https://challenges.cloudflare.com/turnstile/v0/siteverify',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              secret: turnstileSecret,
              response: turnstileToken,
            }),
          }
        );

        const verifyResult: any = await verifyResponse.json();

        if (!verifyResult.success) {
          console.error('[Webhook Proxy] Turnstile verification failed:', verifyResult['error-codes']);
          return res.status(403).json({ 
            error: 'Security Verification Failed',
            details: 'Turnstile token invalid or expired' 
          });
        }
      } catch (err: any) {
        console.error('[Webhook Proxy] Turnstile API error:', err.message);
        return res.status(500).json({ error: 'Security Service Unavailable' });
      }
    }

    // 4. Secure Target Resolution
    let targetUrl: string | undefined;
    if (type === 'consultation') {
      targetUrl = process.env['WEBHOOK_CONSULTATION_URL'];
    } else if (type === 'quote') {
      targetUrl = process.env['WEBHOOK_QUOTE_URL'];
    }

    if (!targetUrl || targetUrl.trim() === '') {
      const msg = `Configuration error for type: "${type}".`;
      console.error(`[Webhook Proxy] ${msg}`);
      return res.status(400).json({ error: 'Configuration Missing' });
    }

    // 5. Native Fetch Execution
    if (typeof globalThis.fetch === 'undefined') {
       throw new Error(`Native fetch is NOT available.`);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    // 6. Clean payload (remove Turnstile token before forwarding to Make.com)
    const { turnstileToken: _, ...cleanPayload } = payload;

    const response = await globalThis.fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cleanPayload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    
    if (!response.ok) {
      console.error(`[Webhook Proxy] Upstream returned ${response.status}`);
      return res.status(response.status).json({
        error: 'Upstream Error'
      });
    }

    return res.status(200).json({ 
      success: true
    });

  } catch (error: any) {
    const isTimeout = error.name === 'AbortError';
    console.error(`[Webhook Proxy] ERROR:`, error.message);
    
    return res.status(500).json({ 
      error: isTimeout ? 'Upstream timeout' : 'Proxy Error'
    });
  }
}
