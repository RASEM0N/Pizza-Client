import type { IProductIngredient } from '~/src/entities/product';
import { $apiFetch } from '~/src/shared/api';
import { useAsync } from '~/src/shared/lib/useAsync';

interface Params {
	limit: number;
}

export const useIngredientsFilter = ({ limit }: Params) => {
	const route = useRoute();
	const router = useRouter();

	const showAll = ref(false);
	const searchValue = ref('');
	const apiIngredient = useAsync(() =>
		$apiFetch<IProductIngredient[]>('/api/ingredient'),
	);

	const selectedItems = reactive(new Set<number>());
	const items = computed(() => apiIngredient.result.value ?? []);
	const query = computed(() => [...selectedItems.values()].join(','));

	const setSelectedItem = (itemId: number, value: boolean) => {
		value ? selectedItems.add(itemId) : selectedItems.delete(itemId);
	};

	const toggleSelectItem = (itemId: number) => {
		setSelectedItem(itemId, !selectedItems.has(itemId));
	};

	const showItems = computed<IProductIngredient[]>(() => {
		if (!showAll.value) {
			return items.value.slice(0, limit);
		}

		if (!searchValue.value) {
			return items.value;
		}

		return items.value.filter((v) =>
			v.name.toLowerCase().includes(searchValue.value.toLowerCase()),
		);
	});

	watch(query, (value) => {
		if (value) {
			return router.push({ query: { ingredients: value } });
		}

		if (route.query.ingredients) {
			return router.push({ query: { ingredients: '' } });
		}
	});

	onMounted(() => {
		apiIngredient.execute();
	});

	return {
		showAll,
		items,
		searchValue,
		showItems,
		toggleSelectItem,
		setSelectedItem,
		selectedItems,
	};
};
