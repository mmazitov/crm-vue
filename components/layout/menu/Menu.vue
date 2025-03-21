<script lang="ts" setup>
import { MENU_DATA } from './menu.data';
</script>

<template>
	<div>
		<NuxtLink
			class="flex items-center hover:bg-gray-700 hover:shadow mb-2 px-3 py-1 rounded-lg w-full transition-all"
			v-for="item in MENU_DATA"
			:key="item.name"
			:to="item.url"
		>
			<Icon :name="item.icon" class="mr-2" />
			<span>{{ item.name }}</span>
		</NuxtLink>
	</div>
</template>
