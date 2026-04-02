import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Super-Bulletproof Proxy for webhook calls to n8n/Make.
 * Focus: detailed diagnostic reporting to solve 500 Internal Server Errors on Vercel.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const payload = req.body;
    const rawType = req.query['type'];
    const type = Array.isArray(rawType) ? rawType[0] : rawType;

    // 4. Secure Target Resolution
    let targetUrl: string | undefined;
    if (type === 'consultation') {
      targetUrl = process.env['WEBHOOK_CONSULTATION_URL'];
    } else if (type === 'quote') {
      targetUrl = process.env['WEBHOOK_QUOTE_URL'];
    }

    // If target URL is missing, return 400 (Bad Request) instead of 500
    // to distinguish it from a platform crash.
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

    const response = await globalThis.fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    const responseText = await response.text();

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
