<script lang="ts" setup>
const signUpData = ref({
	email: '',
	password: '',
})

const submitForm = () => {
	// Sign up logic
}
</script>

<template>
	<!-- Sign up form -->
	<form @submit.prevent="submitForm">
		<div>
			<label for="email">Email</label>
			<input
				v-model="signUpData.email"
				id="email"
				type="email"
				placeholder="Your email..."
			/>
		</div>

		<div>
			<label for="message">Password</label>
			<input
				v-model="signUpData.password"
				id="password"
				type="password"
				placeholder="Your password..."
			/>
		</div>

		<div>
			<button type="submit">Send</button>
		</div>
	</form>
</template>
