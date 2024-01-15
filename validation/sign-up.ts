import * as z from 'zod'

export const SignUpSchema = z.object({
	email: z.string().min(1, 'Required').email(),
	password: z.string().min(6, 'Too short'),
})

export type SignUpData = z.infer<typeof SignUpSchema>
export type SignUpErrors = Partial<Record<keyof SignUpData, string | undefined>>
