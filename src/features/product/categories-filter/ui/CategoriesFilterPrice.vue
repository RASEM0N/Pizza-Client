<script setup lang="ts">
import { MAX_PRICE, MIN_PRICE } from '../model/const';

// @TODO в процессе

const { t } = useI18n();
const price = ref([MIN_PRICE, MAX_PRICE]);
</script>
<template>
	<div class="border-y border-y-neutral-100 py-6 pb-7">
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
</template>
