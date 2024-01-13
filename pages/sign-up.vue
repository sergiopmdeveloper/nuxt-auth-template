<script lang="ts" setup>
import { SignUpSchema } from '~/validation/sign-up'

const signUpData: Ref<{
	email: string
	password: string
}> = ref({
	email: '',
	password: '',
})

const validationErrors: Ref<{
	email: string | undefined
	password: string | undefined
}> = ref({
	email: undefined,
	password: undefined,
})

const formIsSubmitted: Ref<boolean> = ref(false)

const sendingForm: Ref<boolean> = ref(false)
const statusCode: Ref<number | undefined> = ref(undefined)

watch(signUpData.value, () => {
	if (formIsSubmitted.value) {
		validateForm(signUpData.value)
	}
})

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

const submitForm = async () => {
	sendingForm.value = true
	statusCode.value = undefined

	formIsSubmitted.value = true

	const validForm = validateForm(signUpData.value)

	if (validForm) {
		const response = await fetch('/api/sign-up', {
			method: 'POST',
			body: JSON.stringify(signUpData.value),
		})

		statusCode.value = response.status
	}

	sendingForm.value = false
}
</script>

<template>
	<span v-if="statusCode === 409">User already exists</span>
	<span v-if="statusCode === 520">Something went wrong</span>
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
			<button type="submit">{{ sendingForm ? 'Sending' : 'Send' }}</button>
		</div>
	</form>
</template>
