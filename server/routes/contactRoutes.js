import express from 'express';
import { body } from 'express-validator';
import { handleContactSubmit } from '../controllers/contactController.js';
import { contactLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

/**
 * Validation and sanitization rules for contact submission
 */
const contactValidationRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required.')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters.')
    .escape(),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email address is required.')
    .isEmail()
    .withMessage('Please provide a valid email address.')
    .normalizeEmail(),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required.')
    .isLength({ min: 10, max: 3000 })
    .withMessage('Message must be between 10 and 3000 characters.')
    .escape()
];

// POST /api/contact
router.post('/', contactLimiter, contactValidationRules, handleContactSubmit);

export default router;
