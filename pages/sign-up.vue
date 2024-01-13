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

const submitForm = () => {
	formIsSubmitted.value = true

	const validForm = validateForm(signUpData.value)

	if (validForm) {
		console.log(signUpData)
	}
}
</script>

<template>
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
			<button type="submit">Send</button>
		</div>
	</form>
</template>
