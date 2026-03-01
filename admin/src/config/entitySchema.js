/**
 * @file entitySchema.js
 * @description Zod validation schema for the generic entity create / edit form.
 *
 * Used with `@hookform/resolvers/zod` inside `EntityFormPage` to enforce
 * client-side validation before the form data is sent to the server.
 */

import { z } from 'zod';

/**
 * Shared Zod schema for all five generic entity types.
 *
 * Form fields map 1-to-1 to the schema keys.
 * `secondaryField` is a generic alias — the config layer remaps it to the
 * actual model key (company / institution / issuer / organization / organizer)
 * when building the FormData.
 */
export const entitySchema = z.object({
  id: z
    .string()
    .trim()
    .min(1, 'ID is required')
    .regex(/^[a-z0-9-]+$/, 'ID must be lowercase alphanumeric with hyphens only'),

  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(200, 'Title must be 200 characters or fewer'),

  secondaryField: z
    .string()
    .trim()
    .min(1, 'This field is required')
    .max(200, 'Must be 200 characters or fewer'),

  type: z
    .string()
    .trim()
    .max(100, 'Type must be 100 characters or fewer')
    .optional()
    .default(''),

  period: z
    .string()
    .trim()
    .min(1, 'Period is required')
    .max(100, 'Period must be 100 characters or fewer'),

  shortDescription: z
    .string()
    .trim()
    .min(1, 'Short description is required')
    .max(500, 'Short description must be 500 characters or fewer'),

  longDescription: z
    .string()
    .optional()
    .default(''),

  skills: z
    .string()
    .optional()
    .default(''),

  // File inputs are validated by the browser & server; we pass them through here.
  newImages: z.any().optional(),
});
