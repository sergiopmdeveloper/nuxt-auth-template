import { Prisma, PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async event => {
	const prisma = new PrismaClient()

	const body = await readBody(event)

	let { email, password } = JSON.parse(body)
	password = bcrypt.hashSync(password, 10)

	let session: { userId: string } | null = null

	try {
		const user = await prisma.user.create({
			data: {
				email,
				password,
			},
		})

		session = { userId: user.id }
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				return new Response('User already exists', { status: 409 })
			}
		} else {
			return new Response('Something went wrong', { status: 520 })
		}
	}

	if (session) {
		const expiryDate = new Date()
		expiryDate.setDate(expiryDate.getDate() + 1)

		const sessionCookieName = 'session'
		const sessionCookieData = JSON.stringify(session)
		const sessionCookieExpires = expiryDate.toUTCString()

		const sessionCookieValue = `${sessionCookieName}=${sessionCookieData}; Expires=${sessionCookieExpires}; HttpOnly; Path=/;`

		return new Response('User created successfuly', {
			status: 201,
			headers: {
				'Set-Cookie': sessionCookieValue,
			},
		})
	}
})
