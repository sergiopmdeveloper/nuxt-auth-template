<script lang="ts" setup>
import { signUp } from '~/services/sign-up'
import { useSignUp } from '~/stores/sign-up'
import {
	SignUpSchema,
	type SignUpData,
	type SignUpErrors,
} from '~/validation/sign-up'

const signUpData: Ref<SignUpData> = ref({
	email: '',
	password: '',
})

const validationErrors: Ref<SignUpErrors> = ref({
	email: undefined,
	password: undefined,
})

const formIsSubmitted: Ref<boolean> = ref(false)

const signUpStore = useSignUp()

watch(signUpData.value, () => {
	if (formIsSubmitted.value) {
		validateForm(signUpData.value)
	}
})

/**
 * Validates the form data for sign-up.
 *
 * @param {typeof signUpData.value} formData - The form data to be validated.
 *
 * @returns {boolean} - Returns true if the form data is valid, otherwise false.
 */
const validateForm = (formData: typeof signUpData.value): boolean => {
	const validationResult = SignUpSchema.safeParse(formData)

	if (!validationResult.success) {
		validationErrors.value = {
			email: validationResult.error.formErrors.fieldErrors.email?.[0],
			password: validationResult.error.formErrors.fieldErrors.password?.[0],
		}
	} else {
		validationErrors.value = {
			email: undefined,
			password: undefined,
		}
	}

	return validationResult.success
}

/**
 * Submits the form data for sign-up.
 */
const submitForm = () => {
	formIsSubmitted.value = true

	const validForm = validateForm(signUpData.value)

	if (validForm) {
		signUp(signUpData.value)
	}
}
</script>

<template>
	<span v-if="signUpStore.statusCode === 409">User already exists</span>
	<span v-if="signUpStore.statusCode === 520">Something went wrong</span>
	<form @submit.prevent="submitForm">
		<div>
			<label for="email">Email</label>
			<input
				v-model="signUpData.email"
				id="email"
				type="text"
				placeholder="Your email..."
				autocomplete="email"
			/>
		</div>

		<span v-if="validationErrors.email">{{ validationErrors.email }}</span>

		<div>
			<label for="password">Password</label>
			<input
				v-model="signUpData.password"
				id="password"
				type="password"
				placeholder="Your password..."
			/>
		</div>

		<span v-if="validationErrors.password">{{
			validationErrors.password
		}}</span>

		<div>
			<button type="submit">
				{{ signUpStore.sendingForm ? 'Sending' : 'Send' }}
			</button>
		</div>
	</form>
</template>
