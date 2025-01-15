import { z } from 'zod'

export const messageValidation = z.object({
  body: z.object({
    // name
    text: z.string().min(2, {
      message: `text is Required`,
    }),
  }),
})
