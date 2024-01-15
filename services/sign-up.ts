import { useSignUp } from '~/stores/sign-up'
import { type SignUpData } from '~/validation/sign-up'

/**
 * Signs up a user with the provided sign up data.
 *
 * @param {SignUpData} signUpData - The sign up data containing user information.
 *
 * @returns {Promise<Response>} The response from the server.
 */
export async function signUp(signUpData: SignUpData): Promise<Response> {
	const signUpStore = useSignUp()

	signUpStore.statusCode = undefined
	signUpStore.sendingForm = true

	const response = await fetch('/api/sign-up', {
		method: 'POST',
		body: JSON.stringify(signUpData),
	})

	signUpStore.statusCode = response.status
	signUpStore.sendingForm = false

	return response
}
