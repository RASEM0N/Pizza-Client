<script setup lang="ts">
import ProductFilterCheckbox from './ProductFilterCheckbox.vue';
import { useRouteQueryArray } from '~/src/shared/lib/useRouteQueryArray';
import { defaultProductSizes } from '~/src/entities/product';

const { t } = useI18n();
const { has, toggle } = useRouteQueryArray({ queryName: 'sizes' });
const sizes = computed(() => defaultProductSizes());
</script>
<template>
	<div>
		<p class="font-bold mb-3">{{ t('product_filter.sizes') }}</p>
		<div class="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
			<ProductFilterCheckbox
				v-for="size in sizes"
				:key="size.value"
				:checked="has(size.value)"
				@update:checked="toggle(size.value)"
			>
				{{ size.name }} см
			</ProductFilterCheckbox>
		</div>
	</div>
</template>
