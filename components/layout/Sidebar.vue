<script lang="ts" setup>
import { useAuthStore, useIsLoadingStore } from '~/store/auth.store';

const store = useAuthStore();
const isLoadingStore = useIsLoadingStore();
const router = useRouter();

const logout = async () => {
	isLoadingStore.set(true);
	await account.deleteSession('current');
	store.clear();
	await router.push('/login');
	isLoadingStore.set(false);
};
</script>

<template>
	<aside class="relative bg-sidebar px-5 py-8 w-full h-full">
		<NuxtLink to="/" class="block mb-10">
			<NuxtImg src="/logo.svg" alt="" width="140px" class="mx-auto" />
		</NuxtLink>
		<button
			class="top-2 right-3 absolute hover:text-primary transition-colors"
			@click="logout"
		>
			<Icon name="line-md:logout" size="20" />
		</button>
		<LayoutMenu />
	</aside>
</template>
