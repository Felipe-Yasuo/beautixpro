const rateMap = new Map<string, { count: number; resetAt: number }>();

// Limpa entradas expiradas a cada 60s para evitar memory leak
if (typeof globalThis !== "undefined") {
  const cleanup = () => {
    const now = Date.now();
    for (const [key, value] of rateMap) {
      if (now > value.resetAt) rateMap.delete(key);
    }
  };
  setInterval(cleanup, 60_000);
}

interface RateLimitResult {
  success: boolean;
}

export function rateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  const entry = rateMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateMap.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true };
  }

  if (entry.count >= maxRequests) {
    return { success: false };
  }

  entry.count++;
  return { success: true };
}
