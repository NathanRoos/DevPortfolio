// Simple in-memory rate limiter (per IP)
const rateLimitMap = new Map();

export function checkRateLimit(ip, key, maxPerMinute, blockMinutes) {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const blockMs = blockMinutes * 60 * 1000;
  const entry = rateLimitMap.get(ip + key) || { count: 0, first: now, blockedUntil: 0 };

  if (entry.blockedUntil && now < entry.blockedUntil) {
    return { blocked: true, retryAfter: Math.ceil((entry.blockedUntil - now) / 1000) };
  }

  if (now - entry.first > windowMs) {
    // Reset window
    entry.count = 1;
    entry.first = now;
    entry.blockedUntil = 0;
  } else {
    entry.count++;
    if (entry.count > maxPerMinute) {
      entry.blockedUntil = now + blockMs;
      rateLimitMap.set(ip + key, entry);
      return { blocked: true, retryAfter: Math.ceil(blockMs / 1000) };
    }
  }
  rateLimitMap.set(ip + key, entry);
  return { blocked: false };
}
