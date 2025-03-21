<script setup lang="ts">
import { v4 as uuid } from 'uuid';

useSeoMeta({
	title: 'Login',
});

const emailRef = ref('');
const passwordRef = ref('');
const nameRef = ref('');

const isLoadingStore = useIsLoadingStore();
const authStore = useAuthStore();
const router = useRouter();

const login = async () => {
	isLoadingStore.set(true);
	await account.createEmailSession(emailRef.value, passwordRef.value);
	const response = await account.get();
	if (response) {
		authStore.set({
			email: response.email,
			name: response.name,
			status: response.status,
		});
	}

	emailRef.value = '';
	passwordRef.value = '';
	nameRef.value = '';

	await router.push('/');
	isLoadingStore.set(false);
};

const register = async () => {
	await account.create(
		uuid(),
		emailRef.value,
		passwordRef.value,
		nameRef.value,
	);
	await login();
};
</script>

<template>
	<div class="flex justify-center items-center w-full min-h-screen">
		<div class="bg-sidebar p-5 rounded w-1/4">
			<h1 class="mb-5 font-bold text-2xl text-center">Login</h1>

			<form>
				<UiInput
					placeholder="Email"
					type="email"
					class="mb-3"
					v-model="emailRef"
				/>
				<UiInput
					placeholder="Password"
					type="password"
					class="mb-3"
					v-model="passwordRef"
				/>
				<UiInput
					placeholder="Name"
					type="name"
					class="mb-3"
					v-model="nameRef"
				/>
				<div class="flex justify-center items-center gap-5">
					<UiButton type="button" @click="login">Login</UiButton>
					<UiButton type="button" @click="register">Register</UiButton>
				</div>
			</form>
		</div>
	</div>
</template>
