import { z } from 'zod';

export const registerSchema = z
	.object({
		username: z
			.string()
			.min(1, { message: 'Name is required' })
			.refine(
				(value) => value.trim().length > 0,
				'Name cannot be only whitespace',
			),
		email: z
			.string()
			.min(1, { message: 'Email is required' })
			.min(4, 'Too short your email')
			.email({ message: 'Invalid email address' })
			.refine(
				(value) => value.trim().length > 0,
				'Email cannot be only whitespace',
			),
		phone: z
			.string()
			.min(1, { message: 'Phone number is required' })
			.regex(/^\d+$/, {
				message: 'Phone number must contain only digits',
			})
			.refine(
				(value) => value.trim().length > 0,
				'Phone number cannot be only whitespace',
			),
		password: z
			.string()
			.min(1, { message: 'Password is required' })
			.min(4, 'Too short your password')
			.refine(
				(value) => value.trim().length > 0,
				'Password cannot be only whitespace',
			),
		confirmPassword: z.string(),

		shippingAddress: z
			.string()
			.min(1, { message: 'Shipping address is required' })
			.refine(
				(value) => value.trim().length > 0,
				'Shipping address cannot be only whitespace',
			),
	})
	.refine((data) => data.confirmPassword === data.password, {
		path: ['confirmPassword'],
		message: 'Passwords should match',
	});
export const loginSchema = z.object({
	email: z
		.string()
		.min(1, { message: 'Email is required' })
		.min(4, 'Too short your email')
		.email({ message: 'Invalid email address' })
		.refine(
			(value) => value.trim().length > 0,
			'Email cannot be only whitespace',
		),

	password: z
		.string()
		.min(1, { message: 'Password is required' })
		.min(4, 'Too short your password')
		.refine(
			(value) => value.trim().length > 0,
			'Password cannot be only whitespace',
		),
});
