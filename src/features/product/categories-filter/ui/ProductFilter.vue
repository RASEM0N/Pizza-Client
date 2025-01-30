<script setup lang="ts">
import ProductFilterIngredients from './ProductFilterIngredients.vue';
import ProductFilterTypes from './ProductFilterTypes.vue';
import ProductFilterSizes from './ProductFilterSizes.vue';
import ProductFilterPrice from './ProductFilterPrice.vue';

// @TODO
// - все числовые значения должны приходить с бэка
// - не должно быть захардкодено
// - еренести в виджеты или куда-то в другое место
// - Slider при скролле выше шапки становится по композиции
// - ProductFilterCheckbox перенести в виджеты или куда-то в другое место

// @TODO
// - у нас по сути +- копипаст для контейрое CHECKBOX-ОВ

const { t } = useI18n();
</script>
<template>
	<div>
		<UiTitle size="sm" class="mb-5 font-bold">
			{{ t('product_filter.name') }}
		</UiTitle>

		<ProductFilterSizes class="mb-5" />
		<ProductFilterTypes class="mb-5" />
		<ProductFilterPrice class="mb-5" />
		<ProductFilterIngredients :limit="6" />
	</div>
</template>
