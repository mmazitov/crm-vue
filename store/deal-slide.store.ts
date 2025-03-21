import type { ICard } from '~/components/kanban/kanban.types';

export const useDealSlideStore = defineStore('deal-slide', {
	state: () => ({
		card: null as ICard | null,
		isOpen: false,
	}),
	actions: {
		clear() {
			// Reset state with a fresh object
			this.$patch({
				card: null,
				isOpen: false,
			});
		},
		set(card: ICard) {
			// Clone the card to ensure it's mutable even if the source was frozen
			this.$patch({
				card: { ...card },
				isOpen: true,
			});
		},
		toggle() {
			this.isOpen = !this.isOpen;
		},
	},
});
