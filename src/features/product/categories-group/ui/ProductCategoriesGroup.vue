<script setup lang="ts">
import { type IProductCategory, Product } from '~/src/entities/product';

defineProps<{ category: IProductCategory }>();
</script>
<template>
	<div>
		<UiTitle class="font-extrabold mb-5" size="lg">
			{{ category.name }}
		</UiTitle>
		<div class="grid grid-cols-3 gap-[50px]">
			<Product
				v-for="product in category.products"
				:key="product.id"
				:product="product"
			/>
		</div>
	</div>
</template>
