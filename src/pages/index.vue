<script setup lang="ts">
import { type IProductCategory } from '~/src/entities/product';
import {
	ProductCategoriesGroup,
	ProductCategoriesFeed,
} from '~/src/features/product/categories-group';
import { ProductFilter } from '~/src/features/product/categories-filter';
import { useApiFetch } from '~/src/shared/api';
import { Stories } from '~/src/widgets/stories';

// @TODO проверить что загружается на бэке
// сюда еще body на основе текущего query надо передавать

const { t } = useI18n();
const route = useRoute();

// @TODO чето не изменяется
const { data } = await useApiFetch<IProductCategory[]>('/api/category', {
	query: {
		ingredients: route.query.ingredients,
	},
});

watch(
	() => route.query,
	(value, prevValue) => {
		// @TODO загружаем контент по новой
	},
);

const categories = computed<IProductCategory[]>(() =>
	data.value ? data.value.filter((v) => v.products.length) : [],
);
</script>
<template>
	<UiContainer class="mt-5">
		<UiTitle size="lg" class="font-extrabold">
			{{ t('pages.home.title') }}
		</UiTitle>
	</UiContainer>

	<div class="sticky top-0 bg-white py-5 shadow-lg shadow-black/5">
		<UiContainer class="flex items-center justify-between">
			<ProductCategoriesFeed :categories="categories" />
		</UiContainer>
	</div>

	<Stories />

	<UiContainer class="mt-10 pb-14">
		<div class="flex gap-[80px]">
			<div class="w-[250px]">
				<ProductFilter />
			</div>

			<div class="flex-1">
				<div class="flex flex-col gap-16">
					<ProductCategoriesGroup
						v-for="category in categories"
						:id="category.name"
						:key="category.id"
						:category="category"
					/>
				</div>
			</div>
		</div>
	</UiContainer>

	<!--место под модалку. надо бы suspense бы еще туды-->
	<NuxtPage />
</template>
