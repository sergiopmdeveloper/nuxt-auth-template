export default defineEventHandler(async event => {
	const sessionCookie = getCookie(event, 'session')

	if (sessionCookie) {
		return new Response('Session exists', { status: 200 })
	}

	return new Response('Session does not exist', { status: 401 })
})
