import { z } from 'zod'

export const unitValidation = z.object({
  body: z.object({
    // name
    name: z
      .string()
      .min(2, {
        message: `Name is Required`,
      })
      .max(32, 'Name must be a maximum 32 characters'),

    // short_name
    short_name: z
      .string()
      .min(1, {
        message: `Short Name is Required`,
      })
      .max(32, 'Short Name must be a maximum 32 characters'),

    // description
    description: z.string().optional(),
  }),
})
