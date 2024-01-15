<script lang="ts" setup>
const response = await useFetch('/api/check-session-exists')

if (response.status.value === 'error') {
	navigateTo('/sign-up')
}
</script>

<template>
	<h1>Protected page</h1>
</template>
