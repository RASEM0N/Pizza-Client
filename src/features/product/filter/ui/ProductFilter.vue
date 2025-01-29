<script setup lang="ts">
import ProductFilterCheckbox from './ProductFilterCheckbox.vue';
import ProductFilterCheckboxGroup from './ProductFilterIngredients.vue';
import { MIN_PRICE, MAX_PRICE } from '../model/const';

// @TODO
// - все числовые значения должны приходить с бэка
// - не должно быть захардкодено
// - еренести в виджеты или куда-то в другое место
// - Slider при скролле выше шапки становится по композиции
// - ProductFilterCheckbox перенести в виджеты или куда-то в другое место

const { t } = useI18n();
const price = ref([MIN_PRICE, MAX_PRICE]);
</script>
<template>
	<div>
		<UiTitle size="sm" class="mb-5 font-bold">
			{{ t('product_filter.name') }}
		</UiTitle>
		<div class="flex flex-col gap-4">
			<ProductFilterCheckbox :checked="false">
        {{ t('product_filter.status.can_collect') }}
      </ProductFilterCheckbox>
			<ProductFilterCheckbox :checked="false">
        {{ t('product_filter.status.new') }}
      </ProductFilterCheckbox>
		</div>

		<div class="mt-5 border-y border-y-neutral-100 py-6 pb-7">
			<p class="font-bold mb-3">{{ t('product_filter.price') }}</p>
			<div class="flex gap-3 mb-5">
				<UiInput
					type="number"
					:min="100"
					:max="30000"
					placeholder="0"
					default-value="0"
				/>
				<UiInput type="number" :min="100" :max="30000" placeholder="30000" />
			</div>
			<UiSlider :min="0" :max="5000" :step="10" :model-value="price" />
		</div>

		<ProductFilterCheckboxGroup class="mt-5" :limit="6" />
	</div>
</template>
