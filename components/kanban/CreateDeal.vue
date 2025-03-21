<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query';
import { v4 as uuid } from 'uuid';
import { defineProps } from 'vue';
import { COLLECTION_DEALS, DB_ID } from '~/app.constants';
import type { IDeal } from '~/types/deals.types';

const isOpenForm = ref(false);

interface IDealFormState extends Pick<IDeal, 'name' | 'price'> {
	customer: {
		email: string;
		name: string;
	};
	status: string;
}

const props = defineProps({
	status: {
		type: String,
		default: '',
	},
	refetch: {
		type: Function,
	},
});

const { handleSubmit, defineField, handleReset } = useForm<IDealFormState>({
	initialValues: {
		status: props.status,
	},
});

const [name, nameAttrs] = defineField('name');
const [price, priceAttrs] = defineField('price');
const [customerEmail, customerEmailAttrs] = defineField('customer.email');
const [customerName, customerNameAttrs] = defineField('customer.name');

const { mutate, isPending } = useMutation({
	mutationKey: ['create a new deal'],
	mutationFn: (data: IDealFormState) =>
		DB.createDocument(DB_ID, COLLECTION_DEALS, uuid(), data),
	onSuccess() {
		props.refetch && props.refetch();
		handleReset();
	},
});

const onSubmit = handleSubmit((values) => {
	console.log('Submitting values:', values);

	// Проверяем, что все обязательные поля заполнены
	if (
		!values.name ||
		!values.price ||
		!values.customer.email ||
		!values.customer.name
	) {
		console.error('⛔ Ошибка: Все поля обязательны!');
		return;
	}

	// Отправляем данные с правильными типами
	mutate({
		...values,
		price: Number(values.price), // ✅ Приводим price к числу
		status: props.status, // ✅ Добавляем status вручную
	});
});
</script>

<template>
	<div class="mb-2 text-center">
		<button
			class="opacity-5 hover:opacity-100 hover:text-[#a252c8] transition-all"
			@click="isOpenForm = !isOpenForm"
		>
			<Icon
				v-if="isOpenForm"
				name="radix-icons:arrow-up"
				class="fade-in-100 fade-out-0"
				size="35"
			/>
			<Icon
				v-else
				name="radix-icons:plus-circled"
				class="fade-in-100 fade-out-0"
				size="35"
			/>
		</button>
	</div>
	<form v-if="isOpenForm" @submit="onSubmit" class="form">
		<UiInput
			placeholder="Name"
			v-model="name"
			v-bind="nameAttrs"
			type="text"
			class="input"
		/>
		<UiInput
			placeholder="Price"
			v-model="price"
			v-bind="priceAttrs"
			type="text"
			class="input"
		/>
		<UiInput
			placeholder="Email"
			v-model="customerEmail"
			v-bind="customerEmailAttrs"
			type="text"
			class="input"
		/>
		<UiInput
			placeholder="Company"
			v-model="customerName"
			v-bind="customerNameAttrs"
			type="text"
			class="input"
		/>

		<button class="btn" :disabled="isPending">
			{{ isPending ? 'Loading...' : 'Add' }}
		</button>
	</form>
</template>

<style scoped>
.input {
	@apply mb-2 border-[#161c26] focus:border-border placeholder:text-[#748092] transition-colors;
}

.btn {
	@apply px-2 py-1 border border-[#161c26] hover:border-[#482c65] rounded text-[#aebed5] hover:text-white text-xs transition-colors;
}

.form {
	@apply block mb-3;
	animation: show 0.3s ease-in-out;
}

@keyframes show {
	from {
		@apply border-[#a252c83d];
		transform: translateY(-35px);
		opacity: 0.4;
	}

	90% {
		@apply border-[#a252c83d];
	}

	to {
		@apply border-transparent;
		transform: translateY(0);
		opacity: 1;
	}
}
</style>
