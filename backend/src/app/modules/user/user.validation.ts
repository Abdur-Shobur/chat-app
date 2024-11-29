import { z } from 'zod'
/* required
  name, email, password, role, is required
  phone is unique but not required

*/
export const userValidation = z.object({
  body: z.object({
    // name
    name: z
      .string()
      .min(2, {
        message: `Name is Required`,
      })
      .max(32, 'Name must be a maximum 32 characters'),

    // phone
    phone: z
      .string()
      .max(15, 'Phone must be a maximum 15 characters')
      .optional(),

    // email
    email: z.string().email({ message: 'Invalid email address' }).optional(),

    // password
    password: z
      .string()
      .min(8, 'The password must be at least 8 characters long')
      .max(32, 'The password must be a maximum 32 characters'),

    // role id
    role_id: z.string().min(1, {
      message: `Role is Required`,
    }),

    // image
    image: z.string({
      message: 'Image is Required',
    }),

    // description
    description: z.string().optional(),
  }),
})
export const userValidationEdit = z.object({
  body: z.object({
    // name
    name: z
      .string()
      .min(2, {
        message: `Name is Required`,
      })
      .max(32, 'Name must be a maximum 32 characters'),

    // phone
    phone: z
      .string()
      .max(15, 'Phone must be a maximum 15 characters')
      .optional(),

    // email
    email: z.string().email({ message: 'Invalid email address' }).optional(),

    // role id
    role_id: z.string().min(1, {
      message: `Role is Required`,
    }),

    // image
    image: z.string({
      message: 'Image is Required',
    }),
    // description
    description: z.string().optional(),
  }),
})
