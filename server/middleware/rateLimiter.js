import rateLimit from 'express-rate-limit';

/**
 * Contact form rate limiter
 * Restricts an IP to 5 requests per 15-minute window to avoid spam/abuse
 */
export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 contact submissions per windowMs
  standardHeaders: true, // Return standard RateLimit-* headers
  legacyHeaders: false, // Disable X-RateLimit-* headers
  message: {
    success: false,
    error: 'Too many messages sent from this IP address. Please try again after 15 minutes.'
  }
});
