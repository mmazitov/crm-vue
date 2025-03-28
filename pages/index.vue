<script setup lang="ts">
import { generateColumnStyle } from '@/components/kanban/generate-gradient';
import { useKanbanQuery } from '@/components/kanban/useKanbanQuery';
import { convertCurrency } from '@/utils/convertCurrency';
import { useMutation } from '@tanstack/vue-query';
import dayjs from 'dayjs';
import { COLLECTION_DEALS, DB_ID } from '~/app.constants';
import type { ICard, IColumn } from '~/components/kanban/kanban.types';
import { useDealSlideStore } from '~/store/deal-slide.store';
import type { EnumStatus } from '~/types/deals.types';

useSeoMeta({
	title: 'Home',
});

const dragCardRef = ref<ICard | null>(null);
const sourceColumnRef = ref<IColumn | null>(null);
const { data, isLoading, refetch } = useKanbanQuery();
const store = useDealSlideStore();

type TypeMutationVariables = {
	docId: string;
	status?: EnumStatus;
};

const { mutate } = useMutation({
	mutationKey: ['move card'],
	mutationFn: ({ docId, status }: TypeMutationVariables) =>
		DB.updateDocument(DB_ID, COLLECTION_DEALS, docId, {
			status,
		}),
	onSuccess: () => {
		refetch();
	},
});

function handleDragStart(card: ICard, column: IColumn) {
	dragCardRef.value = card;
	sourceColumnRef.value = column;
}

function handleDragOver(event: DragEvent) {
	event.preventDefault();
}

function handleDrop(targetColumn: IColumn) {
	if (dragCardRef.value && sourceColumnRef.value) {
		mutate({ docId: dragCardRef.value.id, status: targetColumn.id });
	}
}
</script>

<template>
	<div class="p-10">
		<h1 class="mb-10 font-bold text-2xl">CRM System by RED Group</h1>
		<div v-if="isLoading">Loading...</div>
		<div v-else>
			<div class="gap-16 grid grid-cols-5">
				<div
					v-for="(column, index) in data"
					:key="column.id"
					@dragover="handleDragOver"
					@drop="() => handleDrop(column)"
					class="min-h-screen"
				>
					<div
						class="bg-slate-700 mb-2 px-5 py-1 rounded text-center"
						:style="generateColumnStyle(index, data?.length)"
					>
						{{ column.name }}
					</div>
					<div>
						<KanbanCreateDeal :refetch="refetch" :status="column.id" />
						<UiCard
							v-for="card in column.items"
							:key="card.id"
							class="mb-5"
							draggable="true"
							@dragstart="() => handleDragStart(card, column)"
						>
							<UiCardHeader>
								<UiCardTitle>{{ card.name }}</UiCardTitle>

								<UiCardDescription class="block mt-2">{{
									convertCurrency(card.price)
								}}</UiCardDescription>
							</UiCardHeader>
							<UiCardContent class="text-xs">
								<div>Company</div>
								{{ card.companyName }}</UiCardContent
							>
							<UiCardFooter>
								{{ dayjs(card.$createdAt).format('DD MMMM YYYY') }}
							</UiCardFooter>
						</UiCard>
					</div>
				</div>
			</div>
			<KanbanSlideover />
		</div>
	</div>
</template>
