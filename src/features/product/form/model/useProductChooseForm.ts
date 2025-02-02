import type {
	DefaultProductSize,
	DefaultProductType,
	IProduct,
} from '@entities/product';

import { defaultProductTypes } from '@entities/product';

import {
	type ChooseVariant,
	getAvailableProductItems,
	getProductDetails,
} from '../lib';

export const useProductChooseForm = (product: IProduct) => {
	const size = ref<DefaultProductSize>(20);
	const type = ref<DefaultProductType>(1);
	const selectedIngredients = reactive(new Set<number>([]));

	const currentItemId = computed<number | undefined>(() => {
		return product.items.find(
			(item) => item.pizzaType === type.value && item.size === size.value,
		)?.id;
	});

	const availableTypes = computed<ChooseVariant[]>(() => {
		return defaultProductTypes();
	});

	const availableSizes = computed<ChooseVariant[]>(() => {
		return getAvailableProductItems(type.value, product.items);
	});

	const availableSize = computed<ChooseVariant | undefined>(() => {
		return availableSizes.value.find((item) => !item.disabled);
	});

	const isAvailableSize = computed<boolean>(() => {
		return availableSizes.value.some(
			(item) => item.value === size.value && !item.disabled,
		);
	});

	const details = computed(() => {
		return getProductDetails({
			type: type.value,
			size: size.value,
			items: product.items,
			ingredients: product.ingredients,
			selectedIngredients,
		});
	});

	const selectIngredient = (ingredient: number) => {
		selectedIngredients.has(ingredient)
			? selectedIngredients.delete(ingredient)
			: selectedIngredients.add(ingredient);
	};

	watch(type, () => {
		if (!isAvailableSize.value && availableSize.value) {
			size.value = +availableSize.value?.value as DefaultProductSize;
		}
	});

	return {
		currentSize: size,
		currentType: type,
		availableSizes,
		availableTypes,
		availableSize,

		details,
		currentItemId,
		selectedIngredients,
		selectIngredient,
	};
};
