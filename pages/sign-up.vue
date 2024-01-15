<script lang="ts" setup>
import signUpForm from '~/components/sign-up-form.vue'

const response = await useFetch('/api/check-session-exists')

if (response.status.value === 'success') {
	navigateTo('/')
}
</script>

<template>
	<signUpForm />
</template>
